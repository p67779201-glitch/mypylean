import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { useStudy, dayKey } from '@/lib/study';

export default function WeeklyHours() {
  const { study } = useStudy();

  const weeks = Array.from({ length: 4 }, (_, index) => {
    const end = new Date();
    end.setDate(end.getDate() - 7 * (3 - index));
    const start = new Date(end);
    start.setDate(start.getDate() - 6);
    const keys = new Set(
      Array.from({ length: 7 }, (_, d) => {
        const day = new Date(start);
        day.setDate(start.getDate() + d);
        return dayKey(day);
      })
    );
    const minutes = study.sessions.filter((s) => keys.has(s.date)).reduce((sum, s) => sum + s.minutes, 0);
    return {
      label: index === 3 ? 'This week' : `–${3 - index}w`,
      minutes,
      hours: Math.round((minutes / 60) * 10) / 10,
    };
  });

  const peak = Math.max(...weeks.map((w) => w.hours), 1);
  const total = weeks.reduce((sum, w) => sum + w.hours, 0);

  return (
    <section className="glass rounded-2xl p-5">
      <div className="flex items-end justify-between">
        <h2 className="flex items-center gap-2 font-heading text-lg font-bold">
          <Clock size={16} className="text-neon-gold" /> Hours spent coding
        </h2>
        <Link to="/study-statistics" className="flex items-center gap-1 text-xs font-semibold text-neon-cyan hover:underline">
          Full statistics <ArrowRight size={12} />
        </Link>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        {weeks.map((week) => (
          <div key={week.label} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-[11px] font-semibold tabular-nums text-muted-foreground">{week.hours}h</span>
            <div className="flex h-24 w-full items-end">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-neon-green/40 to-neon-cyan transition-all"
                style={{ height: `${Math.max(4, Math.round((week.hours / peak) * 100))}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground">{week.label}</span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground">
        {total > 0 ? `${Math.round(total * 10) / 10} hours logged in the last four weeks.` : 'No study time logged yet — add a session on the schedule page.'}
      </p>
    </section>
  );
}