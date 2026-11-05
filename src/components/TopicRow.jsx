import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { topicLevel, LEVEL_META } from '@/content/curriculum';
import { cn } from '@/lib/utils';

export default function TopicRow({ topic, record }) {
  const done = !!record;
  const level = LEVEL_META[topicLevel(topic)];
  return (
    <Link
      to={`/lesson/${topic.id}`}
      className={cn(
        'group flex items-center gap-3.5 rounded-xl border px-3.5 py-3 transition-colors sm:px-4',
        done
          ? 'border-neon-green/25 bg-neon-green/[0.04] hover:border-neon-green/50'
          : 'border-border/70 bg-secondary/30 hover:border-neon-cyan/40 hover:bg-secondary'
      )}
    >
      <span
        className={cn(
          'grid h-9 w-9 shrink-0 place-items-center rounded-full border font-mono text-xs font-bold',
          done ? 'border-neon-green/50 bg-neon-green/15 text-neon-green' : 'border-border text-muted-foreground'
        )}
      >
        {done ? <Check size={15} /> : String(topic.topicIndex + 1).padStart(2, '0')}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-sm font-semibold">{topic.title}</span>
          {record?.perfect && <Sparkles size={12} className="shrink-0 text-neon-gold" aria-label="Perfect quiz" />}
        </div>
        <p className="truncate text-xs text-muted-foreground">{topic.summary}</p>
      </div>

      <span className={cn('hidden shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold sm:inline', level.chip)}>
        {level.label}
      </span>

      <span className="hidden items-center gap-1 text-[11px] text-muted-foreground sm:flex">
        <Clock size={11} /> {topic.minutes} min
      </span>

      {done ? (
        <span className="shrink-0 rounded-full border border-neon-green/40 bg-neon-green/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-neon-green">
          Completed
        </span>
      ) : (
        <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors group-hover:text-neon-cyan">
          Open <ArrowRight size={13} />
        </span>
      )}
    </Link>
  );
}