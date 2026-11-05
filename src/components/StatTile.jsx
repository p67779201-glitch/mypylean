import React from 'react';
import { cn } from '@/lib/utils';

export default function StatTile({ icon: Icon, value, label, tone = 'text-neon-green', hint }) {
  return (
    <div className="glass rounded-2xl p-4">
      <Icon size={16} className={tone} />
      <div className="mt-2 font-heading text-xl font-bold leading-none">{value}</div>
      <div className="mt-1 text-[11px] text-muted-foreground">{label}</div>
      {hint && <div className={cn('mt-1 text-[10px]', tone)}>{hint}</div>}
    </div>
  );
}