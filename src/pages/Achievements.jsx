import React from 'react';
import { Link } from 'react-router-dom';
import { Award, CalendarClock, CheckCircle2, Crown, NotebookPen, Timer } from 'lucide-react';
import { TOPIC_COUNT } from '@/content/curriculum';
import { useProgress } from '@/lib/progress';
import { useStudy } from '@/lib/study';
import { buildBadges } from '@/components/ProgressBadges';
import PageHeader from '@/components/PageHeader';
import { cn } from '@/lib/utils';

export default function Achievements() {
  const { completed, done, progress, level } = useProgress();
  const { study } = useStudy();

  const base = buildBadges(completed, { done, perfect: progress.perfect, streak: progress.streak || 0, total: TOPIC_COUNT });
  const extra = [
    { id: 'notes', label: 'Note Taker', desc: 'Save a note on any lesson', icon: NotebookPen, done: Object.keys(study.notes).length > 0 },
    { id: 'planner', label: 'Well Planned', desc: 'Plan three study sessions', icon: CalendarClock, done: study.plan.length >= 3 },
    { id: 'timer', label: 'Time Keeper', desc: 'Log five study sessions', icon: Timer, done: study.sessions.length >= 5 },
    { id: 'crown', label: 'Rising Star', desc: 'Reach level 3', icon: Crown, done: level >= 3 },
  ];
  const badges = [...base, ...extra];
  const earned = badges.filter((b) => b.done).length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Achievements"
        title="Badges worth collecting"
        description="Every lesson checked off and every habit kept unlocks something. Hover a locked badge to see what it asks for."
      >
        <div className="rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-right">
          <div className="flex items-center gap-1.5 font-heading text-2xl font-bold text-neon-gold">
            <Award size={18} /> {earned}<span className="text-sm font-medium text-muted-foreground">/{badges.length}</span>
          </div>
          <div className="text-xs text-muted-foreground">badges earned</div>
        </div>
      </PageHeader>

      <div className="glass rounded-2xl p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Collection progress</span>
          <span>{Math.round((earned / badges.length) * 100)}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-gradient-to-r from-neon-gold to-neon-pink" style={{ width: `${Math.round((earned / badges.length) * 100)}%` }} />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {badges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              title={badge.done ? 'Unlocked' : `Locked — ${badge.desc}`}
              className={cn(
                'flex items-start gap-3 rounded-2xl border p-4 transition-colors',
                badge.done ? 'border-neon-green/35 bg-neon-green/[0.06]' : 'border-border/70 bg-secondary/25 opacity-70'
              )}
            >
              <div className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl border', badge.done ? 'border-neon-green/40 bg-neon-green/10 text-neon-green' : 'border-border text-muted-foreground')}>
                <Icon size={17} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-sm font-semibold">
                  {badge.label}
                  {badge.done && <CheckCircle2 size={12} className="text-neon-green" />}
                </div>
                <p className="text-xs text-muted-foreground">{badge.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <section className="glass flex flex-col items-start justify-between gap-3 rounded-2xl p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-heading text-base font-bold">Want the next badge?</h2>
          <p className="text-sm text-muted-foreground">Lessons checked off are the quickest route.</p>
        </div>
        <Link to="/learn" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          Keep learning
        </Link>
      </section>
    </div>
  );
}