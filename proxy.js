// proxy.js
import { NextResponse } from "next/server";

// ==================== i18n CONFIG ====================
const i18n = {
  defaultLocale: "it",
  locales: ["it", "en", "bn"],
};

function getLocale(request) {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLang = request.headers.get("accept-language");
  if (!acceptLang) return i18n.defaultLocale;

  const preferred = acceptLang
    .split(",")
    .map((l) => {
      const [tag, q = "q=1"] = l.trim().split(";");
      return {
        tag: tag.toLowerCase(),
        q: parseFloat(q.replace("q=", "")) || 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferred) {
    const base = tag.split("-")[0];
    if (i18n.locales.includes(base)) return base;
  }
  return i18n.defaultLocale;
}

// ==================== PROXY (MIDDLEWARE) ====================
export function proxy(request) {
  const pathname = request.nextUrl.pathname;
  const urlLower = pathname.toLowerCase();

  // 🔥 BLOCCO ATTACCHI PHP / WEBSHELL
  if (
    urlLower.endsWith(".php") ||
    urlLower.includes(".php?") ||
    urlLower.includes("wp-") ||
    urlLower.includes("wp-admin") ||
    urlLower.includes("wp-content") ||
    urlLower.includes("wp-login") ||
    urlLower.includes("astab") ||
    urlLower.includes("marvins") ||
    urlLower.includes("dodo") ||
    urlLower.includes("wpputty") ||
    urlLower.includes("shell") ||
    urlLower.includes("gool") ||
    urlLower.includes("bbh") ||
    urlLower.includes("shadow-bot") ||
    urlLower.includes("zwso") ||
    urlLower.includes("zxcs") ||
    urlLower.includes("class-wp-")
  ) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  // 🔥 SKIP COMPLETO PER ADMIN + API + STATIC (importantissimo!)
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // ── LOGICA i18n (solo per pagine pubbliche) ──
  const localeFromPath = i18n.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (localeFromPath) {
    const res = NextResponse.next();
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    if (cookieLocale !== localeFromPath) {
      res.cookies.set("NEXT_LOCALE", localeFromPath, {
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    return res;
  }

  // Redirect automatico al locale corretto
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url);

  const res = NextResponse.redirect(newUrl);
  res.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|admin|favicon.ico|.*\\..*).*)"],
};// proxy.js
import { NextResponse } from "next/server";

// ==================== i18n CONFIG ====================
const i18n = {
  defaultLocale: "it",
  locales: ["it", "en", "bn"],
};

function getLocale(request) {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLang = request.headers.get("accept-language");
  if (!acceptLang) return i18n.defaultLocale;

  const preferred = acceptLang
    .split(",")
    .map((l) => {
      const [tag, q = "q=1"] = l.trim().split(";");
      return {
        tag: tag.toLowerCase(),
        q: parseFloat(q.replace("q=", "")) || 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferred) {
    const base = tag.split("-")[0];
    if (i18n.locales.includes(base)) return base;
  }
  return i18n.defaultLocale;
}

// ==================== PROXY (MIDDLEWARE) ====================
export function proxy(request) {
  const pathname = request.nextUrl.pathname;
  const urlLower = pathname.toLowerCase();

  // 🔥 BLOCCO ATTACCHI PHP / WEBSHELL
  if (
    urlLower.endsWith(".php") ||
    urlLower.includes(".php?") ||
    urlLower.includes("wp-") ||
    urlLower.includes("wp-admin") ||
    urlLower.includes("wp-content") ||
    urlLower.includes("wp-login") ||
    urlLower.includes("astab") ||
    urlLower.includes("marvins") ||
    urlLower.includes("dodo") ||
    urlLower.includes("wpputty") ||
    urlLower.includes("shell") ||
    urlLower.includes("gool") ||
    urlLower.includes("bbh") ||
    urlLower.includes("shadow-bot") ||
    urlLower.includes("zwso") ||
    urlLower.includes("zxcs") ||
    urlLower.includes("class-wp-")
  ) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  // 🔥 SKIP COMPLETO PER ADMIN + API + STATIC (importantissimo!)
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // ── LOGICA i18n (solo per pagine pubbliche) ──
  const localeFromPath = i18n.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (localeFromPath) {
    const res = NextResponse.next();
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    if (cookieLocale !== localeFromPath) {
      res.cookies.set("NEXT_LOCALE", localeFromPath, {
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    return res;
  }

  // Redirect automatico al locale corretto
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url);

  const res = NextResponse.redirect(newUrl);
  res.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|admin|favicon.ico|.*\\..*).*)"],
};