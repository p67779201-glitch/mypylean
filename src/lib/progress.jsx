import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { TOPIC_COUNT } from '@/content/curriculum';

const KEY = 'pyrolearn.progress.v1';
const BLANK = { completed: {}, xp: 0, streak: 0, lastDay: null, perfect: 0 };
const XP_PER_TOPIC = 20;
const XP_PERFECT_BONUS = 10;
const XP_PER_LEVEL = 150;

const dayKey = (date = new Date()) => {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const yesterdayKey = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dayKey(d);
};

const read = () => {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...BLANK };
    const parsed = JSON.parse(raw);
    return { ...BLANK, ...parsed, completed: parsed.completed || {} };
  } catch {
    return { ...BLANK };
  }
};

const save = (value) => {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* storage blocked — learning still works for this visit */
  }
};

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(read);
  const latest = useRef(progress);

  useEffect(() => {
    latest.current = progress;
    save(progress);
  }, [progress]);

  // Returns the XP earned by this completion (0 when the topic was already done).
  const completeTopic = ({ topicId, score = 0, total = 0, perfect = false, via = 'quiz' }) => {
    const prev = latest.current;
    const already = prev.completed[topicId];
    const today = dayKey();
    const streak =
      prev.lastDay === today
        ? prev.streak || 1
        : prev.lastDay === yesterdayKey()
          ? prev.streak + 1
          : 1;
    const firstPerfect = perfect && !(already && already.perfect);
    const gained = (already ? 0 : XP_PER_TOPIC) + (firstPerfect ? XP_PERFECT_BONUS : 0);

    const next = {
      ...prev,
      completed: {
        ...prev.completed,
        [topicId]: {
          score,
          total,
          perfect: perfect || !!(already && already.perfect),
          via,
          at: new Date().toISOString(),
        },
      },
      xp: prev.xp + gained,
      perfect: prev.perfect + (firstPerfect ? 1 : 0),
      streak,
      lastDay: today,
    };

    latest.current = next;
    setProgress(next);
    save(next);
    return gained;
  };

  const addXp = (amount) => {
    const gain = Number(amount) || 0;
    if (!gain) return;
    const next = { ...latest.current, xp: latest.current.xp + gain };
    latest.current = next;
    setProgress(next);
    save(next);
  };

  const reset = () => {
    latest.current = { ...BLANK };
    setProgress({ ...BLANK });
    save({ ...BLANK });
  };

  const value = useMemo(() => {
    const completed = progress.completed;
    const done = Object.keys(completed).length;
    return {
      progress,
      completed,
      completeTopic,
      addXp,
      reset,
      done,
      totalTopics: TOPIC_COUNT,
      percent: TOPIC_COUNT ? Math.round((done / TOPIC_COUNT) * 100) : 0,
      level: Math.floor(progress.xp / XP_PER_LEVEL) + 1,
      levelXp: progress.xp % XP_PER_LEVEL,
      xpToNext: XP_PER_LEVEL,
      isDone: (topicId) => !!completed[topicId],
    };
  }, [progress]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
}