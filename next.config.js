/**
 * @type {import('next').NextConfig}
 */
const prefix =
  process.env.NODE_ENV === "production" ? "https://mabihowmuch.site/" : "";
const nextConfig = {
  output: "export",
  assetPrefix: prefix,
};

module.exports = nextConfig;
