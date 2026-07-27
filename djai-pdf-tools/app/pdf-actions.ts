import type { ToolSlug } from "./tool-data";

export type ProcessingOptions = {
  splitMode: "ranges" | "every" | "extract";
  pageRanges: string;
  everyPages: number;
  compression: "light" | "recommended" | "strong";
  imagePageSize: "auto" | "a4" | "letter";
  imageOrientation: "auto" | "portrait" | "landscape";
  imageFormat: "jpg" | "png";
  imageScale: number;
  rotation: 90 | 180 | 270;
  selectedPages: string;
  watermarkType: "text" | "image";
  watermarkText: string;
  watermarkImage: File | null;
  watermarkOpacity: number;
  watermarkPosition: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  watermarkSize: number;
  password: string;
  allowPrint: boolean;
  allowCopy: boolean;
  allowModify: boolean;
  allowForms: boolean;
  pageOrder: string;
  pageNumberPosition: "bottom-left" | "bottom-center" | "bottom-right" | "top-left" | "top-center" | "top-right";
  pageNumberStart: number;
};

export type ProcessResult = {
  blob: Blob;
  fileName: string;
  itemCount: number;
  note?: string;
};

const PDF_WORKER = "/tools/PDFTools/pdf.worker.min.mjs";

function baseName(name: string) {
  return name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9._-]+/g, "-") || "document";
}

function asBlob(bytes: Uint8Array<ArrayBufferLike>, type = "application/pdf") {
  return new Blob([new Uint8Array(bytes)], { type });
}

function downloadName(file: File, suffix: string, extension = "pdf") {
  return `${baseName(file.name)}-${suffix}.${extension}`;
}

function parsePageList(value: string, totalPages: number) {
  const pages = new Set<number>();
  const clean = value.trim();
  if (!clean) return [];

  for (const token of clean.split(",").map((part) => part.trim()).filter(Boolean)) {
    const range = token.match(/^(\d+)\s*-\s*(\d+)$/);
    if (range) {
      const start = Number(range[1]);
      const end = Number(range[2]);
      if (start < 1 || end < start || end > totalPages) throw new Error(`Invalid page range: ${token}`);
      for (let page = start; page <= end; page += 1) pages.add(page - 1);
      continue;
    }

    const page = Number(token);
    if (!Number.isInteger(page) || page < 1 || page > totalPages) throw new Error(`Invalid page: ${token}`);
    pages.add(page - 1);
  }

  return [...pages];
}

function parsePageSequence(value: string, totalPages: number) {
  const pages: number[] = [];
  for (const token of value.split(",").map((part) => part.trim()).filter(Boolean)) {
    const range = token.match(/^(\d+)\s*-\s*(\d+)$/);
    if (range) {
      const start = Number(range[1]);
      const end = Number(range[2]);
      if (start < 1 || end < start || end > totalPages) throw new Error(`Invalid page range: ${token}`);
      for (let page = start; page <= end; page += 1) pages.push(page - 1);
      continue;
    }
    const page = Number(token);
    if (!Number.isInteger(page) || page < 1 || page > totalPages) throw new Error(`Invalid page: ${token}`);
    pages.push(page - 1);
  }
  return pages;
}

async function readBytes(file: File) {
  return new Uint8Array(await file.arrayBuffer());
}

async function savePdf(pdf: import("pdf-lib").PDFDocument) {
  pdf.setProducer("DJTools by DJAI Academy");
  pdf.setCreator("DJTools by DJAI Academy and Siamese Cat Dev");
  pdf.setModificationDate(new Date());
  return pdf.save({ useObjectStreams: true, addDefaultPage: false });
}

async function mergePdfs(files: File[]): Promise<ProcessResult> {
  const { PDFDocument } = await import("pdf-lib");
  const output = await PDFDocument.create();

  for (const file of files) {
    const source = await PDFDocument.load(await readBytes(file));
    const pages = await output.copyPages(source, source.getPageIndices());
    pages.forEach((page) => output.addPage(page));
  }

  const bytes = await savePdf(output);
  return { blob: asBlob(bytes), fileName: "DJTools-merged.pdf", itemCount: output.getPageCount() };
}

