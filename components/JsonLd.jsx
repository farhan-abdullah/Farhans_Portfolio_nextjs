import Script from 'next/script';
import { siteConfig } from '@/lib/site-config';

/**
 * JSON-LD structured data (schema.org Person + WebSite).
 * Migliora l'SEO indicando a Google chi sei, cosa fai e in che lingua.
 *
 * Uso:
 *   import JsonLd from '@/components/JsonLd';
 *   <JsonLd locale={lang} />
 *
 * `lang` deve essere 'it' | 'en' | 'bn' (vedi lib/i18n-config.js).
 */
export default function JsonLd({ locale = 'it' }) {
  const content = {
    it: {
      name: 'Farhan Abdullah',
      jobTitle: 'Full-Stack Developer',
      description:
        'Sviluppatore specializzato in MERN Stack e Next.js. Costruisco siti web veloci, multilingua e ottimizzati per clienti enterprise a Venezia e in tutta Italia.',
      siteName: 'Farhan Abdullah — Portfolio',
      knowsAbout: [
        'MERN Stack',
        'Next.js',
        'React',
        'Node.js',
        'TypeScript',
        'Tailwind CSS',
        'Payload CMS',
      ],
    },
    en: {
      name: 'Farhan Abdullah',
      jobTitle: 'Full-Stack Developer',
      description:
        'Full-Stack Developer specialized in MERN Stack and Next.js. I build fast, multilingual and optimized websites for enterprise clients in Venice and across Italy.',
      siteName: 'Farhan Abdullah — Portfolio',
      knowsAbout: [
        'MERN Stack',
        'Next.js',
        'React',
        'Node.js',
        'TypeScript',
        'Tailwind CSS',
        'Payload CMS',
      ],
    },
    bn: {
      name: 'ফরহান আবদুল্লাহ',
      jobTitle: 'ফুল-স্ট্যাক ডেভেলপার',
      description:
        'MERN Stack এবং Next.js-এ বিশেষজ্ঞ ফুল-স্ট্যাক ডেভেলপার। ভেনিস ও সারা ইতালির এন্টারপ্রাইজ ক্লায়েন্টদের জন্য দ্রুত, বহুভাষিক ও অপ্টিমাইজড ওয়েবসাইট তৈরি করি।',
      siteName: 'ফরহান আবদুল্লাহ — পোর্টফোলিও',
      knowsAbout: [
        'MERN Stack',
        'Next.js',
        'React',
        'Node.js',
        'TypeScript',
        'Tailwind CSS',
        'Payload CMS',
      ],
    },
  };

  const current = content[locale] || content.it;
  const baseUrl = siteConfig.url;
  const pageUrl = locale === 'it' ? baseUrl : `${baseUrl}/${locale}`;

  return (
    <>
      {/* Person — schema per il portfolio owner */}
      <Script
        id={`json-ld-person-${locale}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: current.name,
          jobTitle: current.jobTitle,
          description: current.description,
          url: pageUrl,
          image: `${baseUrl}/profile.jpg`,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Venezia',
            addressRegion: 'Veneto',
            addressCountry: 'IT',
          },
          knowsAbout: current.knowsAbout,
          knowsLanguage: ['it', 'en', 'bn'],
          inLanguage: locale,
          sameAs: [siteConfig.links.github, siteConfig.links.linkedin].filter(Boolean),
        })}
      </Script>

      {/* WebSite schema */}
      <Script
        id={`json-ld-website-${locale}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: current.siteName,
          url: pageUrl,
          description: current.description,
          inLanguage: locale,
        })}
      </Script>
    </>
  );
}
