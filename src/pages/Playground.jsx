import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Loader2, RotateCcw, Sparkles, Terminal, Save } from 'lucide-react';
import { ensureEngine, engineReady, runPython } from '@/lib/python';
import { useStudy } from '@/lib/study';
import ExampleLibrary from '@/components/playground/ExampleLibrary';
import { cn } from '@/lib/utils';

const EXAMPLES = [
  {
    label: 'Hello world',
    code: 'name = "Pyro"\nprint("Hello,", name)',
  },
  {
    label: 'Star triangle',
    code: 'for row in range(1, 6):\n    print("*" * row)',
  },
  {
    label: 'Times table',
    code: 'def table(n):\n    for i in range(1, 6):\n        print(n, "x", i, "=", n * i)\n\ntable(7)',
  },
  {
    label: 'Fizz pattern',
    code: 'for n in range(1, 16):\n    if n % 15 == 0:\n        print("FizzBuzz")\n    elif n % 3 == 0:\n        print("Fizz")\n    elif n % 5 == 0:\n        print("Buzz")\n    else:\n        print(n)',
  },
];

export default function Playground() {
  const [code, setCode] = useState(EXAMPLES[0].code);
  const [output, setOutput] = useState(null);
  const [running, setRunning] = useState(false);
  const [engine, setEngine] = useState(engineReady() ? 'ready' : 'loading');
  const [savedSnippet, setSavedSnippet] = useState(false);
  const outputRef = useRef(null);
  const { addSnippet } = useStudy();

  useEffect(() => {
    let alive = true;
    ensureEngine().then((res) => { if (alive) setEngine(res.ok ? 'ready' : 'error'); });
    return () => { alive = false; };
  }, []);

  // A snippet opened from the saved snippets page lands here.
  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem('pyrolearn.snippet');
      if (stored) {
        setCode(stored);
        window.sessionStorage.removeItem('pyrolearn.snippet');
      }
    } catch {
      /* storage blocked */
    }
  }, []);

  const keepSnippet = () => {
    const firstLine = code.split('\n').find((line) => line.trim()) || '';
    addSnippet({
      title: firstLine.replace(/^#\s*/, '').slice(0, 46) || 'Playground snippet',
      code,
    });
    setSavedSnippet(true);
    window.setTimeout(() => setSavedSnippet(false), 2200);
  };

  const run = async () => {
    setRunning(true);
    setOutput('');
    const out = await runPython(code);
    setOutput(out.trim() === '' ? '(no output)' : out);
    setRunning(false);
    if (outputRef.current) outputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const handleKeyDown = (event) => {
    if (event.key !== 'Tab') return;
    event.preventDefault();
    const el = event.target;
    const start = el.selectionStart;
    setCode(`${code.slice(0, start)}    ${code.slice(el.selectionEnd)}`);
    requestAnimationFrame(() => el.setSelectionRange(start + 4, start + 4));
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">Playground</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          A real Python editor that runs in your browser. Break things, experiment, print anything you like.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((example) => (
          <button
            key={example.label}
            type="button"
            onClick={() => { setCode(example.code); setOutput(null); }}
            className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-neon-cyan/50 hover:text-foreground"
          >
            <Sparkles size={11} className="mr-1 inline text-neon-cyan" />
            {example.label}
          </button>
        ))}
      </div>

      <ExampleLibrary
        onPick={(snippet) => {
          setCode(snippet);
          setOutput(null);
        }}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="glass rounded-2xl p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <Terminal size={13} /> main.py
            </span>
            <span className="text-[11px] text-muted-foreground">
              {engine === 'ready' ? 'engine ready' : engine === 'loading' ? 'loading…' : 'offline'}
            </span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            aria-label="Python playground editor"
            className={cn('code-area', 'min-h-[340px]')}
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button onClick={run} disabled={running || engine !== 'ready'} className="rounded-full px-5 font-semibold">
              {running ? <Loader2 size={15} className="animate-spin" /> : <Play size={15} />}
              {running ? 'Running' : 'Run code'}
            </Button>
            <Button variant="secondary" size="sm" onClick={keepSnippet} className="rounded-full">
              <Save size={13} /> {savedSnippet ? 'Saved to snippets' : 'Save snippet'}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { setCode(''); setOutput(null); }} className="rounded-full text-muted-foreground">
              <RotateCcw size={13} /> Clear
            </Button>
          </div>
        </div>

        <div className="glass flex flex-col rounded-2xl p-4">
          <div className="mb-2 text-xs font-semibold text-muted-foreground">Output</div>
          <div ref={outputRef} className="flex-1">
            <pre className="code-block min-h-[340px] whitespace-pre-wrap">
              {output === null ? 'Press Run code and your output appears here.' : output}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}