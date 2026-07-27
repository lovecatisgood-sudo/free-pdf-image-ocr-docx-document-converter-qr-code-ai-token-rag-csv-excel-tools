import { readFileSync, writeFileSync } from "node:fs";

const englishPage = new URL("../out/en/index.html", import.meta.url);
const html = readFileSync(englishPage, "utf8");
writeFileSync(englishPage, html.replace('<html lang="th">', '<html lang="en">'));
