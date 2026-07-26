import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DOCS_REGISTRY, getDocEntry } from '@/lib/docsRegistry';
import { renderDoc } from '@/lib/docs';

export function generateStaticParams() {
  return DOCS_REGISTRY.map(entry => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getDocEntry(slug);
  return { title: entry?.title ?? 'Not Found' };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getDocEntry(slug);
  if (!entry) notFound();

  const content = await renderDoc(entry.file);
  return <div className="max-w-3xl">{content}</div>;
}
