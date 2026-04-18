import { Footer } from "@/components/footer";
import JsonLd from "@/components/JsonLd";
import { Navbar } from "@/components/navbar";
import { getDictionary } from "@/lib/getDictionary";
import { i18n } from "@/lib/i18n-config";
import { siteConfig } from "@/lib/site-config";

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
      type: "website",
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
      card: "summary_large_image",
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
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-[hsl(var(--background))] before:pointer-events-none before:absolute before:inset-x-0 before:top-[-220px] before:z-0 before:h-[520px] before:bg-[radial-gradient(circle_at_10%_0%,hsl(var(--accent)/0.16),transparent_45%)] after:pointer-events-none after:absolute after:right-[-180px] after:top-[-120px] after:z-0 after:h-[420px] after:w-[420px] after:rounded-full after:bg-[radial-gradient(circle,hsl(var(--accent)/0.12),transparent_60%)]">
      {/*
        JSON-LD structured data (Person + WebSite + ProfessionalService).
        Il componente usa <Script> di next/script → nessun warning React 19
        e i crawler lo leggono correttamente dopo l'idratazione.
      */}
      <JsonLd locale={lang} />
      <Navbar lang={lang} dict={dict} />
      <main className="relative z-10 flex-1 [&_section]:scroll-mt-24">
        {children}
      </main>
      <Footer lang={lang} dict={dict} />
    </div>
  );
}
