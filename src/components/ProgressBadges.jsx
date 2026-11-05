import React from 'react';
import { Sparkles, Flame, Trophy, CalendarCheck, Star, Medal, Rocket, CheckCircle2 } from 'lucide-react';
import { MODULES, getTopic, moduleProgress } from '@/content/curriculum';
import { cn } from '@/lib/utils';

export const buildBadges = (completed, stats) => {
  const moduleBadges = MODULES.map((module) => {
    const p = moduleProgress(module, completed);
    return {
      id: `module-${module.id}`,
      label: module.title,
      desc: 'Every lesson in this module',
      icon: Medal,
      done: p.complete,
    };
  });

  return [
    { id: 'first', label: 'First Spark', desc: 'Complete your first lesson', icon: Sparkles, done: stats.done >= 1 },
    { id: 'five', label: 'Warmed Up', desc: 'Complete 5 lessons', icon: Flame, done: stats.done >= 5 },
    { id: 'ten', label: 'On a Roll', desc: 'Complete 10 lessons', icon: Star, done: stats.done >= 10 },
    { id: 'perfect', label: 'Flawless', desc: 'Ace a lesson check', icon: Trophy, done: stats.perfect >= 1 },
    { id: 'streak', label: 'Three-Day Streak', desc: 'Learn 3 days in a row', icon: CalendarCheck, done: stats.streak >= 3 },
    ...moduleBadges,
    {
      id: 'graduate',
      label: 'Python Starter',
      desc: 'Complete the whole path',
      icon: Rocket,
      done: stats.done >= stats.total,
    },
  ];
};

export default function ProgressBadges({ completed, stats }) {
  const badges = buildBadges(completed, stats);
  const earned = badges.filter((b) => b.done).length;

  return (
    <section>
      <div className="mb-3 flex items-end justify-between">
        <h2 className="font-heading text-xl font-bold tracking-tight">Badges</h2>
        <span className="text-xs text-muted-foreground">{earned} of {badges.length} earned</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={cn(
              'flex items-start gap-3 rounded-2xl border p-4 transition-colors',
              badge.done ? 'border-neon-green/35 bg-neon-green/[0.06]' : 'border-border/70 bg-secondary/25 opacity-70'
            )}
          >
            <div className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl border', badge.done ? 'border-neon-green/40 bg-neon-green/10 text-neon-green' : 'border-border text-muted-foreground')}>
              <badge.icon size={17} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-sm font-semibold">
                {badge.label}
                {badge.done && <CheckCircle2 size={12} className="text-neon-green" />}
              </div>
              <p className="text-xs text-muted-foreground">{badge.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export const recentCompletions = (completed, limit = 5) =>
  Object.entries(completed)
    .map(([id, record]) => ({ topic: getTopic(id), record }))
    .filter((entry) => entry.topic)
    .sort((a, b) => new Date(b.record.at) - new Date(a.record.at))
    .slice(0, limit);