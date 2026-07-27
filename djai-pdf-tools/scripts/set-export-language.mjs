import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = new URL("../out", import.meta.url).pathname;

function visit(directory) {
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) {
      visit(path);
      continue;
    }

    if (entry !== "index.html" || !path.includes("/en/")) continue;
    const html = readFileSync(path, "utf8");
    writeFileSync(path, html.replace('<html lang="th">', '<html lang="en">'));
  }
}

visit(outDir);
