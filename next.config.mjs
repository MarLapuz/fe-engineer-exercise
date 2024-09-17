/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://frontend-take-home.fetch.com/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        hostname: "frontend-take-home.fetch.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
