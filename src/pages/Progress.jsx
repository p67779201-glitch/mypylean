import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Flame, Zap, Sparkles, RotateCcw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MODULES, TOPIC_COUNT, moduleProgress } from '@/content/curriculum';
import { useProgress } from '@/lib/progress';
import { accent } from '@/lib/theme';
import ProgressBadges, { recentCompletions } from '@/components/ProgressBadges';
import { cn } from '@/lib/utils';

export default function Progress() {
  const { progress, completed, done, percent, level, levelXp, xpToNext, reset } = useProgress();
  const [confirming, setConfirming] = useState(false);
  const recent = recentCompletions(completed, 6);

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">Your progress</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Everything you finish is remembered on this device — no account needed.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="glass relative overflow-hidden rounded-2xl p-6">
          <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-neon-green/15 blur-3xl" />
          <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Level</div>
          <div className="mt-1 flex items-end gap-3">
            <span className="font-heading text-5xl font-extrabold leading-none text-gradient">{level}</span>
            <span className="pb-1 text-xs text-muted-foreground">{levelXp} / {xpToNext} XP to level {level + 1}</span>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-gradient-to-r from-neon-green to-neon-cyan transition-all duration-700" style={{ width: `${Math.round((levelXp / xpToNext) * 100)}%` }} />
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>{progress.xp} XP total</span>
            <span>{percent}% of the path</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: CheckCircle2, value: `${done}/${TOPIC_COUNT}`, label: 'Topics completed', tone: 'text-neon-green' },
            { icon: Flame, value: progress.streak || 0, label: 'Day streak', tone: 'text-neon-gold' },
            { icon: Sparkles, value: progress.perfect, label: 'Perfect checks', tone: 'text-neon-purple' },
            { icon: Zap, value: progress.xp, label: 'XP earned', tone: 'text-neon-cyan' },
          ].map(({ icon: Icon, value, label, tone }) => (
            <div key={label} className="glass rounded-2xl p-4">
              <Icon size={16} className={tone} />
              <div className="mt-2 font-heading text-xl font-bold leading-none">{value}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-xl font-bold tracking-tight">Modules</h2>
        <div className="glass divide-y divide-border/60 rounded-2xl">
          {MODULES.map((module, i) => {
            const stats = moduleProgress(module, completed);
            const theme = accent(module.accent);
            return (
              <div key={module.id} className="flex items-center gap-4 p-4">
                <span className={cn('rounded-lg border px-2 py-1 font-mono text-[10px] font-semibold', theme.chip)}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold">{module.title}</span>
                    {stats.complete && <CheckCircle2 size={13} className="shrink-0 text-neon-green" />}
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-secondary">
                    <div className={cn('h-full rounded-full', theme.bar)} style={{ width: `${stats.pct}%` }} />
                  </div>
                </div>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{stats.done}/{stats.total}</span>
                <Link to={`/lesson/${module.topics[0].id}`} aria-label={`Open ${module.title}`} className="text-muted-foreground hover:text-foreground">
                  <ArrowRight size={15} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-xl font-bold tracking-tight">Recently completed</h2>
        {recent.length === 0 ? (
          <div className="glass rounded-2xl p-6 text-center text-sm text-muted-foreground">
            Nothing yet — <Link to="/learn" className="font-semibold text-neon-green hover:underline">start your first lesson</Link>.
          </div>
        ) : (
          <div className="glass divide-y divide-border/60 rounded-2xl">
            {recent.map(({ topic, record }) => (
              <Link key={topic.id} to={`/lesson/${topic.id}`} className="flex items-center gap-3 p-4 transition-colors hover:bg-secondary/40">
                <CheckCircle2 size={16} className="shrink-0 text-neon-green" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{topic.title}</div>
                  <div className="text-[11px] text-muted-foreground">{topic.moduleTitle}</div>
                </div>
                <span className="shrink-0 text-[11px] text-muted-foreground">
                  {record.total ? `${record.score}/${record.total} · ` : 'Practise · '}
                  {new Date(record.at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <ProgressBadges
        completed={completed}
        stats={{ done, perfect: progress.perfect, streak: progress.streak || 0, total: TOPIC_COUNT }}
      />

      <section className="glass rounded-2xl p-5">
        <h2 className="font-heading text-base font-bold">Start over</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Clearing your progress removes every tick and badge on this device. Lessons stay open either way.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => {
              if (confirming) {
                reset();
                setConfirming(false);
              } else {
                setConfirming(true);
              }
            }}
          >
            <RotateCcw size={14} className="mr-1.5" />
            {confirming ? 'Tap again to clear everything' : 'Reset my progress'}
          </Button>
          {confirming && (
            <button type="button" onClick={() => setConfirming(false)} className="text-xs text-muted-foreground hover:text-foreground">
              Cancel
            </button>
          )}
        </div>
      </section>
    </div>
  );
}