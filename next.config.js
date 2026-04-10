/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "api-web.sumbarprov.go.id",
        port: "",
      },
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "*.fbcdn.net",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
