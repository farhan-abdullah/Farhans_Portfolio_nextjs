import { getDictionary } from '@/lib/getDictionary';
import { getPayloadClient } from '@/lib/getPayloadClient';
import { siteConfig } from '@/lib/site-config';
import { PageHeader } from '@/components/page-header';
import { ProjectsGrid } from '@/components/projects-grid';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const canonical = `${siteConfig.url}/${lang}/projects/`;
  const title = `${dict.projects.title} | ${siteConfig.name}`;

  return {
    title,
    description: dict.projects.sub,
    keywords: dict.meta.keywords,
    alternates: {
      canonical,
      languages: {
        it: `${siteConfig.url}/it/projects/`,
        en: `${siteConfig.url}/en/projects/`,
        bn: `${siteConfig.url}/bn/projects/`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang,
      url: canonical,
      title,
      description: dict.projects.sub,
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
      description: dict.projects.sub,
      images: [siteConfig.ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProjectsPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  let projects = [];
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'projects',
      locale: lang,
      where: {
        status: {
          equals: 'live',
        },
      },
      limit: 100,
    });
    projects = docs || [];
  } catch (error) {
    console.error('Error loading projects:', error);
  }

  return (
    <>
      <PageHeader label={dict.projects.label} title={dict.projects.title} sub={dict.projects.sub} />

      <section className="container-custom py-16">
        <ProjectsGrid initialProjects={projects} lang={lang} dict={dict} />
      </section>
    </>
  );
}
