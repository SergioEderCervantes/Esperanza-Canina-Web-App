/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', 
  experimental: {
    optimizeCss: false,
  },
};

module.exports = nextConfig;
