"use client";

import { Check, Clipboard, Download, FileText, Gauge, LoaderCircle, LockKeyhole, RotateCcw, Upload } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { countAiTokens, countTextMetrics, type TextMetrics, type TokenEncoding } from "./text-metrics";
import type { Language, ToolDefinition } from "./tool-data";

const emptyMetrics = countTextMetrics("");
const formatNumber = (value: number, language: Language) => new Intl.NumberFormat(language === "th" ? "th-TH" : "en-US").format(value);

export default function TokenCounterWorkspace({ tool, language }: { tool: ToolDefinition; language: Language }) {
  const en = language === "en";
  const [text, setText] = useState("");
  const [metrics, setMetrics] = useState<TextMetrics>(emptyMetrics);
  const [tokens, setTokens] = useState(0);
  const [encoding, setEncoding] = useState<TokenEncoding>("o200k_base");
  const [contextWindow, setContextWindow] = useState(128000);
  const [pricePerMillion, setPricePerMillion] = useState(0);
  const [settledCount, setSettledCount] = useState<{ text: string; encoding: TokenEncoding }>({ text: "", encoding: "o200k_base" });
  const [importing, setImporting] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [importedNames, setImportedNames] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const requestRef = useRef(0);

  useEffect(() => {
    const request = ++requestRef.current;
    const timeout = window.setTimeout(async () => {
      const nextMetrics = countTextMetrics(text);
      try {
        const nextTokens = await countAiTokens(text, encoding);
        if (request !== requestRef.current) return;
        setMetrics(nextMetrics);
        setTokens(nextTokens);
        setSettledCount({ text, encoding });
        setError("");
      } catch {
        if (request !== requestRef.current) return;
        setMetrics(nextMetrics);
        setTokens(0);
        setSettledCount({ text, encoding });
        setError(en ? "Token counting is unavailable in this browser." : "Browser นี้ไม่สามารถนับ token ได้");
      }
    }, 180);
    return () => window.clearTimeout(timeout);
  }, [encoding, en, text]);

  const counting = Boolean(text) && (settledCount.text !== text || settledCount.encoding !== encoding);
  const contextPercent = contextWindow ? Math.min(100, (tokens / contextWindow) * 100) : 0;
  const remaining = Math.max(0, contextWindow - tokens);
  const estimatedCost = (tokens / 1_000_000) * Math.max(0, pricePerMillion);
  const report = useMemo(() => [
    "DJTools Token Counter",
    `Encoding: ${encoding}`,
    `Tokens: ${tokens}`,
    `Words: ${metrics.words}`,
    `Characters: ${metrics.characters}`,
    `Characters without spaces: ${metrics.charactersWithoutSpaces}`,
    `Sentences: ${metrics.sentences}`,
    `Paragraphs: ${metrics.paragraphs}`,
    `Lines: ${metrics.lines}`,
    `UTF-8 bytes: ${metrics.bytes}`,
    `Context used: ${contextPercent.toFixed(2)}% of ${contextWindow}`,
    `Context remaining: ${remaining}`,
    pricePerMillion > 0 ? `Estimated input cost: $${estimatedCost.toFixed(6)}` : ""
  ].filter(Boolean).join("\n"), [contextPercent, contextWindow, encoding, estimatedCost, metrics, pricePerMillion, remaining, tokens]);

  async function importFiles(files: FileList | File[]) {
    const selected = Array.from(files).slice(0, 10);
    if (!selected.length) return;
    setImporting(true);
    setError("");
    try {
      const { extractTextForAnalysis } = await import("./processors");
      const extracted = await extractTextForAnalysis(selected);
      const importedText = extracted.map((item) => `--- ${item.name} ---\n${item.text}`).join("\n\n");
      setText((current) => [current.trim(), importedText].filter(Boolean).join("\n\n"));
      setImportedNames((current) => [...current, ...extracted.map((item) => item.name)].slice(-10));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : (en ? "The document could not be read." : "ไม่สามารถอ่านเอกสารได้"));
    } finally {
      setImporting(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function pasteText() {
    try {
      const pasted = await navigator.clipboard.readText();
      setText((current) => current ? `${current}\n${pasted}` : pasted);
    } catch {
      setError(en ? "Clipboard access was blocked. Paste into the text box instead." : "Browser บล็อก clipboard กรุณาวางข้อความในช่องด้านล่าง");
    }
  }

  async function copyReport() {
    await navigator.clipboard.writeText(report);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function downloadReport() {
    const url = URL.createObjectURL(new Blob([report], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "DJTools-token-count.txt";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  function reset() {
    requestRef.current += 1;
    setText("");
    setMetrics(emptyMetrics);
    setTokens(0);
    setSettledCount({ text: "", encoding });
    setImportedNames([]);
    setError("");
  }

  const metricItems = [
    [en ? "Tokens" : "Token", tokens],
    [en ? "Words" : "คำ", metrics.words],
    [en ? "Characters" : "ตัวอักษร", metrics.characters],
    [en ? "No spaces" : "ไม่รวมช่องว่าง", metrics.charactersWithoutSpaces],
    [en ? "Sentences" : "ประโยค", metrics.sentences],
    [en ? "Paragraphs" : "ย่อหน้า", metrics.paragraphs],
    [en ? "Lines" : "บรรทัด", metrics.lines],
    ["UTF-8 bytes", metrics.bytes]
  ] as const;

  return <section className="workspace token-workspace" id="workspace">
    <div className="workspace-title"><span><Gauge /></span><div><p className="eyebrow">{en ? "LIVE · PRIVATE" : "LIVE · PRIVATE"}</p><h2>{tool.label[language]}</h2><p>{tool.intent[language]}</p></div></div>
    <div className="token-shell">
      <div className="token-editor">
        <div className="token-editor-heading"><label htmlFor="token-input">{en ? "Text to analyze" : "ข้อความที่ต้องการวิเคราะห์"}</label><button type="button" onClick={pasteText}><Clipboard />{en ? "Paste" : "วางข้อความ"}</button></div>
        <textarea id="token-input" value={text} onChange={(event) => setText(event.target.value)} placeholder={en ? "Paste a prompt, specification, code, or multilingual text..." : "วาง prompt, specification, code หรือข้อความหลายภาษา..."} spellCheck="false" />
        <button className={`token-import ${dragging ? "dragging" : ""}`} type="button" onClick={() => inputRef.current?.click()} onDragEnter={(event) => { event.preventDefault(); setDragging(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); importFiles(event.dataTransfer.files); }}>
          {importing ? <LoaderCircle className="spin" /> : <Upload />}<span><strong>{importing ? (en ? "Reading locally..." : "กำลังอ่านในเครื่อง...") : (en ? "Import a document" : "นำเข้าเอกสาร")}</strong><small>DOCX, PDF, TXT, Markdown, CSV, JSON, code · {en ? "up to 10 files" : "สูงสุด 10 ไฟล์"}</small></span>
        </button>
        <input ref={inputRef} className="visually-hidden" type="file" multiple accept=".docx,.pdf,.txt,.md,.csv,.json,.js,.ts,.tsx,.jsx,.py,.html,.css,.xml,.yaml,.yml,text/*,application/pdf" onChange={(event) => event.target.files && importFiles(event.target.files)} />
        {importedNames.length > 0 && <div className="token-imported"><FileText />{importedNames.join(" · ")}</div>}
      </div>
      <aside className="token-options">
        <div className="option-heading"><strong>{en ? "Counter settings" : "ตั้งค่าการนับ"}</strong><LockKeyhole /></div>
        <div className="option-grid">
          <label>{en ? "Tokenizer encoding" : "Tokenizer encoding"}<select value={encoding} onChange={(event) => setEncoding(event.target.value as TokenEncoding)}><option value="o200k_base">o200k_base ({en ? "modern" : "รุ่นใหม่"})</option><option value="cl100k_base">cl100k_base</option><option value="p50k_base">p50k_base ({en ? "legacy" : "รุ่นเก่า"})</option></select></label>
          <label>{en ? "Context window" : "ขนาด context window"}<select value={contextWindow} onChange={(event) => setContextWindow(Number(event.target.value))}><option value="8000">8K</option><option value="32000">32K</option><option value="128000">128K</option><option value="200000">200K</option><option value="1000000">1M</option></select></label>
          <label>{en ? "Input price per 1M tokens (optional)" : "ราคา input ต่อ 1M token (ไม่บังคับ)"}<input type="number" min="0" step="0.01" value={pricePerMillion || ""} placeholder="0.00" onChange={(event) => setPricePerMillion(Math.max(0, Number(event.target.value)))} /></label>
        </div>
        <p className="token-privacy"><LockKeyhole />{en ? "Text and files stay in this browser. Nothing is uploaded." : "ข้อความและไฟล์อยู่ใน browser นี้ ไม่มีการ upload"}</p>
        {error && <p className="tool-error" role="alert">{error}</p>}
        <button className="reset-button" type="button" onClick={reset}><RotateCcw />{en ? "Clear counter" : "ล้างข้อมูล"}</button>
      </aside>
      <div className="token-results" aria-live="polite" aria-busy={counting}>
        <div className="token-results-heading"><div><p className="eyebrow">{counting ? (en ? "COUNTING" : "กำลังนับ") : (en ? "LIVE RESULTS" : "ผลลัพธ์ LIVE")}</p><h3>{formatNumber(tokens, language)} <span>tokens</span></h3></div>{counting && <LoaderCircle className="spin" />}</div>
        <div className="token-metrics">{metricItems.map(([label, value]) => <div key={label}><span>{label}</span><strong>{formatNumber(value, language)}</strong></div>)}</div>
        <div className="context-meter"><div><span>{en ? "Context used" : "ใช้ context แล้ว"}</span><strong>{contextPercent.toFixed(2)}%</strong></div><progress max="100" value={contextPercent} /><small>{formatNumber(remaining, language)} {en ? "tokens remaining" : "token คงเหลือ"} · {metrics.readingMinutes ? `~${metrics.readingMinutes} ${en ? "min read" : "นาทีในการอ่าน"}` : (en ? "No text yet" : "ยังไม่มีข้อความ")}</small></div>
        {pricePerMillion > 0 && <p className="token-cost">{en ? "Estimated input cost" : "ค่า input โดยประมาณ"}: <strong>${estimatedCost.toFixed(6)}</strong></p>}
        <div className="token-actions"><button type="button" disabled={!text} onClick={copyReport}>{copied ? <Check /> : <Clipboard />}{copied ? (en ? "Copied" : "คัดลอกแล้ว") : (en ? "Copy statistics" : "คัดลอกสถิติ")}</button><button type="button" disabled={!text} onClick={downloadReport}><Download />{en ? "Download report" : "ดาวน์โหลด report"}</button></div>
      </div>
    </div>
  </section>;
}
