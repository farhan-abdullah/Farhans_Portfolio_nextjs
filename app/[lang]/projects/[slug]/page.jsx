import { getDictionary } from '@/lib/getDictionary';
import { getPayloadClient } from '@/lib/getPayloadClient';
import { siteConfig } from '@/lib/site-config';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Github, Figma } from '@/components/icons';
import LexicalRenderer from '@/components/lexical-renderer';

// ISR: detail progetto rigenerato ogni ora.
export const revalidate = 3600;

// Helper per rendering rich text: string (legacy) o Lexical JSON
function renderRichText(field) {
  if (!field) return null;
  if (typeof field === 'string') {
    return <p>{field}</p>;
  }
  if (field?.root?.children) {
    return <LexicalRenderer data={field} />;
  }
  return null;
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'projects',
      locale: lang,
      where: {
        slug: { equals: slug },
      },
      limit: 1,
    });

    if (!docs[0]) {
      return {
        title: 'Not Found',
      };
    }

    const project = docs[0];
    const canonical = `${siteConfig.url}/${lang}/projects/${slug}/`;
    const title = project.seo?.metaTitle || `${project.title} | ${siteConfig.name}`;
    const description = project.seo?.metaDescription || project.tagline || project.summary;

    return {
      title,
      description,
      keywords: dict.meta.keywords,
      alternates: {
        canonical,
        languages: {
          it: `${siteConfig.url}/it/projects/${slug}/`,
          en: `${siteConfig.url}/en/projects/${slug}/`,
          bn: `${siteConfig.url}/bn/projects/${slug}/`,
        },
      },
      openGraph: {
        type: 'website',
        locale: lang,
        url: canonical,
        title,
        description,
        siteName: siteConfig.name,
        images: [
          {
            url: project.seo?.ogImage?.url || project.cover?.url || siteConfig.ogImage,
            width: 1200,
            height: 630,
            alt: project.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [project.seo?.ogImage?.url || project.cover?.url || siteConfig.ogImage],
      },
      robots: { index: true, follow: true },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Project',
    };
  }
}

export async function generateStaticParams() {
  // NOTE: generateStaticParams NON riceve params. Iteriamo tutte le locale
  // definite in i18n.locales per pregenerare ogni combinazione lang × slug.
  try {
    const payload = await getPayloadClient();
    const { i18n } = await import('@/lib/i18n-config');

    const all = await Promise.all(
      i18n.locales.map(async (lang) => {
        const { docs } = await payload.find({
          collection: 'projects',
          locale: lang,
          // Solo progetti pubblicati (status 'live') per non indicizzare draft
          where: { status: { equals: 'live' } },
          limit: 500,
        });
        return docs.map((project) => ({ slug: project.slug, lang }));
      })
    );

    return all.flat();
  } catch (error) {
    console.error('Error generating static params (projects):', error);
    return [];
  }
}

export default async function ProjectDetailPage({ params }) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  let project = null;

  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'projects',
      locale: lang,
      where: {
        slug: { equals: slug },
      },
      limit: 1,
    });

    project = docs[0];
  } catch (error) {
    console.error('Error loading project:', error);
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-muted-foreground mb-4">{dict.common.not_found}</p>
        <Link
          href={`/${lang}/projects`}
          className="px-4 py-2 bg-accent text-[hsl(var(--accent-foreground))] rounded-lg hover:opacity-90 transition-opacity"
        >
          {dict.projects.back_to_projects}
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      {project.cover?.url && (
        <div className="relative h-96 w-full overflow-hidden bg-[hsl(var(--muted))]">
          <Image
            src={project.cover.url}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <section className="container-custom py-16">
        {/* Back Button */}
        <Link
          href={`/${lang}/projects`}
          className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {dict.projects.back_to_projects}
        </Link>

        <div className="mb-12">
          <p className="text-sm text-muted-foreground mb-2">{project.category}</p>
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          {project.tagline && <p className="text-lg text-muted-foreground">{project.tagline}</p>}
        </div>

        {/* Sidebar Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            {/* Problem Section */}
            {project.problem && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">{dict.projects.challenge}</h2>
                <div className="prose prose-invert max-w-none">
                  {renderRichText(project.problem)}
                </div>
              </div>
            )}

            {/* Solution Section */}
            {project.solution && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">{dict.projects.solution}</h2>
                <div className="prose prose-invert max-w-none">
                  {renderRichText(project.solution)}
                </div>
              </div>
            )}

            {/* Outcome Section */}
            {project.outcome && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">{dict.projects.results}</h2>
                <div className="prose prose-invert max-w-none">
                  {renderRichText(project.outcome)}
                </div>
              </div>
            )}

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((item, idx) => (
                    <div key={idx} className="relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={item.image?.url}
                        alt={item.caption || `Gallery ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Info Cards */}
            {project.duration && (
              <div className="mb-8 p-4 rounded-lg bg-[hsl(var(--muted))]">
                <p className="text-sm text-muted-foreground">{dict.projects.duration}</p>
                <p className="text-lg font-medium mt-1">{project.duration}</p>
              </div>
            )}

            {project.myRole && (
              <div className="mb-8 p-4 rounded-lg bg-[hsl(var(--muted))]">
                <p className="text-sm text-muted-foreground">{dict.projects.role}</p>
                <p className="text-base mt-2">{project.myRole}</p>
              </div>
            )}

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold mb-4">{dict.projects.results}</h3>
                <div className="space-y-3">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-[hsl(var(--muted))]">
                      <p className="text-2xl font-bold text-accent">{metric.value}</p>
                      <p className="text-sm text-muted-foreground mt-1">{metric.label}</p>
                      {metric.description && (
                        <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            {project.stack && project.stack.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold mb-4">{dict.projects.technologies}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full"
                    >
                      {item.tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {project.links && (Object.values(project.links).some((v) => v)) && (
              <div>
                <h3 className="font-bold mb-4">Links</h3>
                <div className="flex flex-col gap-3">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-[hsl(var(--accent-foreground))] rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {dict.projects.live_demo}
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] rounded-lg hover:bg-[hsl(var(--muted))]/80 transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      {dict.projects.source_code}
                    </a>
                  )}
                  {project.links.figma && (
                    <a
                      href={project.links.figma}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] rounded-lg hover:bg-[hsl(var(--muted))]/80 transition-colors"
                    >
                      <Figma className="h-4 w-4" />
                      Design
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 pt-16 border-t border-[hsl(var(--border))]">
          <h3 className="text-2xl font-bold mb-4">{dict.projects.similar_project}</h3>
          <p className="text-muted-foreground mb-6">
            {dict.hero.description}
          </p>
          <Link
            href={`/${lang}/contact`}
            className="inline-block px-6 py-3 bg-accent text-[hsl(var(--accent-foreground))] rounded-lg hover:opacity-90 transition-opacity"
          >
            {dict.hero.cta_contact}
          </Link>
        </div>
      </section>
    </>
  );
}
