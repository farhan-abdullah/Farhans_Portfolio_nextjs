import { NextResponse } from 'next/server';

// Next.js 16: `middleware.js` è stato rinominato `proxy.js`.
// Il runtime è sempre Node.js (edge non più supportato in proxy).

// Inline config per evitare problemi di alias @/ nel contesto proxy.
const i18n = {
  defaultLocale: 'it',
  locales: ['it', 'en', 'bn'],
};

function getLocale(request) {
  // 1. Cookie: rispetta la scelta manuale dell'utente.
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Accept-Language header.
  const acceptLang = request.headers.get('accept-language');
  if (!acceptLang) return i18n.defaultLocale;

  const preferred = acceptLang
    .split(',')
    .map((l) => {
      const [tag, q = 'q=1'] = l.trim().split(';');
      return {
        tag: tag.toLowerCase(),
        q: parseFloat(q.replace('q=', '')) || 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferred) {
    const base = tag.split('-')[0];
    if (i18n.locales.includes(base)) return base;
  }
  return i18n.defaultLocale;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Skip static, api, admin panel, e files con estensione.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Se l'URL ha già un locale, persisti il cookie.
  const localeFromPath = i18n.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (localeFromPath) {
    const res = NextResponse.next();
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (cookieLocale !== localeFromPath) {
      res.cookies.set('NEXT_LOCALE', localeFromPath, {
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365, // 1 anno
      });
    }
    return res;
  }

  // Redirect al locale rilevato.
  const locale = getLocale(request);
  const newUrl = new URL(
    `/${locale}${pathname === '/' ? '' : pathname}`,
    request.url
  );
  const res = NextResponse.redirect(newUrl);
  res.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}

export const config = {
  matcher: ['/((?!_next|api|admin|.*\\..*).*)'],
};