async function makePdfFromPages(source: import("pdf-lib").PDFDocument, indices: number[]) {
  const { PDFDocument } = await import("pdf-lib");
  const output = await PDFDocument.create();
  const pages = await output.copyPages(source, indices);
  pages.forEach((page) => output.addPage(page));
  return savePdf(output);
}

async function splitPdf(file: File, options: ProcessingOptions): Promise<ProcessResult> {
  const [{ PDFDocument }, { default: JSZip }] = await Promise.all([import("pdf-lib"), import("jszip")]);
  const source = await PDFDocument.load(await readBytes(file));
  const total = source.getPageCount();
  let groups: number[][] = [];

  if (options.splitMode === "every") {
    const size = Math.max(1, Math.floor(options.everyPages));
    for (let index = 0; index < total; index += size) {
      groups.push(Array.from({ length: Math.min(size, total - index) }, (_, offset) => index + offset));
    }
  } else if (options.splitMode === "ranges") {
    groups = options.pageRanges.split(";").map((group) => parsePageList(group, total)).filter((group) => group.length);
  } else {
    groups = [parsePageList(options.pageRanges, total)];
  }

  if (!groups.length || groups.some((group) => !group.length)) throw new Error("Choose at least one valid PDF page.");

  if (groups.length === 1) {
    const bytes = await makePdfFromPages(source, groups[0]);
    return { blob: asBlob(bytes), fileName: downloadName(file, "pages"), itemCount: groups[0].length };
  }

  const zip = new JSZip();
  for (let index = 0; index < groups.length; index += 1) {
    const bytes = await makePdfFromPages(source, groups[index]);
    zip.file(`${baseName(file.name)}-part-${index + 1}.pdf`, bytes);
  }
  const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
  return { blob, fileName: downloadName(file, "split", "zip"), itemCount: groups.length };
}

async function loadPdfJs() {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = PDF_WORKER;
  return pdfjs;
}

function canvasBlob(canvas: HTMLCanvasElement, type: string, quality?: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("The browser could not encode this page.")), type, quality);
  });
}

async function renderPdfPages(file: File, scale: number) {
  const pdfjs = await loadPdfJs();
  const bytes = await readBytes(file);
  const loadingTask = pdfjs.getDocument({ data: bytes.slice() });
  const pdfDocument = await loadingTask.promise;
  const pages: Array<{ canvas: HTMLCanvasElement; width: number; height: number }> = [];

  for (let number = 1; number <= pdfDocument.numPages; number += 1) {
    const page = await pdfDocument.getPage(number);
    const original = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.floor(viewport.width));
    canvas.height = Math.max(1, Math.floor(viewport.height));
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) throw new Error("Canvas rendering is not supported in this browser.");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: context, viewport, canvas }).promise;
    pages.push({ canvas, width: original.width, height: original.height });
    page.cleanup();
  }
  await loadingTask.destroy();
  return pages;
}

async function compressPdf(file: File, options: ProcessingOptions): Promise<ProcessResult> {
  const { PDFDocument } = await import("pdf-lib");
  const originalBytes = await readBytes(file);
  if (options.compression === "light") {
    const pdf = await PDFDocument.load(originalBytes);
    const bytes = await savePdf(pdf);
    return {
      blob: asBlob(bytes),
      fileName: downloadName(file, "compressed"),
      itemCount: pdf.getPageCount(),
      note: "Lossless structure optimization"
    };
  }

  const preset = options.compression === "strong"
    ? { scale: 1, quality: 0.52 }
    : { scale: 1.35, quality: 0.76 };
  const rendered = await renderPdfPages(file, preset.scale);
  const output = await PDFDocument.create();
  for (const renderedPage of rendered) {
    const jpeg = await canvasBlob(renderedPage.canvas, "image/jpeg", preset.quality);
    const image = await output.embedJpg(await jpeg.arrayBuffer());
    const page = output.addPage([renderedPage.width, renderedPage.height]);
    page.drawImage(image, { x: 0, y: 0, width: renderedPage.width, height: renderedPage.height });
  }
  const bytes = await savePdf(output);
  if (bytes.length >= originalBytes.length) {
    const optimized = await PDFDocument.load(originalBytes);
    const optimizedBytes = await savePdf(optimized);
    const smallest = optimizedBytes.length < originalBytes.length ? optimizedBytes : originalBytes;
    return {
      blob: asBlob(smallest),
      fileName: downloadName(file, "compressed"),
      itemCount: rendered.length,
      note: "Already optimized; smaller source retained"
    };
  }
  return {
    blob: asBlob(bytes),
    fileName: downloadName(file, "compressed"),
    itemCount: rendered.length,
    note: "Pages were flattened to reduce size"
  };
}

