import { siteConfig } from '@/lib/site-config';

/**
 * Robots.txt Configuration
 * - In dev o su preview (URL diverso dal dominio prod): blocca TUTTO per evitare
 *   di indicizzare ambienti non finali.
 * - In prod: permette crawl ma blocca admin, api, query param di sort/filter, form-submissions.
 * - Il feed RSS (/api/rss) è esplicitamente permesso perché è contenuto pubblico utile.
 */

export default function robots() {
  const baseUrl = siteConfig.url;
  const isProd =
    process.env.NODE_ENV === 'production' &&
    (process.env.VERCEL_ENV === 'production' || !process.env.VERCEL_ENV);

  if (!isProd) {
    // Preview/staging/dev: bloccare tutto per evitare indicizzazione accidentale
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
      sitemap: `${baseUrl}/sitemap.xml`,
      host: baseUrl,
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/rss', '/api/og'],
        disallow: [
          '/admin',
          '/api/',
          '/api/form-submissions',
          '/api/auth',
          '/*.json$',
          '/*?*sort=',
          '/*?*filter=',
          '/search',
        ],
        crawlDelay: 1,
      },
      // Specific rules for fast crawlers
      {
        userAgent: ['Googlebot', 'Googlebot-Image'],
        allow: ['/', '/api/rss', '/api/og'],
        disallow: ['/admin', '/api/', '/api/form-submissions'],
        crawlDelay: 0,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
