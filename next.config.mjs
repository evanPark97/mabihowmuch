/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  experimental: {
    externalDir: true,
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;