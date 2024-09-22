/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      {
        source: "/home",
        destination: "/Login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
