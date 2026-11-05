import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, NotebookPen, RotateCcw, Trash2, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/lib/progress';
import { useStudy } from '@/lib/study';
import { TOPIC_COUNT } from '@/content/curriculum';
import PageHeader from '@/components/PageHeader';
import { cn } from '@/lib/utils';

export default function ResetProgress() {
  const { done, progress, reset } = useProgress();
  const { study, resetStudy, clearSnippets } = useStudy();
  const [pending, setPending] = useState(null);
  const [message, setMessage] = useState('');

  const flash = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(''), 3500);
  };

  const run = (action, text) => {
    if (pending !== action) {
      setPending(action);
      return;
    }
    if (action === 'progress') reset();
    if (action === 'study') resetStudy();
    if (action === 'snippets') clearSnippets();
    if (action === 'everything') {
      reset();
      resetStudy();
      clearSnippets();
    }
    setPending(null);
    flash(text);
  };

  const items = [
    {
      key: 'progress',
      icon: RotateCcw,
      title: 'Lessons and achievements',
      desc: `Clears all ${done} completed lessons, ${progress.xp} XP, streaks and every badge. Modules restart from the beginning.`,
      cta: 'Reset lessons and achievements',
      done: 'Lesson progress cleared — every module starts from the beginning.',
      disabled: done === 0 && progress.xp === 0,
    },
    {
      key: 'study',
      icon: NotebookPen,
      title: 'Notes and study records',
      desc: `Removes ${Object.keys(study.notes).length} lesson notes, ${study.sessions.length} logged sessions and ${study.plan.length} planned sessions.`,
      cta: 'Clear notes and study records',
      done: 'Notes, logged time and planned sessions cleared.',
      disabled: Object.keys(study.notes).length === 0 && study.sessions.length === 0 && study.plan.length === 0,
    },
    {
      key: 'snippets',
      icon: Code2,
      title: 'Saved snippets',
      desc: `Deletes ${study.snippets.length} saved playground snippet${study.snippets.length === 1 ? '' : 's'}.`,
      cta: 'Delete saved snippets',
      done: 'Saved snippets deleted.',
      disabled: study.snippets.length === 0,
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Reset progress"
        title="Start from a clean slate"
        description="Each reset asks twice before it runs. Your app settings and preferences are never touched."
      >
        {message && (
          <span className="flex items-center gap-1.5 rounded-full border border-neon-green/40 bg-neon-green/10 px-3 py-1.5 text-xs font-semibold text-neon-green">
            <CheckCircle2 size={12} /> {message}
          </span>
        )}
      </PageHeader>

      <section className="glass rounded-2xl p-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Lessons done', value: `${done}/${TOPIC_COUNT}` },
            { label: 'XP earned', value: progress.xp },
            { label: 'Notes', value: Object.keys(study.notes).length },
            { label: 'Snippets', value: study.snippets.length },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border/70 bg-secondary/30 px-3 py-2.5">
              <div className="font-heading text-xl font-bold">{stat.value}</div>
              <div className="text-[11px] text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="space-y-3">
        {items.map((item) => {
          const Icon = item.icon;
          const confirming = pending === item.key;
          return (
            <section
              key={item.key}
              className={cn(
                'glass rounded-2xl p-5 transition-colors',
                confirming && 'border-destructive/50'
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border bg-secondary/50 text-muted-foreground">
                    <Icon size={16} />
                  </span>
                  <div>
                    <h2 className="font-heading text-base font-bold">{item.title}</h2>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {confirming && (
                    <button
                      type="button"
                      onClick={() => setPending(null)}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Cancel
                    </button>
                  )}
                  <Button
                    variant={confirming ? 'destructive' : 'outline'}
                    className="rounded-full"
                    disabled={item.disabled}
                    onClick={() => run(item.key, item.done)}
                  >
                    {confirming ? 'Tap again to confirm' : item.cta}
                  </Button>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className={cn('glass rounded-2xl border-destructive/40 p-6', pending === 'everything' && 'border-destructive')}>
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-destructive/40 bg-destructive/10 text-destructive">
            <AlertTriangle size={18} />
          </span>
          <div className="flex-1">
            <h2 className="font-heading text-base font-bold">Full reset</h2>
            <p className="text-sm text-muted-foreground">
              Wipes lessons, achievements, notes, study time, plans and snippets in one go. This cannot be undone.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button
                variant={pending === 'everything' ? 'destructive' : 'outline'}
                className="rounded-full"
                onClick={() => run('everything', 'Everything cleared — you are starting fresh.')}
              >
                {pending === 'everything' ? 'Tap again to erase everything' : 'Erase everything'}
              </Button>
              {pending === 'everything' && (
                <button type="button" onClick={() => setPending(null)} className="text-xs text-muted-foreground hover:text-foreground">
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <Trash2 size={12} />
        <span>
          Prefer a fresh lesson? <Link to="/lesson-library" className="font-semibold text-neon-cyan hover:underline">Browse the lesson library</Link>
        </span>
      </div>
    </div>
  );
}