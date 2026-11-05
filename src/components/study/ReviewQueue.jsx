import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { getTopic } from '@/content/curriculum';
import { useProgress } from '@/lib/progress';

// Lessons that were finished but not with a perfect quiz — the best place
// to spend a few minutes revisiting.
export default function ReviewQueue({ limit = 3 }) {
  const { completed } = useProgress();

  const weak = Object.entries(completed)
    .map(([id, record]) => ({ topic: getTopic(id), record }))
    .filter((entry) => entry.topic && (!entry.record.total || entry.record.score < entry.record.total || !entry.record.perfect))
    .sort((a, b) => new Date(b.record.at) - new Date(a.record.at))
    .slice(0, limit);

  return (
    <section className="glass rounded-2xl p-5">
      <div className="flex items-end justify-between">
        <h2 className="flex items-center gap-2 font-heading text-lg font-bold">
          <RotateCcw size={15} className="text-neon-purple" /> Worth another look
        </h2>
        <Link to="/learn" className="text-xs font-semibold text-muted-foreground hover:text-foreground">All lessons</Link>
      </div>

      {weak.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Nothing to revisit yet — finish a lesson check and anything short of perfect shows up here.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {weak.map(({ topic, record }) => (
            <li key={topic.id}>
              <Link
                to={`/lesson/${topic.id}`}
                className="flex items-center gap-3 rounded-xl border border-border/70 bg-secondary/25 px-3.5 py-2.5 transition-colors hover:border-neon-purple/45"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{topic.title}</span>
                  <span className="block text-[11px] text-muted-foreground">
                    {record.total ? `${record.score}/${record.total} in the check` : 'Finished with practice only'}
                  </span>
                </span>
                <ArrowRight size={13} className="shrink-0 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}