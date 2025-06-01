import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/create-deck-manual',
        destination: '/create',
        permanent: true,
      },
    ]
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
