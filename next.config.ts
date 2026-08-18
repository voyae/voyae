import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
    ],
  },
  typescript: {
    // Build sırasında TypeScript tip denetim hatalarının kalmasını engeller
    ignoreBuildErrors: true,
  },
  eslint: {
    // Build sırasında ESLint uyarılarının süreci durdurmasını engeller
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;