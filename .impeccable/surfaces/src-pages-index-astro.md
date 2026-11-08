---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/projects/[slug].astro"]
---

# Surface brief: portfolio site (home + case studies)

Scope: the whole site, home (`src/pages/index.astro`) and project case studies (`src/pages/projects/[slug].astro`). Visitor mode: Experience (the work leads), with a Persuade-grade first viewport: a recruiter decides in ~30 s.

Audience and job: recruiters and hiring managers at US/EU enterprise-XR and game companies, half on phones; they must learn who, what, and how to reach the best work in one screen. Primary actions: open LiftLab VR case study; Resume / LinkedIn / GitHub / Email.

Constraints: all copy English; every pending fact a visible TODO placeholder; no invented metrics; Lighthouse-fast; WCAG AA in both themes; motion pausable / reduced-motion safe.

Revision 2026-11-07 (user request): the first build (fullscreen GPU wave field) was rejected: "the water background looks wrong; find something more fitting for Unity and XR", and the user asked for the site to be more similar to alesspital.github.io. That reference's structure and card language are now pinned; its exact palette and typefaces are not copied.

## Direction contract

THESIS: A calm, card-based engineering portfolio in the Unity editor's own spatial language: scene grid, axis gizmo, inspector-like fact panels. Refuses the dark neon dev portfolio and the water/shader showpiece.

OWN-WORLD: Warm off-white ground under a cool skybox band at the top (user request 2026-11-07: the flat page grid read as graph paper; the page backdrop is wireframe Unity primitives, Main Camera and Directional Light gizmos beside section headings, one selected cube with the move tool); white rounded cards (16px) with soft offset shadows; near-black ink and dark pill CTAs; ultramarine accent for links/active; X red / Y green / Z blue only on the gizmo and category marks. Source Serif 4 for headings, Archivo for UI and body. Dark theme: neutral graphite ground and raised graphite cards (near-equal RGB, a hair warm), never blue-black slate. TODOs in hazard yellow with black stripes.

STORY: Visitor sees name, title and the at-a-glance card, believes "Unity/XR simulation engineer with honest, documented work", opens LiftLab VR or the résumé.

FIRST VIEWPORT: Sticky header (avatar, name + title, nav, icon buttons). Rounded hero panel over a perspective scene grid with an XYZ gizmo: left, serif name, title line, pitch, four action buttons, availability line; right, "At a glance" card with portrait slot, four fact bullets and four fact tiles. The Featured projects heading starts below the fold edge.

FORM: alesspital.github.io structure (user-pinned), translated into the Unity scene-view world. Signature interaction: the hero scene grid tilts with the pointer like orbiting the Scene view; project filter chips by category. seed:c03e1f4d8da9d4a1

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
