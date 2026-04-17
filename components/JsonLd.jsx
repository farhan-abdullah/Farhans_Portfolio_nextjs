// components/JsonLd.tsx
import Script from 'next/script';

type Locale = 'it' | 'en' | 'es';

export default function JsonLd({ locale = 'it' }: { locale?: Locale }) {
  const content = {
    it: {
      name: "Farhan Abdullah",
      jobTitle: "Full-Stack Developer",
      description: "Sviluppatore specializzato in MERN Stack e Next.js. Costruisco siti web veloci, multilingua e ottimizzati per clienti enterprise a Venezia e in tutta Italia.",
      knowsAbout: ["MERN Stack", "Next.js", "React", "Node.js", "TypeScript", "Tailwind CSS", "Payload CMS"],
    },
    en: {
      name: "Farhan Abdullah",
      jobTitle: "Full-Stack Developer",
      description: "Full-Stack Developer specialized in MERN Stack and Next.js. I build fast, multilingual and optimized websites for enterprise clients in Venice and across Italy.",
      knowsAbout: ["MERN Stack", "Next.js", "React", "Node.js", "TypeScript", "Tailwind CSS", "Payload CMS"],
    },
    es: {
      name: "Farhan Abdullah",
      jobTitle: "Desarrollador Full-Stack",
      description: "Desarrollador Full-Stack especializado en MERN Stack y Next.js. Construyo sitios web rápidos, multilingües y optimizados para clientes enterprise en Venecia y toda Italia.",
      knowsAbout: ["MERN Stack", "Next.js", "React", "Node.js", "TypeScript", "Tailwind CSS", "Payload CMS"],
    },
  };

  const current = content[locale];

  return (
    <>
      {/* Person - Farhan Abdullah */}
      <Script id={`json-ld-person-${locale}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": current.name,
          "jobTitle": current.jobTitle,
          "description": current.description,
          "url": `https://www.farhanabdullah.com${locale === 'it' ? '' : `/${locale}`}`,
          "image": "https://www.farhanabdullah.com/profile.jpg", // sostituisci con la tua foto
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Venezia",
            "addressRegion": "Veneto",
            "addressCountry": "IT"
          },
          "knowsAbout": current.knowsAbout,
          "knowsLanguage": ["it", "en", "es"],
          "inLanguage": locale
        })}
      </Script>

      {/* Website */}
      <Script id={`json-ld-website-${locale}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": locale === 'it' ? "Farhan Abdullah - Portfolio" : 
                  locale === 'en' ? "Farhan Abdullah - Portfolio" : 
                  "Farhan Abdullah - Portafolio",
          "url": `https://www.farhanabdullah.com${locale === 'it' ? '' : `/${locale}`}`,
          "description": current.description,
          "inLanguage": locale
        })}
      </Script>
    </>
  );
}
