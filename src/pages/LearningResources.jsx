import React from 'react';
import { BookOpen, ExternalLink, Video, FileText, Wrench } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const SECTIONS = [
  {
    title: 'Documentation',
    icon: BookOpen,
    items: [
      { title: 'The Python Tutorial', desc: 'The official language tour, start to finish.', url: 'https://docs.python.org/3/tutorial/' },
      { title: 'Built-in functions', desc: 'Every function Python gives you without an import.', url: 'https://docs.python.org/3/library/functions.html' },
      { title: 'Python for beginners', desc: "python.org's guided starting point including install help.", url: 'https://www.python.org/about/gettingstarted/' },
    ],
  },
  {
    title: 'Articles and books',
    icon: FileText,
    items: [
      { title: 'Automate the Boring Stuff', desc: 'A free book of practical scripts for everyday tasks.', url: 'https://automatetheboringstuff.com/' },
      { title: 'Real Python tutorials', desc: 'Deep, example-driven articles on every Python topic.', url: 'https://realpython.com/' },
      { title: 'W3Schools Python reference', desc: 'Quick syntax look-ups with runnable examples.', url: 'https://www.w3schools.com/python/' },
    ],
  },
  {
    title: 'Video courses',
    icon: Video,
    items: [
      { title: 'CS50P — Introduction to Programming with Python', desc: "Harvard's free full course, lecture by lecture.", url: 'https://cs50.harvard.edu/python/' },
      { title: 'Corey Schafer — Python tutorials', desc: 'Clear, focused videos on the language and its tools.', url: 'https://www.youtube.com/@coreyms' },
      { title: 'Tech With Tim — Python for beginners', desc: 'Project-led videos that build real programs.', url: 'https://www.youtube.com/@TechWithTim' },
    ],
  },
  {
    title: 'Practice tools',
    icon: Wrench,
    items: [
      { title: 'Python Tutor', desc: 'Step through your code line by line and watch the variables change.', url: 'https://pythontutor.com/' },
      { title: 'Exercism — Python track', desc: 'Hundreds of exercises with mentor feedback.', url: 'https://exercism.org/tracks/python' },
      { title: 'HackerRank Python', desc: 'Timed challenges that cover the whole language.', url: 'https://www.hackerrank.com/domains/python' },
    ],
  },
];

export default function LearningResources() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Learning resources"
        title="The good stuff, carefully picked"
        description="Documentation, articles and video courses worth your time — all free, all external."
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
                  Open <ExternalLink size={12} className="transition-transform group-hover:-translate-y-0.5" />
                </span>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}