import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizPlayer({ questions = [], onFinish }) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);

  if (!questions.length) {
    return <p className="text-sm text-muted-foreground">This lesson has no questions yet.</p>;
  }

  const question = questions[index];
  const isLast = index === questions.length - 1;
  const revealed = picked !== null;

  const advance = () => {
    const finalCorrect = correctCount + (picked === question.a ? 1 : 0);
    if (isLast) {
      const passed = finalCorrect >= Math.ceil(questions.length * 0.6);
      onFinish({ correct: finalCorrect, total: questions.length, passed });
      return;
    }
    setCorrectCount(finalCorrect);
    setIndex((i) => i + 1);
    setPicked(null);
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-1.5">
        {questions.map((_, i) => (
          <span
            key={i}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-colors',
              i < index ? 'bg-neon-green' : i === index ? 'bg-neon-cyan' : 'bg-secondary'
            )}
          />
        ))}
      </div>

      <div className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        Question {index + 1} of {questions.length}
      </div>
      <h3 className="whitespace-pre-line font-heading text-lg font-semibold leading-snug">{question.p}</h3>

      <div className="mt-4 space-y-2">
        {question.o.map((option, i) => {
          const isCorrect = i === question.a;
          const isPicked = i === picked;
          return (
            <button
              key={i}
              type="button"
              onClick={() => { if (!revealed) setPicked(i); }}
              disabled={revealed}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition-all',
                !revealed && 'border-border bg-secondary/40 hover:border-neon-cyan/50 hover:bg-secondary',
                revealed && isCorrect && 'border-neon-green/60 bg-neon-green/10',
                revealed && isPicked && !isCorrect && 'border-destructive/60 bg-destructive/10',
                revealed && !isCorrect && !isPicked && 'border-border/60 opacity-60'
              )}
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-border/80 font-mono text-[11px] text-muted-foreground">
                {LETTERS[i]}
              </span>
              <span className="flex-1 font-mono text-[13px]">{option}</span>
              {revealed && isCorrect && <CheckCircle2 size={16} className="text-neon-green" />}
              {revealed && isPicked && !isCorrect && <XCircle size={16} className="text-destructive" />}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="mt-4 animate-pop space-y-3">
          <p className={cn('text-sm', picked === question.a ? 'text-neon-green' : 'text-foreground/90')}>
            <span className="font-semibold">{picked === question.a ? 'Correct. ' : 'Not quite. '}</span>
            {question.e}
          </p>
          <Button onClick={advance} className="rounded-full px-5 font-semibold">
            {isLast ? 'See my score' : 'Next question'}
            <ArrowRight size={15} className="ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}