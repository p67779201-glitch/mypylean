import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock, Code2, ListChecks, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ALL_TOPICS, getModule, getTopic, nextTopicId, topicLevel, LEVEL_META } from '@/content/curriculum';
import { useProgress } from '@/lib/progress';
import { accent } from '@/lib/theme';
import PythonRunner from '@/components/PythonRunner';
import QuizPanel from '@/components/lesson/QuizPanel';
import NoteEditor from '@/components/lesson/NoteEditor';
import { cn } from '@/lib/utils';

const TABS = [
  { key: 'learn', label: 'Learn', icon: BookOpen },
  { key: 'practice', label: 'Practise', icon: Code2 },
  { key: 'quiz', label: 'Check', icon: ListChecks },
];

export default function Lesson() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { completed, completeTopic, isDone } = useProgress();
  const [tab, setTab] = useState('learn');
  const [practicePassed, setPracticePassed] = useState(false);

  const topic = getTopic(topicId);

  useEffect(() => {
    setTab('learn');
    setPracticePassed(false);
  }, [topicId]);

  if (!topic) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <h1 className="font-heading text-xl font-bold">Lesson not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">That topic may have moved. Everything lives on the learning path.</p>
        <Button asChild className="mt-5 rounded-full px-5 font-semibold">
          <Link to="/learn">Back to the path</Link>
        </Button>
      </div>
    );
  }

  const module = getModule(topic.moduleId);
  const theme = accent(topic.moduleAccent);
  const level = LEVEL_META[topicLevel(topic)];
  const record = completed[topic.id];
  const nextId = nextTopicId(topic.id);
  const next = nextId ? getTopic(nextId) : null;
  const prev = ALL_TOPICS[ALL_TOPICS.findIndex((t) => t.id === topic.id) - 1];

  return (
    <div className="space-y-6">
      <div>
        <Link to="/learn" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft size={13} /> {module.title}
        </Link>

        <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">{topic.title}</h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock size={12} /> {topic.minutes} min</span>
              <span className={cn('rounded-full border px-2 py-0.5 font-semibold', theme.chip)}>{module.title}</span>
              <span className={cn('rounded-full border px-2 py-0.5 font-semibold', level.chip)}>{level.label}</span>
              <span>Lesson {ALL_TOPICS.findIndex((t) => t.id === topic.id) + 1} of {ALL_TOPICS.length}</span>
            </div>
          </div>

          {record && (
            <span className="flex items-center gap-1.5 rounded-full border border-neon-green/40 bg-neon-green/10 px-3 py-1.5 text-xs font-semibold text-neon-green">
              <CheckCircle2 size={13} /> Completed{record.total ? ` · ${record.score}/${record.total}` : ' · practice'}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-1 rounded-full border border-border bg-secondary/40 p-1">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-colors sm:text-sm',
              tab === key ? 'bg-background text-foreground shadow' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon size={14} /> {label}
            {key === 'quiz' && record && <CheckCircle2 size={12} className="text-neon-green" />}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="animate-fade-up space-y-5">
          <article className="glass rounded-2xl p-6">
            <div className="prose-lesson" dangerouslySetInnerHTML={{ __html: topic.theory }} />
          </article>

          <NoteEditor topicId={topic.id} />

          {topic.example && (
            <div className="glass rounded-2xl p-6">
              <h2 className="flex items-center gap-2 font-heading text-base font-bold">
                <Terminal size={16} className="text-neon-cyan" /> Try this
              </h2>
              <pre className="code-block mt-3">{topic.example.code}</pre>
              {topic.example.note && <p className="mt-2 text-xs text-muted-foreground">{topic.example.note}</p>}
              <Button
                variant="secondary"
                size="sm"
                className="mt-3 rounded-full px-3"
                onClick={() => {
                  try {
                    window.sessionStorage.setItem('pyrolearn.snippet', topic.example.code);
                  } catch {
                    /* storage blocked — the playground still opens */
                  }
                  navigate('/playground');
                }}
              >
                <Terminal size={13} className="mr-1" /> Open this example in the playground
              </Button>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button className="rounded-full px-5 font-semibold" onClick={() => setTab('practice')}>
              Practise it <ArrowRight size={15} className="ml-1" />
            </Button>
            {record && next && (
              <Button asChild variant="secondary" className="rounded-full px-5 font-semibold">
                <Link to={`/lesson/${next.id}`}>Next lesson: {next.title}</Link>
              </Button>
            )}
          </div>
        </div>
      )}

      {tab === 'practice' && (
        <div className="animate-fade-up space-y-4">
          <div className="glass rounded-2xl p-5">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Your task</div>
            <p className="mt-1.5 text-sm leading-relaxed">{topic.practice.task}</p>
            {practicePassed && (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-neon-green">
                <CheckCircle2 size={13} /> Output matches — nicely done.
              </p>
            )}
          </div>

          <PythonRunner
            starter={topic.practice.starter}
            solution={topic.practice.solution}
            expected={topic.practice.expected}
            onPass={() => {
              setPracticePassed(true);
              if (!isDone(topic.id)) completeTopic({ topicId: topic.id, via: 'practice' });
            }}
          />

          <Button className="rounded-full px-5 font-semibold" onClick={() => setTab('quiz')}>
            Ready for the check <ArrowRight size={15} className="ml-1" />
          </Button>
        </div>
      )}

      {tab === 'quiz' && (
        <div className="animate-fade-up">
          <QuizPanel
            topic={topic}
            isDone={isDone(topic.id)}
            hasNext={!!next}
            onNext={() => next && navigate(`/lesson/${next.id}`)}
            onComplete={(res) =>
              completeTopic({
                topicId: topic.id,
                score: res.correct,
                total: res.total,
                perfect: res.correct === res.total,
              })
            }
          />
        </div>
      )}

      <div className="flex items-center justify-between border-t border-border/60 pt-4">
        {prev ? (
          <Link to={`/lesson/${prev.id}`} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft size={13} /> {prev.title}
          </Link>
        ) : <span />}
        {next && (
          <Link to={`/lesson/${next.id}`} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
            {next.title} <ArrowRight size={13} />
          </Link>
        )}
      </div>
    </div>
  );
}