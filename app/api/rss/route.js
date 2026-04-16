import { siteConfig } from '@/lib/site-config';
import { getPayloadClient } from '@/lib/getPayloadClient';

/**
 * RSS Feed API Route
 * Generates RSS feed for blog posts
 *
 * Accessible at: /api/rss
 * Returns: application/xml
 */

export const dynamic = 'force-dynamic';

const BASE_URL = siteConfig.url;
const DEFAULT_LANG = 'it'; // Default to Italian feed

export async function GET(request) {
  try {
    const payload = await getPayloadClient();

    // Fetch latest blog posts
    const { docs: blogPosts } = await payload.find({
      collection: 'blog-posts',
      locale: DEFAULT_LANG,
      limit: 50,
      sort: '-publishedAt',
      select: {
        slug: true,
        title: true,
        description: true,
        content: true,
        publishedAt: true,
        updatedAt: true,
        author: true,
      },
    });

    // Generate RSS XML
    const rssContent = generateRSSFeed(blogPosts);

    return new Response(rssContent, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('RSS Feed Generation Error:', error);

    // Return error feed
    const errorFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${BASE_URL}</link>
    <description>Blog Feed</description>
    <item>
      <title>Feed Temporarily Unavailable</title>
      <link>${BASE_URL}/blog</link>
      <description>The RSS feed is temporarily unavailable. Please check back later.</description>
    </item>
  </channel>
</rss>`;

    return new Response(errorFeed, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
      status: 200,
    });
  }
}

/**
 * Generate RSS feed XML from blog posts
 */
function generateRSSFeed(posts) {
  const now = new Date().toUTCString();
  const lastBuildDate = posts.length > 0 ? new Date(posts[0].publishedAt).toUTCString() : now;

  const itemsXML = posts
    .map((post) => {
      const postUrl = `${BASE_URL}/${DEFAULT_LANG}/blog/${post.slug}`;
      const pubDate = new Date(post.publishedAt).toUTCString();

      // Extract plain text from content for description (basic approach)
      const description = post.description || extractPlainText(post.content);

      return `    <item>
      <title>${escapeXML(post.title)}</title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXML(description)}</description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXML(siteConfig.name)} - Blog</title>
    <link>${BASE_URL}</link>
    <description>Blog posts about web development, MERN stack, and Next.js</description>
    <language>${DEFAULT_LANG}</language>
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
 * Extract text from Lexical JSON structure
 */
function extractFromLexical(nodes) {
  let text = '';

  for (const node of nodes) {
    if (node.type === 'text') {
      text += node.text + ' ';
    } else if (node.children) {
      text += extractFromLexical(node.children);
    }
  }

  return text.trim();
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
