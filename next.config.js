/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dj4yzosa6/image/upload/v1691598075/drugboard.ai/**",
      },
    ],
  },
};

module.exports = nextConfig
