import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { presets } from "../scripts/generate-seo-pages.mjs";

const projectDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(projectDir, "public");

test("all SEO presets have Thai and English static pages", () => {
  assert.equal(presets.length, 12);
  for (const preset of presets) {
    for (const language of ["th", "en"]) {
      const path = join(publicDir, preset.slug, ...(language === "en" ? ["en"] : []), "index.html");
      assert.equal(existsSync(path), true, path);
      const html = readFileSync(path, "utf8");
      const canonical = `https://www.djai.academy/tools/resizeimg/${preset.slug}/${language === "en" ? "en/" : ""}`;
      assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}">`));
      assert.match(html, /hreflang="th"/);
      assert.match(html, /hreflang="en"/);
      assert.match(html, /hreflang="x-default"/);
      assert.match(html, new RegExp(`data-preset="${preset.slug}"`));
      assert.match(html, /"@type":"HowTo"/);
      assert.match(html, /"@type":"BreadcrumbList"/);
      assert.match(html, /"@type":"FAQPage"/);
    }
  }
});

test("processing libraries are bundled locally", () => {
  const heic = join(publicDir, "vendor", "heic2any.min.js");
  const zip = join(publicDir, "vendor", "jszip.min.js");
  assert.equal(existsSync(heic), true);
  assert.equal(existsSync(zip), true);
  assert.ok(readFileSync(heic).byteLength > 1_000_000);
  assert.ok(readFileSync(zip).byteLength > 50_000);
});

test("public image-tool code has no donor canonical or runtime CDN", () => {
  const files = ["app.js", "index.html", "en/index.html"];
  for (const file of files) {
    const content = readFileSync(join(publicDir, file), "utf8");
    assert.doesNotMatch(content, /chatgpt\.site|eri-rehcm|cdn\.jsdelivr/i);
  }
});

test("display assets are optimized and analytics are disabled by default", () => {
  for (const asset of ["assets/djai-academy-logo.webp", "assets/siamese-cat-dev-transparent.webp"]) {
    assert.equal(existsSync(join(publicDir, asset)), true, asset);
  }
  for (const file of ["index.html", "en/index.html"]) {
    const html = readFileSync(join(publicDir, file), "utf8");
    assert.doesNotMatch(html, /googletagmanager|G-CGJ5BTR44T/);
    assert.match(html, /djai-academy-logo\.webp/);
  }
});

test("base pages expose complete batch and comparison controls", () => {
  for (const file of ["index.html", "en/index.html"]) {
    const html = readFileSync(join(publicDir, file), "utf8");
    for (const id of ["batch-list", "preset-select", "quality-input", "compare-view", "batch-results"]) {
      assert.match(html, new RegExp(`id="${id}"`));
    }
    assert.match(html, /multiple hidden/);
    assert.match(html, /image\/heic/);
  }
});
