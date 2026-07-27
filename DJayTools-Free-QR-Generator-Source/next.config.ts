import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const basePath = "/tools/qrgen";
const projectDirectory = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: `${basePath}/`,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: projectDirectory,
  },
};

export default nextConfig;
