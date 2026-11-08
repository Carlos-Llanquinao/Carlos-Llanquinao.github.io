import type { APIRoute } from 'astro';

/** /robots.txt — allow everything and point crawlers to the sitemap and the plain-text mirror. */
export const GET: APIRoute = ({ site }) => {
  const base = site?.toString().replace(/\/$/, '') ?? '';
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n# Full site content as plain text: ${base}/llms-full.txt\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
