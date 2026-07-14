import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,

  experimental: {
    // Tree-shake large packages — only bundle what's actually imported
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },

  images: {
    // Serve modern formats (avif > webp > jpeg) for smaller file sizes
    formats: ["image/avif", "image/webp"],
    // Device sizes optimized for mobile-first
    deviceSizes: [375, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 224, 256, 384],
  },
};

export default nextConfig;
