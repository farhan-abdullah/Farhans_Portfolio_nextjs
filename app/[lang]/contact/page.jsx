import { getDictionary } from '@/lib/getDictionary';
import { PageHeader } from '@/components/page-header';
import { siteConfig } from '@/lib/site-config';
import { Mail, Phone, MessageCircle, MapPin, Download } from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const canonical = `${siteConfig.url}/${lang}/contact/`;
  const title = `${dict.contact.title} | ${siteConfig.name}`;

  return {
    title,
    description: dict.contact.sub,
    keywords: dict.meta.keywords,
    alternates: {
      canonical,
      languages: {
        it: `${siteConfig.url}/it/contact/`,
        en: `${siteConfig.url}/en/contact/`,
        bn: `${siteConfig.url}/bn/contact/`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang,
      url: canonical,
      title,
      description: dict.contact.sub,
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
      description: dict.contact.sub,
      images: [siteConfig.ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ContactPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const channels = [
    { icon: Mail, label: dict.contact.email, value: siteConfig.author.email, href: `mailto:${siteConfig.author.email}` },
    { icon: Phone, label: dict.contact.phone, value: siteConfig.author.phone, href: `tel:${siteConfig.author.phone.replace(/\s/g, '')}` },
    { icon: MessageCircle, label: dict.contact.whatsapp, value: 'WhatsApp', href: siteConfig.author.whatsapp },
    { icon: Linkedin, label: dict.contact.linkedin, value: 'linkedin.com/in/farhanabdullah', href: siteConfig.author.linkedin },
    { icon: Github, label: dict.contact.github, value: 'github.com/farhanabdullah', href: siteConfig.author.github },
    { icon: MapPin, label: dict.contact.location, value: siteConfig.author.location, href: null },
  ];

  return (
    <>
      <PageHeader label={dict.contact.label} title={dict.contact.title} sub={dict.contact.sub} />
      <section className="container-custom py-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {channels.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <div className="group flex items-start gap-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 transition-colors hover:border-accent">
                <div className="mt-1 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="mt-1 truncate font-medium">{value}</p>
                </div>
              </div>
            );
            return href ? (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener">
                {content}
              </a>
            ) : (
              <div key={label}>{content}</div>
            );
          })}
        </div>

        <p className="mt-10 max-w-2xl text-muted-foreground">{dict.contact.sub}</p>

        <div className="mt-10">
          <a
            href={`/cv/cv-farhan-${lang}.pdf`}
            download
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-[hsl(var(--accent-foreground))] transition-opacity hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            {dict.contact.download_cv}
          </a>
        </div>
      </section>
    </>
  );
}
