import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Clock, Flame, Sparkles, Terminal, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PyroMascot from '@/components/PyroMascot';
import ModuleCard from '@/components/ModuleCard';
import { MODULES, ALL_TOPICS, TOPIC_COUNT, getTopic } from '@/content/curriculum';
import { useProgress } from '@/lib/progress';
import { accent } from '@/lib/theme';

const Stat = ({ icon: Icon, value, label, tone }) => (
  <div className="glass rounded-2xl p-4">
    <Icon size={17} className={tone} />
    <div className="mt-2 font-heading text-2xl font-bold leading-none">{value}</div>
    <div className="mt-1 text-xs text-muted-foreground">{label}</div>
  </div>
);

export default function Home() {
  const { completed, done, percent, level, levelXp, xpToNext, progress } = useProgress();
  const upNext = getTopic(ALL_TOPICS.find((t) => !completed[t.id])?.id);
  const nextTheme = upNext ? accent(upNext.moduleAccent) : null;

  return (
    <div className="space-y-14">
      <section className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            <Sparkles size={12} className="text-neon-green" />
            No ads · no locks · no sign-up
          </span>

          <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Learn Python,
            <br />
            <span className="text-gradient neon-text">one spark at a time.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            {TOPIC_COUNT} bite-size lessons take you from your very first <code className="rounded bg-neon-cyan/10 px-1.5 py-0.5 font-mono text-[0.85em] text-neon-cyan">print()</code> to
            your own mini projects. Every lesson is open — start anywhere, and watch the map fill up as you finish topics.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-11 rounded-full px-6 font-semibold">
              <Link to="/learn">
                {done === 0 ? 'Start learning' : 'Keep learning'}
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="h-11 rounded-full px-6 font-semibold">
              <Link to="/playground">
                <Terminal size={16} className="mr-1.5" /> Playground
              </Link>
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Progress is saved in this browser — pick up where you left off any time.
          </p>
        </div>

        <div className="relative">
          <div className="glass relative overflow-hidden rounded-3xl p-6">
            <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-neon-green/20 blur-3xl" />
            <div className="flex items-start gap-4">
              <PyroMascot size={104} className="animate-float shrink-0" />
              <div className="glass-soft mt-2 rounded-2xl rounded-tl-sm px-4 py-3 text-sm">
                {done === 0 ? 'I am Pyro. Ready to write your first line of code?' : `Nice — ${done} lesson${done === 1 ? '' : 's'} down. Shall we keep going?`}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold">Level {level}</span>
                  <span className="text-muted-foreground">{levelXp} / {xpToNext} XP</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-gradient-to-r from-neon-green to-neon-cyan" style={{ width: `${Math.round((levelXp / xpToNext) * 100)}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-black/20 p-2.5">
                  <div className="font-heading text-lg font-bold">{done}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Done</div>
                </div>
                <div className="rounded-xl bg-black/20 p-2.5">
                  <div className="font-heading text-lg font-bold text-neon-gold">{progress.streak || 0}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Streak</div>
                </div>
                <div className="rounded-xl bg-black/20 p-2.5">
                  <div className="font-heading text-lg font-bold text-neon-cyan">{percent}%</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Of all</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat icon={CheckCircle2} value={`${done}/${TOPIC_COUNT}`} label="Topics completed" tone="text-neon-green" />
        <Stat icon={Zap} value={progress.xp} label="XP earned" tone="text-neon-cyan" />
        <Stat icon={Flame} value={progress.streak || 0} label="Day streak" tone="text-neon-gold" />
        <Stat icon={Sparkles} value={progress.perfect} label="Perfect quizzes" tone="text-neon-purple" />
      </section>

      {upNext && (
        <section className="glass flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border ${nextTheme.chip}`}>
              <BookOpen size={20} />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Up next · {upNext.moduleTitle}
              </div>
              <div className="font-heading text-lg font-bold">{upNext.title}</div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock size={11} /> {upNext.minutes} min</span>
                <span>{upNext.summary}</span>
              </div>
            </div>
          </div>
          <Button asChild className="shrink-0 rounded-full px-5 font-semibold">
            <Link to={`/lesson/${upNext.id}`}>
              {completed[upNext.id] ? 'Review' : 'Continue'} <ArrowRight size={15} className="ml-1" />
            </Link>
          </Button>
        </section>
      )}

      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight">The path</h2>
            <p className="text-sm text-muted-foreground">Six modules, {TOPIC_COUNT} lessons. Everything unlocked.</p>
          </div>
          <Link to="/learn" className="text-sm font-semibold text-neon-green hover:underline">
            See all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((module, i) => (
            <ModuleCard key={module.id} module={module} index={i} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: BookOpen, title: 'Read a short lesson', text: 'Plain-language theory with runnable examples. No walls of text.' },
          { icon: Terminal, title: 'Write real code', text: 'A Python editor runs right in the page — nothing to install.' },
          { icon: CheckCircle2, title: 'Mark it complete', text: 'Pass the three-question check and the topic is ticked off your map.' },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="glass-soft rounded-2xl p-5">
            <Icon size={18} className="text-neon-cyan" />
            <h3 className="mt-3 font-heading text-base font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}