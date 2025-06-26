/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.dummyjson.com', 
      'api.qrserver.com',
      'images.unsplash.com',
      'offerup.com',
      'www.mercari.com',
      'facebook.com',
      'www.facebook.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;

