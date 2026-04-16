import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export function Footer({ lang, dict }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[hsl(var(--border))] py-10">
      <div className="container-custom flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
        <div>
          <p className="font-medium text-[hsl(var(--foreground))]">{siteConfig.name}</p>
          <p className="text-xs">{dict.footer.tagline}</p>
        </div>
        <div className="flex items-center gap-4">
          <a href={siteConfig.links.github} target="_blank" rel="noopener" aria-label="GitHub">
            <Github className="h-4 w-4 transition-colors hover:text-accent" />
          </a>
          <a href={siteConfig.links.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
            <Linkedin className="h-4 w-4 transition-colors hover:text-accent" />
          </a>
          <a href={`mailto:${siteConfig.author.email}`} aria-label="Email">
            <Mail className="h-4 w-4 transition-colors hover:text-accent" />
          </a>
        </div>
        <div className="text-xs">
          © {year} · {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}
