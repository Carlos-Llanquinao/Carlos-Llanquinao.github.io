import type { APIRoute } from 'astro';
import { getProjects } from '../lib/projects';
import { profile, links, experience, skills, about } from '../data/site';

/**
 * /llms-full.txt — the whole site as plain Markdown-flavoured text, generated at build time,
 * so LLM-based tools and screeners can read everything without rendering the page.
 * Placeholders ([TODO: ...]) are kept on purpose so nothing pending is presented as fact.
 */
export const GET: APIRoute = async ({ site }) => {
  const projects = await getProjects();
  const base = site?.toString().replace(/\/$/, '') ?? '';
  const out: string[] = [];
  const list = (items: string[]) => items.map((i) => `- ${i}`).join('\n');
  /** Flattens a rich-text block (string, or lead sentence + points) into plain lines. */
  const rich = (v: string | { text?: string; points: string[] }) =>
    typeof v === 'string' ? v : [v.text ?? '', ...v.points.map((pt) => `  - ${pt}`)].filter(Boolean).join('\n');

  out.push(`# ${profile.firstName} ${profile.lastName} — Portfolio`);
  out.push(`> ${profile.headline}. ${profile.availability}.`);
  out.push(
    [
      `Website: ${base}/`,
      `Resume: ${links.resume}`,
      `LinkedIn: ${links.linkedin}`,
      `GitHub: ${links.github}`,
      `Email: ${links.email}`,
    ].join('\n'),
  );
  out.push(profile.pitch);
  out.push('Note: text in square brackets such as [TODO: ...] is content that has not been finalised yet.');

  out.push(
    '## About\n\n' +
      about.paragraphs.join('\n\n') +
      '\n\n' +
      about.cards.map((c) => `**${c.title}:** ${c.text}`).join('\n\n') +
      `\n\nLocation: ${about.location}`,
  );

  out.push(
    '## Professional experience (under NDA)\n\n' +
      experience
        .map((e) => `### ${e.role} — ${e.client} · ${e.period}\n${e.stack}. ${e.summary}`)
        .join('\n\n'),
  );

  out.push('## Skills\n\n' + skills.map((g) => `**${g.group}:** ${g.items.join(', ')}`).join('\n'));

  out.push('## Projects');
  for (const p of projects) {
    const d = p.data;
    const section: string[] = [];
    section.push(`### ${d.title}`);
    section.push(`*Status: ${d.status} · Category: ${d.category} · Case study: ${base}/projects/${p.id}/*`);
    section.push(d.summary);
    section.push(
      [
        `Role: ${d.role}`,
        `Duration: ${d.duration}`,
        `Platforms: ${d.platforms.join(', ')}`,
        `Stack: ${d.stack.join(', ')}`,
        ...d.facts.map((f) => `${f.label}: ${f.value}`),
      ].join('\n'),
    );
    const linkLines = Object.entries(d.links).map(([k, v]) => `${k[0].toUpperCase()}${k.slice(1)}: ${v}`);
    if (linkLines.length) section.push(linkLines.join('\n'));
    section.push('Context:\n\n' + (p.body ?? '').trim());
    section.push('Key contributions:\n' + list(d.contributions));
    for (const dec of d.decisions) {
      section.push(
        [
          `Decision — ${dec.title}`,
          `Problem: ${rich(dec.problem)}`,
          `Decision: ${rich(dec.decision)}`,
          `Result: ${rich(dec.result)}`,
          dec.code ?? '',
        ]
          .filter(Boolean)
          .join('\n'),
      );
    }
    for (const n of d.notes) {
      section.push(
        [`Lesson — ${n.title}`, ...n.paragraphs, ...n.steps.map((t, i) => `${i + 1}. ${t}`), ...n.after].join('\n'),
      );
    }
    if (d.metrics.length)
      section.push('Metrics:\n' + list(d.metrics.map((m) => `${m.label}: ${m.value}${m.method ? ` (${m.method})` : ''}`)));
    if (d.limitations.length) section.push('Known limitations:\n' + list(d.limitations));
    if (d.next.length) section.push('Next steps:\n' + list(d.next));
    if (d.mediaNote) section.push(`Media note: ${d.mediaNote}`);
    out.push(section.join('\n\n'));
    out.push('---');
  }

  out.push(`## Contact\n\n${profile.availability}.\nEmail: ${links.email}\nLinkedIn: ${links.linkedin}\nGitHub: ${links.github}`);

  return new Response(out.join('\n\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
