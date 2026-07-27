"use client";

import type { ToolDefinition } from "./tool-data";

export type ToolOptions = {
  paperSize: "a4" | "letter" | "legal";
  margin: number;
  pageNumbers: boolean;
  pageRange: string;
  preserveBreaks: boolean;
  ocrLanguage: "eng" | "tha";
  chunkSize: number;
  chunkOverlap: number;
  boundary: "markdown" | "xml";
  splitRows: number;
  worksheet: number;
};

export type ToolResult = {
  text?: string;
  html?: string;
  blob?: Blob;
  fileName?: string;
  mime?: string;
  note: string;
  stats: Array<[string, string]>;
};

const PDF_WORKER = "/tools/document/pdf.worker.min.mjs";
const MAX_FILE_SIZE = 40 * 1024 * 1024;
const MAX_FILES = 20;

function safeBaseName(name: string) {
  return name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9._-]+/g, "-") || "djai-result";
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function assertFiles(files: File[]) {
  if (files.length > MAX_FILES) throw new Error(`Choose no more than ${MAX_FILES} files.`);
  for (const file of files) if (file.size > MAX_FILE_SIZE) throw new Error(`${file.name} is larger than 40 MB.`);
}

async function sanitizeHtml(html: string) {
  const { default: DOMPurify } = await import("dompurify");
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form"],
    FORBID_ATTR: ["onerror", "onload", "onclick"]
  });
}

async function docxHtml(file: File) {
  const mammoth = await import("mammoth");
  const result = await mammoth.convertToHtml(
    { arrayBuffer: await file.arrayBuffer() },
    { includeDefaultStyleMap: true, styleMap: ["p[style-name='Title'] => h1:fresh", "p[style-name='Subtitle'] => h2:fresh"] }
  );
  return { html: await sanitizeHtml(result.value), warnings: result.messages.map((message) => message.message) };
}

async function docxText(file: File) {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
  return result.value.trim();
}

function selectedPages(value: string, total: number) {
  if (!value.trim()) return Array.from({ length: total }, (_, index) => index + 1);
  const pages = new Set<number>();
  for (const part of value.split(",").map((item) => item.trim()).filter(Boolean)) {
    const range = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (range) {
      const start = Number(range[1]);
      const end = Number(range[2]);
      if (start < 1 || end > total || end < start) throw new Error(`Invalid page range: ${part}`);
      for (let page = start; page <= end; page += 1) pages.add(page);
    } else {
      const page = Number(part);
      if (!Number.isInteger(page) || page < 1 || page > total) throw new Error(`Invalid page: ${part}`);
      pages.add(page);
    }
  }
  return [...pages].sort((a, b) => a - b);
}

async function loadPdf(file: File) {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = PDF_WORKER;
  const task = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
  return { task, document: await task.promise };
}

function pageText(items: Array<{ str?: string; transform?: number[]; hasEOL?: boolean }>, preserveBreaks: boolean) {
  if (preserveBreaks) return items.map((item) => `${item.str || ""}${item.hasEOL ? "\n" : " "}`).join("").replace(/[ \t]+\n/g, "\n").trim();
  const lines: Array<{ y: number; value: string }> = [];
  for (const item of items) {
    const value = item.str?.trim();
    if (!value) continue;
    const y = Math.round(item.transform?.[5] || 0);
    const line = lines.find((candidate) => Math.abs(candidate.y - y) <= 2);
    if (line) line.value += ` ${value}`;
    else lines.push({ y, value });
  }
  return lines.sort((a, b) => b.y - a.y).map((line) => line.value).join("\n");
}

async function extractPdf(file: File, options: ToolOptions) {
  const { task, document } = await loadPdf(file);
  const pages = selectedPages(options.pageRange, document.numPages);
  const output: string[] = [];
  for (const number of pages) {
    const page = await document.getPage(number);
    const content = await page.getTextContent();
    output.push(pageText(content.items as Array<{ str?: string; transform?: number[]; hasEOL?: boolean }>, options.preserveBreaks));
    page.cleanup();
  }
  await task.destroy();
  return { pages, text: output.join("\n\n\f\n\n"), pageTexts: output };
}

