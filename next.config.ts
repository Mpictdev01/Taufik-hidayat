import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eziccsymulmtpufyikno.supabase.co',
      },
      {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com' // Existing image source from page.tsx
      }
    ],
  },
};

export default nextConfig;
