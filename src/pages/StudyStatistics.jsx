import React, { useMemo } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BarChart3, Clock, Layers, TrendingUp } from 'lucide-react';
import { ALL_TOPICS, LEVELS, LEVEL_META, TOPIC_COUNT, topicsByLevel } from '@/content/curriculum';
import { useProgress } from '@/lib/progress';
import { useStudy, dayKey } from '@/lib/study';
import PageHeader from '@/components/PageHeader';
import StatTile from '@/components/StatTile';
import { cn } from '@/lib/utils';

const WEEKS = 6;
const tooltipStyle = {
  background: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: 12,
  fontSize: 12,
};

const isoFrom = (dayKeyString) => new Date(`${dayKeyString}T00:00:00`);

export default function StudyStatistics() {
  const { completed, progress, level } = useProgress();
  const { study } = useStudy();

  const weeks = useMemo(() => {
    const list = Array.from({ length: WEEKS }, (_, i) => {
      const end = new Date();
      end.setDate(end.getDate() - 7 * (WEEKS - 1 - i));
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
      const lessons = Object.values(completed).filter((r) => keys.has(dayKey(new Date(r.at)))).length;
      return {
        key: dayKey(end),
        label: end.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        hours: Math.round((minutes / 60) * 10) / 10,
        lessons,
      };
    });
    let running = 0;
    return list.map((week) => {
      running += week.lessons;
      return { ...week, cumulative: running };
    });
  }, [study.sessions, completed]);

  const totalHours = Math.round((study.sessions.reduce((sum, s) => sum + s.minutes, 0) / 60) * 10) / 10;
  const thisWeek = weeks[weeks.length - 1];
  const avgHours = Math.round((weeks.reduce((sum, w) => sum + w.hours, 0) / WEEKS) * 10) / 10;

  const skills = LEVELS.map((lvl) => {
    const topics = topicsByLevel(lvl);
    const done = topics.filter((t) => completed[t.id]).length;
    return {
      key: lvl,
      label: LEVEL_META[lvl].label,
      done,
      total: topics.length,
      pct: topics.length ? Math.round((done / topics.length) * 100) : 0,
      chip: LEVEL_META[lvl].chip,
    };
  });

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Study statistics"
        title="The numbers behind the work"
        description="Hours per week, lessons completed over time, and how far each skill level has come."
      />

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile icon={Clock} value={`${totalHours}h`} label="Total study time" tone="text-neon-gold" />
        <StatTile icon={TrendingUp} value={`${avgHours}h`} label="Weekly average" tone="text-neon-cyan" />
        <StatTile icon={Layers} value={`${Object.keys(completed).length}/${TOPIC_COUNT}`} label="Lessons completed" tone="text-neon-green" />
        <StatTile icon={BarChart3} value={`Lv ${level}`} label={`${progress.xp} XP earned`} tone="text-neon-purple" />
      </section>

      <section className="glass rounded-2xl p-5 sm:p-6">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-heading text-lg font-bold">Study hours per week</h2>
          <span className="text-xs text-muted-foreground">last {WEEKS} weeks</span>
        </div>
        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeks} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} unit="h" />
              <Tooltip cursor={{ fill: 'hsl(var(--secondary) / 0.6)' }} contentStyle={tooltipStyle} />
              <Bar dataKey="hours" name="Hours" fill="hsl(var(--neon-green))" radius={[6, 6, 0, 0]} maxBarSize={46} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {totalHours === 0 && (
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Log study time on the schedule page and this chart fills in.
          </p>
        )}
      </section>

      <section className="glass rounded-2xl p-5 sm:p-6">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-heading text-lg font-bold">Progress trend</h2>
          <span className="text-xs text-muted-foreground">lessons completed per week</span>
        </div>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeks} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
              <defs>
                <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--neon-cyan))" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="hsl(var(--neon-cyan))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="lessons" name="Lessons" stroke="hsl(var(--neon-cyan))" fill="url(#trendFill)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-xl font-bold tracking-tight">Skill growth</h2>
        <div className="glass space-y-4 rounded-2xl p-5">
          {skills.map((skill) => (
            <div key={skill.key}>
              <div className="flex items-center justify-between gap-2">
                <span className={cn('rounded-full border px-2 py-0.5 text-[11px] font-semibold', skill.chip)}>{skill.label}</span>
                <span className="text-xs text-muted-foreground">
                  {skill.done}/{skill.total} · {skill.pct}%
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-neon-green to-neon-cyan"
                  style={{ width: `${skill.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-xl font-bold tracking-tight">Weekly breakdown</h2>
        <div className="glass divide-y divide-border/60 rounded-2xl">
          {[...weeks].reverse().map((week) => (
            <div key={week.key} className="flex items-center gap-3 p-4">
              <span className="w-16 shrink-0 text-xs font-semibold text-muted-foreground">{week.label}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-neon-green"
                  style={{ width: `${Math.min(100, Math.round((week.hours / Math.max(1, Math.max(...weeks.map((w) => w.hours)))) * 100))}%` }}
                />
              </div>
              <span className="w-20 shrink-0 text-right text-xs tabular-nums text-muted-foreground">{week.hours}h · {week.lessons}L</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}