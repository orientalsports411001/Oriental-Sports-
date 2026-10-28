/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'localhost:3001',
        '*.vercel.app',
        'orientalsports.in',
        '*.orientalsports.in',
      ],
    },
  },
  ...(basePath ? { basePath } : {}),
  async rewrites() {
    return [
      {
        source: '/admin/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

export default nextConfig;
