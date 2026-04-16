import { getDictionary } from '@/lib/getDictionary';
import { siteConfig } from '@/lib/site-config';
import { PageHeader } from '@/components/page-header';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const canonical = `${siteConfig.url}/${lang}/uses/`;
  const title = `${dict.uses.title} | ${siteConfig.name}`;

  return {
    title,
    description: dict.uses.sub,
    keywords: dict.meta.keywords,
    alternates: {
      canonical,
      languages: {
        it: `${siteConfig.url}/it/uses/`,
        en: `${siteConfig.url}/en/uses/`,
        bn: `${siteConfig.url}/bn/uses/`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang,
      url: canonical,
      title,
      description: dict.uses.sub,
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
      description: dict.uses.sub,
      images: [siteConfig.ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function UsesPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <>
      <PageHeader label={dict.uses.label} title={dict.uses.title} sub={dict.uses.sub} />
      <section className="container-custom py-16">
        <p className="max-w-2xl text-muted-foreground">{dict.uses.sub}</p>
        <p className="mt-6 max-w-2xl text-muted-foreground">{dict.hero.description}</p>
      </section>
    </>
  );
}
