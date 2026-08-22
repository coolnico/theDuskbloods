'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type Item = { q: string; a: string };

export default function FaqAccordion({
  items,
  groupTitle,
}: {
  items: Item[];
  groupTitle?: string;
}) {
  const [closed, setClosed] = useState<Set<number>>(new Set());

  return (
    <div className="space-y-6">
      {groupTitle && <h2 className="h-title text-xl">{groupTitle}</h2>}
      <div className="space-y-3">
        {items.map((item, i) => {
          const isOpen = !closed.has(i);
          return (
            <div key={i} className="overflow-hidden rounded-[var(--radius)] border border-border bg-surface/60">
              <button
                onClick={() => setClosed(prev => { const next = new Set(prev); isOpen ? next.add(i) : next.delete(i); return next; })}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-text">{item.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <p className="px-5 pb-4 text-sm leading-relaxed text-muted">{item.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
