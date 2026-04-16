import { Globe2, Layers, Languages, Wrench } from 'lucide-react';

export function Services({ dict }) {
  const items = [
    { key: 'websites', icon: Globe2 },
    { key: 'webapps', icon: Layers },
    { key: 'multilingual', icon: Languages },
    { key: 'maintenance', icon: Wrench },
  ];
  return (
    <section className="border-t border-[hsl(var(--border))] py-20">
      <div className="container-custom">
        <p className="font-mono text-xs uppercase tracking-wider text-accent">{dict.services.label}</p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{dict.services.title}</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">{dict.services.sub}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="group rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-colors hover:border-accent"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">{dict.services.items[key].title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{dict.services.items[key].desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