async function imageForPdf(file: File) {
  const bitmap = await createImageBitmap(file);
  const width = bitmap.width;
  const height = bitmap.height;
  if (file.type === "image/jpeg" || file.type === "image/png") {
    bitmap.close();
    return { bytes: await file.arrayBuffer(), type: file.type, width, height };
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0);
  bitmap.close();
  const png = await canvasBlob(canvas, "image/png");
  return { bytes: await png.arrayBuffer(), type: "image/png", width, height };
}

function pageDimensions(
  imageWidth: number,
  imageHeight: number,
  size: ProcessingOptions["imagePageSize"],
  orientation: ProcessingOptions["imageOrientation"]
) {
  let width = imageWidth * 0.75;
  let height = imageHeight * 0.75;
  if (size === "a4") [width, height] = [595.28, 841.89];
  if (size === "letter") [width, height] = [612, 792];
  const shouldLandscape = orientation === "landscape" || (orientation === "auto" && imageWidth > imageHeight);
  if (shouldLandscape && height > width) [width, height] = [height, width];
  if (orientation === "portrait" && width > height) [width, height] = [height, width];
  return { width, height };
}

async function imagesToPdf(files: File[], options: ProcessingOptions): Promise<ProcessResult> {
  const { PDFDocument } = await import("pdf-lib");
  const output = await PDFDocument.create();
  for (const file of files) {
    const source = await imageForPdf(file);
    const image = source.type === "image/jpeg"
      ? await output.embedJpg(source.bytes)
      : await output.embedPng(source.bytes);
    const dimensions = pageDimensions(source.width, source.height, options.imagePageSize, options.imageOrientation);
    const page = output.addPage([dimensions.width, dimensions.height]);
    const margin = options.imagePageSize === "auto" ? 0 : 24;
    const scale = Math.min(
      (dimensions.width - margin * 2) / image.width,
      (dimensions.height - margin * 2) / image.height
    );
    const width = image.width * scale;
    const height = image.height * scale;
    page.drawImage(image, {
      x: (dimensions.width - width) / 2,
      y: (dimensions.height - height) / 2,
      width,
      height
    });
  }
  const bytes = await savePdf(output);
  return { blob: asBlob(bytes), fileName: "DJTools-images.pdf", itemCount: files.length };
}

async function pdfToImages(file: File, options: ProcessingOptions): Promise<ProcessResult> {
  const { default: JSZip } = await import("jszip");
  const pages = await renderPdfPages(file, options.imageScale);
  const mime = options.imageFormat === "png" ? "image/png" : "image/jpeg";
  const extension = options.imageFormat === "png" ? "png" : "jpg";
  const blobs: Blob[] = [];
  for (const page of pages) blobs.push(await canvasBlob(page.canvas, mime, options.imageFormat === "jpg" ? 0.9 : undefined));
  if (blobs.length === 1) {
    return { blob: blobs[0], fileName: downloadName(file, "page-1", extension), itemCount: 1 };
  }
  const zip = new JSZip();
  blobs.forEach((blob, index) => zip.file(`${baseName(file.name)}-page-${index + 1}.${extension}`, blob));
  return {
    blob: await zip.generateAsync({ type: "blob", compression: "DEFLATE" }),
    fileName: downloadName(file, "images", "zip"),
    itemCount: blobs.length
  };
}

