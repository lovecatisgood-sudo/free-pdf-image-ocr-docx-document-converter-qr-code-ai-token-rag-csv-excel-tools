# DJAI Image Resizer

A static browser application with a small Node.js development server for converting, resizing, compressing, and batch-processing images.

## Features

- Compress toward a target KB size
- Resize by percentage while preserving aspect ratio
- Resize using exact pixel dimensions
- JPG, PNG, and WebP output
- JPG, PNG, WebP, HEIC, and HEIF input
- Batch input, per-image rotation, and ZIP download
- Before/after comparison and transparency preview
- Metadata-removal workflow through fresh Canvas encoding
- Browser-only image processing: files are never uploaded
- Responsive DJAI Academy / DJTool design
- Siamese Cat Dev transparent branding asset

## Run locally

```bash
npm start
```

Open `http://localhost:3000/tools/resizeimg/` for Thai or `http://localhost:3000/tools/resizeimg/en/` for English.

For live reload while editing server-side files:

```bash
npm run dev
```

## Deploy

This project runs on Node.js 18 or newer. Build-time dependencies bundle HEIC decoding and ZIP support locally. It can be deployed to any Node host or static-file platform. Set the `PORT` environment variable when required by the Node host.

The production target paths are `/tools/resizeimg/` for Thai and `/tools/resizeimg/en/` for English.

## Privacy

All image processing is performed in the user's browser with Canvas and Blob APIs. The Node server only serves static files.

## License

Licensed under the repository's [MIT License](../LICENSE). Visible credit to [DJAI Academy / Siamese Cat Dev](https://www.djai.academy/siamese_cat/dev/en/) is appreciated but optional.
