import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
   
    domains: ['localhost', 'strapi-server-app-mklz.onrender.com'], // Add your domain here
  },
   eslint: {
    ignoreDuringBuilds: true, // ✅ Disable ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true, // ⚠️ TEMPORARY ONLY
  },
};

export default nextConfig;
