import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 🔥 Ottimizzazioni per produzione + Vercel
  output: "standalone",
  compress: true,
  poweredByHeader: false,

  // Immagini (già buone, ma rinforzate)
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "farhanabdullah.com" },
      { protocol: "https", hostname: "www.farhanabdullah.com" },
      { protocol: "https", hostname: "*.r2.cloudflarestorage.com" },
      { protocol: "https", hostname: "*.r2.dev" },
      {
        protocol: "https",
        hostname: "pub-70b3f41573214ebf8452ded8c7a1b7d1.r2.dev",
      },
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
    ],
    minimumCacheTTL: 60 * 60 * 24, // 24 ore di cache immagini
  },

  // Headers di sicurezza e performance
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },

  experimental: {
    viewTransition: true,
    // turbopack solo in dev se vuoi, ma disattivato in prod
  },
};

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
});
