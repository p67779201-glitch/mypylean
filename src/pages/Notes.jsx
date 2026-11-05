import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, NotebookPen, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MODULES } from '@/content/curriculum';
import { useStudy } from '@/lib/study';
import { accent } from '@/lib/theme';
import PageHeader from '@/components/PageHeader';
import { cn } from '@/lib/utils';

export default function Notes() {
  const { study, setNote, deleteNote } = useStudy();
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState('');

  const groups = MODULES.map((module) => ({
    module,
    items: module.topics.filter((t) => study.notes[t.id]).map((t) => ({ topic: t, note: study.notes[t.id] })),
  })).filter((g) => g.items.length);

  const total = groups.reduce((sum, g) => sum + g.items.length, 0);

  const startEdit = (topicId, text) => {
    setEditing(topicId);
    setDraft(text);
  };

  const save = (topicId) => {
    if (draft.trim()) setNote(topicId, draft.trim());
    else deleteNote(topicId);
    setEditing(null);
    setDraft('');
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Notes repository"
        title="Everything you wrote down"
        description="Notes are grouped by module and stay on this device. Open a lesson to add one while you read."
      >
        <span className="rounded-full border border-border bg-secondary/40 px-4 py-2 text-xs font-semibold text-muted-foreground">
          {total} note{total === 1 ? '' : 's'}
        </span>
      </PageHeader>

      {groups.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-center">
          <NotebookPen size={22} className="mx-auto text-muted-foreground" />
          <h2 className="mt-3 font-heading text-lg font-bold">No notes yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Open any lesson and use the notes box under the theory to keep the bits worth remembering.
          </p>
          <Button asChild className="mt-4 rounded-full px-5 font-semibold">
            <Link to="/learn">Open a lesson <ArrowRight size={14} className="ml-1" /></Link>
          </Button>
        </div>
      ) : (
        groups.map(({ module, items }) => {
          const theme = accent(module.accent);
          return (
            <section key={module.id}>
              <div className="mb-3 flex items-center gap-2.5">
                <span className={cn('rounded-lg border px-2 py-0.5 text-[11px] font-semibold', theme.chip)}>{module.title}</span>
                <span className="text-xs text-muted-foreground">{items.length} note{items.length === 1 ? '' : 's'}</span>
              </div>

              <div className="space-y-2">
                {items.map(({ topic, note }) => (
                  <div key={topic.id} className="glass rounded-2xl p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Link to={`/lesson/${topic.id}`} className="text-sm font-semibold hover:text-neon-green">
                        {topic.title}
                      </Link>
                      <span className="text-[11px] text-muted-foreground">
                        {new Date(note.at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    {editing === topic.id ? (
                      <div className="mt-2">
                        <textarea
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          rows={4}
                          className="w-full resize-y rounded-xl border border-border bg-secondary/40 p-3 text-sm outline-none focus:border-neon-green/50"
                          aria-label={`Edit note for ${topic.title}`}
                        />
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" onClick={() => save(topic.id)} className="rounded-full px-4 font-semibold">
                            <Save size={13} className="mr-1.5" /> Save
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setEditing(null)} className="rounded-full text-muted-foreground">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{note.text}</p>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="secondary" onClick={() => startEdit(topic.id, note.text)} className="rounded-full px-3">
                            Edit
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => deleteNote(topic.id)} className="rounded-full text-muted-foreground hover:text-destructive">
                            <Trash2 size={13} className="mr-1.5" /> Delete
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}