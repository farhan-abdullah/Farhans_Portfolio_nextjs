'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Monitor } from 'lucide-react';

export function ThemeToggle({ dict }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button className="h-9 w-9 rounded-md border border-[hsl(var(--border))]" aria-label="Theme" />
    );
  }

  const cycle = () => {
    const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(next);
  };

  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;
  const label =
    theme === 'light' ? dict?.theme?.light : theme === 'dark' ? dict?.theme?.dark : dict?.theme?.system;

  return (
    <button
      onClick={cycle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] transition-colors hover:bg-[hsl(var(--muted))]"
      aria-label={label}
      title={label}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
