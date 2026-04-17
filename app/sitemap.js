import { siteConfig } from '@/lib/site-config';
import { getPayloadClient } from '@/lib/getPayloadClient';

/**
 * Dynamic Sitemap for Multi-language Portfolio
 * Generates XML sitemap with all routes in all languages
 *
 * Routes included:
 * - Static pages (home, about, projects, blog, books, uses, contact) in IT/EN/BN
 * - Dynamic blog posts in all languages
 * - Dynamic project pages in all languages
 */

const LANGUAGES = ['it', 'en', 'bn'];
const BASE_URL = siteConfig.url;

// Static page priorities and update frequencies
const STATIC_PAGES = [
  { slug: '', priority: 1.0, changefreq: 'weekly' }, // home
  { slug: 'about', priority: 0.9, changefreq: 'monthly' },
  { slug: 'projects', priority: 0.9, changefreq: 'weekly' },
  { slug: 'blog', priority: 0.8, changefreq: 'weekly' },
  { slug: 'books', priority: 0.7, changefreq: 'monthly' },
  { slug: 'uses', priority: 0.7, changefreq: 'monthly' },
  { slug: 'contact', priority: 0.8, changefreq: 'monthly' },
];

export default async function sitemap() {
  const payload = await getPayloadClient();
  const sitemapEntries = [];

  // Add static pages for all languages
  for (const lang of LANGUAGES) {
    for (const page of STATIC_PAGES) {
      const path = page.slug ? `/${lang}/${page.slug}` : `/${lang}`;

      sitemapEntries.push({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: page.changefreq,
        priority: page.priority,
      });
    }
  }

  // Fetch and add dynamic blog posts for all languages
  try {
    for (const lang of LANGUAGES) {
      const { docs: blogPosts } = await payload.find({
        collection: 'blog-posts',
        locale: lang,
        // Solo post pubblicati — i draft non vanno indicizzati
        where: { status: { equals: 'published' } },
        limit: 1000,
        select: {
          slug: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      for (const post of blogPosts) {
        sitemapEntries.push({
          url: `${BASE_URL}/${lang}/blog/${post.slug}`,
          lastModified: new Date(post.updatedAt || post.createdAt),
          changeFrequency: 'monthly',
          priority: 0.8,
        });
      }
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Fetch and add dynamic project pages for all languages
  try {
    for (const lang of LANGUAGES) {
      const { docs: projects } = await payload.find({
        collection: 'projects',
        locale: lang,
        // Solo progetti 'live' — WIP e archived fuori dal sitemap
        where: { status: { equals: 'live' } },
        limit: 1000,
        select: {
          slug: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      for (const project of projects) {
        sitemapEntries.push({
          url: `${BASE_URL}/${lang}/projects/${project.slug}`,
          lastModified: new Date(project.updatedAt || project.createdAt),
          changeFrequency: 'monthly',
          priority: 0.8,
        });
      }
    }
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error);
  }

  return sitemapEntries;
}
