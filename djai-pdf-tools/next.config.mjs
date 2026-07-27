import path from "node:path";
import { fileURLToPath } from "node:url";

const basePath = "/tools/PDFTools";
const projectDirectory = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  turbopack: {
    root: projectDirectory
  },
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
