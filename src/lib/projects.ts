import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/**
 * Projects to show, sorted by `order`.
 * Drafts (`draft: true`) appear in `npm run dev` with a "Draft" badge but are left out of
 * production builds entirely: no card, no case-study page, no llms-full.txt entry, no sitemap URL.
 */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => (import.meta.env.PROD ? !data.draft : true));
  return all.sort((a, b) => a.data.order - b.data.order);
}

const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

/** "four", "Four", or the digits above ten. */
export function countWord(n: number, capital = false): string {
  const w = WORDS[n] ?? String(n);
  return capital ? w.charAt(0).toUpperCase() + w.slice(1) : w;
}

/** Replaces {count}, {Count} and {n} tokens in site copy with the published project count. */
export function withCount(text: string, n: number): string {
  return text.replaceAll('{count}', countWord(n)).replaceAll('{Count}', countWord(n, true)).replaceAll('{n}', String(n));
}
