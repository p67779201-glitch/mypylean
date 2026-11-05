import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, Flame, NotebookPen, Save, User, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TOPIC_COUNT } from '@/content/curriculum';
import { useProgress } from '@/lib/progress';
import { useStudy } from '@/lib/study';
import { recentCompletions } from '@/components/ProgressBadges';
import PageHeader from '@/components/PageHeader';
import StatTile from '@/components/StatTile';
import AchievementStrip from '@/components/AchievementStrip';

export default function Profile() {
  const { completed, done, progress, level } = useProgress();
  const { study, setName, setGoal, setWeeklyGoal } = useStudy();
  const [form, setForm] = useState({ name: study.name, goalMinutes: study.goalMinutes, weeklyGoal: study.weeklyGoal });
  const [saved, setSaved] = useState(false);

  const history = recentCompletions(completed, 8);
  const totalMinutes = study.sessions.reduce((sum, s) => sum + s.minutes, 0);

  const save = (e) => {
    e.preventDefault();
    setName(form.name.trim());
    setGoal(form.goalMinutes);
    setWeeklyGoal(form.weeklyGoal);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const initials = (study.name || 'Pyro Learner')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Profile"
        title="Your learner profile"
        description="Set how you want to be greeted and how much study time you are aiming for each day."
      />

      <section className="glass flex flex-col gap-5 rounded-2xl p-6 sm:flex-row sm:items-center">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-neon-green/40 bg-neon-green/10 font-heading text-xl font-extrabold text-neon-green">
          {initials || <User size={22} />}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-heading text-xl font-bold">{study.name || 'Pyro Learner'}</h2>
          <p className="text-sm text-muted-foreground">
            Level {level} · {progress.xp} XP · {done} of {TOPIC_COUNT} lessons complete
          </p>
        </div>
        <Button asChild variant="secondary" className="rounded-full px-4 font-semibold">
          <Link to="/dashboard">Open dashboard</Link>
        </Button>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <form onSubmit={save} className="glass rounded-2xl p-6">
          <h2 className="font-heading text-lg font-bold">Personal settings</h2>
          <label className="mt-4 block text-xs font-medium text-muted-foreground">
            Display name
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="What should we call you?"
              className="mt-1"
            />
          </label>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="block text-xs font-medium text-muted-foreground">
              Daily study goal (minutes)
              <Input
                type="number"
                min={5}
                max={240}
                value={form.goalMinutes}
                onChange={(e) => setForm({ ...form, goalMinutes: e.target.value })}
                className="mt-1"
              />
            </label>
            <label className="block text-xs font-medium text-muted-foreground">
              Lessons per week
              <Input
                type="number"
                min={1}
                max={30}
                value={form.weeklyGoal}
                onChange={(e) => setForm({ ...form, weeklyGoal: e.target.value })}
                className="mt-1"
              />
            </label>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Button type="submit" className="rounded-full px-5 font-semibold">
              <Save size={14} className="mr-1.5" /> Save profile
            </Button>
            {saved && (
              <span className="flex items-center gap-1 text-xs font-semibold text-neon-green">
                <CheckCircle2 size={12} /> Saved
              </span>
            )}
          </div>
        </form>

        <div className="grid grid-cols-2 gap-3">
          <StatTile icon={CheckCircle2} value={done} label="Lessons completed" tone="text-neon-green" />
          <StatTile icon={Zap} value={progress.xp} label="XP earned" tone="text-neon-cyan" />
          <StatTile icon={Flame} value={`${progress.streak || 0}d`} label="Day streak" tone="text-neon-gold" />
          <StatTile icon={Clock} value={`${totalMinutes}m`} label="Time logged" tone="text-neon-purple" />
          <StatTile icon={NotebookPen} value={Object.keys(study.notes).length} label="Notes saved" tone="text-neon-gold" />
          <StatTile icon={CheckCircle2} value={progress.perfect} label="Perfect checks" tone="text-neon-cyan" />
        </div>
      </section>

      <AchievementStrip limit={10} />

      <section>
        <h2 className="mb-3 font-heading text-xl font-bold tracking-tight">Study history</h2>
        {history.length === 0 ? (
          <div className="glass rounded-2xl p-6 text-center text-sm text-muted-foreground">
            No lessons finished yet — <Link to="/learn" className="font-semibold text-neon-green hover:underline">start with the basics</Link>.
          </div>
        ) : (
          <div className="glass divide-y divide-border/60 rounded-2xl">
            {history.map(({ topic, record }) => (
              <Link key={topic.id} to={`/lesson/${topic.id}`} className="flex items-center gap-3 p-4 transition-colors hover:bg-secondary/40">
                <CheckCircle2 size={15} className="shrink-0 text-neon-green" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{topic.title}</div>
                  <div className="text-[11px] text-muted-foreground">{topic.moduleTitle}</div>
                </div>
                <span className="shrink-0 text-[11px] text-muted-foreground">
                  {record.total ? `${record.score}/${record.total} · ` : 'Practice · '}
                  {new Date(record.at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}