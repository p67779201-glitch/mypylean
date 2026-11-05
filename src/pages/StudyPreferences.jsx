import React, { useState } from 'react';
import { Check, Mail, Target } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { LEVELS, LEVEL_META } from '@/content/curriculum';
import { useStudy } from '@/lib/study';
import PageHeader from '@/components/PageHeader';
import { cn } from '@/lib/utils';

const REMINDERS = [
  { key: 'emailReminders', label: 'Email study reminders', desc: 'Nudge me when a day passes without a lesson or logged study time.' },
  { key: 'dailyReminder', label: 'Daily streak reminder', desc: 'Keep the streak alive with a daily prompt inside the app.' },
  { key: 'weeklyReport', label: 'Weekly progress email', desc: 'A summary of minutes studied and lessons finished each week.' },
  { key: 'achievementAlerts', label: 'Achievement alerts', desc: 'Tell me the moment a badge unlocks.' },
];

const LEVEL_OPTIONS = [{ key: 'all', label: 'No preference' }, ...LEVELS.map((l) => ({ key: l, label: LEVEL_META[l].label }))];

export default function StudyPreferences() {
  const { study, setPref } = useStudy();
  const [saved, setSaved] = useState('');

  const flash = (text) => {
    setSaved(text);
    window.setTimeout(() => setSaved(''), 2200);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Study preferences"
        title="Reminders and your level"
        description="Choose what PyroLearn should remind you about, and which difficulty it should lead with."
      >
        {saved && (
          <span className="flex items-center gap-1.5 rounded-full border border-neon-green/40 bg-neon-green/10 px-3 py-1.5 text-xs font-semibold text-neon-green">
            <Check size={12} /> {saved}
          </span>
        )}
      </PageHeader>

      <section className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-neon-cyan" />
          <h2 className="font-heading text-lg font-bold">Reminders</h2>
        </div>
        <div className="mt-4 divide-y divide-border/60">
          {REMINDERS.map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <div className="text-sm font-medium">{label}</div>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <Switch
                checked={!!study.prefs[key]}
                onCheckedChange={(val) => {
                  setPref(key, val);
                  flash(val ? `${label} on` : `${label} off`);
                }}
                aria-label={label}
              />
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-border/70 bg-secondary/30 p-3 text-[11px] leading-relaxed text-muted-foreground">
          Your choices are saved on this device. Sending the actual email needs a signed-in account on this app plus a
          scheduled job that runs daily — once those are switched on, the reminders you enabled here go out as written.
        </p>
      </section>

      <section className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2">
          <Target size={16} className="text-neon-gold" />
          <h2 className="font-heading text-lg font-bold">Preferred skill level</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          The lesson library and course catalog open on this filter. You can always change it per page.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {LEVEL_OPTIONS.map(({ key, label }) => {
            const active = (study.prefs.level || 'all') === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setPref('level', key);
                  flash(`Level set to ${label.toLowerCase()}`);
                }}
                className={cn(
                  'flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors',
                  active ? 'border-neon-green/50 bg-neon-green/[0.08] text-foreground' : 'border-border/70 bg-secondary/30 text-muted-foreground hover:text-foreground'
                )}
              >
                {label}
                {active && <Check size={14} className="text-neon-green" />}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}