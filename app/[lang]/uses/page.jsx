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

function UsesSection({ title, desc, items }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-1">{title}</h2>
      {desc && <p className="text-sm text-muted-foreground mb-6">{desc}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4"
          >
            <span className="mt-[2px] inline-block h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function UsesPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const u = dict.uses;

  const sections = [
    {
      title: u.hardware_title,
      desc: u.hardware_desc,
      items: [u.items.laptop, u.items.monitor, u.items.keyboard, u.items.mouse],
    },
    {
      title: u.editor_title,
      desc: u.editor_desc,
      items: [u.items.vscode, u.items.vscode_ext],
    },
    {
      title: u.languages_title,
      desc: u.languages_desc,
      items: [u.items.javascript, u.items.nodejs],
    },
    {
      title: u.frontend_tools,
      desc: u.frontend_desc,
      items: [u.items.react, u.items.nextjs, u.items.tailwind],
    },
    {
      title: u.backend_tools,
      desc: u.backend_desc,
      items: [u.items.expressjs, u.items.mongodb],
    },
    {
      title: u.devops_tools,
      desc: u.devops_desc,
      items: [u.items.git, u.items.docker, u.items.figma, u.items.postman, u.items.npm],
    },
  ];

  return (
    <>
      <PageHeader label={u.label} title={u.title} sub={u.sub} />
      <section className="container-custom py-16">
        {sections.map((s) => (
          <UsesSection key={s.title} title={s.title} desc={s.desc} items={s.items} />
        ))}
      </section>
    </>
  );
}
