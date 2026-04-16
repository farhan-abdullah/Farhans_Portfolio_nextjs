import { NextResponse } from "next/server";

// Inline config to avoid @/ alias issues in proxy (middleware) context
const i18n = {
  defaultLocale: "it",
  locales: ["it", "en", "bn"],
};

function getLocale(request) {
  // Check cookie first (user's manual choice persists)
  const cookieLocale = request.cookies?.get?.("NEXT_LOCALE")?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // Parse Accept-Language header
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

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Skip static, api, admin panel, and files with extensions
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const localeFromPath = i18n.locales.find((locale) => {
    return pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`;
  });

  // If the URL already has a locale, persist it in the cookie so SSR can set `<html lang>`.
  if (localeFromPath) {
    const res = NextResponse.next();
    const cookieLocale = request.cookies?.get?.("NEXT_LOCALE")?.value;
    if (cookieLocale !== localeFromPath) {
      res.cookies.set("NEXT_LOCALE", localeFromPath, {
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
    }
    return res;
  }

  // Redirect to detected locale
  const locale = getLocale(request);
  const newUrl = new URL(
    `/${locale}${pathname === "/" ? "" : pathname}`,
    request.url,
  );
  const res = NextResponse.redirect(newUrl);
  res.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|admin|.*\\..*).*)"],
};
