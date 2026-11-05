import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Play, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GLOSSARY, GLOSSARY_CATEGORIES, searchGlossary } from '@/content/glossary';
import PageHeader from '@/components/PageHeader';
import { cn } from '@/lib/utils';

const ALL = 'All';

export default function Glossary() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(ALL);

  const entries = searchGlossary(query).filter((entry) => category === ALL || entry.category === category);

  const runInPlayground = (entry) => {
    try {
      window.sessionStorage.setItem('pyrolearn.snippet', `# ${entry.term}\n${entry.code}`);
    } catch {
      /* storage blocked — the playground still opens */
    }
    navigate('/playground');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Glossary"
        title="Every term, with something you can run"
        description={`${GLOSSARY.length} Python words explained the way you would explain them to a friend — each one with a working example you can open in the playground.`}
      >
        <span className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
          <BookOpen size={12} /> {entries.length} shown
        </span>
      </PageHeader>

      <div className="glass rounded-2xl p-4">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a term, e.g. dictionary, scope, ValueError…"
            className="pl-9"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {[ALL, ...GLOSSARY_CATEGORIES].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn(
                'rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors',
                category === item
                  ? 'border-neon-green/50 bg-neon-green/15 text-neon-green'
                  : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-sm text-muted-foreground">Nothing matches “{query}”. Try a shorter word.</p>
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {entries.map((entry) => (
            <article key={entry.term} className="glass card-hover flex flex-col rounded-2xl p-4">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-mono text-sm font-bold text-neon-cyan">{entry.term}</h2>
                <span className="shrink-0 rounded-full border border-border/70 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  {entry.category}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.definition}</p>
              <pre className="code-block mt-3 py-2 text-[11px]">{entry.code}</pre>
              <Button
                size="sm"
                variant="secondary"
                className="mt-3 self-start rounded-full px-3"
                onClick={() => runInPlayground(entry)}
              >
                <Play size={12} className="mr-1" /> Try it in the playground
              </Button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}