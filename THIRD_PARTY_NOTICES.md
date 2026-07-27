# Third-Party Software Notices

The PDF, Image, OCR & Document Converter Tools depend on third-party packages. Those packages remain subject to their own copyright notices and licenses. The repository's MIT License does not replace third-party terms.

Exact resolved versions and transitive dependencies are recorded in each `package-lock.json`. Before redistributing bundled output, review the dependency trees and include any notices required by the selected dependency licenses.

## Direct runtime dependencies

| Package | Used by | Declared license |
| --- | --- | --- |
| Next.js, React, React DOM | QR, PDF, document tools | MIT |
| qr-code-styling | QR Generator | MIT |
| heic2any | Image Tools | MIT |
| JSZip | Image, PDF, document tools | MIT or GPL-3.0-or-later; this project uses it under MIT |
| @libpdf/core | PDF Tools | MIT |
| Lucide React | PDF and document tools | ISC |
| pdf-lib | PDF Tools | MIT |
| PDF.js / pdfjs-dist | PDF and document tools | Apache-2.0 |
| Tesseract.js and language data | Document OCR | Apache-2.0 / MIT |
| docx | Document Tools | MIT |
| docx-preview | Document Tools | Apache-2.0 |
| DOMPurify | Document Tools | MPL-2.0 or Apache-2.0 |
| ExcelJS | Spreadsheet Tools | MIT |
| gpt-tokenizer | AI Tools | MIT |
| html2canvas | Document Tools | MIT |
| jsPDF | Document Tools | MIT |
| Mammoth | Document Tools | BSD-2-Clause |
| Papa Parse | Spreadsheet Tools | MIT |
| Turndown | Document Tools | MIT |

Development dependencies include MIT, ISC, BSD-family, Apache-2.0, MPL-2.0, CC-family, and other licenses through their transitive dependency graphs. Consult the relevant lockfile and installed package license file for authoritative terms.

This notice is informational and is not legal advice.
