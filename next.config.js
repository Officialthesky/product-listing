/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '**',
      }
    ],
  },
  env: {
    API_URL: 'https://fakestoreapi.com',
  },
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
};

module.exports = nextConfig;