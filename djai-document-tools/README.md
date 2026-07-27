# DJAI Document, AI, and Spreadsheet Tools

This Next.js static application contains seven document tools, five AI/context tools, and seven spreadsheet/data tools. File processing runs locally in the browser.

## Development

```bash
npm ci
npm run dev
```

## Build and test

```bash
npm run build
npm run lint
npm test
```

The build copies the pinned PDF.js worker, Tesseract worker/runtime, English and Thai OCR data, and shared project assets into the static export.

Routes are generated under `/tools/document/`, `/tools/ai/`, and `/tools/spreadsheet/` with Thai and English variants.

Licensed under the repository's [MIT License](../LICENSE). Visible credit to [DJAI Academy / Siamese Cat Dev](https://www.djai.academy/siamese_cat/dev/en/) is appreciated but optional.