function cleanContext(input: string) {
  const normalized = input.replace(/\n\s*page\s+\d+(?:\s+of\s+\d+)?\s*\n/gi, "\n\f\n");
  const pages = normalized.split(/\f|\n\s*---\s*page\s+\d+\s*---\s*\n/i);
  const frequency = new Map<string, number>();
  for (const page of pages) {
    const unique = new Set(page.split("\n").map((line) => line.trim()).filter((line) => line.length > 2 && line.length < 100));
    unique.forEach((line) => frequency.set(line, (frequency.get(line) || 0) + 1));
  }
  const repeatedThreshold = Math.max(2, Math.ceil(pages.length * 0.6));
  return pages.map((page) => page
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .filter((line) => line && !/^page\s+\d+(\s+of\s+\d+)?$/i.test(line) && (frequency.get(line) || 0) < repeatedThreshold)
    .join("\n"))
    .join("\n\n")
    .replace(/([A-Za-z])[-‐]\n([a-z])/g, "$1$2")
    .replace(/([^\n.!?:;])\n(?=[a-z0-9])/gi, "$1 ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function tokenStats(text: string) {
  const { encode } = await import("gpt-tokenizer");
  const tokens = encode(text);
  const words = text.trim() ? text.trim().split(/\s+/u).length : 0;
  return { tokens: tokens.length, words, characters: text.length };
}

async function readTextFile(file: File, options: ToolOptions) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (extension === "docx") return docxText(file);
  if (extension === "pdf") return (await extractPdf(file, options)).text;
  return file.text();
}

export async function extractTextForAnalysis(files: File[]) {
  assertFiles(files);
  const supported = new Set(["docx", "pdf", "txt", "md", "csv", "json", "js", "ts", "tsx", "jsx", "py", "html", "css", "xml", "yaml", "yml"]);
  const options: ToolOptions = { paperSize: "a4", margin: 42, pageNumbers: false, pageRange: "", preserveBreaks: true, ocrLanguage: "eng", chunkSize: 700, chunkOverlap: 100, boundary: "markdown", splitRows: 1000, worksheet: 0 };
  return Promise.all(files.map(async (file) => {
    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    if (!supported.has(extension) && !file.type.startsWith("text/")) throw new Error(`${file.name} is not a supported text document.`);
    const text = await readTextFile(file, options);
    if (extension === "pdf" && text.replace(/\s/g, "").length < 20) throw new Error(`${file.name} has no selectable text. Try Document OCR.`);
    return { name: file.name, text };
  }));
}

function textBlob(text: string, type = "text/plain;charset=utf-8") {
  return new Blob([text], { type });
}

async function docxToPdf(file: File, options: ToolOptions): Promise<ToolResult> {
  const { html, warnings } = await docxHtml(file);
  const container = document.createElement("div");
  const sizes = { a4: [794, 1123], letter: [816, 1056], legal: [816, 1344] } as const;
  const [width] = sizes[options.paperSize];
  Object.assign(container.style, { position: "fixed", left: "-100000px", top: "0", width: `${width - options.margin * 2}px`, padding: `${options.margin}px`, background: "#fff", color: "#111", font: "16px Arial, sans-serif", lineHeight: "1.5" });
  container.className = "document-render-surface";
  container.innerHTML = html;
  document.body.appendChild(container);
  try {
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
    const canvas = await html2canvas(container, { scale: 1.5, backgroundColor: "#ffffff", useCORS: false, logging: false });
    const pdf = new jsPDF({ unit: "pt", format: options.paperSize, orientation: "portrait", compress: true });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imageWidth = pageWidth;
    const imageHeight = canvas.height * (imageWidth / canvas.width);
    let offset = 0;
    let page = 1;
    while (offset < imageHeight) {
      if (page > 1) pdf.addPage();
      pdf.addImage(canvas, "JPEG", 0, -offset, imageWidth, imageHeight, undefined, "FAST");
      if (options.pageNumbers) pdf.text(String(page), pageWidth / 2, pageHeight - 18, { align: "center" });
      offset += pageHeight;
      page += 1;
    }
    return { blob: pdf.output("blob"), fileName: `${safeBaseName(file.name)}.pdf`, note: warnings.length ? `${warnings.length} formatting warning(s)` : "Browser-rendered PDF", stats: [["Pages", String(page - 1)], ["Mode", "Private browser"]] };
  } finally {
    container.remove();
  }
}

