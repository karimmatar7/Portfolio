import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF when the browser supports it, falling back to WebP. The case
    // study screenshots are large PNGs, so this cuts a significant amount off
    // the transfer for modern browsers.
    formats: ["image/avif", "image/webp"],
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

