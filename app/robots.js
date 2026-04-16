import { siteConfig } from '@/lib/site-config';

/**
 * Robots.txt Configuration
 * Defines crawling rules for search engines
 *
 * Allows all bots to crawl public content
 * Disallows: API routes, admin panel, private paths
 */

export default function robots() {
  const baseUrl = siteConfig.url;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api',
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
        allow: '/',
        disallow: ['/admin', '/api'],
        crawlDelay: 0,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
