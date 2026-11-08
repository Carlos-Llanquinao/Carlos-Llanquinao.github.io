# Carlos — Unity Developer portfolio

Personal portfolio site: **Unity Developer · XR & Real-Time Simulation · C#**.
Built with [Astro](https://astro.build) as a fully static site and deployed to GitHub Pages.

The visual language borrows from the Unity editor: hero panels framed like the Scene view (perspective ground grid, X/Z axes, axis gizmo) and a page backdrop of wireframe default primitives, the Main Camera and the Directional Light floating beside each section heading. Everything is CSS and a small Canvas 2D script; motion stops under `prefers-reduced-motion`.

## Run locally

Requires Node.js 22 or newer.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # serve the built site
```

## Project structure

```
src/
  content/projects/*.md   One Markdown file per project (frontmatter + "Context" body)
  content.config.ts       Schema for project frontmatter
  data/site.ts            Name, links, experience (NDA), skills, about
  components/             SceneView, SceneBackdrop, Header, Media, Action, Status, ProjectLinks, T (placeholder-aware text)
  lib/projects.ts         Loads projects (drafts excluded in production) and project-count helpers
  pages/index.astro       Home
  pages/projects/[slug].astro  Case study template
  pages/llms-full.txt.ts  Generates /llms-full.txt with all site content as plain text
  pages/sitemap.xml.ts    Generates /sitemap.xml (home + published case studies)
  pages/robots.txt.ts     Generates /robots.txt
  pages/og-card.astro     Source of the link-preview image (noindex)
  styles/global.css       Design tokens (light + dark) and base styles
scripts/list-todos.mjs    Lists remaining placeholders
scripts/make-og.mjs       Renders og-card to public/og.png
```

## Placeholders

Unfinished content is written as `[TODO: what is missing]` or an all-caps token like `[SURNAME]`, `[SECTOR]`, `[YEAR]`.
They render with a yellow-black hazard style everywhere (text, links, media slots) so nothing half-finished ships unnoticed. A link whose value is still a placeholder renders as a dashed, non-clickable button with a `TODO` tag.

```bash
npm run check:todo              # list every placeholder by file and line
npm run check:todo -- --strict  # same, but exit 1 if any remain (use in CI to block deploys)
```

## Add or update a project

1. Create `src/content/projects/<slug>.md` (copy `liftlab-vr.md` as a template). The file name becomes the URL: `/projects/<slug>/`.
2. Fill the frontmatter: `title`, `order` (1 = flagship on the home page), `status` (`In development` or `Released`), `summary`, `stack`, `role`, `duration`, `links`, `contributions`, `decisions` (Problem → Decision → Result), `metrics`, `limitations`, `next`, `mediaNote`.
3. Write the **Context** section as the Markdown body.
4. Add media to `public/media/` and set `media.video` (e.g. `/media/liftlab.mp4`) and `media.poster` (e.g. `/media/liftlab.jpg`). Keep videos short (30–60 s), H.264 MP4 or WebM, under ~8 MB, and use a 1600×900 poster. Remove `media.pending` once the capture exists.
5. Quote any YAML value that contains `: ` (for example every `[TODO: ...]`).

No layout changes are needed: the home page and case study read everything from the collection.

### Drafts

Add `draft: true` to a project's frontmatter to keep it out of the published site until it has real media.
Drafts still show in `npm run dev` with a yellow "Draft" badge, but production builds drop them completely:
no card, no case-study page, no sitemap entry, no llms-full.txt section. Project counts in the copy
("these three projects", the "Projects built in public" tile) update automatically.

## Link previews (Open Graph)

`public/og.png` (1200×630) is the image LinkedIn, Slack and X show when the site link is shared.
It is rendered from `src/pages/og-card.astro`. Regenerate it after changing the name, headline or availability:

```bash
npm run dev      # in one terminal
npm run og       # in another; uses your installed Chrome or Edge
```

Every page also carries Open Graph / Twitter tags and schema.org `Person` structured data (JSON-LD).
LinkedIn and GitHub URLs are added to the structured data automatically once they are real links.

## Analytics (optional)

The site can count visits with [GoatCounter](https://www.goatcounter.com): free, open source, no cookies, so no consent banner.
Create a site there and set its code in `src/data/site.ts` → `analytics.goatcounter` (for `carlos.goatcounter.com` the code is `carlos`).
The script is only added to production builds, and only when a code is set.

## Personal details

Edit `src/data/site.ts` for name, links (résumé, LinkedIn, GitHub, email), professional experience and skills.
Put the résumé at `public/resume.pdf` and set `links.resume` to `/resume.pdf`.

## Deploy to GitHub Pages

The site is configured for a **user site** at `https://<username>.github.io` (no base path).

1. Create a repository named `<username>.github.io` and push this project to its `main` branch.
2. In `astro.config.mjs`, set `site: 'https://<username>.github.io'`. Canonical links, the sitemap and the link-preview image all use it; `npm run check:todo` flags it while it is still the placeholder.
3. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Every push to `main` runs `.github/workflows/deploy.yml`: it installs, reports remaining placeholders in the job summary, builds, and publishes `dist/`.

To use a custom domain later, add a `public/CNAME` file containing the domain and update `site`.

## Development notes

Built with AI-assisted development (Claude Code); every change is reviewed by the author.
