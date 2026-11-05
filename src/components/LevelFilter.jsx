import React from 'react';
import { LEVELS, LEVEL_META } from '@/content/curriculum';
import { cn } from '@/lib/utils';

// Shared beginner / intermediate / advanced filter used on the path and catalog.
export default function LevelFilter({ value, onChange }) {
  const options = [{ key: 'all', label: 'All levels' }, ...LEVELS.map((l) => ({ key: l, label: LEVEL_META[l].label }))];

  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={cn(
            'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
            value === key
              ? 'border-neon-green/50 bg-neon-green/15 text-neon-green'
              : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}