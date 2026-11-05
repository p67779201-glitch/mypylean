import React from 'react';
import { CalendarCheck, CalendarDays, Download, ExternalLink, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MODULES } from '@/content/curriculum';
import { useProgress } from '@/lib/progress';
import { useStudy, dayKey } from '@/lib/study';
import PageHeader from '@/components/PageHeader';

const stamp = (dateKey, extraMinutes = 0) => {
  const d = new Date(`${dateKey}T18:00:00`);
  d.setMinutes(d.getMinutes() + extraMinutes);
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
};

const googleUrl = (event) =>
  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}` +
  `&dates=${stamp(event.date)}/${stamp(event.date, event.minutes)}` +
  `&details=${encodeURIComponent(`PyroLearn ${event.kind}`)}`;

export default function CalendarSync() {
  const { completed } = useProgress();
  const { study } = useStudy();

  const sessionEvents = study.plan.map((item) => ({
    id: `p-${item.id}`,
    title: item.label,
    date: item.date,
    minutes: item.minutes,
    kind: 'study session',
  }));

  const milestoneEvents = MODULES.map((module, index) => {
    const next = module.topics.find((t) => !completed[t.id]);
    if (!next) return null;
    const date = new Date();
    date.setDate(date.getDate() + (index + 1) * 3);
    return {
      id: `m-${module.id}`,
      title: `Module deadline: ${next.title}`,
      date: dayKey(date),
      minutes: next.minutes,
      kind: 'module deadline',
    };
  }).filter(Boolean);

  const events = [...sessionEvents, ...milestoneEvents].sort((a, b) => a.date.localeCompare(b.date));

  const downloadIcs = () => {
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//PyroLearn//Study plan//EN',
      ...events.map((event) =>
        [
          'BEGIN:VEVENT',
          `UID:${event.id}@pyrolearn`,
          `DTSTAMP:${stamp(dayKey())}`,
          `DTSTART:${stamp(event.date)}`,
          `DTEND:${stamp(event.date, event.minutes)}`,
          `SUMMARY:${event.title}`,
          `DESCRIPTION:PyroLearn ${event.kind}`,
          'END:VEVENT',
        ].join('\r\n')
      ),
      'END:VCALENDAR',
    ];
    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pyrolearn-study-plan.ics';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Calendar sync"
        title="Put your study plan on a calendar"
        description="Every planned session and each module deadline, ready to drop into Google Calendar."
      >
        <Button onClick={downloadIcs} disabled={!events.length} className="rounded-full px-5 font-semibold">
          <Download size={15} className="mr-1.5" /> Download .ics
        </Button>
      </PageHeader>

      <section className="glass rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan">
            <CalendarCheck size={18} />
          </span>
          <div>
            <h2 className="font-heading text-base font-bold">How the sync works</h2>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>· One click on any event below opens Google Calendar with the details filled in.</li>
              <li>· Download .ics imports the whole plan at once in Google Calendar, Apple Calendar or Outlook.</li>
              <li>· Automatic two-way sync needs the Google Calendar connection authorised for this app — ask and I will set it up.</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-heading text-xl font-bold tracking-tight">
            <CalendarDays size={17} className="text-neon-green" /> Events to sync
          </h2>
          <span className="text-xs text-muted-foreground">{events.length} events</span>
        </div>

        {events.length === 0 ? (
          <div className="glass rounded-2xl p-6 text-center text-sm text-muted-foreground">
            Nothing to sync yet — plan a session on the schedule page and it appears here.
          </div>
        ) : (
          <div className="glass divide-y divide-border/60 rounded-2xl">
            {events.map((event) => (
              <div key={event.id} className="flex flex-wrap items-center gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{event.title}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {new Date(`${event.date}T00:00:00`).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                    {' · '}
                    {event.minutes} min · {event.kind}
                  </div>
                </div>
                <a
                  href={googleUrl(event)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-neon-green/40 hover:text-foreground"
                >
                  Add to Google <ExternalLink size={11} />
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      <p className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
        <Info size={12} className="mt-0.5 shrink-0" />
        Events are created at 18:00 local time on the planned date, lasting as long as the session you set.
      </p>
    </div>
  );
}