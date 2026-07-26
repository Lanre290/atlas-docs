export interface DocEntry {
  slug: string;
  file: string;
  title: string;
  section: string;
}

// Registry drives every /docs/[slug] route via generateStaticParams — each
// entry is still a distinct, real URL, just generated from one template
// instead of 12 near-identical page.tsx files.
export const DOCS_REGISTRY: DocEntry[] = [
  { slug: 'quickstart', file: 'quickstart.md', title: 'Quickstart', section: 'Getting Started' },
  { slug: 'explore', file: 'explore.md', title: 'Explore', section: 'Endpoints' },
  { slug: 'search', file: 'search.md', title: 'Search', section: 'Endpoints' },
  { slug: 'images', file: 'images.md', title: 'Images', section: 'Endpoints' },
  { slug: 'missions', file: 'missions.md', title: 'Missions', section: 'Endpoints' },
  { slug: 'providers', file: 'providers.md', title: 'Providers', section: 'Endpoints' },
  { slug: 'api-reference', file: 'api-reference.md', title: 'API Reference', section: 'Reference' },
  { slug: 'architecture', file: 'architecture.md', title: 'Architecture', section: 'Reference' },
  { slug: 'response-metadata', file: 'response-metadata.md', title: 'Response Metadata', section: 'Reference' },
  { slug: 'error-handling', file: 'error-handling.md', title: 'Error Handling', section: 'Reference' },
  { slug: 'examples', file: 'examples.md', title: 'Examples', section: 'Resources' },
  { slug: 'changelog', file: 'CHANGELOG.md', title: 'Changelog', section: 'Resources' },
];

export const DOCS_INDEX: DocEntry = {
  slug: '',
  file: 'index.md',
  title: 'Overview',
  section: 'Getting Started',
};

export function getDocEntry(slug: string): DocEntry | undefined {
  return DOCS_REGISTRY.find(d => d.slug === slug);
}

export function getSections(): { section: string; entries: DocEntry[] }[] {
  const sections: string[] = [];
  const bySection = new Map<string, DocEntry[]>();

  for (const entry of [DOCS_INDEX, ...DOCS_REGISTRY]) {
    if (!bySection.has(entry.section)) {
      sections.push(entry.section);
      bySection.set(entry.section, []);
    }
    bySection.get(entry.section)!.push(entry);
  }

  return sections.map(section => ({ section, entries: bySection.get(section)! }));
}
