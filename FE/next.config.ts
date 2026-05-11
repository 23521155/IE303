import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites() {
      const beUrl = process.env.BE_URL || 'http://62.72.46.7:8080';
      return [
        {
          source: '/api/:path*',
          destination: `${beUrl}/api/:path*`,
        },
      ];
    },
    images: {
       remotePatterns: [
         {
           protocol: 'https',
           hostname: 'images.unsplash.com',
         },
       ],
     },
};

export default nextConfig;
