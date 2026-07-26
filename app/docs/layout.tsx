import { TopNav } from '@/components/TopNav';
import { Sidebar } from '@/components/Sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <div className="mx-auto flex max-w-6xl">
        <Sidebar />
        <article className="min-w-0 flex-1 px-8 py-10">{children}</article>
      </div>
    </>
  );
}
