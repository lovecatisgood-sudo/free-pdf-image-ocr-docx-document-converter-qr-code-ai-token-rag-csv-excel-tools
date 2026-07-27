import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const basePath = "/tools/qrgen";

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

test("Hostinger static export uses the configured subpath", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  const englishHtml = await readFile(new URL("../out/en/index.html", import.meta.url), "utf8");

  assert.match(html, new RegExp(`${basePath}/_next/static`));
  assert.match(html, new RegExp(`${basePath}/djai-academy-logo\\.webp`));
  assert.match(html, new RegExp(`${basePath}/djai-academy-logo-display\\.webp`));
  assert.match(html, new RegExp(`${basePath}/siamese-cat-dev-logo\\.webp`));
  assert.doesNotMatch(html, /src="\/(?:djai-academy-logo|siamese-cat-dev-logo)/);
  assert.match(html, /<html lang="th">/);
  assert.match(englishHtml, /<html lang="en">/);
  assert.match(englishHtml, /Free QR Code Generator/);

  assert.equal(await exists(new URL("../out/djai-academy-logo.webp", import.meta.url)), true);
  assert.equal(await exists(new URL("../out/djai-academy-logo-display.webp", import.meta.url)), true);
  assert.equal(await exists(new URL("../out/siamese-cat-dev-logo.webp", import.meta.url)), true);
});
