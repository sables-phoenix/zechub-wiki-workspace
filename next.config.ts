import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zechub.wiki",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/zcash-tech", destination: "/learn", permanent: false },
      { source: "/zero-to-zero-knowledge", destination: "/learn", permanent: false },
      { source: "/glossary-and-faqs", destination: "/learn", permanent: false },
      { source: "/guides", destination: "/build", permanent: false },
      { source: "/research", destination: "/build", permanent: false },
      { source: "/tutorials", destination: "/build", permanent: false },
      { source: "/zcash-community", destination: "/ecosystem", permanent: false },
      { source: "/zcash-organizations", destination: "/ecosystem", permanent: false },
      { source: "/zfav-club", destination: "/ecosystem", permanent: false },
      { source: "/privacy-tools", destination: "/using-zcash", permanent: false },
      { source: "/zcash-use-cases", destination: "/using-zcash", permanent: false },
      { source: "/dashboard", destination: "/network", permanent: false },
      { source: "/donation", destination: "/donate", permanent: false },
      { source: "/sitemap", destination: "/library", permanent: false },
      { source: "/using-zcash/blockchain-explorers", destination: "/guides/blockchain-explorers", permanent: false },
      { source: "/dex", destination: "/using-zcash/dex", permanent: false },
      { source: "/payment-processors", destination: "/using-zcash/payment-processors", permanent: false },
    ];
  },
};

export default nextConfig;
