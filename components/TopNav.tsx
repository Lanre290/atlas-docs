import Link from 'next/link';

export function TopNav() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border bg-bg/90 px-6 backdrop-blur">
      <a href="https://atlas.dev" className="font-mono text-sm font-semibold tracking-[0.2em] text-fg">
        ATLAS<span className="text-accent">_</span>
      </a>
      <div className="flex items-center gap-6 text-sm text-fg/80">
        <Link href="/docs" className="hover:text-fg">
          Docs
        </Link>
        <a
          href="https://api.atlas.dev"
          target="_blank"
          rel="noreferrer"
          className="hover:text-fg"
        >
          API
        </a>
        <a
          href="https://github.com/lanre290/atlas"
          target="_blank"
          rel="noreferrer"
          className="hover:text-fg"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
