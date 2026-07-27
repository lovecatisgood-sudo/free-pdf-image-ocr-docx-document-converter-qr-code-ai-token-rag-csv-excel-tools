# PDF, Image, OCR & Document Converter Tools — Complete Feature Inventory

[README](README.md) · [ภาษาไทย](FEATURES.th.md) · [Live demos](LIVE_DEMOS.md)

This document inventories the tool features implemented in the repository. The codebase contains 32 main user-facing tools or workspaces:

- 1 QR-code tool
- 1 consolidated image-processing workspace
- 11 PDF tools
- 7 document-conversion tools
- 5 AI/context tools
- 7 spreadsheet/data tools

The image workspace also generates 12 task-specific entry pages. These pages use the same processing engine rather than separate implementations.

## 1. QR Code Generator

Routes:

- Thai: `/tools/qrgen/`
- English: `/tools/qrgen/en/`

Features:

- Converts a web address into a static QR code.
- Automatically adds `https://` when a domain is entered without a protocol.
- Validates HTTP and HTTPS destinations.
- Displays errors for invalid URLs.
- Updates the QR preview immediately when options change.
- Uses QR error-correction level `Q`.
- Provides square, rounded, and dot QR patterns.
- Provides square and extra-rounded corner styles.
- Provides eight preset QR colors.
- Provides no-frame, simple-frame, and `SCAN ME` preview-frame styles.
- Downloads PNG or SVG output.
- Requires no registration and adds no watermark.
- Generates static codes that do not expire.
- Processes destination data locally in the browser.
- Provides Thai and English interfaces.

Implementation note: the selected frame wraps the browser preview, while the current download function downloads the underlying QR object. The frame may therefore not be included in the downloaded file. SVG output is scalable; the configured raster QR size is 280 x 280 pixels.

## 2. Image Converter, Resizer, and Compressor

Routes:

- Thai: `/tools/resizeimg/`
- English: `/tools/resizeimg/en/`

### Supported input formats

- JPG and JPEG
- PNG
- WebP
- HEIC
- HEIF

HEIC and HEIF images are decoded locally with the included browser HEIC decoder.

### Supported output formats

- Keep the original browser-supported format
- JPG
- PNG
- WebP

### File handling

- Click-to-select and drag-and-drop input.
- Batch processing for up to 20 images.
- Maximum 50 MB per image and 200 MB per batch.
- Displays filename, original size, dimensions, queue position, and rotation.
- Allows individual batch-item selection, removal, and rotation.
- Rotates each image independently in 90-degree steps.
- Reads image orientation during decoding.

### Target-file-size compression

- Accepts targets from 5 KB to 50,000 KB.
- Includes 50 KB, 100 KB, 200 KB, and 500 KB presets.
- Searches for the best JPG or WebP quality that fits the target.
- Can reduce dimensions when quality reduction is insufficient.
- Can preserve original dimensions when requested.
- Attempts to produce a result at or slightly below the target size.
- Reports before and after file sizes.

Target sizes are approximate because compressibility differs by image.

### Percentage resizing

- Supports resizing from 5% to 200%.
- Calculates result dimensions live.
- Includes 25%, 50%, 75%, and 100% presets.
- Supports both enlargement and reduction.

### Exact-dimension resizing

- Accepts custom width and height in pixels.
- Locks aspect ratio by default.
- Automatically calculates height from width or width from height.
- Allows aspect-ratio unlocking.
- Supports dimensions up to 20,000 pixels.
- Limits the processing canvas to 100 million pixels.
- Includes these presets:
  - Instagram Square: 1080 x 1080
  - Instagram Portrait: 1080 x 1350
  - Instagram Story: 1080 x 1920
  - YouTube Thumbnail: 1280 x 720
  - Facebook Post: 1200 x 630

### Quality controls

- Quality slider from 45% to 100%.
- Quick settings at 65%, 82%, and 94%.
- Uses the selected quality as normal export quality or maximum quality in target-KB mode.
- Disables quality control for lossless PNG output.

### Transparency

- Detects transparency in PNG and WebP images.
- Preserves transparency in PNG and WebP output.
- Adds a white background when transparent images are converted to JPG.
- Provides a checkerboard transparency preview.

