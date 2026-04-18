import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { Github } from '@/components/icons';

export function Hero({ lang, dict }) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>
      <div className="container-custom">
        <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {dict.hero.badge}
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          {dict.hero.greeting}{' '}
          <span className="text-accent">{dict.hero.name}</span>
        </h1>

        <p className="mt-4 text-xl font-medium sm:text-2xl">{dict.hero.tagline}</p>
        <p className="mt-2 font-mono text-sm text-muted-foreground">{dict.hero.subtagline}</p>

        <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {dict.hero.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/${lang}/projects`}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-[hsl(var(--accent-foreground))] transition-opacity hover:opacity-90"
          >
            {dict.hero.cta_projects} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-5 py-3 text-sm font-medium transition-colors hover:bg-[hsl(var(--muted))]"
          >
            <Mail className="h-4 w-4" /> {dict.hero.cta_contact}
          </Link>
          <a
            href="https://github.com/farhanabdullah"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-5 py-3 text-sm font-medium transition-colors hover:bg-[hsl(var(--muted))]"
          >
            <Github className="h-4 w-4" /> {dict.hero.cta_github}
          </a>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { v: '9+', k: dict.hero.stats.years_it },
            { v: '16+', k: dict.hero.stats.years_italy },
            { v: '3', k: dict.hero.stats.languages },
            { v: '2017', k: dict.hero.stats.diploma },
          ].map((s) => (
            <div key={s.k}>
              <dt className="font-mono text-3xl font-bold text-accent">{s.v}</dt>
              <dd className="mt-1 text-xs text-muted-foreground">{s.k}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
