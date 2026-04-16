import { getDictionary } from '@/lib/getDictionary';
import { getPayloadClient } from '@/lib/getPayloadClient';
import { siteConfig } from '@/lib/site-config';
import { PageHeader } from '@/components/page-header';
import { BooksTabs } from '@/components/books-tabs';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const canonical = `${siteConfig.url}/${lang}/books/`;
  const title = `${dict.books.title} | ${siteConfig.name}`;

  return {
    title,
    description: dict.books.sub,
    keywords: dict.meta.keywords,
    alternates: {
      canonical,
      languages: {
        it: `${siteConfig.url}/it/books/`,
        en: `${siteConfig.url}/en/books/`,
        bn: `${siteConfig.url}/bn/books/`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang,
      url: canonical,
      title,
      description: dict.books.sub,
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
      description: dict.books.sub,
      images: [siteConfig.ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BooksPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  let books = [];
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'books',
      locale: lang,
      limit: 100,
    });
    books = docs || [];
  } catch (error) {
    console.error('Error loading books:', error);
  }

  return (
    <>
      <PageHeader label={dict.books.label} title={dict.books.title} sub={dict.books.sub} />

      <section className="container-custom py-16">
        <BooksTabs initialBooks={books} dict={dict} />
      </section>
    </>
  );
}
