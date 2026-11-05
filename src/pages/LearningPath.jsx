import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Gauge, Target } from 'lucide-react';
import { ALL_TOPICS, LEVELS, LEVEL_META, TOPIC_COUNT, topicsByLevel, topicLevel } from '@/content/curriculum';
import { useProgress } from '@/lib/progress';
import { useStudy } from '@/lib/study';
import PageHeader from '@/components/PageHeader';
import { cn } from '@/lib/utils';

const INTENSITIES = [
  { key: 'light', label: 'Light', perWeek: 2, desc: 'Two lessons a week — steady and unhurried.' },
  { key: 'steady', label: 'Steady', perWeek: 4, desc: 'Four lessons a week — the recommended pace.' },
  { key: 'intense', label: 'Intense', perWeek: 7, desc: 'Seven lessons a week — a lesson a day.' },
];

export default function LearningPath() {
  const { completed, done } = useProgress();
  const { study, setPref, setWeeklyGoal } = useStudy();
  const level = study.prefs.level || 'all';
  const intensity = study.prefs.intensity || 'steady';
  const pace = INTENSITIES.find((i) => i.key === intensity) || INTENSITIES[1];

  const pool = (level === 'all' ? ALL_TOPICS : topicsByLevel(level)).filter((t) => !completed[t.id]);
  const thisWeek = pool.slice(0, pace.perWeek);
  const weeksTotal = Math.ceil(pool.length / pace.perWeek);

  const chooseLevel = (key) => {
    setPref('level', key);
    if (key !== 'all') {
      const levelTopics = topicsByLevel(key).filter((t) => !completed[t.id]).length;
      setWeeklyGoal(Math.max(1, Math.ceil(levelTopics / Math.max(1, Math.ceil(levelTopics / pace.perWeek)))));
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Learning path settings"
        title="Dial in your pace"
        description="Pick the level you want to focus on and how hard you want to push. The recommendation below updates live."
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <Target size={16} className="text-neon-green" />
            <h2 className="font-heading text-lg font-bold">Focus level</h2>
          </div>
          <div className="mt-4 space-y-2">
            {[{ key: 'all', label: 'Everything' }, ...LEVELS.map((l) => ({ key: l, label: LEVEL_META[l].label }))].map((option) => {
              const active = level === option.key;
              const count = option.key === 'all' ? TOPIC_COUNT : topicsByLevel(option.key).length;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => chooseLevel(option.key)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors',
                    active ? 'border-neon-green/50 bg-neon-green/[0.08]' : 'border-border/70 bg-secondary/30 text-muted-foreground hover:text-foreground'
                  )}
                >
                  {option.label}
                  <span className="text-[11px] font-normal text-muted-foreground">{count} lessons</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <Gauge size={16} className="text-neon-cyan" />
            <h2 className="font-heading text-lg font-bold">Intensity</h2>
          </div>
          <div className="mt-4 space-y-2">
            {INTENSITIES.map((option) => {
              const active = intensity === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => {
                    setPref('intensity', option.key);
                    setWeeklyGoal(option.perWeek);
                  }}
                  className={cn(
                    'w-full rounded-xl border px-4 py-3 text-left transition-colors',
                    active ? 'border-neon-cyan/50 bg-neon-cyan/[0.08]' : 'border-border/70 bg-secondary/30 hover:border-neon-cyan/30'
                  )}
                >
                  <div className="flex items-center justify-between text-sm font-semibold">
                    {option.label}
                    <span className="text-[11px] font-normal text-muted-foreground">{option.perWeek}/week</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{option.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              <Compass size={13} /> Your recommendation
            </div>
            <h2 className="mt-1 font-heading text-xl font-bold">
              {pool.length === 0 ? 'Path complete' : `${thisWeek.length} lesson${thisWeek.length === 1 ? '' : 's'} this week`}
            </h2>
            <p className="text-sm text-muted-foreground">
              {pool.length === 0
                ? 'Every lesson in this focus is finished — pick another level or review the roadmap.'
                : `${pool.length} lesson${pool.length === 1 ? '' : 's'} left at ${pace.perWeek}/week ≈ ${weeksTotal} week${weeksTotal === 1 ? '' : 's'}.`}
            </p>
          </div>
          <Link to="/study-roadmap" className="text-xs font-semibold text-neon-cyan hover:underline">
            See the full roadmap
          </Link>
        </div>

        {thisWeek.length > 0 && (
          <ol className="mt-4 space-y-2">
            {thisWeek.map((topic, index) => (
              <li key={topic.id}>
                <Link
                  to={`/lesson/${topic.id}`}
                  className="flex items-center gap-3 rounded-xl border border-border/70 bg-secondary/25 px-4 py-3 transition-colors hover:border-neon-green/40"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-neon-green/40 bg-neon-green/10 font-mono text-[11px] font-bold text-neon-green">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{topic.title}</span>
                    <span className="block text-[11px] text-muted-foreground">
                      {topic.moduleTitle} · {LEVEL_META[topicLevel(topic)].label} · {topic.minutes} min
                    </span>
                  </span>
                  <ArrowRight size={14} className="shrink-0 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>

      <p className="text-xs text-muted-foreground">
        Current focus: <span className="font-semibold text-foreground">{level === 'all' ? 'Everything' : LEVEL_META[level].label}</span> ·{' '}
        {pace.label.toLowerCase()} intensity · {done} of {TOPIC_COUNT} lessons done.
      </p>
    </div>
  );
}