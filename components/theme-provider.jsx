'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Suppress the React 19 "Encountered a script tag" warning thrown synchronously
// during render by next-themes' inline theme-detection script.
// This is a known cosmetic issue (next-themes#504) — theme works correctly.
const _consoleError = typeof console !== 'undefined' ? console.error.bind(console) : null;
if (_consoleError) {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Encountered a script tag while rendering React component')
    ) {
      return;
    }
    _consoleError(...args);
  };
}

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
