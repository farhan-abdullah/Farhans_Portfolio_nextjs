import { getDictionary } from '@/lib/getDictionary';
import { siteConfig } from '@/lib/site-config';
import { PageHeader } from '@/components/page-header';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const canonical = `${siteConfig.url}/${lang}/about/`;

  const title = `${dict.about.title} | ${siteConfig.name}`;

  return {
    title,
    description: dict.about.sub,
    keywords: dict.meta.keywords,
    alternates: {
      canonical,
      languages: {
        it: `${siteConfig.url}/it/about/`,
        en: `${siteConfig.url}/en/about/`,
        bn: `${siteConfig.url}/bn/about/`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang,
      url: canonical,
      title,
      description: dict.about.sub,
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
      description: dict.about.sub,
      images: [siteConfig.ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function AboutPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const cvFiles = {
    it: 'cv-farhan-it.pdf',
    en: 'cv-farhan-en.pdf',
    bn: 'cv-farhan-bn.pdf',
  };

  return (
    <>
      <PageHeader label={dict.about.label} title={dict.about.title} sub={dict.about.sub} />

      {/* Story Section */}
      <section className="container-custom py-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">{dict.about.story_title}</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>{dict.about.story_p1}</p>
            <p>{dict.about.story_p2}</p>
            <p>{dict.about.story_p3}</p>
          </div>
        </div>
      </section>

      {/* Info & CV Section */}
      <section className="container-custom py-16 border-t">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">{dict.about.info_title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Location */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">{dict.about.location}</h3>
              <p className="text-muted-foreground">{dict.about.location_detail}</p>
            </div>

            {/* Profession */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">{dict.about.profession}</h3>
              <p className="text-muted-foreground">{dict.about.profession_detail}</p>
            </div>

            {/* Education */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">{dict.about.education}</h3>
              <p className="text-muted-foreground">{dict.about.education_detail}</p>
            </div>

            {/* Interests */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">{dict.about.interests}</h3>
              <p className="text-muted-foreground">{dict.about.interests_detail}</p>
            </div>
          </div>

          {/* CV Download */}
          <div className="bg-muted/50 p-6 rounded-lg mb-12">
            <h3 className="font-semibold text-foreground mb-4">{dict.about.download_cv}</h3>
            <div className="flex flex-wrap gap-3">
              <a
                href={`/cv/${cvFiles[lang]}`}
                download
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                📄 {dict.language[lang === 'it' ? 'italian' : lang === 'en' ? 'english' : 'bengali']} CV
              </a>
              {lang !== 'en' && (
                <a
                  href={`/cv/${cvFiles.en}`}
                  download
                  className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
                >
                  📄 English CV
                </a>
              )}
              {lang !== 'it' && (
                <a
                  href={`/cv/${cvFiles.it}`}
                  download
                  className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
                >
                  📄 Italian CV
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Passions Section */}
      <section className="container-custom py-16 border-t">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">{dict.about.interests_title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-2">{dict.about.fitness}</h3>
              <p className="text-muted-foreground">{dict.about.fitness_detail}</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">{dict.about.interests}</h3>
              <p className="text-muted-foreground">{dict.about.interests_detail}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container-custom py-16 border-t">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">{dict.about.skills_title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="font-semibold text-foreground mb-3">{dict.about.frontend}</h3>
              <p className="text-sm text-muted-foreground">React · Next.js · Tailwind CSS · TypeScript</p>
            </div>
            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="font-semibold text-foreground mb-3">{dict.about.backend}</h3>
              <p className="text-sm text-muted-foreground">Node.js · Express · MongoDB · Payload CMS</p>
            </div>
            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="font-semibold text-foreground mb-3">{dict.about.tools}</h3>
              <p className="text-sm text-muted-foreground">Git · Docker · Figma · Postman</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container-custom py-16 border-t">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold mb-3">{dict.about.values_title}</h2>
          <p className="text-muted-foreground mb-8">{dict.about.values_desc}</p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-2xl">✓</div>
              <p className="text-muted-foreground pt-1">{dict.about.value_1}</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl">✓</div>
              <p className="text-muted-foreground pt-1">{dict.about.value_2}</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl">✓</div>
              <p className="text-muted-foreground pt-1">{dict.about.value_3}</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl">✓</div>
              <p className="text-muted-foreground pt-1">{dict.about.value_4}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom py-16 border-t">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold mb-3">{dict.about.cta_title}</h2>
          <p className="text-muted-foreground mb-8">{dict.about.cta_desc}</p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`/${lang}/projects`}
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              {dict.about.view_work} →
            </a>
            <a
              href={`/${lang}/contact`}
              className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
            >
              {dict.about.get_in_touch} →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
