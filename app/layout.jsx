import { Inter, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { headers } from 'next/headers';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/theme-provider';
import { i18n } from '@/lib/i18n-config';
import './globals.css';

const GA_ID = 'G-61LV8L2PRW';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export default function RootLayout({ children }) {
  const h = headers();
  let cookieHeader = '';

  // Turbopack/Next può restituire un oggetto senza metodo `.get()`.
  if (h) {
    if (typeof h.get === 'function') {
      cookieHeader = h.get('cookie') ?? '';
    } else {
      cookieHeader = h.cookie ?? h['cookie'] ?? '';
      if (!cookieHeader) {
        try {
          for (const entry of h) {
            const [key, val] = entry;
            if (typeof key === 'string' && key.toLowerCase() === 'cookie') {
              cookieHeader = val ?? '';
              break;
            }
          }
        } catch {
          // ignore - best-effort
        }
      }
    }
  }

  const getCookieValue = (name) => {
    const parts = cookieHeader.split(';').map((p) => p.trim());
    const match = parts.find((p) => p.startsWith(`${name}=`));
    if (!match) return undefined;
    return decodeURIComponent(match.slice(name.length + 1));
  };

  const cookieLang = getCookieValue('NEXT_LOCALE');
  const htmlLang = i18n.locales.includes(cookieLang) ? cookieLang : i18n.defaultLocale;

  return (
    <html lang={htmlLang} suppressHydrationWarning className={`${inter.variable} ${geistMono.variable}`}>
      <head>
        {/* Keep `<html lang>` consistent with the URL locale (no-cookie first visit). */}
        <Script id="set-html-lang-from-path" strategy="beforeInteractive">
          {`
            (function () {
              var path = window.location.pathname || '';
              var parts = path.split('/');
              var locale = parts[1];
              var allowed = ['it', 'en', 'bn'];
              if (allowed.indexOf(locale) !== -1) {
                document.documentElement.lang = locale;
              }
            })();
          `}
        </Script>
        {/* Google Analytics GA4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
