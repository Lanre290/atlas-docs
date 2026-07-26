import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.join(__dirname, '..');
const sourceDir = path.join(siteRoot, '..', 'docs');
const destDir = path.join(siteRoot, 'content', 'docs');

// This site is meant to be deployable on its own, copied out of the Atlas
// monorepo entirely. So content/docs is the bundled, self-contained copy the
// app actually reads from. When a sibling ../docs exists (i.e. we're still
// inside the monorepo), refresh the bundle from it. When it doesn't (the
// site was copied elsewhere for standalone deployment), skip silently and
// keep using whatever's already bundled in content/docs.
if (!fs.existsSync(sourceDir)) {
  console.log('[sync-docs] No sibling ../docs found — using existing content/docs as-is.');
  process.exit(0);
}

fs.mkdirSync(destDir, { recursive: true });
const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.md'));
for (const file of files) {
  fs.copyFileSync(path.join(sourceDir, file), path.join(destDir, file));
}
console.log(`[sync-docs] Synced ${files.length} files from ../docs into content/docs.`);
