// proxy.js
import { NextResponse } from 'next/server';

// Configurazione i18n (la tua originale)
const i18n = {
  defaultLocale: 'it',
  locales: ['it', 'en', 'bn'],
};

function getLocale(request) {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale)) {
    return cookieLocale;
  }

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
  const url = request.nextUrl.pathname.toLowerCase();

  // 🔥 BLOCCO ATTACCHI PHP / WEBSHELL (aggiunto ora)
  if (
    url.endsWith('.php') ||
    url.includes('.php?') ||
    url.includes('wp-') ||
    url.includes('wp-admin') ||
    url.includes('wp-content') ||
    url.includes('wp-login') ||
    url.includes('astab') ||
    url.includes('marvins') ||
    url.includes('dodo') ||
    url.includes('wpputty') ||
    url.includes('shell') ||
    url.includes('gool') ||
    url.includes('bbh') ||
    url.includes('shadow-bot') ||
    url.includes('zwso') ||
    url.includes('zxcs') ||
    url.includes('class-wp-')
  ) {
    return NextResponse.json({ message: 'Not Found' }, { status: 404 });
  }

  // ── IL RESTO DELLA TUA LOGICA i18n (non toccata) ──
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

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
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    return res;
  }

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
};// proxy.js
import { NextResponse } from 'next/server';

// Configurazione i18n (la tua originale)
const i18n = {
  defaultLocale: 'it',
  locales: ['it', 'en', 'bn'],
};

function getLocale(request) {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale)) {
    return cookieLocale;
  }

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
  const url = request.nextUrl.pathname.toLowerCase();

  // 🔥 BLOCCO ATTACCHI PHP / WEBSHELL (aggiunto ora)
  if (
    url.endsWith('.php') ||
    url.includes('.php?') ||
    url.includes('wp-') ||
    url.includes('wp-admin') ||
    url.includes('wp-content') ||
    url.includes('wp-login') ||
    url.includes('astab') ||
    url.includes('marvins') ||
    url.includes('dodo') ||
    url.includes('wpputty') ||
    url.includes('shell') ||
    url.includes('gool') ||
    url.includes('bbh') ||
    url.includes('shadow-bot') ||
    url.includes('zwso') ||
    url.includes('zxcs') ||
    url.includes('class-wp-')
  ) {
    return NextResponse.json({ message: 'Not Found' }, { status: 404 });
  }

  // ── IL RESTO DELLA TUA LOGICA i18n (non toccata) ──
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

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
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    return res;
  }

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