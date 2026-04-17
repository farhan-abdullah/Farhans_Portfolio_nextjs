import { siteConfig } from '@/lib/site-config';
import { getPayloadClient } from '@/lib/getPayloadClient';
import { i18n } from '@/lib/i18n-config';

/**
 * RSS Feed API Route
 * Generates RSS feed for blog posts, per-language via ?lang=
 *
 * - /api/rss           → defaultLocale (it)
 * - /api/rss?lang=en   → English feed
 * - /api/rss?lang=bn   → Bengali feed
 *
 * Returns application/xml, cached 1h con stale-while-revalidate 24h.
 */

export const dynamic = 'force-dynamic';

const BASE_URL = siteConfig.url;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const langParam = searchParams.get('lang');
  const lang = i18n.locales.includes(langParam) ? langParam : i18n.defaultLocale;

  try {
    const payload = await getPayloadClient();

    const { docs: blogPosts } = await payload.find({
      collection: 'blog-posts',
      locale: lang,
      where: { status: { equals: 'published' } },
      limit: 50,
      sort: '-publishedAt',
      select: {
        slug: true,
        title: true,
        excerpt: true,
        content: true,
        publishedAt: true,
        updatedAt: true,
      },
    });

    const rssContent = generateRSSFeed(blogPosts, lang);

    return new Response(rssContent, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('RSS Feed Generation Error:', error);

    const errorFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXML(siteConfig.name)}</title>
    <link>${BASE_URL}</link>
    <description>Blog Feed</description>
    <item>
      <title>Feed Temporarily Unavailable</title>
      <link>${BASE_URL}/${lang}/blog</link>
      <description>The RSS feed is temporarily unavailable. Please check back later.</description>
    </item>
  </channel>
</rss>`;

    return new Response(errorFeed, {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
      status: 200,
    });
  }
}

/**
 * Genera l'XML RSS dai blog post per una specifica locale.
 */
function generateRSSFeed(posts, lang) {
  const now = new Date().toUTCString();
  const lastBuildDate =
    posts.length > 0 ? new Date(posts[0].publishedAt || posts[0].updatedAt).toUTCString() : now;

  const itemsXML = posts
    .map((post) => {
      const postUrl = `${BASE_URL}/${lang}/blog/${post.slug}`;
      const pubDate = new Date(post.publishedAt || post.updatedAt).toUTCString();

      // Preferisci excerpt esplicito, altrimenti estrai plain text da Lexical.
      const description = post.excerpt || extractPlainText(post.content, 400);

      // content:encoded è rimosso: mettere Lexical JSON raw in CDATA è inutile
      // per i lettori RSS. In futuro si può aggiungere convertendo Lexical → HTML.
      return `    <item>
      <title>${escapeXML(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXML(description)}</description>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXML(siteConfig.name)} — Blog (${lang})</title>
    <link>${BASE_URL}/${lang}/blog</link>
    <atom:link href="${BASE_URL}/api/rss?lang=${lang}" rel="self" type="application/rss+xml" />
    <description>Blog posts about web development, MERN stack, and Next.js</description>
    <language>${lang}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <image>
      <url>${siteConfig.ogImage}</url>
      <title>${escapeXML(siteConfig.name)}</title>
      <link>${BASE_URL}</link>
    </image>
${itemsXML}
  </channel>
</rss>`;
}

/**
 * Extract plain text from Lexical JSON or HTML content
 */
function extractPlainText(content, maxLength = 200) {
  if (!content) return '';

  let text = '';

  // If content is Lexical JSON
  if (typeof content === 'object' && content.root) {
    text = extractFromLexical(content.root.children);
  }
  // If content is a string (assume plain text or HTML)
  else if (typeof content === 'string') {
    // Remove HTML tags
    text = content.replace(/<[^>]*>/g, '');
  }

  // Limit length and add ellipsis
  if (text.length > maxLength) {
    text = text.substring(0, maxLength) + '...';
  }

  return text.trim();
}

/**
 * Extract text from Lexical JSON structure.
 * - text nodes → aggiungi il loro `text`
 * - linebreak → aggiungi spazio
 * - qualsiasi altro node con `children` → recursive
 * - gestisce anche nodi che hanno sia `text` che `children` (es. link)
 */
function extractFromLexical(nodes) {
  if (!Array.isArray(nodes)) return '';
  let out = '';

  for (const node of nodes) {
    if (!node || typeof node !== 'object') continue;

    if (node.type === 'text' && typeof node.text === 'string') {
      out += node.text + ' ';
    } else if (node.type === 'linebreak') {
      out += ' ';
    }

    if (Array.isArray(node.children) && node.children.length > 0) {
      out += extractFromLexical(node.children);
    }
  }

  return out.replace(/\s+/g, ' ').trim();
}

/**
 * Escape special XML characters
 */
function escapeXML(str) {
  if (!str) return '';

  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
