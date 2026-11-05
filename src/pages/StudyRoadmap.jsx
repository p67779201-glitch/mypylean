import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Flag, Route } from 'lucide-react';
import { LEVELS, LEVEL_META, ALL_TOPICS, MODULES, TOPIC_COUNT, topicsByLevel } from '@/content/curriculum';
import { useProgress } from '@/lib/progress';
import { useStudy } from '@/lib/study';
import PageHeader from '@/components/PageHeader';
import { cn } from '@/lib/utils';

const accentFor = (moduleId) => MODULES.find((m) => m.id === moduleId)?.accent || 'lime';

const ACCENT_DOT = {
  lime: 'border-neon-green/60 bg-neon-green text-primary-foreground',
  cyan: 'border-neon-cyan/60 bg-neon-cyan text-accent-foreground',
  violet: 'border-neon-purple/60 bg-neon-purple text-primary-foreground',
  amber: 'border-neon-gold/60 bg-neon-gold text-primary-foreground',
  rose: 'border-neon-pink/60 bg-neon-pink text-primary-foreground',
};

export default function StudyRoadmap() {
  const { completed, done, percent } = useProgress();
  const { study } = useStudy();
  const weeklyGoal = study.weeklyGoal || 5;
  const remaining = TOPIC_COUNT - done;
  const weeksLeft = Math.ceil(remaining / weeklyGoal);
  const nextTopic = ALL_TOPICS.find((t) => !completed[t.id]);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Study roadmap"
        title="Beginner to advanced, in one line"
        description="Your whole journey laid out in order. The highlighted stop is where you are right now."
      >
        <div className="rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-right">
          <div className="font-heading text-2xl font-bold text-neon-green">{percent}%</div>
          <div className="text-xs text-muted-foreground">
            {weeklyGoal} lessons/week · ~{weeksLeft} week{weeksLeft === 1 ? '' : 's'} to finish
          </div>
        </div>
      </PageHeader>

      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Journey progress</span>
          <span>{done} of {TOPIC_COUNT} stops</span>
        </div>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple" style={{ width: `${percent}%` }} />
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Flag size={11} className="text-neon-gold" /> Finish line: all {TOPIC_COUNT} lessons, at your weekly pace.
        </div>
      </div>

      <div className="space-y-8">
        {LEVELS.map((level, levelIndex) => {
          const topics = topicsByLevel(level);
          const levelDone = topics.filter((t) => completed[t.id]).length;
          const levelPct = topics.length ? Math.round((levelDone / topics.length) * 100) : 0;
          const meta = LEVEL_META[level];
          return (
            <section key={level}>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className={cn('rounded-full border px-2.5 py-1 text-[11px] font-semibold', meta.chip)}>{meta.label}</span>
                  <h2 className="font-heading text-lg font-bold tracking-tight">Stage {levelIndex + 1}</h2>
                </div>
                <span className="text-xs text-muted-foreground">{levelDone}/{topics.length} · {levelPct}%</span>
              </div>

              <div className="relative ml-4 border-l border-border/70 pl-6">
                {topics.map((topic) => {
                  const doneTopic = !!completed[topic.id];
                  const isNext = nextTopic?.id === topic.id;
                  return (
                    <div key={topic.id} className="relative pb-4 last:pb-0">
                      <span
                        className={cn(
                          'absolute -left-[2.1rem] top-1 grid h-6 w-6 place-items-center rounded-full border text-[10px] font-bold',
                          doneTopic
                            ? ACCENT_DOT[accentFor(topic.moduleId)] || ACCENT_DOT.lime
                            : 'border-border bg-background text-muted-foreground',
                          isNext && 'ring-2 ring-neon-cyan/60 ring-offset-2 ring-offset-background'
                        )}
                      >
                        {doneTopic ? <CheckCircle2 size={12} /> : topic.topicIndex + 1}
                      </span>
                      <Link
                        to={`/lesson/${topic.id}`}
                        className={cn(
                          'block rounded-xl border px-4 py-3 transition-colors',
                          doneTopic
                            ? 'border-neon-green/25 bg-neon-green/[0.04]'
                            : isNext
                              ? 'border-neon-cyan/50 bg-neon-cyan/[0.06]'
                              : 'border-border/70 bg-secondary/25 hover:border-neon-cyan/40'
                        )}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold">{topic.title}</span>
                          {isNext && (
                            <span className="rounded-full bg-neon-cyan/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-neon-cyan">
                              You are here
                            </span>
                          )}
                          {doneTopic && <span className="text-[11px] text-neon-green">done</span>}
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {topic.moduleTitle} · {topic.minutes} min
                        </p>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <section className="glass flex flex-col items-start justify-between gap-3 rounded-2xl p-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Route size={18} className="text-neon-cyan" />
          <div>
            <h2 className="font-heading text-base font-bold">Adjust the pace</h2>
            <p className="text-sm text-muted-foreground">
              Change your weekly target and this estimate updates.
            </p>
          </div>
        </div>
        <Link to="/learning-path" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          Learning path settings <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}