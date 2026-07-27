import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const source = join(projectDir, "node_modules", "pdfjs-dist", "build", "pdf.worker.min.mjs");
const destination = join(projectDir, "public", "pdf.worker.min.mjs");

mkdirSync(dirname(destination), { recursive: true });
copyFileSync(source, destination);
