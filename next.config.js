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
};

module.exports = nextConfig;
