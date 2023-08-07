/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pps.whatsapp.net",
        port: "",
        pathname: "",
      },
    ],
  },
};
const removeImports = require("next-remove-imports")();
module.exports = removeImports({});
module.exports = nextConfig;
