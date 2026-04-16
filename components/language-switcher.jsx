'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, Check } from 'lucide-react';
import { i18n, localeNames } from '@/lib/i18n-config';

export function LanguageSwitcher({ lang, dict }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const switchTo = (newLang) => {
    // Persist choice in cookie
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
    // Replace the current lang segment
    const segments = pathname.split('/');
    segments[1] = newLang;
    router.push(segments.join('/'));
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex h-9 items-center gap-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 text-sm transition-colors hover:bg-[hsl(var(--muted))]"
        aria-label={dict?.language?.change_language}
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{lang}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[160px] rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-1 shadow-lg">
          {i18n.locales.map((l) => (
            <button
              key={l}
              onClick={() => switchTo(l)}
              className="flex w-full items-center justify-between rounded px-3 py-2 text-sm transition-colors hover:bg-[hsl(var(--muted))]"
            >
              <span>{localeNames[l]}</span>
              {l === lang && <Check className="h-4 w-4 text-accent" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
