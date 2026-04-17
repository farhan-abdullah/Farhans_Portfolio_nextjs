import { ThemeProvider } from '@/components/theme-provider';
import { i18n } from '@/lib/i18n-config';
import { Geist_Mono, Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Script from 'next/script';
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
        {/* Native script moved to <head> for synchronous execution before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var path = window.location.pathname || '';
                var parts = path.split('/');
                var locale = parts[1];
                var allowed = ['it', 'en', 'bn'];
                if (allowed.indexOf(locale) !== -1) {
                  document.documentElement.lang = locale;
                }
              })();
            `
          }}
        />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        {/* Google Analytics GA4 - attivo solo se NEXT_PUBLIC_GA_ID è settato */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}');
                `
              }}
            />
          </>
        )}
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