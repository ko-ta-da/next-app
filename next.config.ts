import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @type {import('next').NextConfig}
  images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
};

export default nextConfig;
