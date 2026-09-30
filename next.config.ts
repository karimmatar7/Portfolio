import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: true },
      { source: "/home", destination: "/en", permanent: true },
      { source: "/portfolio", destination: "/en", permanent: true },
    ];
  },
};

export default nextConfig;