### Preview and download

- Original-image preview.
- Processed-result preview.
- Before/after comparison with a draggable slider.
- Shows result size, dimensions, and format.
- Shows total before and after sizes and percentage saved.
- Downloads one result directly.
- Provides individual batch download links.
- Downloads multiple results as ZIP.
- Sanitizes output filenames.

### Task-specific image entry pages

1. JPG to PNG
2. PNG to JPG
3. JPG to WebP
4. PNG to WebP
5. WebP to JPG
6. WebP to PNG
7. Compress image
8. Resize image
9. Image to 100 KB
10. Image to 500 KB
11. HEIC to JPG
12. Remove image metadata

## 3. PDF Tools

Routes:

- Thai: `/tools/PDFTools/[tool]/`
- English: `/tools/PDFTools/[tool]/en/`

Shared features:

- Browser-only processing.
- Maximum 100 MB per selected file.
- No registration or output watermark.
- Thai and English interfaces.
- Drag-and-drop and file selection.
- Local result download.
- Output item/page count and file-size reporting.
- Multiple-file support where appropriate.

### 3.1 Merge PDF

- Accepts two or more PDFs.
- Allows file reordering before processing.
- Copies every page in the selected file order.
- Produces one `DJTools-merged.pdf` file.
- Reports total page count.

### 3.2 Split PDF

- Extracts selected pages using syntax such as `1-3, 5, 8`.
- Creates page groups separated by semicolons, such as `1-3; 4-6; 8`.
- Splits a document every user-defined number of pages.
- Produces one PDF when there is one group.
- Packages multiple PDFs as ZIP.
- Validates ranges and rejects pages outside the document.
- Removes duplicate page selections inside a group.

### 3.3 Compress PDF

- Light mode re-saves and optimizes PDF structure without intentional quality loss.
- Recommended mode renders pages at approximately 1.35x scale and 76% JPEG quality.
- Strong mode renders pages at approximately 1x scale and 52% JPEG quality.
- Retains the smaller original or optimized source when recompression creates a larger file.

Recommended and Strong modes flatten pages into images. Searchable text, links, forms, annotations, and accessibility structure may be lost.

### 3.4 Images to PDF

- Accepts JPG, PNG, and WebP.
- Combines multiple images into one PDF in selected order.
- Places one image on each page.
- Supports automatic, A4, and Letter page sizes.
- Supports automatic, portrait, and landscape orientation.
- Centers and scales images without cropping.
- Adds margins for fixed page sizes.
- Produces `DJTools-images.pdf`.

### 3.5 PDF to Images

- Renders every PDF page as JPG or PNG.
- Supports Standard 1x, High 1.5x, and Very High 2x resolution.
- Uses approximately 90% quality for JPG.
- Downloads a single-page PDF as one image.
- Downloads multi-page results as ZIP.
- Includes page numbers in output filenames.

### 3.6 Rotate PDF

- Rotates pages clockwise by 90, 180, or 270 degrees.
- Rotates all pages or selected pages.
- Accepts ranges such as `1-3, 5`.
- Adds the selected rotation to any existing page rotation.
- Leaves unselected pages unchanged.

### 3.7 Watermark PDF

- Adds text or image/logo watermarks.
- Accepts PNG and JPG watermark images.
- Uses `CONFIDENTIAL` as the default text.
- Supports center and four-corner positions.
- Controls opacity from 5% to 100%.
- Controls width from 10% to 85% of page width.
- Applies to all pages or selected ranges.
- Preserves watermark-image aspect ratio.

### 3.8 Password Protect PDF

- Applies AES-256 encryption.
- Uses a password with an eight-character minimum in the interface.
- Encrypts metadata.
- Controls printing and high-quality printing.
- Controls copying, editing, annotation, and document assembly.
- Controls form filling.
- Keeps accessibility permission enabled.

DJAI cannot recover forgotten passwords.

### 3.9 Organize PDF

- Reorders pages using a final sequence such as `3, 1-2, 5`.
- Deletes pages omitted from the sequence.
- Allows repeated pages to create duplicates.
- Supports ranges inside the sequence.
- Reports removed-page count.
- Creates a new PDF without modifying the source.

