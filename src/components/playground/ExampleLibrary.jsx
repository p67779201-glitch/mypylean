import React, { useMemo, useState } from 'react';
import { Play, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { GLOSSARY } from '@/content/glossary';
import { PLAYGROUND_PROGRAMS, PLAYGROUND_CATEGORIES } from '@/content/examples';
import { cn } from '@/lib/utils';

// A searchable shelf of runnable snippets: full programs plus one example
// for every glossary term, so students always have something concrete.
export default function ExampleLibrary({ onPick }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const items = useMemo(() => {
    const programs = PLAYGROUND_PROGRAMS.map((entry) => ({
      key: `program-${entry.label}`,
      label: entry.label,
      group: entry.category === 'Start here' ? 'Programs' : entry.category,
      caption: 'Full program',
      code: entry.code,
      isProgram: true,
    }));

    const terms = GLOSSARY.map((entry) => ({
      key: `term-${entry.term}`,
      label: entry.term,
      group: entry.category,
      caption: entry.definition,
      code: `# ${entry.term}\n${entry.code}`,
      isProgram: false,
    }));

    return [...programs, ...terms];
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const inCategory =
        category === 'All' ||
        (category === 'Programs' ? item.isProgram : !item.isProgram && item.group === category);
      if (!inCategory) return false;
      if (!q) return true;
      return item.label.toLowerCase().includes(q) || item.caption.toLowerCase().includes(q);
    });
  }, [items, query, category]);

  const programs = visible.filter((item) => item.isProgram);
  const terms = visible.filter((item) => !item.isProgram);

  const renderItem = (item) => (
    <button
      key={item.key}
      type="button"
      onClick={() => onPick(item.code)}
      className="group flex w-full items-start gap-2 rounded-xl border border-border/70 bg-secondary/25 px-3 py-2 text-left transition-colors hover:border-neon-cyan/50 hover:bg-secondary/50"
    >
      <Play size={11} className="mt-1 shrink-0 text-neon-cyan opacity-60 group-hover:opacity-100" />
      <span className="min-w-0">
        <span className="block truncate font-mono text-xs font-semibold text-foreground">{item.label}</span>
        <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">{item.caption}</span>
      </span>
    </button>
  );

  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-heading text-sm font-bold">Example library</h2>
        <span className="text-[11px] text-muted-foreground">
          {visible.length} of {items.length} examples
        </span>
      </div>

      <div className="relative mt-3">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search an example: dictionary, while loop, try…"
          className="pl-9"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {PLAYGROUND_CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={cn(
              'rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors',
              category === item
                ? 'border-neon-green/50 bg-neon-green/15 text-neon-green'
                : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-3 max-h-72 space-y-3 overflow-y-auto pr-1">
        {visible.length === 0 && (
          <p className="py-6 text-center text-xs text-muted-foreground">Nothing matches “{query}”.</p>
        )}

        {programs.length > 0 && (
          <div>
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Full programs
            </div>
            <div className="grid gap-1.5 sm:grid-cols-2">{programs.map(renderItem)}</div>
          </div>
        )}

        {terms.length > 0 && (
          <div>
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              One per glossary term
            </div>
            <div className="grid gap-1.5 sm:grid-cols-2">{terms.map(renderItem)}</div>
          </div>
        )}
      </div>
    </div>
  );
}