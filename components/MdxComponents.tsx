import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { Mermaid } from './Mermaid';

export const mdxComponents: MDXComponents = {
  h1: props => <h1 className="mt-0 mb-4 text-3xl font-semibold tracking-tight text-fg" {...props} />,
  h2: props => (
    <h2 className="mt-10 mb-4 border-b border-border pb-2 text-xl font-semibold text-fg" {...props} />
  ),
  h3: props => <h3 className="mt-8 mb-3 text-lg font-semibold text-fg" {...props} />,
  p: props => <p className="my-4 leading-7 text-fg/90" {...props} />,
  a: ({ href = '', ...props }) => {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    const className = 'text-accent underline underline-offset-4 hover:text-accent/80';
    if (isInternal) return <Link href={href} className={className} {...props} />;
    return <a href={href} target="_blank" rel="noreferrer" className={className} {...props} />;
  },
  ul: props => <ul className="my-4 ml-6 list-disc space-y-2 text-fg/90" {...props} />,
  ol: props => <ol className="my-4 ml-6 list-decimal space-y-2 text-fg/90" {...props} />,
  li: props => <li className="pl-1" {...props} />,
  blockquote: props => (
    <blockquote className="my-6 border-l-2 border-accent bg-surface px-4 py-3 text-sm text-muted" {...props} />
  ),
  table: props => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: props => <thead className="bg-surface text-left text-fg" {...props} />,
  th: props => <th className="border-b border-border px-4 py-2 font-medium" {...props} />,
  td: props => <td className="border-b border-border px-4 py-2 align-top text-fg/90" {...props} />,
  code: props => (
    <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-accent" {...props} />
  ),
  pre: props => (
    <pre className="my-6 overflow-x-auto rounded-lg border border-border p-4 text-sm leading-6" {...props} />
  ),
  hr: props => <hr className="my-10 border-border" {...props} />,
  Mermaid,
};
