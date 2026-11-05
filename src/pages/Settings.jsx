import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Check, Palette, RotateCcw, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useProgress } from '@/lib/progress';
import { useStudy } from '@/lib/study';
import PageHeader from '@/components/PageHeader';
import { cn } from '@/lib/utils';

const THEMES = [
  { key: 'neon', label: 'Neon', desc: 'Green and cyan on deep indigo', swatch: 'bg-gradient-to-r from-green-400 via-cyan-400 to-violet-400' },
  { key: 'midnight', label: 'Midnight', desc: 'Cool blue and violet', swatch: 'bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500' },
  { key: 'aurora', label: 'Aurora', desc: 'Lime and teal on deep green', swatch: 'bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400' },
];

const NOTIFICATIONS = [
  { key: 'dailyReminder', label: 'Daily streak reminder', desc: 'A nudge when a day goes by without a lesson.' },
  { key: 'weeklyReport', label: 'Weekly study report', desc: 'A summary of minutes and lessons each week.' },
  { key: 'achievementAlerts', label: 'Achievement alerts', desc: 'Know the moment a badge unlocks.' },
];

export default function Settings() {
  const { study, setPref, resetStudy } = useStudy();
  const { reset } = useProgress();
  const [confirm, setConfirm] = useState(null);
  const [message, setMessage] = useState('');

  const flash = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(''), 3000);
  };

  const clearProgress = () => {
    if (confirm !== 'progress') return setConfirm('progress');
    reset();
    setConfirm(null);
    flash('Progress cleared — every lesson is open again.');
  };

  const clearStudyData = () => {
    if (confirm !== 'study') return setConfirm('study');
    resetStudy();
    setConfirm(null);
    flash('Notes, study time and plans cleared.');
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="App settings"
        title="Make it feel like yours"
        description="Notification preferences and the colour theme for this device. Progress stays exactly as it is."
      />

      <section className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-neon-cyan" />
          <h2 className="font-heading text-lg font-bold">Notifications</h2>
        </div>
        <div className="mt-4 divide-y divide-border/60">
          {NOTIFICATIONS.map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <div className="text-sm font-medium">{label}</div>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <Switch
                checked={!!study.prefs[key]}
                onCheckedChange={(val) => {
                  setPref(key, val);
                  flash(val ? `${label} on.` : `${label} off.`);
                }}
                aria-label={label}
              />
            </div>
          ))}
        </div>
        <p className="mt-3 flex items-start gap-1.5 text-[11px] text-muted-foreground">
          <TriangleAlert size={12} className="mt-0.5 shrink-0" />
          Reminders appear in the app — email delivery needs a signed-in account setup, which is not connected yet.
        </p>
      </section>

      <section className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2">
          <Palette size={16} className="text-neon-purple" />
          <h2 className="font-heading text-lg font-bold">Theme</h2>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {THEMES.map((theme) => {
            const active = study.prefs.theme === theme.key;
            return (
              <button
                key={theme.key}
                type="button"
                onClick={() => setPref('theme', theme.key)}
                className={cn(
                  'rounded-2xl border p-4 text-left transition-colors',
                  active ? 'border-neon-green/50 bg-neon-green/[0.07]' : 'border-border/70 bg-secondary/25 hover:border-neon-cyan/40'
                )}
              >
                <span className={cn('block h-8 w-full rounded-lg', theme.swatch)} />
                <span className="mt-3 flex items-center gap-1.5 text-sm font-semibold">
                  {theme.label} {active && <Check size={13} className="text-neon-green" />}
                </span>
                <span className="text-xs text-muted-foreground">{theme.desc}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2">
          <RotateCcw size={16} className="text-destructive" />
          <h2 className="font-heading text-lg font-bold">Reset data</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Starting fresh clears what is saved on this device. Lessons stay open either way.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant={confirm === 'progress' ? 'destructive' : 'outline'}
            className="rounded-full"
            onClick={clearProgress}
          >
            {confirm === 'progress' ? 'Tap again to clear progress' : 'Reset lesson progress'}
          </Button>
          <Button
            variant={confirm === 'study' ? 'destructive' : 'outline'}
            className="rounded-full"
            onClick={clearStudyData}
          >
            {confirm === 'study' ? 'Tap again to clear notes & time' : 'Clear notes and study time'}
          </Button>
          {confirm && (
            <button type="button" onClick={() => setConfirm(null)} className="text-xs text-muted-foreground hover:text-foreground">
              Cancel
            </button>
          )}
        </div>

        {message && (
          <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-neon-green">
            <Check size={12} /> {message}
          </p>
        )}
        <p className="mt-3 text-[11px] text-muted-foreground">
          Looking for the full progress view? <Link to="/progress" className="font-semibold text-neon-cyan hover:underline">Open the progress page</Link>.
        </p>
      </section>
    </div>
  );
}