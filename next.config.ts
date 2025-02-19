/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {}, // Keep this empty unless you're enabling specific experiments
  reactStrictMode: true,
  swcMinify: true, // Enable SWC compiler minification for better performance
};

module.exports = nextConfig;
