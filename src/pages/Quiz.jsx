import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ListChecks, RefreshCw, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ALL_TOPICS, LEVELS, LEVEL_META, topicsByLevel } from '@/content/curriculum';
import { useProgress } from '@/lib/progress';
import QuizPlayer from '@/components/QuizPlayer';
import PageHeader from '@/components/PageHeader';
import { cn } from '@/lib/utils';

const SCOPES = [
  { key: 'all', label: 'Everything' },
  ...LEVELS.map((l) => ({ key: l, label: LEVEL_META[l].label })),
  { key: 'review', label: 'Review completed' },
];

export default function Quiz() {
  const { completed, addXp } = useProgress();
  const [scope, setScope] = useState('all');
  const [round, setRound] = useState(0);
  const [result, setResult] = useState(null);

  const pool = useMemo(() => {
    if (scope === 'all') return ALL_TOPICS;
    if (scope === 'review') return ALL_TOPICS.filter((t) => completed[t.id]);
    return topicsByLevel(scope);
  }, [scope, completed]);

  const questions = useMemo(
    () => pool.slice(0, 5).flatMap((t) => t.quiz).slice(0, 8),
    [pool, round]
  );

  const pickScope = (key) => {
    setScope(key);
    setResult(null);
    setRound((r) => r + 1);
  };

  const finish = (res) => {
    setResult(res);
    if (res.passed) addXp(15);
  };

  const retry = () => {
    setResult(null);
    setRound((r) => r + 1);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Practice quiz"
        title="Test what you know"
        description="Questions pulled from the lessons you have read. Eight at most, no timer, and the feedback explains every answer."
      />

      <div className="flex flex-wrap gap-1.5">
        {SCOPES.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => pickScope(key)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
              scope === key
                ? 'border-neon-cyan/50 bg-neon-cyan/15 text-neon-cyan'
                : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {questions.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-center">
          <ListChecks size={22} className="mx-auto text-muted-foreground" />
          <h2 className="mt-3 font-heading text-lg font-bold">Nothing to review yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Finish a lesson first, then come back to the review quiz.
          </p>
          <Button asChild className="mt-4 rounded-full px-5 font-semibold">
            <Link to="/learn">Open the learning path</Link>
          </Button>
        </div>
      ) : result ? (
        <div className="glass animate-pop rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <div className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-xl border', result.passed ? 'border-neon-green/40 bg-neon-green/10 text-neon-green' : 'border-destructive/40 bg-destructive/10 text-destructive')}>
              <Trophy size={19} />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold">
                {result.passed ? 'Nice work' : 'Keep going'} — {result.correct}/{result.total}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {result.passed
                  ? 'You cleared the pass mark and earned 15 XP.'
                  : `The pass mark is ${Math.ceil(result.total * 0.6)} of ${result.total}. Retry with a fresh set.`}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button className="rounded-full px-5 font-semibold" onClick={retry}>
              <RefreshCw size={14} className="mr-1.5" /> New quiz
            </Button>
            <Button asChild variant="secondary" className="rounded-full px-5 font-semibold">
              <Link to="/learn">
                Back to lessons <ArrowRight size={14} className="ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="glass rounded-2xl p-5 sm:p-6">
          <QuizPlayer questions={questions} onFinish={finish} />
        </div>
      )}
    </div>
  );
}