import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { MODULES, LEVEL_META, moduleLevel, moduleProgress, topicLevel } from '@/content/curriculum';
import { useProgress } from '@/lib/progress';
import { accent } from '@/lib/theme';
import PageHeader from '@/components/PageHeader';
import { cn } from '@/lib/utils';

export default function Modules() {
  const { completed } = useProgress();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Module overview"
        title="How the curriculum is built"
        description="Six modules, 24 lessons. Each one builds on the last, but every lesson stays open so you can jump around."
      />

      <div className="space-y-4">
        {MODULES.map((module, i) => {
          const stats = moduleProgress(module, completed);
          const theme = accent(module.accent);
          const level = LEVEL_META[moduleLevel(module)];
          const minutes = module.topics.reduce((sum, t) => sum + t.minutes, 0);
          const nextTopic = module.topics.find((t) => !completed[t.id]) || module.topics[0];

          return (
            <section key={module.id} className={cn('glass rounded-2xl p-5', theme.border)}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cn('rounded-lg border px-2 py-0.5 font-mono text-[10px] font-semibold', theme.chip)}>
                      Module {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-semibold', level.chip)}>{level.label}</span>
                    {stats.complete && (
                      <span className="flex items-center gap-1 rounded-full border border-neon-green/40 bg-neon-green/10 px-2 py-0.5 text-[10px] font-semibold text-neon-green">
                        <CheckCircle2 size={10} /> Complete
                      </span>
                    )}
                  </div>
                  <h2 className="mt-2 font-heading text-lg font-bold">{module.title}</h2>
                  <p className="text-sm text-muted-foreground">{module.tagline}</p>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <div>{stats.done}/{stats.total} lessons</div>
                  <div>~{minutes} min</div>
                </div>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className={cn('h-full rounded-full', theme.bar)} style={{ width: `${stats.pct}%` }} />
              </div>

              <ul className="mt-4 space-y-1.5">
                {module.topics.map((topic) => {
                  const done = !!completed[topic.id];
                  const topicMeta = LEVEL_META[topicLevel(topic)];
                  return (
                    <li key={topic.id}>
                      <Link to={`/lesson/${topic.id}`} className="flex items-center gap-2.5 rounded-lg px-1.5 py-1 text-sm transition-colors hover:bg-secondary/50">
                        {done ? <CheckCircle2 size={13} className="shrink-0 text-neon-green" /> : <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-border" />}
                        <span className={cn('truncate', done ? 'text-muted-foreground' : 'font-medium')}>{topic.title}</span>
                        <span className={cn('ml-auto shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] font-semibold', topicMeta.chip)}>
                          {topicMeta.label}
                        </span>
                        <span className="shrink-0 text-[11px] text-muted-foreground">{topic.minutes}m</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <Link to={`/lesson/${nextTopic.id}`} className={cn('mt-3 inline-flex items-center gap-1 text-xs font-semibold', theme.text)}>
                {stats.done === 0 ? 'Start module' : stats.complete ? 'Review module' : 'Continue module'} <ArrowRight size={12} />
              </Link>
            </section>
          );
        })}
      </div>
    </div>
  );
}