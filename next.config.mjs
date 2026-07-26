import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // This repo's parent folder (C:\Node) has unrelated projects with their own
  // lockfile, which confuses Next's monorepo root inference — pin it here.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
