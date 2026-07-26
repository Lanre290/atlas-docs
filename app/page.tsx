import Link from 'next/link';
import { TopNav } from '@/components/TopNav';

export default function Home() {
  return (
    <>
      <TopNav />
      <main className="mx-auto flex max-w-3xl flex-col items-start px-6 py-28">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Developer platform for space data
        </p>
        <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-fg sm:text-5xl">
          Integrate once.
          <br />
          Build forever.
        </h1>
        <p className="mb-10 max-w-xl text-lg leading-8 text-fg/80">
          Atlas is a domain-driven API that unifies official space data — NASA, JPL, Le Système
          Solaire — behind a single, consistent interface. No provider quirks, no scattered
          schemas, just planets, images, missions, and asteroids.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/docs"
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            Read the Docs
          </Link>
          <Link
            href="/docs/quickstart"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-surface"
          >
            Quickstart →
          </Link>
        </div>

        <pre className="mt-16 w-full overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-sm text-fg/90">
{`$ curl "https://api.atlas.dev/explore/mars"

{
  "query": "mars",
  "summary": "Exploration overview for 'mars': Mars...",
  "graph": { "nodes": [...], "edges": [...] }
}`}
        </pre>
      </main>
    </>
  );
}
