import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',   // Only allow images from HTTPS
        hostname: '**',      // Allow any hostname
        port: '',            // Default port
        pathname: '/**',     // Allow any path
      },
    ],
  },
};

export default nextConfig;
