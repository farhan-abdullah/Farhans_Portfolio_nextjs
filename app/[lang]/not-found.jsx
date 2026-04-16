import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-custom flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <Link href="/" className="mt-6 rounded-md border border-[hsl(var(--border))] px-4 py-2 text-sm hover:bg-[hsl(var(--muted))]">
        ← Back to home
      </Link>
    </section>
  );
}
