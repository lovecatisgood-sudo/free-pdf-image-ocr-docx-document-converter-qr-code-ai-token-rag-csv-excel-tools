# Security Policy

## Supported versions

Security fixes are applied to the latest code on the default branch. Older commits, forks, and third-party deployments are not maintained by DJAI Academy.

## Reporting a vulnerability

Please do not open a public issue for an unpatched vulnerability.

Preferred method:

1. Open the repository's **Security** tab on GitHub.
2. Select **Report a vulnerability** to create a private security advisory.
3. Include affected tools, reproduction steps, impact, browser/OS information, and a minimal non-sensitive test file if needed.

If private vulnerability reporting is unavailable, email `contact@djai.academy` with the subject `PDF Image OCR Tools security report`.

Do not send real confidential documents, credentials, private keys, or personal data. Use a synthetic reproduction.

We will aim to acknowledge a valid report within seven days. Response and remediation time depend on severity and maintainer availability.

## Security model

- File-processing tools are designed to run in browser memory.
- The repository does not provide a file-upload backend for the conversion tools.
- Deployers control hosting headers, analytics, third-party scripts, domains, and any changes to this model.
- Browser libraries and generated outputs must be treated as untrusted input surfaces.
- PDF, document, image, archive, OCR, and spreadsheet parsers should be kept updated and tested against resource-exhaustion cases.

This policy does not create a warranty or service-level agreement.
