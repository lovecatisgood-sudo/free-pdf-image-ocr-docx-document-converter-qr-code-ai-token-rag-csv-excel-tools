import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = new URL("..", import.meta.url).pathname;
const groups = {
  document: ["docx-to-pdf", "docx-to-html", "docx-to-markdown", "docx-to-text", "pdf-to-text", "pdf-to-word", "ocr"],
  ai: ["token-counter", "pdf-to-ai-markdown", "context-optimizer", "rag-chunk-calculator", "prompt-packager"],
  spreadsheet: ["csv-to-json", "json-to-csv", "csv-cleaner", "merge-csv", "split-csv", "csv-to-xlsx", "xlsx-to-csv"]
};

test("every tool exports Thai and English SEO pages", () => {
  for (const [category, tools] of Object.entries(groups)) {
    for (const slug of tools) {
      for (const languagePath of [[], ["en"]]) {
        const file = join(root, "out", category, slug, ...languagePath, "index.html");
        assert.equal(existsSync(file), true, `missing ${file}`);
        const html = readFileSync(file, "utf8");
        assert.match(html, /rel="canonical"/);
        assert.match(html, /hreflang="th"/i);
        assert.match(html, /hreflang="en"/i);
        assert.match(html, /application\/ld\+json/);
        assert.doesNotMatch(html, /noindex/i);
        assert.match(html, languagePath.length ? /<html lang="en">/ : /<html lang="th">/);
      }
    }
  }
});

test("category hubs and local processing assets exist", () => {
  for (const category of Object.keys(groups)) {
    assert.equal(existsSync(join(root, "out", category, "index.html")), true);
    assert.equal(existsSync(join(root, "out", category, "en", "index.html")), true);
  }
  for (const asset of [
    "out/document/pdf.worker.min.mjs",
    "out/document/ocr-runtime/worker.min.js",
    "out/document/ocr-data/eng.traineddata.gz",
    "out/document/ocr-data/tha.traineddata.gz",
    "out/djai-assets/djai-academy-logo.webp",
    "out/djai-assets/djai-academy-logo-display.webp",
    "out/djai-assets/djai-academy-logo-small.webp",
    "out/djai-assets/siamese-cat-dev-logo.webp"
  ]) assert.equal(existsSync(join(root, asset)), true, `missing ${asset}`);
});

test("privacy copy does not make server-processing claims", () => {
  const source = readFileSync(join(root, "app", "tool-data.ts"), "utf8");
  assert.doesNotMatch(source, /pixel-perfect/i);
  assert.doesNotMatch(source, /temporarily uploaded/i);
  assert.match(source, /Complex layouts/);
  assert.match(source, /text-focused converter/);
});
