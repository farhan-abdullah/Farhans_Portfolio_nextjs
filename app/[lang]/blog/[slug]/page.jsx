import { getDictionary } from '@/lib/getDictionary';
import { getPayloadClient } from '@/lib/getPayloadClient';
import { siteConfig } from '@/lib/site-config';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import LexicalRenderer from '@/components/lexical-renderer';

// ISR: il detail post viene rigenerato on-demand ogni ora.
export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'blog-posts',
      locale: lang,
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      limit: 1,
    });

    if (!docs[0]) {
      return {
        title: 'Not Found',
      };
    }

    const post = docs[0];
    const canonical = `${siteConfig.url}/${lang}/blog/${slug}/`;
    const title = post.seo?.metaTitle || `${post.title} | ${siteConfig.name}`;
    const description = post.seo?.metaDescription || post.excerpt || post.title;

    return {
      title,
      description,
      keywords: dict.meta.keywords,
      alternates: {
        canonical,
        languages: {
          it: `${siteConfig.url}/it/blog/${slug}/`,
          en: `${siteConfig.url}/en/blog/${slug}/`,
          bn: `${siteConfig.url}/bn/blog/${slug}/`,
        },
      },
      openGraph: {
        type: 'article',
        locale: lang,
        url: canonical,
        title,
        description,
        siteName: siteConfig.name,
        publishedTime: post.publishedAt,
        images: [
          {
            url: post.seo?.ogImage?.url || post.cover?.url || siteConfig.ogImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [post.seo?.ogImage?.url || post.cover?.url || siteConfig.ogImage],
      },
      robots: { index: true, follow: true },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post',
    };
  }
}

export async function generateStaticParams() {
  // NOTE: generateStaticParams NON riceve params. Iteriamo tutte le locale
  // definite in i18n.locales per pregenerare ogni combinazione lang × slug.
  try {
    const payload = await getPayloadClient();
    const { i18n } = await import('@/lib/i18n-config');

    const all = await Promise.all(
      i18n.locales.map(async (lang) => {
        const { docs } = await payload.find({
          collection: 'blog-posts',
          locale: lang,
          where: { status: { equals: 'published' } },
          limit: 500,
        });
        return docs.map((post) => ({ slug: post.slug, lang }));
      })
    );

    return all.flat();
  } catch (error) {
    console.error('Error generating static params (blog):', error);
    return [];
  }
}

export default async function BlogDetailPage({ params }) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  let post = null;

  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'blog-posts',
      locale: lang,
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      limit: 1,
    });

    post = docs[0];
  } catch (error) {
    console.error('Error loading blog post:', error);
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-muted-foreground mb-4">{dict.common.not_found}</p>
        <Link
          href={`/${lang}/blog`}
          className="px-4 py-2 bg-accent text-[hsl(var(--accent-foreground))] rounded-lg hover:opacity-90 transition-opacity"
        >
          {dict.blog.back_to_blog}
        </Link>
      </div>
    );
  }

  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'it-IT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <>
      {/* Hero Section */}
      {post.cover?.url && (
        <div className="relative h-96 w-full overflow-hidden bg-[hsl(var(--muted))]">
          <Image
            src={post.cover.url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <section className="container-custom py-16">
        {/* Back Button */}
        <Link
          href={`/${lang}/blog`}
          className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {dict.blog.back_to_blog}
        </Link>

        <div className="mb-12 max-w-3xl">
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
            {publishDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{publishDate}</span>
              </div>
            )}
            {post.readingTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  {post.readingTime} {dict.blog.reading_time}
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full"
                >
                  {tag.tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Article Content */}
        <article className="prose prose-invert max-w-3xl mx-auto mb-16">
          {post.excerpt && <p className="lead text-lg text-muted-foreground">{post.excerpt}</p>}

          {/* Rich Text Content */}
          {post.content && (
            <div className="mt-8">
              {typeof post.content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : post.content?.root?.children ? (
                <LexicalRenderer data={post.content} />
              ) : null}
            </div>
          )}
        </article>

        {/* CTA */}
        <div className="mt-16 pt-16 border-t border-[hsl(var(--border))]">
          <h3 className="text-2xl font-bold mb-4">{dict.common.cta_project_idea}</h3>
          <p className="text-muted-foreground mb-6">{dict.hero.description}</p>
          <Link
            href={`/${lang}/contact`}
            className="inline-block px-6 py-3 bg-accent text-[hsl(var(--accent-foreground))] rounded-lg hover:opacity-90 transition-opacity"
          >
            {dict.hero.cta_contact}
          </Link>
        </div>
      </section>
    </>
  );
}
