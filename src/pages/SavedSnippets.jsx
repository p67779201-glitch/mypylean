import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Code2, Copy, Play, Plus, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStudy } from '@/lib/study';
import PageHeader from '@/components/PageHeader';
import { cn } from '@/lib/utils';

const STARTER = 'for n in range(1, 6):\n    print(n, "squared is", n * n)';

export default function SavedSnippets() {
  const { study, addSnippet, updateSnippet, removeSnippet } = useStudy();
  const navigate = useNavigate();
  const [draft, setDraft] = useState({ title: '', code: STARTER });
  const [editing, setEditing] = useState(null);
  const [copied, setCopied] = useState('');

  const save = (event) => {
    event.preventDefault();
    if (!draft.code.trim()) return;
    if (editing) {
      updateSnippet(editing, { title: draft.title.trim() || 'Untitled snippet', code: draft.code });
      setEditing(null);
    } else {
      addSnippet(draft);
    }
    setDraft({ title: '', code: STARTER });
  };

  const copy = async (snippet) => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(snippet.id);
      window.setTimeout(() => setCopied(''), 1800);
    } catch {
      setCopied('');
    }
  };

  const openInPlayground = (snippet) => {
    try {
      window.sessionStorage.setItem('pyrolearn.snippet', snippet.code);
    } catch {
      /* storage blocked — the playground still opens */
    }
    navigate('/playground');
  };

  const startEdit = (snippet) => {
    setEditing(snippet.id);
    setDraft({ title: snippet.title, code: snippet.code });
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Saved snippets"
        title="Your personal code shelf"
        description="Keep the bits of Python worth reusing, then send any of them straight back to the playground."
      >
        <span className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
          <Code2 size={12} /> {study.snippets.length} saved
        </span>
      </PageHeader>

      <form onSubmit={save} className="glass rounded-2xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-heading text-base font-bold">{editing ? 'Edit snippet' : 'New snippet'}</h2>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setDraft({ title: '', code: STARTER });
              }}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Cancel edit
            </button>
          )}
        </div>
        <Input
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          placeholder="Give it a name — e.g. Loop through a list"
          className="mt-3"
        />
        <textarea
          value={draft.code}
          onChange={(e) => setDraft({ ...draft, code: e.target.value })}
          rows={7}
          spellCheck={false}
          className={cn('code-area mt-2')}
          aria-label="Snippet code"
        />
        <Button type="submit" disabled={!draft.code.trim()} className="mt-3 rounded-full px-5 font-semibold">
          {editing ? <Save size={14} className="mr-1.5" /> : <Plus size={14} className="mr-1.5" />}
          {editing ? 'Save changes' : 'Save snippet'}
        </Button>
      </form>

      {study.snippets.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-center">
          <Code2 size={22} className="mx-auto text-muted-foreground" />
          <h2 className="mt-3 font-heading text-lg font-bold">Nothing saved yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Paste something above, or hit “Save snippet” in the playground while you experiment.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {study.snippets.map((snippet) => (
            <article key={snippet.id} className="glass flex flex-col rounded-2xl p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-semibold">{snippet.title}</h2>
                  <p className="text-[11px] text-muted-foreground">
                    {new Date(snippet.at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeSnippet(snippet.id)}
                  aria-label={`Delete ${snippet.title}`}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <pre className="code-block mt-3 max-h-44 overflow-auto text-[12px]">{snippet.code}</pre>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <Button size="sm" variant="secondary" className="rounded-full px-3" onClick={() => openInPlayground(snippet)}>
                  <Play size={12} className="mr-1" /> Playground
                </Button>
                <Button size="sm" variant="ghost" className="rounded-full px-3 text-muted-foreground" onClick={() => copy(snippet)}>
                  {copied === snippet.id ? <Check size={12} className="mr-1 text-neon-green" /> : <Copy size={12} className="mr-1" />}
                  {copied === snippet.id ? 'Copied' : 'Copy'}
                </Button>
                <Button size="sm" variant="ghost" className="rounded-full px-3 text-muted-foreground" onClick={() => startEdit(snippet)}>
                  Edit
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}