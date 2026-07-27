# Contributing

Thank you for helping improve the PDF, Image, OCR & Document Converter Tools.

## Before starting

1. Search existing issues and pull requests.
2. Open an issue before a large architectural change.
3. Keep changes focused on one problem or feature.
4. Never submit secrets, private documents, customer data, or proprietary assets.

## Development setup

```bash
git clone https://github.com/lovecatisgood-sudo/free-pdf-image-ocr-docx-document-converter-qr-code-ai-token-rag-csv-excel-tools.git
cd free-pdf-image-ocr-docx-document-converter-qr-code-ai-token-rag-csv-excel-tools
npm run setup
```

Run an individual application using the commands in [README.md](README.md).

## Tests

Before opening a pull request, run:

```bash
npm run build
npm run lint
npm test
```

If a project has no lint command, the root runner skips linting for that project.

For tool changes, add or update tests that cover the changed processing behavior, export structure, validation, or language route.

## Pull requests

- Use a descriptive title.
- Explain the user problem and the chosen solution.
- List the commands you ran.
- Include screenshots for visible interface changes.
- Call out privacy, security, accessibility, compatibility, or file-format implications.
- Avoid unrelated formatting or dependency changes.

## Code style

- Follow the existing JavaScript, TypeScript, React, and CSS style in the package you edit.
- Prefer browser-local processing unless a feature clearly requires a service.
- Preserve Thai and English parity for user-facing changes.
- Keep file-size and memory limits explicit.
- Do not add runtime CDN dependencies when a package can be pinned and bundled locally.

## Licensing contributions

By submitting a contribution, you agree that your contribution may be distributed under this repository's MIT License. Do not contribute code or media that you do not have the right to license.

Dependencies and copied material must have compatible licenses and be documented in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) when appropriate.

## Conduct

Participation is governed by [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
