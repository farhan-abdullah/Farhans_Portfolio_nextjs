export function PageHeader({ label, title, sub }) {
  return (
    <div className="border-b border-[hsl(var(--border))] py-16 sm:py-20">
      <div className="container-custom">
        {label && (
          <p className="font-mono text-xs uppercase tracking-wider text-accent">{label}</p>
        )}
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        {sub && <p className="mt-3 max-w-2xl text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );
}
