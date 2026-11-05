import { modulesStart } from './start';
import { modulesLoops } from './loops';
import { modulesBuild } from './build';
import { modulesData } from './data';

export const MODULES = [...modulesStart, ...modulesLoops, ...modulesBuild, ...modulesData];

export const ALL_TOPICS = MODULES.flatMap((module, moduleIndex) =>
  module.topics.map((topic, topicIndex) => ({
    ...topic,
    moduleId: module.id,
    moduleTitle: module.title,
    moduleAccent: module.accent,
    moduleIndex,
    topicIndex,
  }))
);

export const TOPIC_COUNT = ALL_TOPICS.length;

export const getTopic = (id) => ALL_TOPICS.find((t) => t.id === id) || null;

export const getModule = (id) => MODULES.find((m) => m.id === id) || null;

export const nextTopicId = (id) => {
  const i = ALL_TOPICS.findIndex((t) => t.id === id);
  return i >= 0 && i < ALL_TOPICS.length - 1 ? ALL_TOPICS[i + 1].id : null;
};

// Skill level per lesson — drives the study-path filters.
const TOPIC_LEVELS = {
  'print-basics': 'beginner',
  variables: 'beginner',
  strings: 'beginner',
  numbers: 'beginner',
  comparing: 'beginner',
  'if-basics': 'beginner',
  'else-elif': 'beginner',
  logic: 'beginner',
  'for-range': 'intermediate',
  'while-loop': 'intermediate',
  'nested-loops': 'intermediate',
  'break-continue': 'intermediate',
  'list-basics': 'intermediate',
  indexing: 'intermediate',
  'list-changing': 'intermediate',
  'list-loop': 'intermediate',
  'def-basics': 'intermediate',
  parameters: 'intermediate',
  'return-values': 'advanced',
  'combine-functions': 'advanced',
  'project-average': 'advanced',
  'project-pattern': 'advanced',
  'project-table': 'advanced',
  'project-counter': 'advanced',
  'list-methods': 'intermediate',
  dictionaries: 'intermediate',
  'dict-loop': 'intermediate',
  'tuples-sets': 'intermediate',
  'f-strings': 'beginner',
  'string-methods': 'beginner',
  'errors-basics': 'advanced',
  'project-gradebook': 'advanced',
  'project-wordcount': 'advanced',
};

export const LEVELS = ['beginner', 'intermediate', 'advanced'];

export const LEVEL_META = {
  beginner: { label: 'Beginner', chip: 'border-neon-green/40 bg-neon-green/10 text-neon-green' },
  intermediate: { label: 'Intermediate', chip: 'border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan' },
  advanced: { label: 'Advanced', chip: 'border-neon-purple/40 bg-neon-purple/10 text-neon-purple' },
};

export const topicLevel = (topicOrId) => {
  const id = typeof topicOrId === 'string' ? topicOrId : topicOrId && topicOrId.id;
  return TOPIC_LEVELS[id] || 'beginner';
};

export const topicsByLevel = (level) => ALL_TOPICS.filter((t) => topicLevel(t) === level);

export const moduleLevel = (module) => {
  const levels = module.topics.map(topicLevel);
  if (levels.includes('advanced')) return 'advanced';
  if (levels.includes('intermediate')) return 'intermediate';
  return 'beginner';
};

export const moduleProgress = (module, completed = {}) => {
  const total = module.topics.length;
  const done = module.topics.filter((t) => completed[t.id]).length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0, complete: done === total };
};