import type { APIRoute } from 'astro';
import { getProjects } from '../lib/projects';

/** /sitemap.xml — home plus every published case study (drafts are excluded by getProjects). */
export const GET: APIRoute = async ({ site }) => {
  const base = site?.toString().replace(/\/$/, '') ?? '';
  const projects = await getProjects();
  const urls = [`${base}/`, ...projects.map((p) => `${base}/projects/${p.id}/`)];
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n') +
    '\n</urlset>\n';
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
