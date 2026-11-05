import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ALL_TOPICS, MODULES, LEVELS, LEVEL_META, topicLevel } from '@/content/curriculum';
import { useProgress } from '@/lib/progress';
import { useStudy } from '@/lib/study';
import { Input } from '@/components/ui/input';
import LevelFilter from '@/components/LevelFilter';
import PageHeader from '@/components/PageHeader';
import TopicRow from '@/components/TopicRow';
import { cn } from '@/lib/utils';

export default function LessonLibrary() {
  const { completed } = useProgress();
  const { study } = useStudy();
  const preferred = study.prefs.level || 'all';
  const [level, setLevel] = useState(preferred);
  const [moduleId, setModuleId] = useState('all');
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return ALL_TOPICS.filter((topic) => {
      if (level !== 'all' && topicLevel(topic) !== level) return false;
      if (moduleId !== 'all' && topic.moduleId !== moduleId) return false;
      if (!needle) return true;
      return (
        topic.title.toLowerCase().includes(needle) ||
        topic.summary.toLowerCase().includes(needle) ||
        topic.moduleTitle.toLowerCase().includes(needle)
      );
    });
  }, [level, moduleId, query]);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Lesson library"
        title="Every lesson, searchable"
        description="Search by keyword or narrow the shelf down by difficulty tag and module."
      />

      <section className="glass rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/30 px-3">
          <Search size={15} className="shrink-0 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons — try loops, strings, lists…"
            className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            aria-label="Search lessons"
          />
        </div>

        <div className="mt-3">
          <LevelFilter value={level} onChange={setLevel} />
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setModuleId('all')}
            className={cn(
              'rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors',
              moduleId === 'all' ? 'border-neon-cyan/50 bg-neon-cyan/15 text-neon-cyan' : 'border-border bg-secondary/40 text-muted-foreground'
            )}
          >
            All modules
          </button>
          {MODULES.map((module) => (
            <button
              key={module.id}
              type="button"
              onClick={() => setModuleId(module.id)}
              className={cn(
                'rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors',
                moduleId === module.id
                  ? 'border-neon-cyan/50 bg-neon-cyan/15 text-neon-cyan'
                  : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'
              )}
            >
              {module.title}
            </button>
          ))}
        </div>
      </section>

      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-heading text-lg font-bold">
          <SlidersHorizontal size={15} className="text-neon-green" /> {results.length} lesson{results.length === 1 ? '' : 's'}
        </h2>
        <span className="text-xs text-muted-foreground">
          {level === 'all' ? 'All levels' : LEVEL_META[LEVELS.includes(level) ? level : 'beginner'].label}
        </span>
      </div>

      {results.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-center text-sm text-muted-foreground">
          No lesson matches that search. Try a shorter keyword or clear the filters.
        </div>
      ) : (
        <div className="space-y-2">
          {results.map((topic) => (
            <TopicRow
              key={topic.id}
              topic={{ ...topic, moduleAccent: MODULES.find((m) => m.id === topic.moduleId)?.accent }}
              record={completed[topic.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
}