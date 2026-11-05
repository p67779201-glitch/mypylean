import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import { buildBadges } from '@/components/ProgressBadges';
import { useProgress } from '@/lib/progress';
import { cn } from '@/lib/utils';

export default function AchievementStrip({ limit = 6, className = '' }) {
  const { completed, done, progress, totalTopics } = useProgress();
  const badges = buildBadges(completed, {
    done,
    perfect: progress.perfect,
    streak: progress.streak,
    total: totalTopics,
  });

  const earned = badges.filter((badge) => badge.done);
  const locked = badges.filter((badge) => !badge.done);
  const shown = earned.length > 0 ? earned.slice(0, limit) : locked.slice(0, limit);

  return (
    <div className={cn('glass flex flex-col rounded-2xl p-6', className)}>
      <div className="flex items-end justify-between gap-2">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Achievements</div>
          <h2 className="mt-1 font-heading text-lg font-bold">
            {earned.length} of {badges.length} unlocked
          </h2>
        </div>
        <Link to="/achievements" className="flex items-center gap-1 text-xs font-semibold text-neon-cyan hover:underline">
          All <ArrowRight size={11} />
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {shown.map((badge) => (
          <div
            key={badge.id}
            className={cn(
              'flex flex-col items-start gap-1.5 rounded-xl border p-3',
              badge.done ? 'border-neon-green/35 bg-neon-green/[0.06]' : 'border-border/70 bg-secondary/25'
            )}
          >
            <span
              className={cn(
                'grid h-8 w-8 place-items-center rounded-lg border',
                badge.done ? 'border-neon-green/40 bg-neon-green/10 text-neon-green' : 'border-border text-muted-foreground'
              )}
            >
              {badge.done ? <badge.icon size={15} /> : <Lock size={13} />}
            </span>
            <span className={cn('text-[11px] font-semibold leading-tight', badge.done ? 'text-foreground' : 'text-muted-foreground')}>
              {badge.label}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground">
        {earned.length === 0
          ? 'Finish a lesson to unlock your first badge.'
          : earned.length >= badges.length
            ? 'Every badge is yours — the whole path is complete.'
            : `Next up: ${locked[0]?.label} — ${locked[0]?.desc}.`}
      </p>
    </div>
  );
}