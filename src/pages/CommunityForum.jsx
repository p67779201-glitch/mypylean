import React, { useEffect, useState } from 'react';
import { MessageSquare, Send, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';
import { useStudy } from '@/lib/study';
import PageHeader from '@/components/PageHeader';
import { cn } from '@/lib/utils';

const TOPICS = [
  { key: 'basics', label: 'Basics', chip: 'border-neon-green/40 bg-neon-green/10 text-neon-green' },
  { key: 'loops', label: 'Loops', chip: 'border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan' },
  { key: 'functions', label: 'Functions', chip: 'border-neon-purple/40 bg-neon-purple/10 text-neon-purple' },
  { key: 'debugging', label: 'Debugging', chip: 'border-neon-gold/40 bg-neon-gold/10 text-neon-gold' },
  { key: 'projects', label: 'Projects', chip: 'border-neon-pink/40 bg-neon-pink/10 text-neon-pink' },
];

const chipFor = (key) => TOPICS.find((t) => t.key === key)?.chip || TOPICS[0].chip;

export default function CommunityForum() {
  const { study } = useStudy();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', body: '', topic: 'basics', author: study.name || '' });
  const [replyDraft, setReplyDraft] = useState({});
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try {
      const page = await base44.entities.ForumPost.filter({}, { sort: '-created_date', limit: 50 });
      setPosts(page.items);
      setError('');
    } catch {
      setError('Sign in to read and post in the community forum.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const author = () => (form.author.trim() || study.name || 'Python learner').trim();

  const publish = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;
    setBusy(true);
    try {
      await base44.entities.ForumPost.create({
        title: form.title.trim(),
        body: form.body.trim(),
        topic: form.topic,
        author_name: author(),
        replies: [],
      });
      setForm({ ...form, title: '', body: '' });
      await load();
    } catch {
      setError('That post could not be saved — sign in and try again.');
    } finally {
      setBusy(false);
    }
  };

  const reply = async (post) => {
    const text = (replyDraft[post.id] || '').trim();
    if (!text) return;
    try {
      const replies = [...(post.replies || []), { author: author(), body: text, at: new Date().toISOString() }];
      const updated = await base44.entities.ForumPost.update(post.id, { replies });
      setPosts((list) => list.map((p) => (p.id === post.id ? { ...p, replies: updated.replies || replies } : p)));
      setReplyDraft((draft) => ({ ...draft, [post.id]: '' }));
    } catch {
      setError('Your reply could not be saved — sign in and try again.');
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Community forum"
        title="Ask, answer, unblock each other"
        description="Post a question about any Python concept and help someone else solve theirs."
      >
        <span className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
          <Users size={12} /> {posts.length} thread{posts.length === 1 ? '' : 's'}
        </span>
      </PageHeader>

      <form onSubmit={publish} className="glass rounded-2xl p-5">
        <h2 className="font-heading text-base font-bold">Start a thread</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_200px]">
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="What are you stuck on?"
          />
          <Input
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            placeholder="Your name"
            aria-label="Your name"
          />
        </div>
        <textarea
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          rows={3}
          placeholder="Add the code you tried and what you expected to happen…"
          className="mt-2 w-full resize-y rounded-xl border border-border bg-secondary/30 p-3 text-sm outline-none focus:border-neon-green/50"
          aria-label="Thread body"
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {TOPICS.map((topic) => (
              <button
                key={topic.key}
                type="button"
                onClick={() => setForm({ ...form, topic: topic.key })}
                className={cn(
                  'rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors',
                  form.topic === topic.key ? topic.chip : 'border-border bg-secondary/40 text-muted-foreground'
                )}
              >
                {topic.label}
              </button>
            ))}
          </div>
          <Button type="submit" disabled={busy || !form.title.trim() || !form.body.trim()} className="rounded-full px-5 font-semibold">
            <Send size={14} className="mr-1.5" /> {busy ? 'Posting' : 'Post thread'}
          </Button>
        </div>
      </form>

      {error && (
        <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
      )}

      {loading ? (
        <p className="text-center text-sm text-muted-foreground">Loading threads…</p>
      ) : posts.length === 0 && !error ? (
        <div className="glass rounded-2xl p-8 text-center">
          <MessageSquare size={22} className="mx-auto text-muted-foreground" />
          <h2 className="mt-3 font-heading text-lg font-bold">No threads yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">Be the first to ask a question — someone else is stuck on the same thing.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <article key={post.id} className="glass rounded-2xl p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-semibold', chipFor(post.topic))}>
                  {TOPICS.find((t) => t.key === post.topic)?.label || 'Basics'}
                </span>
                <h2 className="font-heading text-base font-bold">{post.title}</h2>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {post.author_name || 'Anonymous'} ·{' '}
                {new Date(post.created_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{post.body}</p>

              {(post.replies || []).length > 0 && (
                <div className="mt-3 space-y-2 border-l border-border/70 pl-3">
                  {(post.replies || []).map((item, i) => (
                    <div key={`${post.id}-r${i}`}>
                      <div className="text-[11px] font-semibold text-neon-cyan">{item.author}</div>
                      <p className="whitespace-pre-wrap text-sm text-muted-foreground">{item.body}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-3 flex gap-2">
                <Input
                  value={replyDraft[post.id] || ''}
                  onChange={(e) => setReplyDraft({ ...replyDraft, [post.id]: e.target.value })}
                  placeholder="Write a reply…"
                  aria-label={`Reply to ${post.title}`}
                />
                <Button
                  type="button"
                  variant="secondary"
                  className="shrink-0 rounded-full px-4 font-semibold"
                  disabled={!(replyDraft[post.id] || '').trim()}
                  onClick={() => reply(post)}
                >
                  Reply
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}