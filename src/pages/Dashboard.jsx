import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock, Flame, Layers, Target, Zap } from 'lucide-react';
import { ALL_TOPICS, MODULES, TOPIC_COUNT, moduleProgress } from '@/content/curriculum';
import { useProgress } from '@/lib/progress';
import { useStudy, dayKey } from '@/lib/study';
import { accent } from '@/lib/theme';
import { recentCompletions } from '@/components/ProgressBadges';
import PageHeader from '@/components/PageHeader';
import StatTile from '@/components/StatTile';
import WeeklyHours from '@/components/study/WeeklyHours';
import StreakCounter from '@/components/study/StreakCounter';
import ReviewQueue from '@/components/study/ReviewQueue';
import AchievementStrip from '@/components/AchievementStrip';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const { completed, done, percent, progress, level, levelXp, xpToNext } = useProgress();
  const { study } = useStudy();
  const nextTopic = ALL_TOPICS.find((t) => !completed[t.id]);
  const today = dayKey();
  const todayMinutes = study.sessions.filter((s) => s.date === today).reduce((sum, s) => sum + s.minutes, 0);
  const goal = study.goalMinutes || 20;
  const recent = recentCompletions(completed, 4);
  const modulesDone = MODULES.filter((module) => moduleProgress(module, completed).complete).length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Study dashboard"
        title={study.name ? `Welcome back, ${study.name}` : 'Your study dashboard'}
        description="One view of everything you have finished, your level, and what to open next."
      >
        <Link
          to={nextTopic ? `/lesson/${nextTopic.id}` : '/quiz'}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          {nextTopic ? 'Continue learning' : 'Practise with a quiz'} <ArrowRight size={15} />
        </Link>
      </PageHeader>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile icon={CheckCircle2} value={`${done}/${TOPIC_COUNT}`} label="Lessons completed" tone="text-neon-green" />
        <StatTile icon={Zap} value={progress.xp} label="XP earned" tone="text-neon-cyan" />
        <StatTile icon={Flame} value={`${progress.streak || 0}d`} label="Current streak" tone="text-neon-gold" />
        <StatTile icon={Layers} value={`${modulesDone}/${MODULES.length}`} label="Modules completed" tone="text-neon-purple" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <div className="glass relative overflow-hidden rounded-2xl p-6">
          <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-neon-cyan/15 blur-3xl" />
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Curriculum progress</div>
              <div className="mt-1 font-heading text-4xl font-extrabold leading-none text-gradient">{percent}%</div>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              <div className="font-semibold text-foreground">Level {level}</div>
              <div>{levelXp} / {xpToNext} XP</div>
            </div>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple transition-all duration-700" style={{ width: `${percent}%` }} />
          </div>
          <Link to="/reports" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-neon-cyan hover:underline">
            See your weekly report <ArrowRight size={12} />
          </Link>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            <Target size={13} /> Today
          </div>
          <div className="mt-2 font-heading text-2xl font-bold">
            {todayMinutes} <span className="text-sm font-medium text-muted-foreground">of {goal} min</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-neon-gold" style={{ width: `${Math.min(100, Math.round((todayMinutes / goal) * 100))}%` }} />
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Clock size={12} /> Log time or plan a session on the
            <Link to="/schedule" className="font-semibold text-neon-green hover:underline">schedule</Link>.
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <StreakCounter />
        <AchievementStrip limit={6} />
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-heading text-xl font-bold tracking-tight">Modules</h2>
          <Link to="/modules" className="text-xs font-semibold text-muted-foreground hover:text-foreground">All modules</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((module, i) => {
            const stats = moduleProgress(module, completed);
            const theme = accent(module.accent);
            const nextInModule = module.topics.find((t) => !completed[t.id]) || module.topics[0];
            return (
              <Link key={module.id} to={`/lesson/${nextInModule.id}`} className={cn('glass card-hover rounded-2xl p-4', theme.border)}>
                <div className="flex items-center justify-between gap-2">
                  <span className={cn('rounded-lg border px-2 py-0.5 font-mono text-[10px] font-semibold', theme.chip)}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{stats.done}/{stats.total}</span>
                </div>
                <div className="mt-2 truncate text-sm font-semibold">{module.title}</div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-secondary">
                  <div className={cn('h-full rounded-full', theme.bar)} style={{ width: `${stats.pct}%` }} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <WeeklyHours />

      <ReviewQueue />

      <section>
        <h2 className="mb-3 font-heading text-xl font-bold tracking-tight">Recently completed</h2>
        {recent.length === 0 ? (
          <div className="glass rounded-2xl p-6 text-center text-sm text-muted-foreground">
            Nothing here yet — <Link to="/learn" className="font-semibold text-neon-green hover:underline">open your first lesson</Link>.
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
                  {record.total ? `${record.score}/${record.total}` : 'Practice'}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}