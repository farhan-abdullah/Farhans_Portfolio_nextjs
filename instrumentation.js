/**
 * Next.js Instrumentation Hook — runs once when the server starts.
 * Used here to suppress the React 19 + next-themes "script tag" warning
 * that appears in the terminal during SSR (cosmetic only, not a real error).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const original = console.error.bind(console);
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('Encountered a script tag while rendering React component')
      ) {
        return;
      }
      original(...args);
    };
  }
}
