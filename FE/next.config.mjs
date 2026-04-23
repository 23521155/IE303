/** @type {import('next').NextConfig} */
const nextConfig = {
    // Support importing raw SVGs and CSVs if needed, though Webpack loaders might be required.
    // Next.js has built-in support for most modern features.
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
