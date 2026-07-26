'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getSections } from '@/lib/docsRegistry';

export function Sidebar() {
  const pathname = usePathname();
  const sections = getSections();

  return (
    <nav className="w-64 shrink-0 border-r border-border px-4 py-8">
      {sections.map(({ section, entries }) => (
        <div key={section} className="mb-8">
          <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted">
            {section}
          </h2>
          <ul className="space-y-1">
            {entries.map(entry => {
              const href = entry.slug ? `/docs/${entry.slug}` : '/docs';
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block rounded-md px-2 py-1.5 text-sm transition-colors ${
                      isActive
                        ? 'bg-surface font-medium text-accent'
                        : 'text-fg/80 hover:bg-surface hover:text-fg'
                    }`}
                  >
                    {entry.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
