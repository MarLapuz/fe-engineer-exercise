/** @type {import('next').NextConfig} */
const nextConfig = {
async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_FQDN}/:path*`,
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