async function rotatePdf(file: File, options: ProcessingOptions): Promise<ProcessResult> {
  const { PDFDocument, degrees } = await import("pdf-lib");
  const pdf = await PDFDocument.load(await readBytes(file));
  const selected = options.selectedPages.trim()
    ? parsePageList(options.selectedPages, pdf.getPageCount())
    : pdf.getPageIndices();
  selected.forEach((index) => {
    const page = pdf.getPage(index);
    page.setRotation(degrees((page.getRotation().angle + options.rotation) % 360));
  });
  const bytes = await savePdf(pdf);
  return { blob: asBlob(bytes), fileName: downloadName(file, "rotated"), itemCount: selected.length };
}

async function textWatermark(text: string) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas rendering is not supported in this browser.");
  context.font = "800 84px Arial, sans-serif";
  const width = Math.ceil(context.measureText(text).width + 80);
  canvas.width = Math.max(240, width);
  canvas.height = 150;
  const draw = canvas.getContext("2d");
  if (!draw) throw new Error("Canvas rendering is not supported in this browser.");
  draw.font = "800 84px Arial, sans-serif";
  draw.fillStyle = "#14294a";
  draw.textAlign = "center";
  draw.textBaseline = "middle";
  draw.fillText(text, canvas.width / 2, canvas.height / 2);
  return canvasBlob(canvas, "image/png");
}

function watermarkCoordinates(position: ProcessingOptions["watermarkPosition"], pageWidth: number, pageHeight: number, width: number, height: number) {
  const margin = 28;
  const positions = {
    center: { x: (pageWidth - width) / 2, y: (pageHeight - height) / 2 },
    "top-left": { x: margin, y: pageHeight - height - margin },
    "top-right": { x: pageWidth - width - margin, y: pageHeight - height - margin },
    "bottom-left": { x: margin, y: margin },
    "bottom-right": { x: pageWidth - width - margin, y: margin }
  };
  return positions[position];
}

async function watermarkPdf(file: File, options: ProcessingOptions): Promise<ProcessResult> {
  const { PDFDocument } = await import("pdf-lib");
  const pdf = await PDFDocument.load(await readBytes(file));
  let watermarkBytes: ArrayBuffer;
  if (options.watermarkType === "image") {
    if (!options.watermarkImage) throw new Error("Choose a PNG or JPG watermark image.");
    watermarkBytes = await options.watermarkImage.arrayBuffer();
  } else {
    if (!options.watermarkText.trim()) throw new Error("Enter watermark text.");
    watermarkBytes = await (await textWatermark(options.watermarkText.trim())).arrayBuffer();
  }
  const image = options.watermarkType === "image" && options.watermarkImage?.type === "image/jpeg"
    ? await pdf.embedJpg(watermarkBytes)
    : await pdf.embedPng(watermarkBytes);
  const selected = options.selectedPages.trim()
    ? parsePageList(options.selectedPages, pdf.getPageCount())
    : pdf.getPageIndices();
  for (const index of selected) {
    const page = pdf.getPage(index);
    const size = page.getSize();
    const width = size.width * (options.watermarkSize / 100);
    const height = width * (image.height / image.width);
    const point = watermarkCoordinates(options.watermarkPosition, size.width, size.height, width, height);
    page.drawImage(image, { ...point, width, height, opacity: options.watermarkOpacity / 100 });
  }
  const bytes = await savePdf(pdf);
  return { blob: asBlob(bytes), fileName: downloadName(file, "watermarked"), itemCount: selected.length };
}

