// Streak maths shared by the dashboard card and the history page.
import { dayKey } from '@/lib/study';

export const activityMap = (completed = {}, sessions = []) => {
  const map = {};
  sessions.forEach((session) => {
    map[session.date] = (map[session.date] || 0) + (Number(session.minutes) || 0);
  });
  Object.values(completed).forEach((record) => {
    if (!record?.at) return;
    const key = dayKey(new Date(record.at));
    map[key] = (map[key] || 0) + 20;
  });
  return map;
};

export const shiftDay = (date, days) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

// Today counts when you have studied; otherwise the streak is still alive
// until the day ends, so we look back from yesterday.
export const currentStreak = (map) => {
  let cursor = new Date();
  if (!map[dayKey(cursor)]) cursor = shiftDay(cursor, -1);
  let streak = 0;
  while (map[dayKey(cursor)]) {
    streak += 1;
    cursor = shiftDay(cursor, -1);
  }
  return streak;
};

export const longestStreak = (map) => {
  const keys = Object.keys(map)
    .filter((key) => map[key] > 0)
    .sort();
  let best = 0;
  let run = 0;
  let previous = null;
  keys.forEach((key) => {
    if (previous) {
      run = dayKey(shiftDay(new Date(`${previous}T00:00:00`), 1)) === key ? run + 1 : 1;
    } else {
      run = 1;
    }
    if (run > best) best = run;
    previous = key;
  });
  return best;
};

export const lastSevenDays = (map) => {
  const today = dayKey();
  return Array.from({ length: 7 }, (_, index) => {
    const date = shiftDay(new Date(), index - 6);
    const key = dayKey(date);
    return {
      key,
      minutes: map[key] || 0,
      active: (map[key] || 0) > 0,
      isToday: key === today,
      label: date.toLocaleDateString(undefined, { weekday: 'narrow' }),
    };
  });
};