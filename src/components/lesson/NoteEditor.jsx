import React, { useEffect, useState } from 'react';
import { NotebookPen, Save, Trash2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStudy } from '@/lib/study';

// Notes taken while reading a lesson — they all show up in the notes repository.
export default function NoteEditor({ topicId }) {
  const { study, setNote, deleteNote } = useStudy();
  const saved = study.notes[topicId]?.text || '';
  const [draft, setDraft] = useState(saved);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    setDraft(study.notes[topicId]?.text || '');
    setJustSaved(false);
  }, [topicId]);

  const save = () => {
    if (!draft.trim()) {
      deleteNote(topicId);
      setJustSaved(false);
      return;
    }
    setNote(topicId, draft.trim());
    setJustSaved(true);
    window.setTimeout(() => setJustSaved(false), 2000);
  };

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="flex items-center gap-2 font-heading text-base font-bold">
        <NotebookPen size={16} className="text-neon-gold" /> Your notes
      </h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Jot down anything worth keeping — saved notes live in the notes page.
      </p>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={4}
        placeholder="e.g. quotes are the wrapper, not the message…"
        aria-label="Lesson notes"
        className="mt-3 w-full resize-y rounded-xl border border-border bg-secondary/40 p-3 text-sm leading-relaxed outline-none focus:border-neon-green/50"
      />
      <div className="mt-2 flex items-center gap-2">
        <Button size="sm" onClick={save} className="rounded-full px-4 font-semibold">
          <Save size={13} className="mr-1.5" /> Save note
        </Button>
        {study.notes[topicId] && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => { deleteNote(topicId); setDraft(''); }}
            className="rounded-full text-muted-foreground"
          >
            <Trash2 size={13} className="mr-1.5" /> Delete
          </Button>
        )}
        {justSaved && (
          <span className="flex items-center gap-1 text-xs font-semibold text-neon-green">
            <Check size={12} /> Saved
          </span>
        )}
      </div>
    </div>
  );
}