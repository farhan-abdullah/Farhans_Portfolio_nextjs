import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Allowlist specifico per sicurezza (Next 16 raccomanda remotePatterns ristretti).
    // Aggiungi qui i domini dei tuoi bucket S3/R2 o CDN quando li configuri.
    remotePatterns: [
      { protocol: 'https', hostname: 'farhanabdullah.dev' },
      { protocol: 'https', hostname: '*.r2.cloudflarestorage.com' },
      { protocol: 'https', hostname: '*.r2.dev' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: '127.0.0.1' },
    ],
  },
  experimental: {
    // View Transitions API per transizioni fluide tra rotte.
    viewTransition: true,
    // Abilita cache su disco di Turbopack in dev (beta, Next 16).
    turbopackFileSystemCacheForDev: true,
  },
  // React Compiler è ora stabile in Next 16 ma non default.
  // Abilitarlo quando testato:
  // reactCompiler: true,
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
