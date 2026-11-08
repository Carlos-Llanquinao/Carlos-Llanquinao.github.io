#!/usr/bin/env node
/**
 * Lists every content placeholder ([TODO: ...], [SURNAME], ...) still in the site, by file and line.
 * Usage:  npm run check:todo            -> report, exit 0
 *         npm run check:todo -- --strict -> report, exit 1 if any placeholder remains
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { TODO_PATTERN } from '../src/lib/todo.mjs';

const roots = ['src/content', 'src/data', 'public'];
const exts = /\.(md|mdx|ts|js|mjs|json|ya?ml|txt)$/;
const strict = process.argv.includes('--strict');

function* walk(dir) {
  let entries = [];
  try { entries = readdirSync(dir); } catch { return; }
  for (const name of entries) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (exts.test(name)) yield full;
  }
}

let total = 0;
for (const root of roots) {
  for (const file of walk(root)) {
    const lines = readFileSync(file, 'utf8').split(/\r?\n/);
    lines.forEach((line, i) => {
      // Skip comment lines that only document the convention.
      if (/^\s*(\*|\/\/)/.test(line)) return;
      const hits = line.match(TODO_PATTERN);
      if (!hits) return;
      total += hits.length;
      console.log(`${relative('.', file)}:${i + 1}  ${hits.join('  ')}`);
    });
  }
}

// The site URL drives canonical links, the sitemap and the link-preview image.
const config = readFileSync('astro.config.mjs', 'utf8');
if (/site:\s*'https:\/\/USERNAME\.github\.io'/.test(config)) {
  total += 1;
  console.log("astro.config.mjs  site: 'https://USERNAME.github.io' — set your GitHub username");
}

console.log(`\n${total} placeholder(s) remaining.`);
if (strict && total > 0) process.exit(1);
