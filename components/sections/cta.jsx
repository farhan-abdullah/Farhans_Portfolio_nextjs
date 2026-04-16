import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTA({ lang, dict }) {
  return (
    <section className="border-t border-[hsl(var(--border))] py-20">
      <div className="container-custom">
        <div className="rounded-2xl border border-[hsl(var(--border))] bg-gradient-to-br from-accent/5 to-transparent p-10 text-center sm:p-16">
          <h2 className="text-3xl font-bold sm:text-4xl">{dict.home.cta_final_title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{dict.home.cta_final_sub}</p>
          <Link
            href={`/${lang}/contact`}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-[hsl(var(--accent-foreground))] transition-opacity hover:opacity-90"
          >
            {dict.home.cta_final_button} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
