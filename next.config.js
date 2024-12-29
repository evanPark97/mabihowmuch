const prefix =
  process.env.NODE_ENV === "production" ? "https://mabihowmuch.site/" : "";

const nextConfig = {
  output: "export",
  assetPrefix: prefix,
};
