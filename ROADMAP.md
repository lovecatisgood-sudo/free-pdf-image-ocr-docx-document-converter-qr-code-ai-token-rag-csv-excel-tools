# PDF, Image, OCR & Document Converter Tools Roadmap

This roadmap communicates direction rather than a delivery promise. Community proposals are welcome through GitHub Issues and Discussions.

## Current priorities

- Improve automated tests with representative synthetic PDFs, documents, images, and spreadsheets.
- Preserve Thai and English parity for every user-facing change.
- Improve keyboard navigation, focus states, screen-reader labels, and color contrast.
- Document browser memory limits and graceful handling of unusually large files.
- Add screenshots and short demonstrations for each tool collection.
- Expand contributor documentation and beginner-friendly issues.

## Good first contributions

- Correct or improve Thai and English interface copy.
- Add tests for input validation and output filenames.
- Improve error messages without exposing private document content.
- Add accessibility labels and keyboard behavior.
- Reproduce browser-specific issues using synthetic files.
- Improve examples and tool documentation.

## Future ideas

- More privacy-first image and document conversions.
- Additional CSV validation and data-cleaning options.
- Better progress and cancellation controls for CPU-intensive processing.
- Optional installable Progressive Web App support.
- More precise compatibility documentation for mobile browsers.
- Reusable packages for common file validation, localization, and download behavior.

## Product principles

Proposals should preserve these defaults:

- process user files locally whenever practical;
- require no account for core utilities;
- add no output watermark;
- keep dependencies pinned and auditable;
- maintain Thai and English experiences together; and
- explain limitations honestly, especially for lossy conversion, OCR, and layout reconstruction.

Large architectural changes should begin with a discussion issue before implementation.
