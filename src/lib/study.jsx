import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

// Everything the learner creates beyond lesson completion: notes, logged study
// time, planned sessions and preferences. Kept on this device next to progress.
const KEY = 'pyrolearn.study.v1';

const BLANK = {
  name: '',
  goalMinutes: 20,
  weeklyGoal: 5,
  notes: {},
  sessions: [],
  plan: [],
  snippets: [],
  prefs: {
    theme: 'neon',
    dailyReminder: true,
    weeklyReport: true,
    achievementAlerts: true,
    emailReminders: true,
    level: 'all',
    intensity: 'steady',
  },
};

export const dayKey = (date = new Date()) => {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const read = () => {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...BLANK };
    const parsed = JSON.parse(raw);
    return {
      ...BLANK,
      ...parsed,
      notes: parsed.notes || {},
      sessions: parsed.sessions || [],
      plan: parsed.plan || [],
      snippets: parsed.snippets || [],
      prefs: { ...BLANK.prefs, ...(parsed.prefs || {}) },
    };
  } catch {
    return { ...BLANK };
  }
};

const persist = (value) => {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* storage blocked — the current visit still works */
  }
};

const StudyContext = createContext(null);

export function StudyProvider({ children }) {
  const [study, setStudy] = useState(read);
  const latest = useRef(study);

  useEffect(() => {
    latest.current = study;
    persist(study);
    document.documentElement.setAttribute('data-theme', study.prefs.theme || 'neon');
  }, [study]);

  const update = (patch) => {
    const next = { ...latest.current, ...patch };
    latest.current = next;
    setStudy(next);
  };

  const value = useMemo(
    () => ({
      study,
      setName: (name) => update({ name }),
      setGoal: (goalMinutes) => update({ goalMinutes: Math.max(5, Number(goalMinutes) || 20) }),
      setWeeklyGoal: (weeklyGoal) => update({ weeklyGoal: Math.max(1, Number(weeklyGoal) || 5) }),
      setPref: (key, val) =>
        update({ prefs: { ...latest.current.prefs, [key]: val } }),
      setNote: (topicId, text) =>
        update({
          notes: {
            ...latest.current.notes,
            [topicId]: { text, at: new Date().toISOString() },
          },
        }),
      deleteNote: (topicId) => {
        const notes = { ...latest.current.notes };
        delete notes[topicId];
        update({ notes });
      },
      addSession: ({ minutes, label = 'Study session' }) =>
        update({
          sessions: [
            { id: `s${Date.now()}`, date: dayKey(), minutes: Math.max(1, Number(minutes) || 0), label },
            ...latest.current.sessions,
          ].slice(0, 200),
        }),
      addPlan: ({ date, label, minutes }) =>
        update({
          plan: [
            ...latest.current.plan,
            { id: `p${Date.now()}`, date, label, minutes: Math.max(5, Number(minutes) || 20), done: false },
          ],
        }),
      togglePlan: (id) =>
        update({
          plan: latest.current.plan.map((p) => (p.id === id ? { ...p, done: !p.done } : p)),
        }),
      removePlan: (id) => update({ plan: latest.current.plan.filter((p) => p.id !== id) }),
      addSnippet: ({ title, code }) =>
        update({
          snippets: [
            {
              id: `sn${Date.now()}`,
              title: (title || '').trim() || 'Untitled snippet',
              code,
              at: new Date().toISOString(),
            },
            ...latest.current.snippets,
          ],
        }),
      updateSnippet: (id, patch) =>
        update({ snippets: latest.current.snippets.map((s) => (s.id === id ? { ...s, ...patch } : s)) }),
      removeSnippet: (id) => update({ snippets: latest.current.snippets.filter((s) => s.id !== id) }),
      clearSnippets: () => update({ snippets: [] }),
      resetStudy: () => {
        const next = { ...latest.current, notes: {}, sessions: [], plan: [] };
        latest.current = next;
        setStudy(next);
        persist(next);
      },
    }),
    [study]
  );

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}

export function useStudy() {
  const ctx = useContext(StudyContext);
  if (!ctx) throw new Error('useStudy must be used inside StudyProvider');
  return ctx;
}