import { getDictionary } from '@/lib/getDictionary';
import { getPayloadClient } from '@/lib/getPayloadClient';
import { siteConfig } from '@/lib/site-config';
import { PageHeader } from '@/components/page-header';
import { BlogCard } from '@/components/cards/blog-card';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const canonical = `${siteConfig.url}/${lang}/blog/`;
  const title = `${dict.blog.title} | ${siteConfig.name}`;

  return {
    title,
    description: dict.blog.sub,
    keywords: dict.meta.keywords,
    alternates: {
      canonical,
      languages: {
        it: `${siteConfig.url}/it/blog/`,
        en: `${siteConfig.url}/en/blog/`,
        bn: `${siteConfig.url}/bn/blog/`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang,
      url: canonical,
      title,
      description: dict.blog.sub,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: dict.blog.sub,
      images: [siteConfig.ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  let posts = [];
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'blog-posts',
      locale: lang,
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedAt',
      limit: 100,
    });
    posts = docs || [];
  } catch (error) {
    console.error('Error loading blog posts:', error);
  }

  return (
    <>
      <PageHeader label={dict.blog.label} title={dict.blog.title} sub={dict.blog.sub} />

      <section className="container-custom py-16">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-96">
            <p className="text-muted-foreground text-center max-w-md">
              {dict.common.no_posts_found || 'Ancora nessun articolo pubblicato. Torna più tardi!'}
            </p>
          </div>
        )}
      </section>
    </>
  );
}
