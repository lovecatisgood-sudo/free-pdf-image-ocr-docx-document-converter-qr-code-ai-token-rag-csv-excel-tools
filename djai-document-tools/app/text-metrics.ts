export type TokenEncoding = "o200k_base" | "cl100k_base" | "p50k_base";

export type TextMetrics = {
  words: number;
  characters: number;
  charactersWithoutSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  bytes: number;
  readingMinutes: number;
};

function segments(text: string, granularity: "grapheme" | "word" | "sentence") {
  return [...new Intl.Segmenter(undefined, { granularity }).segment(text)];
}

export function countTextMetrics(text: string): TextMetrics {
  if (!text) return { words: 0, characters: 0, charactersWithoutSpaces: 0, sentences: 0, paragraphs: 0, lines: 0, bytes: 0, readingMinutes: 0 };

  const graphemes = segments(text, "grapheme");
  const words = segments(text, "word").filter((segment) => segment.isWordLike).length;
  const sentences = segments(text, "sentence").filter((segment) => segment.segment.trim()).length;
  const paragraphs = text.trim().split(/\n\s*\n/u).filter((paragraph) => paragraph.trim()).length;

  return {
    words,
    characters: graphemes.length,
    charactersWithoutSpaces: graphemes.filter((segment) => !/^\s+$/u.test(segment.segment)).length,
    sentences,
    paragraphs,
    lines: text.split(/\r\n|\r|\n/u).length,
    bytes: new TextEncoder().encode(text).length,
    readingMinutes: words ? Math.max(1, Math.ceil(words / 200)) : 0
  };
}

export async function countAiTokens(text: string, encoding: TokenEncoding) {
  if (!text) return 0;
  if (encoding === "cl100k_base") {
    const { countTokens } = await import("gpt-tokenizer/encoding/cl100k_base");
    return countTokens(text);
  }
  if (encoding === "p50k_base") {
    const { countTokens } = await import("gpt-tokenizer/encoding/p50k_base");
    return countTokens(text);
  }
  const { countTokens } = await import("gpt-tokenizer/encoding/o200k_base");
  return countTokens(text);
}