### 3.10 Add PDF Page Numbers

- Numbers every page.
- Supports a custom starting number, including zero.
- Places numbers at the top or bottom, aligned left, center, or right.
- Uses embedded Helvetica.
- Calculates centering and right alignment from label width.

### 3.11 Remove PDF Metadata

- Explicitly clears title, author, subject, keywords, creator, and producer.
- Creates a new PDF without changing visible page content.

Implementation note: the interface also claims document dates are cleared, but the processing function does not explicitly clear creation and modification dates.

## 4. Document Tools

Routes:

- Thai: `/tools/document/[tool]/`
- English: `/tools/document/[tool]/en/`

Shared limits and features:

- Maximum 40 MB per file.
- Maximum 20 files for multi-file operations.
- Browser-only processing.
- Sanitized HTML output.
- Preview, copy, and download depending on the tool.

### 4.1 DOCX to PDF

- Converts DOCX content to PDF locally.
- Renders a browser preview before PDF creation.
- Supports A4, Letter, and Legal paper sizes.
- Supports narrow, normal, and wide margins.
- Supports optional page numbers.
- Produces compressed portrait PDF output.

Complex Word layouts, floating objects, equations, and custom fonts may differ from Microsoft Word.

### 4.2 DOCX to HTML

- Converts DOCX into semantic HTML.
- Maps Word Title and Subtitle styles to headings.
- Preserves common headings, paragraphs, lists, links, and tables.
- Sanitizes output with DOMPurify.
- Removes scripts, styles, iframes, embedded objects, forms, and inline event handlers.
- Provides rendered preview, copying, and HTML download.
- Reports conversion warnings.

### 4.3 DOCX to Markdown

- Converts DOCX through cleaned HTML into Markdown.
- Preserves headings, lists, links, and supported tables.
- Provides preview, clipboard copying, and `.md` download.
- Targets GitHub, Cursor, Codex, and AI documentation workflows.

### 4.4 DOCX to Text

- Extracts raw text and removes Word formatting.
- Trims the result.
- Reports word count and token estimate.
- Provides copying and TXT download.

### 4.5 PDF to Text

- Extracts selectable PDF text.
- Processes all pages or selected ranges.
- Optionally preserves source line breaks.
- Otherwise groups text using approximate vertical positions.
- Produces TXT.
- Reports pages, words, and estimated tokens.

Scanned PDFs without selectable text require OCR.

### 4.6 PDF to Word

- Extracts editable text from selected PDF pages.
- Supports page ranges and optional line-break preservation.
- Builds a new page-by-page DOCX.

This is text-focused and does not reconstruct the original PDF layout precisely.

### 4.7 Document OCR

- Accepts scanned PDFs, JPG, and PNG.
- Supports English and Thai OCR.
- Runs Tesseract.js locally.
- Includes local English and Thai language data.
- Processes PDF pages one at a time to reduce memory usage.
- Produces searchable/copyable TXT.
- Reports pages, words, and token estimate.

OCR uses the device CPU, and accuracy depends on source quality.

## 5. AI and Context Tools

Routes:

- Thai: `/tools/ai/[tool]/`
- English: `/tools/ai/[tool]/en/`

### 5.1 Multilingual Token Counter

- Accepts typed or pasted text.
- Reads from the clipboard.
- Supports drag-and-drop and file selection for up to 10 files.
- Imports DOCX, selectable-text PDF, TXT, Markdown, CSV, JSON, common code files, HTML, CSS, XML, and YAML.
- Supports `o200k_base`, `cl100k_base`, and `p50k_base` encodings.
- Counts tokens, multilingual words, grapheme-aware characters, non-space characters, sentences, paragraphs, lines, and UTF-8 bytes.
- Estimates reading time at 200 words per minute.
- Supports 8K, 32K, 128K, 200K, and 1M context windows.
- Calculates context percentage and tokens remaining.
- Accepts an optional input price per one million tokens.
- Calculates estimated input cost.
- Uses live debounced counting.
- Displays imported filenames.
- Copies or downloads a complete statistics report.
- Provides reset/clear controls.
- Keeps all text and files in the browser.

