# DJTools PDF Tools

Bilingual, privacy-first PDF tools for DJAI Academy. Thai is served at
`/tools/PDFTools/` and English at `/tools/PDFTools/en/`.

All PDF processing happens in the browser. The app exports static files for the
`/tools/PDFTools/` base path.

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

The build copies the pinned PDF.js worker locally and writes the application to
`out/`.

## License

Licensed under the repository's [MIT License](../LICENSE). Visible credit to [DJAI Academy / Siamese Cat Dev](https://www.djai.academy/siamese_cat/dev/en/) is appreciated but optional.
