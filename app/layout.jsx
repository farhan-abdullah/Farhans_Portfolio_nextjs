import { Inter, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { cookies } from 'next/headers';
import { ThemeProvider } from '@/components/theme-provider';
import { i18n } from '@/lib/i18n-config';
import './globals.css';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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

export default async function RootLayout({ children }) {
  // Next 16: cookies() è async, ritorna ReadonlyRequestCookies.
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get('NEXT_LOCALE')?.value;
  const htmlLang = i18n.locales.includes(cookieLang) ? cookieLang : i18n.defaultLocale;

  return (
    <html
      lang={htmlLang}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Sync <html lang> con l'URL al primo paint (prima che il cookie sia settato). */}
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
        {/* Google Analytics GA4 - attivo solo se NEXT_PUBLIC_GA_ID è settato */}
        {GA_ID && (
          <>
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
          </>
        )}
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
      </body>
    </html>
  );
}
