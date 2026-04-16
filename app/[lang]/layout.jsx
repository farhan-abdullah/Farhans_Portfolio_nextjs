import { i18n } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/getDictionary';
import { siteConfig } from '@/lib/site-config';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

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

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    url: siteConfig.url,
    jobTitle: 'Full-Stack Developer',
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    knowsAbout: ['MERN', 'Next.js', 'React', 'MongoDB', 'Web Development', 'SEO', 'Multilingual Websites'],
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: lang === 'it' ? 'it-IT' : lang === 'en' ? 'en-US' : 'bn-BD',
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
      <Navbar lang={lang} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} dict={dict} />
    </div>
  );
}
