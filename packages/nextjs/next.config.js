// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  webpack: config => {
    // Existing fallbacks - keep it simple initially
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false, 
      net: false, 
      tls: false 
    };
    
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  transpilePackages: [
    '@web3auth/mpc-core-kit',
    '@web3auth/base',
    '@web3auth/ethereum-provider'
  ],
};

module.exports = nextConfig;