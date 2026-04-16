'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { cn } from '@/lib/utils';

export function Navbar({ lang, dict }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: `/${lang}`, label: dict.nav.home, exact: true },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/projects`, label: dict.nav.projects },
    { href: `/${lang}/books`, label: dict.nav.books },
    { href: `/${lang}/blog`, label: dict.nav.blog },
    { href: `/${lang}/uses`, label: dict.nav.uses },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href, exact) => (exact ? pathname === href : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/80 backdrop-blur-md">
      <div className="container-custom flex h-16 items-center justify-between">
        <Link href={`/${lang}`} className="font-mono text-sm font-semibold">
          <span className="text-accent">farhan</span>.dev
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm transition-colors hover:bg-[hsl(var(--muted))]',
                isActive(link.href, link.exact) && 'text-accent'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`/cv/cv-farhan-${lang}.pdf`}
            download
            className="hidden items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-medium text-[hsl(var(--accent-foreground))] transition-opacity hover:opacity-90 md:inline-flex"
          >
            <Download className="h-4 w-4" />
            {dict.nav.cv_download}
          </a>
          <LanguageSwitcher lang={lang} dict={dict} />
          <ThemeToggle dict={dict} />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[hsl(var(--border))] md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-[hsl(var(--border))] md:hidden">
          <div className="container-custom flex flex-col py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2 text-sm transition-colors hover:bg-[hsl(var(--muted))]',
                  isActive(link.href, link.exact) && 'text-accent'
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`/cv/cv-farhan-${lang}.pdf`}
              download
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-medium text-[hsl(var(--accent-foreground))]"
            >
              <Download className="h-4 w-4" />
              {dict.nav.cv_download}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
