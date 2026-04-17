import { i18n } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/getDictionary';
import { siteConfig } from '@/lib/site-config';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import JsonLd from '@/components/JsonLd';

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(siteConfig.url),
    // `dict.meta.title` include già il nome autore (es. "Farhan Abdullah | ..."),
    // quindi evitiamo una seconda appendizione.
    title: { default: dict.meta.title },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: lang,
      url: `${siteConfig.url}/${lang}`,
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
  };
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="flex min-h-screen flex-col">
      {/*
        JSON-LD structured data (Person + WebSite + ProfessionalService).
        Il componente usa <Script> di next/script → nessun warning React 19
        e i crawler lo leggono correttamente dopo l'idratazione.
      */}
      <JsonLd locale={lang} />
      <Navbar lang={lang} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} dict={dict} />
    </div>
  );
}
