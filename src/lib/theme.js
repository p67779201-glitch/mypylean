// Colour treatments for each curriculum module, kept as literal classes so
// Tailwind picks them up at build time.
export const ACCENTS = {
  lime: {
    text: 'text-lime-300',
    chip: 'bg-lime-400/10 border-lime-400/30 text-lime-300',
    bar: 'bg-lime-400',
    glow: 'shadow-[0_20px_60px_-30px_rgba(163,230,53,0.7)]',
    border: 'hover:border-lime-400/50',
  },
  cyan: {
    text: 'text-cyan-300',
    chip: 'bg-cyan-400/10 border-cyan-400/30 text-cyan-300',
    bar: 'bg-cyan-400',
    glow: 'shadow-[0_20px_60px_-30px_rgba(34,211,238,0.7)]',
    border: 'hover:border-cyan-400/50',
  },
  violet: {
    text: 'text-violet-300',
    chip: 'bg-violet-400/10 border-violet-400/30 text-violet-300',
    bar: 'bg-violet-400',
    glow: 'shadow-[0_20px_60px_-30px_rgba(167,139,250,0.7)]',
    border: 'hover:border-violet-400/50',
  },
  amber: {
    text: 'text-amber-300',
    chip: 'bg-amber-400/10 border-amber-400/30 text-amber-300',
    bar: 'bg-amber-400',
    glow: 'shadow-[0_20px_60px_-30px_rgba(251,191,36,0.7)]',
    border: 'hover:border-amber-400/50',
  },
  pink: {
    text: 'text-pink-300',
    chip: 'bg-pink-400/10 border-pink-400/30 text-pink-300',
    bar: 'bg-pink-400',
    glow: 'shadow-[0_20px_60px_-30px_rgba(244,114,182,0.7)]',
    border: 'hover:border-pink-400/50',
  },
  emerald: {
    text: 'text-emerald-300',
    chip: 'bg-emerald-400/10 border-emerald-400/30 text-emerald-300',
    bar: 'bg-emerald-400',
    glow: 'shadow-[0_20px_60px_-30px_rgba(52,211,153,0.7)]',
    border: 'hover:border-emerald-400/50',
  },
};

export const accent = (key) => ACCENTS[key] || ACCENTS.lime;