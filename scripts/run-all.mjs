import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const projects = [
  "DJayTools-Free-QR-Generator-Source",
  "djai-image-resizer",
  "djai-pdf-tools",
  "djai-document-tools"
];

const action = process.argv[2];
if (!new Set(["install", "build", "lint", "test"]).has(action)) {
  console.error("Usage: node scripts/run-all.mjs <install|build|lint|test>");
  process.exit(1);
}

for (const project of projects) {
  const packagePath = join(project, "package.json");
  const manifest = JSON.parse(readFileSync(packagePath, "utf8"));
  const args = action === "install" ? ["ci"] : ["run", action];

  if (action !== "install" && !manifest.scripts?.[action]) {
    console.log(`Skipping ${project}: no ${action} script.`);
    continue;
  }

  console.log(`\n==> ${project}: npm ${args.join(" ")}`);
  const result = spawnSync("npm", args, {
    cwd: project,
    stdio: "inherit",
    shell: process.platform === "win32"
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
