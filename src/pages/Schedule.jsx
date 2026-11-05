import React, { useState } from 'react';
import { CheckCircle2, Clock, Plus, Target, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStudy, dayKey } from '@/lib/study';
import PageHeader from '@/components/PageHeader';
import { cn } from '@/lib/utils';

export default function Schedule() {
  const { study, setGoal, addPlan, togglePlan, removePlan, addSession } = useStudy();
  const today = dayKey();
  const [goalDraft, setGoalDraft] = useState(study.goalMinutes);
  const [plan, setPlan] = useState({ date: today, label: '', minutes: 25 });
  const [log, setLog] = useState({ minutes: 20, label: 'Study session' });
  const [logged, setLogged] = useState(false);

  const todayMinutes = study.sessions.filter((s) => s.date === today).reduce((sum, s) => sum + s.minutes, 0);
  const goal = study.goalMinutes || 20;
  const upcoming = [...study.plan].sort((a, b) => a.date.localeCompare(b.date));

  const saveGoal = (e) => {
    e.preventDefault();
    setGoal(goalDraft);
  };

  const submitPlan = (e) => {
    e.preventDefault();
    if (!plan.label.trim()) return;
    addPlan({ ...plan, label: plan.label.trim() });
    setPlan({ date: today, label: '', minutes: 25 });
  };

  const submitLog = (e) => {
    e.preventDefault();
    addSession({ minutes: log.minutes, label: log.label.trim() || 'Study session' });
    setLogged(true);
    window.setTimeout(() => setLogged(false), 2500);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Study schedule"
        title="Plan the work, then do it"
        description="Set a daily goal, block out sessions and log the time you actually put in — the reports page builds itself from this."
      />

      <section className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            <Target size={13} /> Daily goal
          </div>
          <div className="mt-2 font-heading text-3xl font-extrabold">
            {todayMinutes} <span className="text-sm font-medium text-muted-foreground">of {goal} min today</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-neon-gold" style={{ width: `${Math.min(100, Math.round((todayMinutes / goal) * 100))}%` }} />
          </div>

          <form onSubmit={saveGoal} className="mt-4 flex items-end gap-2">
            <label className="flex-1 text-xs text-muted-foreground">
              Minutes per day
              <Input
                type="number"
                min={5}
                max={240}
                value={goalDraft}
                onChange={(e) => setGoalDraft(e.target.value)}
                className="mt-1"
              />
            </label>
            <Button type="submit" variant="secondary" className="rounded-full px-4 font-semibold">Save</Button>
          </form>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            <Clock size={13} /> Log study time
          </div>
          <form onSubmit={submitLog} className="mt-3 grid gap-2 sm:grid-cols-[1fr_100px_auto]">
            <Input
              value={log.label}
              onChange={(e) => setLog({ ...log, label: e.target.value })}
              placeholder="What did you work on?"
            />
            <Input
              type="number"
              min={1}
              max={480}
              value={log.minutes}
              onChange={(e) => setLog({ ...log, minutes: e.target.value })}
              aria-label="Minutes"
            />
            <Button type="submit" className="rounded-full px-4 font-semibold">
              <Plus size={14} className="mr-1" /> Log
            </Button>
          </form>
          {logged && (
            <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-neon-green">
              <CheckCircle2 size={12} /> Added to today — the report will show it.
            </p>
          )}
          <p className="mt-3 text-[11px] text-muted-foreground">
            {study.sessions.length} session{study.sessions.length === 1 ? '' : 's'} logged so far.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-xl font-bold tracking-tight">Planned sessions</h2>

        <form onSubmit={submitPlan} className="glass grid gap-2 rounded-2xl p-4 sm:grid-cols-[1fr_160px_110px_auto]">
          <Input
            value={plan.label}
            onChange={(e) => setPlan({ ...plan, label: e.target.value })}
            placeholder="e.g. Finish the loops module"
          />
          <Input
            type="date"
            value={plan.date}
            onChange={(e) => setPlan({ ...plan, date: e.target.value })}
            aria-label="Study date"
          />
          <Input
            type="number"
            min={5}
            max={480}
            value={plan.minutes}
            onChange={(e) => setPlan({ ...plan, minutes: e.target.value })}
            aria-label="Minutes"
          />
          <Button type="submit" className="rounded-full px-4 font-semibold">
            <Plus size={14} className="mr-1" /> Add
          </Button>
        </form>

        {upcoming.length === 0 ? (
          <div className="glass mt-3 rounded-2xl p-6 text-center text-sm text-muted-foreground">
            No sessions planned yet. Add one above and it will wait for you here.
          </div>
        ) : (
          <div className="glass mt-3 divide-y divide-border/60 rounded-2xl">
            {upcoming.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-4">
                <button
                  type="button"
                  onClick={() => togglePlan(item.id)}
                  aria-label={item.done ? 'Mark as not done' : 'Mark as done'}
                  className={cn(
                    'grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors',
                    item.done ? 'border-neon-green/50 bg-neon-green/15 text-neon-green' : 'border-border text-muted-foreground hover:border-neon-cyan/50'
                  )}
                >
                  <CheckCircle2 size={14} />
                </button>
                <div className="min-w-0 flex-1">
                  <div className={cn('truncate text-sm font-medium', item.done && 'line-through text-muted-foreground')}>{item.label}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {new Date(`${item.date}T00:00:00`).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} · {item.minutes} min
                  </div>
                </div>
                <button type="button" onClick={() => removePlan(item.id)} aria-label="Remove session" className="text-muted-foreground hover:text-destructive">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}