import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * One Markdown file per project in src/content/projects/.
 * Frontmatter holds the structured case-study fields; the Markdown body is the "Context" section.
 * Any string may contain placeholders such as [TODO: Quest FPS]; see src/lib/todo.mjs.
 */
/**
 * A block of case-study text: either one plain string, or an optional lead sentence plus bullet points.
 * Strings support `code` and **bold**.
 */
const richText = z.union([
  z.string(),
  z.object({
    text: z.string().optional(),
    points: z.array(z.string()).default([]),
  }),
]);

/** An image (GIF/PNG/WebP) or video clip under /public. Missing files render as a TODO frame. */
const clip = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** true = visible in `npm run dev` only; excluded from the production build. */
    draft: z.boolean().default(false),
    /** Order on the home page; 1 is the flagship. */
    order: z.number(),
    status: z.enum(['In development', 'Released']),
    /** One line shown on cards and under the case-study title. */
    summary: z.string(),
    category: z.string(),
    platforms: z.array(z.string()),
    stack: z.array(z.string()),
    role: z.string(),
    duration: z.string(),
    media: z.object({
      /** Path under /public, e.g. /media/liftlab.mp4. Leave empty while the capture is pending. */
      video: z.string().optional(),
      /** Alternative to `video`: an animated GIF or still image under /public. */
      image: z.string().optional(),
      poster: z.string().optional(),
      /** Describes what the video shows; used as accessible label. */
      alt: z.string(),
      /** What still needs to be captured, shown inside the placeholder frame. */
      pending: z.string().optional(),
    }),
    links: z
      .object({
        play: z.string().optional(),
        download: z.string().optional(),
        source: z.string().optional(),
        video: z.string().optional(),
      })
      .default({}),
    contributions: z.array(z.string()),
    decisions: z
      .array(
        z.object({
          title: z.string(),
          problem: richText,
          decision: richText,
          result: richText,
          /** Optional clip shown beside the decision (switches the block to the wide layout). */
          media: clip.optional(),
          /** Where the code and tests live, e.g. "Code: `Scripts/AI/...`. Tests: `Tests/...`." */
          code: z.string().optional(),
        }),
      )
      .default([]),
    /** Extra field cards shown next to Role / Duration / Platforms / Stack (e.g. Architecture). */
    facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    /** Free-form lessons or war stories told after the decisions. */
    notes: z
      .array(
        z.object({
          title: z.string(),
          paragraphs: z.array(z.string()).default([]),
          steps: z.array(z.string()).default([]),
          after: z.array(z.string()).default([]),
          media: clip.optional(),
        }),
      )
      .default([]),
    metrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          method: z.string().optional(),
        }),
      )
      .default([]),
    limitations: z.array(z.string()).default([]),
    next: z.array(z.string()).default([]),
    /** Explains what the media shows and what is recreated or synthetic. */
    mediaNote: z.string().optional(),
  }),
});

export const collections = { projects };