async function pdfToWord(file: File, options: ToolOptions): Promise<ToolResult> {
  const { pageTexts } = await extractPdf(file, options);
  const { Document, Packer, Paragraph, PageBreak } = await import("docx");
  const children = pageTexts.flatMap((text, pageIndex) => {
    const paragraphs = text.split(/\n+/).filter(Boolean).map((line) => new Paragraph({ text: line }));
    if (pageIndex < pageTexts.length - 1) paragraphs.push(new Paragraph({ children: [new PageBreak()] }));
    return paragraphs;
  });
  if (!children.length) throw new Error("No selectable text was found. Try Document OCR instead.");
  const blob = await Packer.toBlob(new Document({ creator: "DJTools by DJAI Academy", sections: [{ children }] }));
  return { blob, fileName: `${safeBaseName(file.name)}.docx`, note: "Text-focused DOCX", stats: [["Pages", String(pageTexts.length)], ["Layout", "Simplified"]] };
}

async function renderPdfCanvases(file: File) {
  const { task, document } = await loadPdf(file);
  const canvases: HTMLCanvasElement[] = [];
  for (let number = 1; number <= document.numPages; number += 1) {
    const page = await document.getPage(number);
    const viewport = page.getViewport({ scale: 1.6 });
    const canvas = window.document.createElement("canvas");
    canvas.width = Math.floor(viewport.width); canvas.height = Math.floor(viewport.height);
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) throw new Error("Canvas is unavailable in this browser.");
    context.fillStyle = "#fff"; context.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvas, canvasContext: context, viewport }).promise;
    canvases.push(canvas); page.cleanup();
  }
  await task.destroy();
  return canvases;
}

async function runOcr(file: File, options: ToolOptions): Promise<ToolResult> {
  const { createWorker } = await import("tesseract.js");
  const worker = await createWorker(options.ocrLanguage, undefined, {
    workerPath: "/tools/document/ocr-runtime/worker.min.js",
    corePath: "/tools/document/ocr-runtime/tesseract-core-simd-lstm.wasm.js",
    langPath: "/tools/document/ocr-data",
    gzip: true,
    logger: () => undefined
  });
  const inputs: Array<File | HTMLCanvasElement> = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf") ? await renderPdfCanvases(file) : [file];
  const pages: string[] = [];
  try {
    for (const input of inputs) pages.push((await worker.recognize(input)).data.text.trim());
  } finally { await worker.terminate(); }
  const text = pages.map((page, index) => `--- Page ${index + 1} ---\n${page}`).join("\n\n");
  const stats = await tokenStats(text);
  return { text, blob: textBlob(text), fileName: `${safeBaseName(file.name)}-ocr.txt`, note: `OCR ${options.ocrLanguage.toUpperCase()}`, stats: [["Pages", String(pages.length)], ["Words", formatNumber(stats.words)], ["Tokens", formatNumber(stats.tokens)]] };
}

async function makeChunks(text: string, size: number, overlap: number) {
  const { encode, decode } = await import("gpt-tokenizer");
  const tokens = encode(text);
  const chunks: Array<{ id: string; tokenCount: number; text: string }> = [];
  const step = Math.max(1, size - overlap);
  for (let start = 0, index = 0; start < tokens.length; start += step, index += 1) {
    const slice = tokens.slice(start, start + size);
    chunks.push({ id: `chunk-${String(index + 1).padStart(4, "0")}`, tokenCount: slice.length, text: decode(slice) });
    if (start + size >= tokens.length) break;
  }
  return { chunks, total: tokens.length };
}

