import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
   
    domains: ['localhost'], // Add your domain here
  },
   eslint: {
    ignoreDuringBuilds: true, // ✅ Disable ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true, // ⚠️ TEMPORARY ONLY
  },
};

export default nextConfig;
