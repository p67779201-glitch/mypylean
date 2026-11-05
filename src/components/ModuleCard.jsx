import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { moduleProgress } from '@/content/curriculum';
import { useProgress } from '@/lib/progress';
import { accent } from '@/lib/theme';
import { cn } from '@/lib/utils';

export default function ModuleCard({ module, index }) {
  const { completed } = useProgress();
  const stats = moduleProgress(module, completed);
  const theme = accent(module.accent);
  const firstTopic = module.topics[0];
  const continueTopic = module.topics.find((t) => !completed[t.id]) || firstTopic;

  return (
    <Link
      to={`/lesson/${continueTopic.id}`}
      className={cn(
        'group glass card-hover flex flex-col rounded-2xl p-5',
        theme.border
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className={cn('rounded-lg border px-2 py-1 font-mono text-[11px] font-semibold', theme.chip)}>
            {String(index + 1).padStart(2, '0')}
          </span>
          {stats.complete && (
            <span className="flex items-center gap-1 rounded-full border border-neon-green/40 bg-neon-green/10 px-2 py-0.5 text-[11px] font-semibold text-neon-green">
              <CheckCircle2 size={11} /> Completed
            </span>
          )}
        </div>
        <span className="text-[11px] font-medium text-muted-foreground">
          {stats.done}/{stats.total}
        </span>
      </div>

      <h3 className="mt-3 font-heading text-lg font-bold leading-snug">{module.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{module.tagline}</p>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn('h-full rounded-full transition-all duration-500', theme.bar)}
          style={{ width: `${stats.pct}%` }}
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          {stats.done === 0 ? 'Not started' : stats.complete ? 'All lessons done' : `${stats.pct}% done`}
        </span>
        <span className={cn('flex items-center gap-1 font-semibold', theme.text)}>
          {stats.done === 0 ? 'Start' : stats.complete ? 'Review' : 'Continue'}
          <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}