import type { Metadata } from 'next';
import { DOCS_INDEX } from '@/lib/docsRegistry';
import { renderDoc } from '@/lib/docs';

export const metadata: Metadata = { title: DOCS_INDEX.title };

export default async function DocsIndexPage() {
  const content = await renderDoc(DOCS_INDEX.file);
  return <div className="max-w-3xl">{content}</div>;
}
