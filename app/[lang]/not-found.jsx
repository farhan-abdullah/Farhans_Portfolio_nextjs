import Link from 'next/link';
import { cookies } from 'next/headers';
import { getDictionary } from '@/lib/getDictionary';
import { i18n } from '@/lib/i18n-config';

// NOTE: not-found.jsx non riceve params in Next 16, quindi leggiamo la locale
// dal cookie NEXT_LOCALE (settato dal proxy) con fallback alla defaultLocale.
export default async function NotFound() {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get('NEXT_LOCALE')?.value;
  const lang = i18n.locales.includes(cookieLang) ? cookieLang : i18n.defaultLocale;
  const dict = await getDictionary(lang);

  return (
    <section className="container-custom flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-bold">{dict.common.not_found}</h1>
      <Link
        href={`/${lang}`}
        className="mt-6 rounded-md border border-[hsl(var(--border))] px-4 py-2 text-sm hover:bg-[hsl(var(--muted))]"
      >
        ← {dict.common.back_home}
      </Link>
    </section>
  );
}
