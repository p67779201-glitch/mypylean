import React from 'react';
import { ExternalLink, BookOpen, Code2, Compass } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const SECTIONS = [
  {
    title: 'Official Python docs',
    icon: BookOpen,
    items: [
      { title: 'The Python Tutorial', desc: 'The official walkthrough from variables through classes.', url: 'https://docs.python.org/3/tutorial/' },
      { title: 'Standard library reference', desc: 'Look up any built-in module when you need the exact details.', url: 'https://docs.python.org/3/library/index.html' },
      { title: 'Getting started with Python', desc: 'How to install Python on your own computer.', url: 'https://www.python.org/about/gettingstarted/' },
    ],
  },
  {
    title: 'Practice & challenges',
    icon: Code2,
    items: [
      { title: 'freeCodeCamp — Scientific Computing with Python', desc: 'A free project-based course you can work through alongside these lessons.', url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/' },
      { title: 'W3Schools Python exercises', desc: 'Short exercises with instant answers for every topic.', url: 'https://www.w3schools.com/python/' },
      { title: 'Automate the Boring Stuff with Python', desc: 'Free online book of practical scripts once the basics click.', url: 'https://automatetheboringstuff.com/' },
    ],
  },
  {
    title: 'Go deeper',
    icon: Compass,
    items: [
      { title: 'Real Python tutorials', desc: 'Long-form guides with runnable examples for every level.', url: 'https://realpython.com/' },
      { title: 'Control flow tools', desc: 'The docs chapter behind loops, if statements and functions.', url: 'https://docs.python.org/3/tutorial/controlflow.html' },
      { title: 'Built-in functions cheat sheet', desc: 'Every function Python gives you out of the box.', url: 'https://docs.python.org/3/library/functions.html' },
    ],
  },
];

export default function Resources() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Resource library"
        title="Go further than the path"
        description="Hand-picked guides and exercises that pair with these lessons. They all open in a new tab and none of them cost anything."
      />

      {SECTIONS.map(({ title, icon: Icon, items }) => (
        <section key={title}>
          <div className="mb-3 flex items-center gap-2">
            <Icon size={16} className="text-neon-cyan" />
            <h2 className="font-heading text-xl font-bold tracking-tight">{title}</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group glass card-hover flex flex-col rounded-2xl p-5 hover:border-neon-cyan/50"
              >
                <h3 className="font-heading text-base font-bold leading-snug">{item.title}</h3>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">{item.desc}</p>
                <span className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-neon-cyan">
                  Open resource <ExternalLink size={12} className="transition-transform group-hover:-translate-y-0.5" />
                </span>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}