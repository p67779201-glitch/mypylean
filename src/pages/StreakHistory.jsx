import React, { useMemo } from 'react';
import { CalendarDays, Clock, Flame, Trophy } from 'lucide-react';
import { useProgress } from '@/lib/progress';
import { useStudy, dayKey } from '@/lib/study';
import PageHeader from '@/components/PageHeader';
import StatTile from '@/components/StatTile';

const CELLS = 84; // 12 weeks

const shade = (minutes) => {
  if (!minutes) return 'bg-secondary';
  if (minutes < 15) return 'bg-neon-green/25';
  if (minutes < 30) return 'bg-neon-green/50';
  if (minutes < 60) return 'bg-neon-green/75';
  return 'bg-neon-green';
};

export default function StreakHistory() {
  const { completed, progress } = useProgress();
  const { study } = useStudy();

  const activity = useMemo(() => {
    const map = {};
    study.sessions.forEach((session) => {
      map[session.date] = (map[session.date] || 0) + session.minutes;
    });
    Object.values(completed).forEach((record) => {
      const key = dayKey(new Date(record.at));
      map[key] = (map[key] || 0) + 20;
    });
    return map;
  }, [study.sessions, completed]);

  const days = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - (CELLS - 1));
    return Array.from({ length: CELLS }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      const key = dayKey(date);
      return { key, date, minutes: activity[key] || 0 };
    });
  }, [activity]);

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  const activeDays = days.filter((d) => d.minutes > 0).length;
  const totalMinutes = days.reduce((sum, d) => sum + d.minutes, 0);

  const longest = useMemo(() => {
    const keys = Object.keys(activity).filter((k) => activity[k] > 0).sort();
    let best = 0;
    let run = 0;
    let previous = null;
    keys.forEach((key) => {
      if (previous) {
        const next = new Date(`${previous}T00:00:00`);
        next.setDate(next.getDate() + 1);
        run = dayKey(next) === key ? run + 1 : 1;
      } else {
        run = 1;
      }
      best = Math.max(best, run);
      previous = key;
    });
    return best;
  }, [activity]);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Streak history"
        title="Every day you showed up"
        description="A calendar of your activity over the last twelve weeks — logged study time and lessons completed both count."
      />

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile icon={Flame} value={`${progress.streak || 0}d`} label="Current streak" tone="text-neon-gold" />
        <StatTile icon={Trophy} value={`${longest}d`} label="Longest streak" tone="text-neon-cyan" />
        <StatTile icon={CalendarDays} value={activeDays} label="Active days (12 wks)" tone="text-neon-green" />
        <StatTile icon={Clock} value={`${Math.round(totalMinutes / 60)}h`} label="Time in that period" tone="text-neon-purple" />
      </section>

      <section className="glass rounded-2xl p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="font-heading text-lg font-bold">Activity heat map</h2>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            less
            {['bg-secondary', 'bg-neon-green/25', 'bg-neon-green/50', 'bg-neon-green/75', 'bg-neon-green'].map((c) => (
              <span key={c} className={`h-3 w-3 rounded-[3px] ${c}`} />
            ))}
            more
          </div>
        </div>

        <div className="mt-4 overflow-x-auto pb-1">
          <div className="flex gap-1.5">
            <div className="mr-1 flex flex-col justify-between py-0.5 text-[9px] leading-none text-muted-foreground">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((label, i) => (
                <span key={`${label}-${i}`} className="h-3">{i % 2 === 1 ? label : ''}</span>
              ))}
            </div>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1.5">
                {week.map((day) => (
                  <div
                    key={day.key}
                    title={`${day.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} · ${day.minutes} min`}
                    className={`h-3 w-3 rounded-[3px] ${shade(day.minutes)}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{days[0].date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
          <span>today</span>
        </div>
      </section>

      {activeDays === 0 && (
        <div className="glass rounded-2xl p-6 text-center text-sm text-muted-foreground">
          No activity in the last twelve weeks yet. Finish a lesson or log a session and the first square lights up.
        </div>
      )}
    </div>
  );
}