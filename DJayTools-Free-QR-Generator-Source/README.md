# DJayTools QR Generator

A bilingual static QR generator built with Next.js and `qr-code-styling`.

## Features

- Static URL QR codes with no expiry service.
- Three dot patterns, two corner styles, eight colors, and preview frames.
- Live browser preview.
- PNG and SVG download.
- Thai and English routes.
- No account, upload backend, or analytics by default.

## Development

```bash
npm ci
npm run dev
```

## Build and test

```bash
npm run build
npm test
```

The static export is written to `out/` for the `/tools/qrgen/` base path.

Licensed under the repository's [MIT License](../LICENSE). Visible credit to [DJAI Academy / Siamese Cat Dev](https://www.djai.academy/siamese_cat/dev/en/) is appreciated but optional.
