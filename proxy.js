// proxy.js
import { NextResponse } from "next/server";

// ==================== CONFIGURAZIONE i18n ====================
const i18n = {
  defaultLocale: "it",
  locales: ["it", "en", "bn"],
};

function getLocale(request) {
  // 1. Cookie (scelta manuale dell'utente)
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Accept-Language header
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

// ==================== MIDDLEWARE ====================
export function proxy(request) {
  const url = request.nextUrl.pathname.toLowerCase();

  // 🔥 BLOCCO ATTACCHI PHP / WEBSHELL
  if (
    url.endsWith(".php") ||
    url.includes(".php?") ||
    url.includes("wp-") ||
    url.includes("wp-admin") ||
    url.includes("wp-content") ||
    url.includes("wp-login") ||
    url.includes("astab") ||
    url.includes("marvins") ||
    url.includes("dodo") ||
    url.includes("wpputty") ||
    url.includes("shell") ||
    url.includes("gool") ||
    url.includes("bbh") ||
    url.includes("shadow-bot") ||
    url.includes("zwso") ||
    url.includes("zxcs") ||
    url.includes("class-wp-")
  ) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  // ── LOGICA i18n (non toccata) ──
  const { pathname } = request.nextUrl;

  // Skip static files, API, admin e file con estensione
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Se l'URL ha già il locale, aggiorna solo il cookie se necessario
  const localeFromPath = i18n.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
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
  const newUrl = new URL(
    `/${locale}${pathname === "/" ? "" : pathname}`,
    request.url,
  );

  const res = NextResponse.redirect(newUrl);
  res.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|admin|.*\\..*).*)"],
};
