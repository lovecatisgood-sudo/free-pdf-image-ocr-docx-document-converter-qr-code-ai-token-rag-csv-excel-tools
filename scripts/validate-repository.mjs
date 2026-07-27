import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ignored = new Set([".git", ".next", "node_modules", "out", "dist", "coverage"]);

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name)) return [];
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const files = walk(root);
const failures = [];

for (const path of files.filter((file) => file.endsWith(".json"))) {
  try {
    JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    failures.push(`${relative(root, path)} is invalid JSON: ${error.message}`);
  }
}

const markdownLink = /\[[^\]]*\]\(([^)]+)\)/g;
for (const path of files.filter((file) => file.endsWith(".md"))) {
  const source = readFileSync(path, "utf8");
  for (const match of source.matchAll(markdownLink)) {
    const target = match[1].trim().replace(/^<|>$/g, "").split("#")[0];
    if (!target || /^(?:https?:|mailto:|tel:)/.test(target)) continue;
    const local = resolve(dirname(path), decodeURIComponent(target));
    if (!existsSync(local)) failures.push(`${relative(root, path)} links to missing ${target}`);
  }
}

const textFiles = files.filter((file) => {
  const extension = file.split(".").pop();
  return ["css", "html", "js", "json", "jsx", "md", "mjs", "ts", "tsx", "txt", "yml", "yaml"].includes(extension);
});
for (const path of textFiles) {
  if (relative(root, path) === "scripts/validate-repository.mjs") continue;
  const source = readFileSync(path, "utf8");
  if (/DJAI-Open-Tools|djai-open-tools|djai-browser-tools|pdf-image-ocr-document-converter-tools/.test(source)) {
    failures.push(`${relative(root, path)} contains the retired repository name`);
  }
}

const liveDemos = readFileSync(join(root, "LIVE_DEMOS.md"), "utf8");
const toolUrls = new Set(liveDemos.match(/https:\/\/www\.djai\.academy\/tools\/[A-Za-z0-9_./-]*/g) ?? []);
if (toolUrls.size !== 102) {
  failures.push(`LIVE_DEMOS.md contains ${toolUrls.size} unique tool URLs; expected 102`);
}

const required = [
  "LICENSE", "README.md", "README.th.md", "FEATURES.md", "FEATURES.th.md",
  "LIVE_DEMOS.md", "CONTRIBUTING.md", "CONTRIBUTING.th.md", "SECURITY.md",
  "CODE_OF_CONDUCT.md", "THIRD_PARTY_NOTICES.md", "REPOSITORY_SETUP.md",
  ".github/workflows/ci.yml", ".github/CODEOWNERS"
];
for (const path of required) {
  if (!existsSync(join(root, path))) failures.push(`Missing required file: ${path}`);
}

for (const directory of [
  "DJayTools-Free-QR-Generator-Source", "djai-image-resizer", "djai-pdf-tools", "djai-document-tools"
]) {
  const path = join(root, directory);
  if (!existsSync(path) || !statSync(path).isDirectory()) failures.push(`Missing application directory: ${directory}`);
}

if (failures.length) {
  console.error("Repository validation failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Repository validation passed (${files.length} files, ${toolUrls.size} live tool URLs documented).`);
}
