import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShieldCheck, RefreshCw, Trophy, ArrowRight, Zap } from 'lucide-react';
import QuizPlayer from '@/components/QuizPlayer';
import PyroMascot from '@/components/PyroMascot';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';

export default function QuizPanel({ topic, isDone, onComplete, onNext, hasNext }) {
  const [stage, setStage] = useState('intro');
  const [result, setResult] = useState(null);
  const [gained, setGained] = useState(0);

  const start = () => {
    setResult(null);
    setGained(0);
    setStage('running');
  };

  const finish = (res) => {
    setResult(res);
    setStage('result');
    if (res.passed) {
      setGained(onComplete(res));
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.7 },
        colors: ['#4ade80', '#22d3ee', '#a78bfa', '#facc15'],
      });
    }
  };

  if (stage === 'running') {
    return (
      <div className="glass rounded-2xl p-5 sm:p-6">
        <QuizPlayer questions={topic.quiz} onFinish={finish} />
      </div>
    );
  }

  if (stage === 'result' && result) {
    if (result.passed) {
      return (
        <div className="glass animate-pop rounded-2xl p-6 text-center">
          <PyroMascot size={92} className="mx-auto animate-float" />
          <h3 className="mt-3 font-heading text-2xl font-bold text-neon-green neon-text">Topic completed!</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {result.correct} of {result.total} correct — this lesson is now ticked off your path.
          </p>
          {gained > 0 && (
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-neon-gold/40 bg-neon-gold/10 px-3 py-1 text-xs font-semibold text-neon-gold">
              <Zap size={12} /> +{gained} XP
            </p>
          )}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {hasNext && (
              <Button className="rounded-full px-5 font-semibold" onClick={onNext}>
                Next lesson <ArrowRight size={15} className="ml-1" />
              </Button>
            )}
            <Button variant="secondary" className="rounded-full px-5 font-semibold" onClick={start}>
              <RefreshCw size={14} className="mr-1.5" /> Retake
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="glass animate-pop rounded-2xl p-6 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-destructive/40 bg-destructive/10">
          <RefreshCw size={22} className="text-destructive" />
        </div>
        <h3 className="mt-3 font-heading text-xl font-bold">Almost there</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {result.correct} of {result.total} correct. You need {Math.ceil(topic.quiz.length * 0.6)} to tick this topic off — read the feedback and try again.
        </p>
        <Button className="mt-5 rounded-full px-5 font-semibold" onClick={start}>
          <RefreshCw size={14} className="mr-1.5" /> Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-neon-purple/40 bg-neon-purple/10">
          <ShieldCheck size={20} className="text-neon-purple" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold">Lesson check</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {topic.quiz.length} quick questions on {topic.title.toLowerCase()}. Get {Math.ceil(topic.quiz.length * 0.6)} right to complete the topic.
          </p>
          {isDone && (
            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-neon-green">
              <Trophy size={12} /> Already completed — retake it any time to keep it sharp.
            </p>
          )}
        </div>
      </div>

      <Button className={cn('mt-5 rounded-full px-5 font-semibold')} onClick={start}>
        {isDone ? 'Retake the check' : 'Start the check'}
        <ArrowRight size={15} className="ml-1" />
      </Button>
    </div>
  );
}