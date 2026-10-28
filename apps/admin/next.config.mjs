/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,
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

