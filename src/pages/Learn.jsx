import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Unlock, ArrowRight } from 'lucide-react';
import { MODULES, TOPIC_COUNT, moduleProgress, ALL_TOPICS, topicLevel } from '@/content/curriculum';
import { useProgress } from '@/lib/progress';
import { accent } from '@/lib/theme';
import TopicRow from '@/components/TopicRow';
import LevelFilter from '@/components/LevelFilter';
import { cn } from '@/lib/utils';

export default function Learn() {
  const { completed, done, percent } = useProgress();
  const [level, setLevel] = useState('all');
  const nextId = ALL_TOPICS.find((t) => !completed[t.id])?.id;

  return (
    <div className="space-y-10">
      <header>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">Your learning path</h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Every lesson is open. Finish a lesson's three-question check and it gets ticked off — no waiting to unlock the next one.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-right">
            <div className="font-heading text-2xl font-bold text-neon-green">{percent}%</div>
            <div className="text-xs text-muted-foreground">
              {done} of {TOPIC_COUNT} topics complete
            </div>
          </div>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple transition-all duration-700" style={{ width: `${percent}%` }} />
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Unlock size={12} className="text-neon-green" /> No locks, no ads, no waiting — learn at your own pace.
        </div>

        <div className="mt-4">
          <LevelFilter value={level} onChange={setLevel} />
        </div>
      </header>

      <div className="space-y-10">
        {MODULES.map((module, moduleIndex) => {
          const stats = moduleProgress(module, completed);
          const theme = accent(module.accent);
          const topics = module.topics.filter((t) => level === 'all' || topicLevel(t) === level);
          if (!topics.length) return null;
          return (
            <section key={module.id} id={module.id} className="scroll-mt-24">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className={cn('rounded-lg border px-2 py-1 font-mono text-[11px] font-semibold', theme.chip)}>
                    Module {String(moduleIndex + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="font-heading text-xl font-bold tracking-tight">{module.title}</h2>
                    <p className="text-xs text-muted-foreground">{module.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {stats.complete && (
                    <span className="flex items-center gap-1 rounded-full border border-neon-green/40 bg-neon-green/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-neon-green">
                      <CheckCircle2 size={11} /> Module complete
                    </span>
                  )}
                  <span className="text-xs font-medium text-muted-foreground">
                    {stats.done}/{stats.total} done
                  </span>
                </div>
              </div>

              <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-secondary">
                <div className={cn('h-full rounded-full transition-all duration-500', theme.bar)} style={{ width: `${stats.pct}%` }} />
              </div>

              <div className="space-y-2">
                {topics.map((topic) => {
                  const enriched = { ...topic, topicIndex: module.topics.indexOf(topic), moduleAccent: module.accent };
                  return (
                    <div key={topic.id} className={nextId === topic.id ? 'relative' : undefined}>
                      <TopicRow topic={enriched} record={completed[topic.id]} />
                      {nextId === topic.id && (
                        <span className="absolute -right-1 -top-1 rounded-full bg-neon-cyan px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-background">
                          Up next
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <section className="glass flex flex-col items-start justify-between gap-4 rounded-2xl p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-heading text-lg font-bold">Finished the path?</h2>
          <p className="text-sm text-muted-foreground">Try the playground — write anything you like and run it.</p>
        </div>
        <Link to="/playground" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          Open playground <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}