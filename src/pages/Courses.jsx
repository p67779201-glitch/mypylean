import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { ALL_TOPICS, MODULES, LEVEL_META, topicLevel } from '@/content/curriculum';
import { useProgress } from '@/lib/progress';
import LevelFilter from '@/components/LevelFilter';
import PageHeader from '@/components/PageHeader';
import TopicRow from '@/components/TopicRow';
import { cn } from '@/lib/utils';

export default function Courses() {
  const { completed } = useProgress();
  const [level, setLevel] = useState('all');

  const matches = (topic) => level === 'all' || topicLevel(topic) === level;
  const total = ALL_TOPICS.filter(matches).length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Course catalog"
        title="Browse every lesson"
        description="Pick the level that fits you today. Every lesson is open — the tag just tells you how much it asks of you."
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <LevelFilter value={level} onChange={setLevel} />
        <span className="text-xs text-muted-foreground">{total} lessons shown</span>
      </div>

      <div className="space-y-8">
        {MODULES.map((module, moduleIndex) => {
          const topics = module.topics.filter(matches);
          if (!topics.length) return null;
          const done = module.topics.filter((t) => completed[t.id]).length;
          return (
            <section key={module.id}>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-secondary/60 font-mono text-[11px] font-semibold text-muted-foreground">
                    {String(moduleIndex + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="font-heading text-lg font-bold tracking-tight">{module.title}</h2>
                    <p className="text-xs text-muted-foreground">{module.tagline}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{done}/{module.topics.length} done</span>
              </div>

              <div className="space-y-2">
                {topics.map((topic) => (
                  <TopicRow
                    key={topic.id}
                    topic={{ ...topic, topicIndex: module.topics.indexOf(topic), moduleAccent: module.accent }}
                    record={completed[topic.id]}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section className="glass flex flex-col items-start justify-between gap-3 rounded-2xl p-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Compass size={20} className="text-neon-cyan" />
          <div>
            <h2 className="font-heading text-base font-bold">Not sure where you sit?</h2>
            <p className="text-sm text-muted-foreground">
              Beginners start at {LEVEL_META.beginner.label.toLowerCase()} — everyone else can jump straight in.
            </p>
          </div>
        </div>
        <Link to="/quiz" className={cn('inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground')}>
          Try a practice quiz <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}