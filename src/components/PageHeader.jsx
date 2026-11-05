import React from 'react';

export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-neon-cyan">{eyebrow}</div>
        )}
        <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </header>
  );
}