async function parseCsv(file: File) {
  const Papa = (await import("papaparse")).default;
  const result = Papa.parse<Record<string, string>>(await file.text(), { header: true, skipEmptyLines: "greedy", transformHeader: (header) => header.trim() });
  if (result.errors.length && !result.data.length) throw new Error(result.errors[0].message);
  return { Papa, rows: result.data, fields: result.meta.fields || [] };
}

async function spreadsheetTool(tool: ToolDefinition, files: File[], options: ToolOptions): Promise<ToolResult> {
  if (tool.slug === "json-to-csv") {
    const Papa = (await import("papaparse")).default;
    const value = JSON.parse(await files[0].text());
    if (!Array.isArray(value)) throw new Error("JSON must contain an array of objects.");
    const output = Papa.unparse(value);
    return { text: output, blob: textBlob(output, "text/csv;charset=utf-8"), fileName: `${safeBaseName(files[0].name)}.csv`, note: "JSON array converted", stats: [["Rows", formatNumber(value.length)]] };
  }
  if (tool.slug === "xlsx-to-csv") {
    const ExcelJS = await import("exceljs");
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(await files[0].arrayBuffer());
    const sheet = workbook.worksheets[Math.min(options.worksheet, workbook.worksheets.length - 1)] || workbook.worksheets[0];
    if (!sheet) throw new Error("No worksheet was found.");
    const rows: unknown[][] = [];
    sheet.eachRow({ includeEmpty: false }, (row) => rows.push((row.values as unknown[]).slice(1)));
    const Papa = (await import("papaparse")).default;
    const output = Papa.unparse(rows);
    return { text: output, blob: textBlob(output, "text/csv;charset=utf-8"), fileName: `${safeBaseName(files[0].name)}-${safeBaseName(sheet.name)}.csv`, note: `Worksheet: ${sheet.name}`, stats: [["Rows", formatNumber(rows.length)], ["Sheets", String(workbook.worksheets.length)]] };
  }
  const parsed = await Promise.all(files.map(parseCsv));
  if (tool.slug === "csv-to-json") {
    const output = JSON.stringify(parsed[0].rows, null, 2);
    return { text: output, blob: textBlob(output, "application/json;charset=utf-8"), fileName: `${safeBaseName(files[0].name)}.json`, note: "Structured JSON array", stats: [["Rows", formatNumber(parsed[0].rows.length)], ["Columns", String(parsed[0].fields.length)]] };
  }
  if (tool.slug === "csv-to-xlsx") {
    const ExcelJS = await import("exceljs");
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Data");
    sheet.columns = parsed[0].fields.map((field) => ({ header: field, key: field, width: Math.min(40, Math.max(12, field.length + 2)) }));
    parsed[0].rows.forEach((row) => sheet.addRow(row));
    sheet.getRow(1).font = { bold: true };
    const buffer = await workbook.xlsx.writeBuffer();
    return { blob: new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), fileName: `${safeBaseName(files[0].name)}.xlsx`, note: "Excel workbook", stats: [["Rows", formatNumber(parsed[0].rows.length)], ["Columns", String(parsed[0].fields.length)]] };
  }
  let rows = parsed[0].rows;
  let fields = parsed[0].fields;
  if (tool.slug === "merge-csv") {
    fields = [...new Set(parsed.flatMap((item) => item.fields))];
    rows = parsed.flatMap((item) => item.rows);
  }
  if (tool.slug === "csv-cleaner") {
    const seen = new Set<string>();
    rows = rows.map((row) => Object.fromEntries(Object.entries(row).map(([key, value]) => [key.trim(), String(value ?? "").trim()])))
      .filter((row) => Object.values(row).some(Boolean))
      .filter((row) => { const key = JSON.stringify(row); if (seen.has(key)) return false; seen.add(key); return true; });
  }
  const Papa = parsed[0].Papa;
  if (tool.slug === "split-csv") {
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    for (let start = 0, part = 1; start < rows.length; start += options.splitRows, part += 1) zip.file(`${safeBaseName(files[0].name)}-part-${part}.csv`, Papa.unparse(rows.slice(start, start + options.splitRows), { columns: fields }));
    return { blob: await zip.generateAsync({ type: "blob", compression: "DEFLATE" }), fileName: `${safeBaseName(files[0].name)}-split.zip`, note: `Up to ${options.splitRows} rows per file`, stats: [["Rows", formatNumber(rows.length)], ["Files", String(Math.ceil(rows.length / options.splitRows))]] };
  }
  const output = Papa.unparse(rows, { columns: fields });
  return { text: output, blob: textBlob(output, "text/csv;charset=utf-8"), fileName: `${safeBaseName(files[0].name)}-${tool.slug}.csv`, note: tool.slug === "merge-csv" ? `${files.length} files merged` : "Whitespace and duplicates removed", stats: [["Rows", formatNumber(rows.length)], ["Columns", String(fields.length)]] };
}

