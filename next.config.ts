import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/OpenSyntaxHQ",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
