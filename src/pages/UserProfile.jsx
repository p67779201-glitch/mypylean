import React, { useEffect, useState } from 'react';
import { CheckCircle2, Mail, Save, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';
import { LEVELS, LEVEL_META, TOPIC_COUNT } from '@/content/curriculum';
import { useProgress } from '@/lib/progress';
import { useStudy } from '@/lib/study';
import PageHeader from '@/components/PageHeader';
import StatTile from '@/components/StatTile';
import { cn } from '@/lib/utils';

const LEVEL_OPTIONS = [{ key: 'all', label: 'No preference' }, ...LEVELS.map((l) => ({ key: l, label: LEVEL_META[l].label }))];

export default function UserProfile() {
  const { done, progress, level } = useProgress();
  const { study, setName, setGoal, setWeeklyGoal, setPref } = useStudy();
  const [email, setEmail] = useState('');
  const [form, setForm] = useState({ name: study.name, goalMinutes: study.goalMinutes, weeklyGoal: study.weeklyGoal });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    base44.auth
      .me()
      .then((me) => setEmail(me?.email || ''))
      .catch(() => setEmail(''));
  }, []);

  const save = (event) => {
    event.preventDefault();
    setName(form.name.trim());
    setGoal(form.goalMinutes);
    setWeeklyGoal(form.weeklyGoal);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const initials = (study.name || email || 'Pyro Learner')
    .split(/[\s@.]+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="User profile"
        title="Your account and goals"
        description="Update how you are greeted, how long you aim to study, and which level you want to see first."
      />

      <section className="glass flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-neon-green/40 bg-neon-green/10 font-heading text-xl font-extrabold text-neon-green">
          {initials || <User size={22} />}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-heading text-xl font-bold">{study.name || 'Pyro Learner'}</h2>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Mail size={12} /> {email || 'No email on this session'}
          </p>
          <p className="text-xs text-muted-foreground">
            Level {level} · {progress.xp} XP · {done} of {TOPIC_COUNT} lessons complete
          </p>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={CheckCircle2} value={done} label="Lessons done" tone="text-neon-green" />
        <StatTile icon={CheckCircle2} value={progress.perfect} label="Perfect checks" tone="text-neon-cyan" />
        <StatTile icon={CheckCircle2} value={`${study.goalMinutes}m`} label="Daily goal" tone="text-neon-gold" />
        <StatTile icon={CheckCircle2} value={`${study.weeklyGoal}/wk`} label="Weekly lessons" tone="text-neon-purple" />
      </section>

      <form onSubmit={save} className="glass rounded-2xl p-6">
        <h2 className="font-heading text-lg font-bold">Account details</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block text-xs font-medium text-muted-foreground">
            Display name
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="What should we call you?"
              className="mt-1"
            />
          </label>
          <label className="block text-xs font-medium text-muted-foreground">
            Email
            <Input value={email} readOnly placeholder="Sign in to attach an email" className="mt-1 opacity-70" />
          </label>
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

        <div className="mt-5">
          <div className="text-xs font-medium text-muted-foreground">Preferred skill level</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {LEVEL_OPTIONS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setPref('level', key)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                  (study.prefs.level || 'all') === key
                    ? 'border-neon-green/50 bg-neon-green/15 text-neon-green'
                    : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Button type="submit" className="rounded-full px-5 font-semibold">
            <Save size={14} className="mr-1.5" /> Save changes
          </Button>
          {saved && (
            <span className="flex items-center gap-1 text-xs font-semibold text-neon-green">
              <CheckCircle2 size={12} /> Saved
            </span>
          )}
        </div>
      </form>
    </div>
  );
}