export async function processTool(tool: ToolDefinition, files: File[], input: string, options: ToolOptions): Promise<ToolResult> {
  assertFiles(files);
  if (tool.category === "spreadsheet") return spreadsheetTool(tool, files, options);
  const file = files[0];
  if (tool.slug === "docx-to-pdf") return docxToPdf(file, options);
  if (tool.slug === "pdf-to-word") return pdfToWord(file, options);
  if (tool.slug === "ocr") return runOcr(file, options);
  if (tool.slug === "docx-to-html") {
    const result = await docxHtml(file); const stats = await tokenStats(result.html.replace(/<[^>]+>/g, " "));
    const documentHtml = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${safeBaseName(file.name)}</title></head><body>${result.html}</body></html>`;
    return { text: documentHtml, html: result.html, blob: textBlob(documentHtml, "text/html;charset=utf-8"), fileName: `${safeBaseName(file.name)}.html`, note: result.warnings.length ? `${result.warnings.length} conversion warning(s)` : "Sanitized semantic HTML", stats: [["Words", formatNumber(stats.words)], ["Tokens", formatNumber(stats.tokens)]] };
  }
  if (tool.slug === "docx-to-markdown") {
    const { html, warnings } = await docxHtml(file); const { default: TurndownService } = await import("turndown");
    const markdown = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", codeBlockStyle: "fenced" }).turndown(html);
    const stats = await tokenStats(markdown);
    return { text: markdown, blob: textBlob(markdown, "text/markdown;charset=utf-8"), fileName: `${safeBaseName(file.name)}.md`, note: warnings.length ? `${warnings.length} conversion warning(s)` : "Clean Markdown", stats: [["Words", formatNumber(stats.words)], ["Tokens", formatNumber(stats.tokens)]] };
  }
  if (tool.slug === "docx-to-text") {
    const text = await docxText(file); const stats = await tokenStats(text);
    return { text, blob: textBlob(text), fileName: `${safeBaseName(file.name)}.txt`, note: "Plain text", stats: [["Words", formatNumber(stats.words)], ["Characters", formatNumber(stats.characters)]] };
  }
  if (tool.slug === "pdf-to-text" || tool.slug === "pdf-to-ai-markdown") {
    const extracted = await extractPdf(file, options);
    if (extracted.text.replace(/\s/g, "").length < 20) throw new Error("No selectable text was detected. Try Document OCR.");
    const text = tool.slug === "pdf-to-ai-markdown"
      ? extracted.pageTexts.map((page, index) => `## Page ${index + 1}\n\n${cleanContext(page)}`).join("\n\n")
      : extracted.text.replace(/\f/g, "\n\n");
    const stats = await tokenStats(text); const extension = tool.slug === "pdf-to-ai-markdown" ? "md" : "txt";
    return { text, blob: textBlob(text, extension === "md" ? "text/markdown;charset=utf-8" : undefined), fileName: `${safeBaseName(file.name)}.${extension}`, note: tool.slug === "pdf-to-ai-markdown" ? "AI-ready Markdown" : "Selectable PDF text", stats: [["Pages", String(extracted.pages.length)], ["Words", formatNumber(stats.words)], ["Tokens", formatNumber(stats.tokens)]] };
  }
  if (tool.slug === "token-counter") {
    const text = [input, ...(await Promise.all(files.map((item) => readTextFile(item, options))))].filter(Boolean).join("\n\n");
    if (!text.trim()) throw new Error("Paste text or choose a supported document.");
    const stats = await tokenStats(text);
    return { text, note: "o200k_base-compatible token estimate", stats: [["Tokens", formatNumber(stats.tokens)], ["Words", formatNumber(stats.words)], ["Characters", formatNumber(stats.characters)], ["128K context", `${Math.min(100, stats.tokens / 1280).toFixed(1)}%`]] };
  }
  if (tool.slug === "context-optimizer") {
    const source = [input, ...(await Promise.all(files.map((item) => readTextFile(item, options))))].filter(Boolean).join("\n\n");
    if (!source.trim()) throw new Error("Paste text or choose a supported document.");
    const before = await tokenStats(source); const text = cleanContext(source); const after = await tokenStats(text);
    return { text, blob: textBlob(text, "text/markdown;charset=utf-8"), fileName: "DJTools-clean-context.md", note: "Deterministic local cleanup", stats: [["Before", `${formatNumber(before.tokens)} tokens`], ["After", `${formatNumber(after.tokens)} tokens`], ["Reduced", `${before.tokens ? Math.max(0, Math.round((1 - after.tokens / before.tokens) * 100)) : 0}%`]] };
  }
  if (tool.slug === "rag-chunk-calculator") {
    if (!input.trim()) throw new Error("Paste the document text to split.");
    const result = await makeChunks(input, options.chunkSize, Math.min(options.chunkOverlap, options.chunkSize - 1));
    const jsonl = result.chunks.map((chunk) => JSON.stringify(chunk)).join("\n");
    return { text: result.chunks.map((chunk) => `### ${chunk.id} · ${chunk.tokenCount} tokens\n${chunk.text}`).join("\n\n"), blob: textBlob(jsonl, "application/x-ndjson;charset=utf-8"), fileName: "DJTools-rag-chunks.jsonl", note: "o200k_base-compatible chunks", stats: [["Total tokens", formatNumber(result.total)], ["Chunks", formatNumber(result.chunks.length)], ["Overlap", `${options.chunkOverlap} tokens`]] };
  }
  if (tool.slug === "prompt-packager") {
    const contents = await Promise.all(files.map(async (item) => ({ name: item.name, text: await readTextFile(item, options) })));
    if (input.trim()) contents.unshift({ name: "instructions.md", text: input.trim() });
    if (!contents.length) throw new Error("Add instructions or choose at least one file.");
    const text = options.boundary === "xml"
      ? contents.map((item) => `<document name="${item.name.replace(/[<&\"]/g, "-")}">\n${item.text}\n</document>`).join("\n\n")
      : contents.map((item) => `# FILE: ${item.name}\n\n${item.text}`).join("\n\n---\n\n");
    const stats = await tokenStats(text);
    return { text, blob: textBlob(text, "text/markdown;charset=utf-8"), fileName: "DJTools-prompt-package.md", note: `${options.boundary.toUpperCase()} boundaries`, stats: [["Files", formatNumber(contents.length)], ["Tokens", formatNumber(stats.tokens)], ["Words", formatNumber(stats.words)]] };
  }
  throw new Error("This workflow is not available.");
}
