import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Eye, Loader2, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { ensureEngine, engineReady, runPython, normalizeOutput } from '@/lib/python';
import { cn } from '@/lib/utils';

export default function PythonRunner({ starter = '', solution = '', expected = '', onPass }) {
  const [code, setCode] = useState(starter);
  const [output, setOutput] = useState(null);
  const [running, setRunning] = useState(false);
  const [verdict, setVerdict] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [engine, setEngine] = useState(engineReady() ? 'ready' : 'loading');

  useEffect(() => {
    let alive = true;
    ensureEngine().then((res) => {
      if (alive) setEngine(res.ok ? 'ready' : 'error');
    });
    return () => { alive = false; };
  }, []);

  const execute = async () => {
    setRunning(true);
    setVerdict(null);
    try {
      const out = await runPython(code);
      setOutput(out.trim() === '' ? '(no output)' : out);
      return out;
    } finally {
      setRunning(false);
    }
  };

  const check = async () => {
    if (engine !== 'ready') return;
    const out = await execute();
    const passed = normalizeOutput(out) !== '' && normalizeOutput(out) === normalizeOutput(expected);
    setVerdict(passed ? 'pass' : 'fail');
    if (passed && onPass) onPass();
  };

  const handleKeyDown = (event) => {
    if (event.key !== 'Tab') return;
    event.preventDefault();
    const el = event.target;
    const start = el.selectionStart;
    const next = `${code.slice(0, start)}    ${code.slice(el.selectionEnd)}`;
    setCode(next);
    requestAnimationFrame(() => el.setSelectionRange(start + 4, start + 4));
  };

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        aria-label="Python code editor"
        className="code-area"
      />

      <div className="mt-2 flex min-h-5 items-center gap-2 text-xs text-muted-foreground">
        {engine === 'loading' && <><Loader2 size={12} className="animate-spin" /> Warming up the Python engine…</>}
        {engine === 'ready' && <span className="text-neon-green">Python is ready — no installation needed.</span>}
        {engine === 'error' && <span className="text-destructive">The Python engine could not load. Check your connection and refresh.</span>}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button onClick={execute} disabled={running || engine !== 'ready'} className="rounded-full px-5 font-semibold">
          {running ? <Loader2 size={15} className="animate-spin" /> : <Play size={15} />}
          {running ? 'Running' : 'Run'}
        </Button>
        {expected && (
          <Button variant="secondary" onClick={check} disabled={running || engine !== 'ready'} className="rounded-full px-5 font-semibold">
            <CheckCircle2 size={15} /> Check answer
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { setCode(starter); setOutput(null); setVerdict(null); }}
          className="rounded-full text-muted-foreground"
        >
          <RotateCcw size={13} /> Reset
        </Button>
        {solution && (
          <Button variant="ghost" size="sm" onClick={() => setShowSolution((v) => !v)} className="rounded-full text-muted-foreground">
            <Eye size={13} /> {showSolution ? 'Hide' : 'Show'} solution
          </Button>
        )}
      </div>

      {showSolution && solution && (
        <pre className="code-block mt-3 animate-pop">{solution}</pre>
      )}

      {output !== null && (
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-[11px] uppercase tracking-widest text-muted-foreground">
            <span>Output</span>
            {verdict && (
              <span className={cn('flex items-center gap-1 font-semibold normal-case tracking-normal', verdict === 'pass' ? 'text-neon-green' : 'text-destructive')}>
                {verdict === 'pass' ? <><CheckCircle2 size={12} /> Matches the expected output</> : <><XCircle size={12} /> Not quite — compare with the task</>}
              </span>
            )}
          </div>
          <pre className="code-block min-h-[60px] whitespace-pre-wrap">{output}</pre>
        </div>
      )}

      {expected && !verdict && (
        <p className="mt-3 flex items-start gap-1.5 text-xs text-muted-foreground">
          <Lightbulb size={13} className="mt-0.5 shrink-0 text-neon-gold" />
          Expected output: <code className="font-mono text-neon-cyan">{expected.replace(/\n/g, ' ⏎ ')}</code>
        </p>
      )}
    </div>
  );
}