async function protectPdf(file: File, options: ProcessingOptions): Promise<ProcessResult> {
  const { PDF } = await import("@libpdf/core");
  const pdf = await PDF.load(await readBytes(file));
  pdf.setProtection({
    userPassword: options.password,
    algorithm: "AES-256",
    encryptMetadata: true,
    permissions: {
      print: options.allowPrint,
      printHighQuality: options.allowPrint,
      copy: options.allowCopy,
      modify: options.allowModify,
      annotate: options.allowModify,
      assemble: options.allowModify,
      fillForms: options.allowForms,
      accessibility: true
    }
  });
  const bytes = await pdf.save({ compressStreams: true });
  return { blob: asBlob(bytes), fileName: downloadName(file, "protected"), itemCount: pdf.getPages().length, note: "AES-256" };
}

async function organizePdf(file: File, options: ProcessingOptions): Promise<ProcessResult> {
  const { PDFDocument } = await import("pdf-lib");
  const source = await PDFDocument.load(await readBytes(file));
  const sequence = parsePageSequence(options.pageOrder, source.getPageCount());
  if (!sequence.length) throw new Error("Enter at least one page in the final order.");
  const output = await PDFDocument.create();
  const pages = await output.copyPages(source, sequence);
  pages.forEach((page) => output.addPage(page));
  const bytes = await savePdf(output);
  return { blob: asBlob(bytes), fileName: downloadName(file, "organized"), itemCount: sequence.length, note: `${source.getPageCount() - new Set(sequence).size} page(s) removed` };
}

async function addPageNumbers(file: File, options: ProcessingOptions): Promise<ProcessResult> {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const pdf = await PDFDocument.load(await readBytes(file));
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const size = 10;
  pdf.getPages().forEach((page, index) => {
    const label = String(options.pageNumberStart + index);
    const bounds = page.getSize();
    const width = font.widthOfTextAtSize(label, size);
    const horizontal = options.pageNumberPosition.endsWith("left") ? 24 : options.pageNumberPosition.endsWith("right") ? bounds.width - width - 24 : (bounds.width - width) / 2;
    const vertical = options.pageNumberPosition.startsWith("top") ? bounds.height - 25 : 18;
    page.drawText(label, { x: horizontal, y: vertical, size, font, color: rgb(0.15, 0.2, 0.3) });
  });
  const bytes = await savePdf(pdf);
  return { blob: asBlob(bytes), fileName: downloadName(file, "numbered"), itemCount: pdf.getPageCount(), note: `Starts at ${options.pageNumberStart}` };
}

async function removePdfMetadata(file: File): Promise<ProcessResult> {
  const { PDFDocument } = await import("pdf-lib");
  const pdf = await PDFDocument.load(await readBytes(file), { updateMetadata: false });
  pdf.setTitle("");
  pdf.setAuthor("");
  pdf.setSubject("");
  pdf.setKeywords([]);
  pdf.setCreator("");
  pdf.setProducer("");
  const bytes = await pdf.save({ useObjectStreams: true, addDefaultPage: false });
  return { blob: asBlob(bytes), fileName: downloadName(file, "metadata-removed"), itemCount: pdf.getPageCount(), note: "Document metadata cleared" };
}

export async function processFiles(tool: ToolSlug, files: File[], options: ProcessingOptions): Promise<ProcessResult> {
  if (!files.length) throw new Error("Choose at least one file.");
  if (files.some((file) => file.size > 100 * 1024 * 1024)) throw new Error("Each file must be smaller than 100 MB.");

  switch (tool) {
    case "merge-pdf":
      if (files.length < 2) throw new Error("Choose at least two PDF files to merge.");
      return mergePdfs(files);
    case "split-pdf": return splitPdf(files[0], options);
    case "compress-pdf": return compressPdf(files[0], options);
    case "images-to-pdf": return imagesToPdf(files, options);
    case "pdf-to-images": return pdfToImages(files[0], options);
    case "rotate-pdf": return rotatePdf(files[0], options);
    case "watermark-pdf": return watermarkPdf(files[0], options);
    case "protect-pdf": return protectPdf(files[0], options);
    case "organize-pdf": return organizePdf(files[0], options);
    case "add-page-numbers": return addPageNumbers(files[0], options);
    case "remove-pdf-metadata": return removePdfMetadata(files[0]);
  }
}
