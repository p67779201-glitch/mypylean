import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CircleHelp, Compass, LifeBuoy, Sparkles } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const STEPS = [
  { title: 'Pick a lesson', desc: 'Open the learning path and start anywhere. Every lesson is unlocked, so go at your own pace.' },
  { title: 'Read and run', desc: 'Each lesson has theory, a runnable example, a practice task and a short check.' },
  { title: 'Pass the check', desc: 'Two of three questions right ticks the lesson off. Your dashboard and badges update straight away.' },
  { title: 'Keep the habit', desc: 'Set a daily goal on the schedule page and log the time you study to build your weekly report.' },
];

const FAQ = [
  {
    q: 'How is my progress saved?',
    a: 'Progress, notes and study time are stored in this browser on this device. Nothing is uploaded, and no account is needed — clearing your browser data will clear them too.',
  },
  {
    q: 'Why does a practice task say "not quite"?',
    a: 'The checker compares your printed output with the expected output line by line, ignoring trailing spaces. Print exactly what the task asks for — no extra text.',
  },
  {
    q: 'What is the difference between the three levels?',
    a: 'Beginner lessons cover printing, variables and conditions. Intermediate covers loops, lists and the first functions. Advanced is return values and the mini projects.',
  },
  {
    q: 'The Python engine will not start.',
    a: 'It loads from a CDN the first time you run code. Check your connection, refresh the page, and it will warm up again.',
  },
  {
    q: 'Can I start over?',
    a: 'Yes — the settings page has a two-tap reset for lesson progress, and a separate one for notes and study time.',
  },
  {
    q: 'Do I need to install Python?',
    a: 'No. Code runs in the browser. Once the basics click, the resource library links to install guides for your own machine.',
  },
];

export default function Help() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Help center"
        title="How to use PyroLearn"
        description="Everything you need to go from your first print statement to a finished path."
      />

      <section className="grid gap-3 sm:grid-cols-2">
        {STEPS.map((step, i) => (
          <div key={step.title} className="glass rounded-2xl p-5">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-neon-green/40 bg-neon-green/10 font-mono text-xs font-bold text-neon-green">
              {i + 1}
            </span>
            <h3 className="mt-3 font-heading text-base font-bold">{step.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <CircleHelp size={16} className="text-neon-cyan" />
          <h2 className="font-heading text-xl font-bold tracking-tight">Common questions</h2>
        </div>
        <div className="glass divide-y divide-border/60 rounded-2xl">
          {FAQ.map((item) => (
            <details key={item.q} className="group p-4">
              <summary className="cursor-pointer list-none text-sm font-semibold marker:hidden">
                <span className="flex items-center justify-between gap-3">
                  {item.q}
                  <span className="text-muted-foreground transition-transform group-open:rotate-90">›</span>
                </span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <LifeBuoy size={16} className="text-neon-gold" />
          <h2 className="font-heading text-xl font-bold tracking-tight">Jump straight in</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: '/learn', label: 'Learning path', icon: Compass },
            { to: '/dashboard', label: 'Study dashboard', icon: Sparkles },
            { to: '/quiz', label: 'Practice quiz', icon: BookOpen },
            { to: '/schedule', label: 'Plan study time', icon: BookOpen },
          ].map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} className="glass card-hover flex items-center justify-between rounded-2xl p-4 text-sm font-semibold">
              <span className="flex items-center gap-2">
                <Icon size={15} className="text-neon-green" /> {label}
              </span>
              <ArrowRight size={14} className="text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}