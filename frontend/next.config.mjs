/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '1337',

            },
            {
                protocol: 'https',
                hostname: process.env.HOST || '',
            },
        ],
    },
};

export default nextConfig;
