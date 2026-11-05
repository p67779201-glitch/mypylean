import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Flame } from 'lucide-react';
import { useProgress } from '@/lib/progress';
import { useStudy } from '@/lib/study';
import { activityMap, currentStreak, lastSevenDays, longestStreak } from '@/lib/streak';
import { cn } from '@/lib/utils';

export default function StreakCounter() {
  const { completed } = useProgress();
  const { study } = useStudy();

  const map = useMemo(() => activityMap(completed, study.sessions), [completed, study.sessions]);
  const streak = currentStreak(map);
  const best = longestStreak(map);
  const week = lastSevenDays(map);
  const studiedToday = (map[week[6].key] || 0) > 0;

  const message = studiedToday
    ? 'Today is done — the streak is safe.'
    : streak > 0
      ? 'Study something today to keep it alive.'
      : 'Finish one lesson or log a session to start a streak.';

  return (
    <div className="glass flex flex-col rounded-2xl p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Day streak</div>
          <div className="mt-1 flex items-end gap-2">
            <span className="font-heading text-5xl font-extrabold leading-none text-gradient">{streak}</span>
            <span className="pb-1 text-sm text-muted-foreground">
              day{streak === 1 ? '' : 's'} in a row
            </span>
          </div>
        </div>
        <div
          className={cn(
            'grid h-12 w-12 place-items-center rounded-2xl border',
            streak > 0
              ? 'border-neon-gold/50 bg-neon-gold/10 text-neon-gold'
              : 'border-border bg-secondary/40 text-muted-foreground'
          )}
        >
          <Flame size={22} className={streak >= 3 ? 'animate-pulse' : ''} />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1.5">
        {week.map((day) => (
          <div key={day.key} className="flex flex-col items-center gap-1.5">
            <span
              className={cn(
                'grid h-9 w-full place-items-center rounded-xl border text-[11px] font-bold',
                day.active
                  ? 'border-neon-gold/45 bg-neon-gold/15 text-neon-gold'
                  : day.isToday
                    ? 'border-neon-cyan/40 bg-neon-cyan/[0.06] text-neon-cyan'
                    : 'border-border/70 bg-secondary/30 text-muted-foreground'
              )}
              title={`${day.key} · ${day.minutes} min`}
            >
              {day.active ? <CheckCircle2 size={14} /> : '·'}
            </span>
            <span className={cn('text-[10px]', day.isToday ? 'font-bold text-neon-cyan' : 'text-muted-foreground')}>
              {day.label}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">{message}</p>

      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Best so far: <span className="font-semibold text-foreground">{best} day{best === 1 ? '' : 's'}</span></span>
        <Link to="/streak-history" className="flex items-center gap-1 font-semibold text-neon-cyan hover:underline">
          Streak history <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  );
}