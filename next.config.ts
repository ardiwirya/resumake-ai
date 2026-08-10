import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  transpilePackages: ["@react-pdf/renderer"],
};

export default nextConfig;
