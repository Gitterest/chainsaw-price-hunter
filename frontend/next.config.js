/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Enables static export support for Railway
  output: 'export',

  // ✅ Configure for static export
  trailingSlash: true,

  // ✅ Supports external images from known chainsaw marketplaces
  images: {
    unoptimized: true,
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
};

module.exports = nextConfig;
