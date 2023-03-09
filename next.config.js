/** @type {import('next').NextConfig} */

async function redirects() {
  return [
    {
      source: "/",
      destination: "/social/create",
      permanent: true,
    },
    {
      source: "/api/social/create",
      destination: "https://api.supermomos-dev.com/interview/social",
      permanent: true,
    },
  ];
}

const nextConfig = {
  reactStrictMode: true,
  redirects,
  images: {
    domains: ["supermomos-app-resources-us.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
