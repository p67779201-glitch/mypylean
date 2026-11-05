import React from 'react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CalendarDays, Clock, TrendingUp } from 'lucide-react';
import { useProgress } from '@/lib/progress';
import { useStudy, dayKey } from '@/lib/study';
import PageHeader from '@/components/PageHeader';
import StatTile from '@/components/StatTile';

const shortDate = (d) => d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

export default function Reports() {
  const { completed } = useProgress();
  const { study } = useStudy();

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return { key: dayKey(d), label: d.toLocaleDateString(undefined, { weekday: 'short' }), minutes: 0 };
  });
  study.sessions.forEach((session) => {
    const slot = days.find((d) => d.key === session.date);
    if (slot) slot.minutes += session.minutes;
  });

  const weeks = Array.from({ length: 4 }, (_, i) => {
    const end = new Date();
    end.setDate(end.getDate() - 7 * i);
    const start = new Date(end);
    start.setDate(start.getDate() - 6);
    const keys = new Set(Array.from({ length: 7 }, (_, d) => {
      const day = new Date(start);
      day.setDate(start.getDate() + d);
      return dayKey(day);
    }));
    const minutes = study.sessions.filter((s) => keys.has(s.date)).reduce((sum, s) => sum + s.minutes, 0);
    const lessons = Object.values(completed).filter((r) => keys.has(dayKey(new Date(r.at)))).length;
    return { label: i === 0 ? 'This week' : `${shortDate(start)} – ${shortDate(end)}`, minutes, lessons };
  }).reverse();

  const weekMinutes = days.reduce((sum, d) => sum + d.minutes, 0);
  const weekLessons = Object.values(completed).filter((r) => days.some((d) => d.key === dayKey(new Date(r.at)))).length;
  const bestDay = days.reduce((best, d) => (d.minutes > best.minutes ? d : best), days[0]);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Weekly report"
        title="Where your study time went"
        description="Minutes you log on the schedule page and lessons you finish, week by week."
      />

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile icon={Clock} value={`${weekMinutes} min`} label="Study time this week" tone="text-neon-gold" />
        <StatTile icon={TrendingUp} value={Math.round(weekMinutes / 7)} label="Daily average" tone="text-neon-cyan" />
        <StatTile icon={CalendarDays} value={weekLessons} label="Lessons this week" tone="text-neon-green" />
        <StatTile icon={Clock} value={bestDay.minutes ? `${bestDay.label} · ${bestDay.minutes}m` : '—'} label="Best day" tone="text-neon-purple" />
      </section>

      <section className="glass rounded-2xl p-5 sm:p-6">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-heading text-lg font-bold">Last seven days</h2>
          <span className="text-xs text-muted-foreground">minutes studied</span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={days} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
              <Tooltip
                cursor={{ fill: 'hsl(var(--secondary) / 0.6)' }}
                contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12 }}
              />
              <Bar dataKey="minutes" fill="hsl(var(--neon-green))" radius={[6, 6, 0, 0]} maxBarSize={42} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {weekMinutes === 0 && (
          <p className="mt-3 text-center text-xs text-muted-foreground">
            No time logged yet — add a session on the <Link to="/schedule" className="font-semibold text-neon-green hover:underline">schedule page</Link>.
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-3 font-heading text-xl font-bold tracking-tight">Four-week summary</h2>
        <div className="glass divide-y divide-border/60 rounded-2xl">
          {weeks.map((week) => (
            <div key={week.label} className="flex items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{week.label}</div>
                <div className="text-[11px] text-muted-foreground">{week.lessons} lesson{week.lessons === 1 ? '' : 's'} completed</div>
              </div>
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary sm:w-40">
                <div
                  className="h-full rounded-full bg-neon-cyan"
                  style={{ width: `${Math.min(100, Math.round((week.minutes / Math.max(60, weekMinutes, 1)) * 100))}%` }}
                />
              </div>
              <span className="w-16 text-right text-xs tabular-nums text-muted-foreground">{week.minutes} min</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}