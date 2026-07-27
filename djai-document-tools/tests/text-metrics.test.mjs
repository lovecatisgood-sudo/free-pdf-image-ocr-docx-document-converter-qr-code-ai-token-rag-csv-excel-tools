import assert from "node:assert/strict";
import test from "node:test";
import { countAiTokens, countTextMetrics } from "../app/text-metrics.ts";

test("counts multilingual words with browser segmentation", () => {
  assert.equal(countTextMetrics("Hello world").words, 2);
  assert.equal(countTextMetrics("สวัสดีครับ โลก").words, 3);
  assert.equal(countTextMetrics("你好世界").words, 2);
  assert.equal(countTextMetrics("こんにちは世界").words, 2);
});

test("counts user-visible graphemes instead of UTF-16 units", () => {
  const metrics = countTextMetrics("👨‍💻");
  assert.equal(metrics.characters, 1);
  assert.equal(metrics.words, 0);
  assert.ok(metrics.bytes > metrics.characters);
});

test("counts layout and whitespace metrics", () => {
  const metrics = countTextMetrics("One line.\n\nSecond paragraph.");
  assert.equal(metrics.lines, 3);
  assert.equal(metrics.paragraphs, 2);
  assert.equal(metrics.sentences, 2);
  assert.ok(metrics.charactersWithoutSpaces < metrics.characters);
});

test("supports all published tokenizer encodings", async () => {
  for (const encoding of ["o200k_base", "cl100k_base", "p50k_base"]) {
    assert.ok(await countAiTokens("Hello, vibe coder!", encoding) > 0);
  }
});
