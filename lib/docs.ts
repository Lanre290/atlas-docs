import 'server-only';
import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import { mdxComponents } from '@/components/MdxComponents';

export { DOCS_REGISTRY, DOCS_INDEX, getDocEntry, getSections } from './docsRegistry';

// Bundled inside the site itself (see scripts/sync-docs.mjs) so this app is
// deployable as a standalone project — no dependency on the Atlas backend
// repo being present on disk at runtime or build time.
const DOCS_DIR = path.join(process.cwd(), 'content', 'docs');

// Swap ```mermaid fences for a <Mermaid> element BEFORE compileMDX runs, so
// rehype-pretty-code's syntax highlighter never touches them — mermaid
// source needs to reach the client as plain text, not tokenized HTML.
function withMermaidComponents(source: string): string {
  return source.replace(/```mermaid\r?\n([\s\S]*?)```/g, (_match, chart) => {
    const normalized = chart.replace(/\r\n/g, '\n').trim();
    return `<Mermaid chart={${JSON.stringify(normalized)}} />`;
  });
}

export async function renderDoc(file: string) {
  const raw = fs.readFileSync(path.join(DOCS_DIR, file), 'utf8');
  const { content } = await compileMDX({
    source: withMermaidComponents(raw),
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark-dimmed' }]],
      },
    },
  });
  return content;
}
