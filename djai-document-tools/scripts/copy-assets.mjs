import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const workspace = join(root, "..");
const copies = [
  [join(workspace, "djai-pdf-tools/public/djai-academy-logo.webp"), join(root, "public/djai-assets/djai-academy-logo.webp")],
  [join(workspace, "djai-pdf-tools/public/djai-academy-logo-display.webp"), join(root, "public/djai-assets/djai-academy-logo-display.webp")],
  [join(workspace, "djai-pdf-tools/public/djai-academy-logo-small.webp"), join(root, "public/djai-assets/djai-academy-logo-small.webp")],
  [join(workspace, "djai-pdf-tools/public/siamese-cat-dev-logo.webp"), join(root, "public/djai-assets/siamese-cat-dev-logo.webp")],
  [join(root, "node_modules/pdfjs-dist/build/pdf.worker.min.mjs"), join(root, "public/document/pdf.worker.min.mjs")],
  [join(root, "node_modules/tesseract.js/dist/worker.min.js"), join(root, "public/document/ocr-runtime/worker.min.js")],
  [join(root, "node_modules/tesseract.js-core/tesseract-core-simd-lstm.wasm.js"), join(root, "public/document/ocr-runtime/tesseract-core-simd-lstm.wasm.js")],
  [join(root, "node_modules/@tesseract.js-data/eng/4.0.0_best_int/eng.traineddata.gz"), join(root, "public/document/ocr-data/eng.traineddata.gz")],
  [join(root, "node_modules/@tesseract.js-data/tha/4.0.0_best_int/tha.traineddata.gz"), join(root, "public/document/ocr-data/tha.traineddata.gz")]
];

for (const [source, target] of copies) {
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(source, target);
}
