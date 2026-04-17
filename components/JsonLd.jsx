import Script from 'next/script';
import { siteConfig } from '@/lib/site-config';

/**
 * JSON-LD structured data per SEO.
 * Emette tre schemi schema.org: Person, WebSite, ProfessionalService.
 *
 * Uso in app/[lang]/layout.jsx:
 *   <JsonLd locale={lang} />
 *
 * `locale` deve essere 'it' | 'en' | 'bn' (vedi lib/i18n-config.js).
 */
export default function JsonLd({ locale = 'it' }) {
  const content = {
    it: {
      name: 'Farhan Abdullah',
      jobTitle: 'Full-Stack Developer',
      description:
        'Sviluppatore specializzato in MERN Stack e Next.js. Costruisco siti web veloci, multilingua e ottimizzati per clienti enterprise a Venezia e in tutta Italia.',
      service: 'Sviluppo siti web e applicazioni web con MERN Stack e Next.js',
      siteName: 'Farhan Abdullah — Portfolio',
    },
    en: {
      name: 'Farhan Abdullah',
      jobTitle: 'Full-Stack Developer',
      description:
        'Full-Stack Developer specialized in MERN Stack and Next.js. I build fast, multilingual and optimized websites for enterprise clients in Venice and across Italy.',
      service: 'Web development and web applications with MERN Stack and Next.js',
      siteName: 'Farhan Abdullah — Portfolio',
    },
    bn: {
      name: 'ফরহান আবদুল্লাহ',
      jobTitle: 'ফুল-স্ট্যাক ডেভেলপার',
      description:
        'MERN Stack এবং Next.js-এ বিশেষজ্ঞ ফুল-স্ট্যাক ডেভেলপার। ভেনিস ও সারা ইতালির এন্টারপ্রাইজ ক্লায়েন্টদের জন্য দ্রুত, বহুভাষিক ও অপ্টিমাইজড ওয়েবসাইট তৈরি করি।',
      service: 'MERN Stack এবং Next.js দিয়ে ওয়েবসাইট ও ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট',
      siteName: 'ফরহান আবদুল্লাহ — পোর্টফোলিও',
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
          knowsAbout: [
            'MERN Stack',
            'Next.js',
            'React',
            'Node.js',
            'TypeScript',
            'Tailwind CSS',
            'Payload CMS',
          ],
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

      {/* ProfessionalService schema */}
      <Script
        id={`json-ld-service-${locale}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: current.service,
          provider: {
            '@type': 'Person',
            name: current.name,
            url: pageUrl,
          },
          serviceType: [
            'MERN Stack Development',
            'Next.js Development',
            'Multilingual Websites',
            'Web Application Development',
          ],
          areaServed: 'Italy',
          url: pageUrl,
        })}
      </Script>
    </>
  );
}
