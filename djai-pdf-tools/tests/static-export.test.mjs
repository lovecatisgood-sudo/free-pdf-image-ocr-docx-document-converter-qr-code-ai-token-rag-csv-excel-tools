import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const projectDir = new URL("..", import.meta.url).pathname;
const outDir = join(projectDir, "out");
const tools = ["merge-pdf", "split-pdf", "compress-pdf", "images-to-pdf", "pdf-to-images", "rotate-pdf", "watermark-pdf", "protect-pdf", "organize-pdf", "add-page-numbers", "remove-pdf-metadata"];

const pages = [
  ["index.html", "th"],
  ["en/index.html", "en"],
  ...tools.flatMap((tool) => [[`${tool}/index.html`, "th"], [`${tool}/en/index.html`, "en"]])
];

test("all bilingual PDF tool pages are exported with metadata", () => {
  for (const [relativePath, language] of pages) {
    const path = join(outDir, relativePath);
    assert.ok(existsSync(path), `${relativePath} should exist`);
    const html = readFileSync(path, "utf8");
    assert.match(html, new RegExp(`<html lang="${language}"`));
    assert.match(html, /DJTools/);
    assert.match(html, /application\/ld\+json/);
    assert.doesNotMatch(html, /G-CGJ5BTR44T/);
    assert.match(html, /rel="canonical"/);
    assert.match(html, /hrefLang="th"/i);
    assert.match(html, /hrefLang="en"/i);
  }
});

test("browser PDF worker and brand assets are exported", () => {
  for (const asset of ["pdf.worker.min.mjs", "djai-academy-logo.webp", "djai-academy-logo-display.webp", "djai-academy-logo-small.webp", "siamese-cat-dev-logo.webp", "favicon.svg"]) {
    assert.ok(existsSync(join(outDir, asset)), `${asset} should exist`);
  }
});
