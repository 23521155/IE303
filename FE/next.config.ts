import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://62.72.46.7:8080/api/:path*',
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
