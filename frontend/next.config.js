/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Enables static export support for Railway
  output: 'export',

  // ✅ Supports external images from known chainsaw marketplaces
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

  // ✅ Optional: Optimize output CSS during build
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
