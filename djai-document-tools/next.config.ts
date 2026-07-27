import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/tools",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: { root: process.cwd() }
};

export default nextConfig;
