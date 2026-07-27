# Customizing a Fork

The checked-in applications are configured for the DJAI production URL structure. Fork maintainers should review the following before deployment.

## Base paths

- QR: `DJayTools-Free-QR-Generator-Source/next.config.ts`
- PDF: `djai-pdf-tools/next.config.mjs`
- Document/AI/Spreadsheet: `djai-document-tools/next.config.ts`
- Image: HTML paths and `djai-image-resizer/server.js`

## Public URLs and canonical metadata

Search for these strings and replace them where appropriate:

```bash
rg "www\.djai\.academy|djai\.academy|siamesecat\.cafe" .
```

Canonical URLs, structured data, navigation, and ecosystem links intentionally point to the official DJAI deployment. Forks should use their own canonical URLs to avoid duplicate SEO signals.

## Branding

Brand assets are stored under each application's `public` directory. You may replace the logos and associated text for an independent fork. Retain the MIT notice in distributed copies or substantial portions even if visible branding is replaced.

## Analytics

Next.js applications only load Google Analytics when `NEXT_PUBLIC_GA_ID` is set at build time. The static image application includes no analytics by default.

## Privacy claims

The included tools process files locally. If you add uploads, remote APIs, telemetry, advertising, or analytics, revise the privacy statements before deployment.

## Repository URL

Documentation assumes the intended repository name `lovecatisgood-sudo/free-pdf-image-ocr-docx-document-converter-qr-code-ai-token-rag-csv-excel-tools`. If you choose another name, update repository links in package manifests, community files, and `CITATION.cff`.