### 5.2 PDF to AI-Ready Markdown

- Extracts selected PDF pages.
- Supports page ranges and optional line-break preservation.
- Adds page references/headings.
- Cleans repeated page artifacts.
- Repairs hyphenated line breaks and broken sentence wraps.
- Removes excessive blank lines.
- Produces Markdown with page, word, and token statistics.
- Targets ChatGPT, Claude, Cursor, Codex, and RAG ingestion.

### 5.3 AI Context Optimizer

- Accepts pasted text or imported documents.
- Detects and removes repeated headers and footers.
- Removes common page-number lines.
- Collapses repeated spaces.
- Repairs hyphenated and wrapped lines.
- Removes excessive blank lines.
- Produces shorter AI-ready context.
- Reports before and after token statistics.
- Supports preview, copy, and download.

### 5.4 RAG Chunk Calculator

- Accepts document text.
- Supports chunk sizes from 100 to 8,000 tokens in 50-token increments.
- Supports overlap from zero to one token less than the chunk size in 25-token increments.
- Uses tokenizer-based chunk calculation.
- Shows chunk ID, token count, and text.
- Reports total tokens, chunks, and overlap.
- Exports newline-delimited JSON (`JSONL`).
- Targets knowledge bases and embedding pipelines.

### 5.5 Prompt Packager

- Accepts multiple files and pasted supporting text.
- Extracts content from supported documents.
- Combines requirements, documentation, code, and references.
- Labels sections with filenames.
- Supports Markdown-heading or XML-tag boundaries.
- Produces one Markdown prompt package.
- Reports file count, words, and token estimate.
- Supports preview, copying, and download.
- Targets Cursor, Codex, Claude Code, and ChatGPT.

## 6. Spreadsheet and Data Tools

Routes:

- Thai: `/tools/spreadsheet/[tool]/`
- English: `/tools/spreadsheet/[tool]/en/`

Processing uses Papa Parse, ExcelJS, and JSZip locally in the browser.

### 6.1 CSV to JSON

- Uses CSV headers as object property names.
- Converts each row into a JSON object.
- Produces a pretty-printed JSON array.
- Provides preview, copy, and `.json` download.
- Reports rows and columns.

### 6.2 JSON to CSV

- Accepts a JSON array suitable for tabular conversion.
- Uses object keys as CSV columns.
- Produces preview, copying, and CSV download.

### 6.3 CSV Cleaner

- Trims whitespace from values.
- Removes completely empty rows.
- Deduplicates matching rows.
- Preserves headers.
- Reports final rows and columns.
- Provides preview, copying, and CSV download.

### 6.4 Merge CSV Files

- Accepts multiple CSV files, up to the common 20-file limit.
- Matches columns by header name.
- Creates a combined header set.
- Handles files with columns in different orders.
- Produces one CSV.
- Reports files, rows, and columns.

### 6.5 Split CSV

- Splits CSV by a user-defined row count.
- Supports 10 to 100,000 rows per file.
- Preserves headers in each part.
- Numbers output parts.
- Packages results as ZIP.
- Reports source rows and generated file count.

### 6.6 CSV to XLSX

- Parses CSV headers and rows.
- Creates an Excel workbook and worksheet.
- Writes header and data rows.
- Produces downloadable `.xlsx` output.

### 6.7 XLSX to CSV

- Reads Excel workbooks locally.
- Allows worksheet selection by number.
- Falls back to the first worksheet when needed.
- Converts worksheet rows into downloadable CSV.

## 7. Shared User-Facing Tool Features

- Thai and English interfaces and metadata.
- Dedicated canonical URLs and `hreflang` links.
- Responsive mobile layouts.
- Browser-only file processing.
- No account requirement.
- No conversion-tool uploads to DJAI servers.
- No output watermark.
- Drag-and-drop where appropriate.
- Input and page-range validation.
- Local Blob-based downloads.
- Filename sanitization.
- Before/after statistics.
- Copy-to-clipboard actions.
- Reset/start-over actions.
- Dynamically loaded processing libraries.
- Static export for most tools.
- SoftwareApplication, FAQ, and HowTo structured data.
- Internal links between related tools.
- Privacy messaging throughout the interfaces.
