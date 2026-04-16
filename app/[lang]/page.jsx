import { getDictionary } from '@/lib/getDictionary';
import { siteConfig } from '@/lib/site-config';
import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { CTA } from '@/components/sections/cta';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const canonical = `${siteConfig.url}/${lang}`;
  const canonicalWithSlash = `${canonical}/`;

  return {
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    alternates: {
      canonical: canonicalWithSlash,
      languages: {
        it: `${siteConfig.url}/it/`,
        en: `${siteConfig.url}/en/`,
        bn: `${siteConfig.url}/bn/`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang,
      url: canonicalWithSlash,
      title: dict.meta.title,
      description: dict.meta.description,
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
      title: dict.meta.title,
      description: dict.meta.description,
      images: [siteConfig.ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function HomePage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero lang={lang} dict={dict} />
      <Services dict={dict} />
      <CTA lang={lang} dict={dict} />
    </>
  );
}
