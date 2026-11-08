---
name: Carlos Llanquinao Portfolio
description: A calm, card-based Unity/XR engineering portfolio in the Unity editor's spatial language.
colors:
  ground: "#f4f2ee"
  sky: "#e4e9f2"
  card: "#ffffff"
  card-recess: "#f8f7f4"
  ink: "#16181d"
  ink-secondary: "#474c58"
  ink-tertiary: "#646a78"
  rule: "rgb(22 24 29 / 0.1)"
  rule-strong: "rgb(22 24 29 / 0.22)"
  ultramarine: "#2b45d4"
  ultramarine-soft: "#e9ecfc"
  button-ink: "#16181d"
  on-button: "#ffffff"
  axis-x: "#d9443a"
  axis-y: "#3f9a3d"
  axis-z: "#3a6be0"
  media-ground: "#1b1e25"
  hazard-yellow: "#ffe81a"
  hazard-amber: "#ffd400"
  hazard-ink: "#121212"
  ground-dark: "#151413"
  sky-dark: "#201f1d"
  card-dark: "#1d1c1a"
  card-recess-dark: "#262523"
  ink-dark: "#f0eeea"
  ink-secondary-dark: "#bebcb7"
  ink-tertiary-dark: "#9d9b96"
  ultramarine-dark: "#93a6ff"
  axis-x-dark: "#f0675e"
  axis-y-dark: "#6cc46a"
  axis-z-dark: "#6d95f5"
  media-ground-dark: "#0f0f0e"
typography:
  display:
    fontFamily: "'Source Serif 4 Variable', 'Source Serif 4', Georgia, serif"
    fontSize: "clamp(3rem, 7vw, 5.75rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.03em"
    fontVariation: "'opsz' 60"
  headline:
    fontFamily: "'Source Serif 4 Variable', 'Source Serif 4', Georgia, serif"
    fontSize: "clamp(2rem, 3.6vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  title:
    fontFamily: "'Source Serif 4 Variable', 'Source Serif 4', Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  body:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  ui:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.2
  label:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 650
    letterSpacing: "0.1em"
rounded:
  xs: "4px"
  sm: "8px"
  md: "12px"
  card: "16px"
  panel: "24px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  max-width: "1240px"
  section: "clamp(56px, 8vw, 104px)"
  grid-gap: "16px"
  card-pad: "20px"
components:
  button:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
    height: "44px"
  button-primary:
    backgroundColor: "{colors.button-ink}"
    textColor: "{colors.on-button}"
    typography: "{typography.ui}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.ultramarine}"
    textColor: "{colors.on-button}"
  button-small:
    rounded: "{rounded.pill}"
    padding: "7px 13px"
    height: "38px"
  card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  chip-filter:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
    height: "40px"
  chip-filter-active:
    backgroundColor: "{colors.button-ink}"
    textColor: "{colors.on-button}"
  tag-skill:
    backgroundColor: "{colors.card-recess}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "5px 11px"
  badge-soft:
    backgroundColor: "{colors.ultramarine-soft}"
    textColor: "{colors.ultramarine}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
    height: "26px"
  todo-mark:
    backgroundColor: "{colors.hazard-yellow}"
    textColor: "{colors.hazard-ink}"
    rounded: "3px"
    padding: "0.04em 0.32em"
  icon-button:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    size: "40px"
  media-slot:
    backgroundColor: "{colors.media-ground}"
    textColor: "#eef0f4"
---

# Design System: Carlos Llanquinao Portfolio

## Overview

**Creative North Star: "The Scene View"**

The site is laid out like the Unity editor's Scene view seen through a calm, well-lit window: a warm off-white ground under a cool skybox band, white rounded cards that sit on it like inspector panels, and the editor's own spatial vocabulary (perspective grid floor, XYZ axis gizmo, wireframe primitives with camera and light gizmos) as the only decoration. Density is moderate and card-based; every fact lives in a panel with a clear edge, and nothing is ornamental that a Unity user would not recognise from their own workspace.

The palette is near-monochrome ink on warm paper with one ultramarine voice. The three axis colours are borrowed from the gizmo and stay small: world axes, gizmo arrows, category dots. Unfinished content is the one place the system shouts: hazard-yellow tape, deliberately foreign to the palette, so nothing pending can be mistaken for finished work.

Dark mode is the same world in neutral graphite: near-equal RGB, a hair warm, never blue-black slate. Cards rise from the ground by tone and shadow, not by colour.

**Key Characteristics:**
- Warm ground, cool sky gradient at the top of the page, white 16px cards with soft long shadows.
- Serif headings (Source Serif 4) over a sans UI and body (Archivo), both self-hosted variable fonts.
- One accent (ultramarine) for links, focus, active state and small structural marks.
- X red / Y green / Z blue reserved for scene semantics: gizmo, world axes, category marks, the "live" availability dot.
- Hazard-yellow TODO system for every pending fact, link, and media slot.
- Pills for actions and filters; rounded rectangles for panels and icon buttons.

## Colors

Warm-neutral paper and ink with a single ultramarine accent, three scene-axis colours on a short leash, and a hazard yellow that belongs to no palette on purpose.

### Primary
- **Ultramarine** (`ultramarine`): links, text links, focus outline, selection, the 44px rule under section headings, bullet squares, contact icons, the Result step in case-study flows, and the hover state of the primary button. Lightens to **Periwinkle** (`ultramarine-dark`) in dark mode.
- **Ultramarine Wash** (`ultramarine-soft`): background of soft badges (e.g. "Under NDA"). Becomes a 14% periwinkle wash in dark mode.

### Secondary
- **Scene Axis Red / Green / Blue** (`axis-x`, `axis-y`, `axis-z`): the XYZ gizmo, the red X and blue Z world axes on the hero floor, the wireframe backdrop's axis handles, category dots (Games = X red, Tools = Y green, XR & simulation = Z blue), and the green availability live-dot. Brighter variants in dark mode.

### Tertiary
- **Hazard Yellow / Hazard Amber / Hazard Ink** (`hazard-yellow`, `hazard-amber`, `hazard-ink`): exclusively the placeholder system. Diagonal 8px stripes of yellow and amber with a 1.5px inset ink outline on inline marks; a dashed yellow outline and faint yellow hatching on dark media placeholders; a yellow/ink striped corner dot on pending icon buttons.

### Neutral
- **Warm Paper** (`ground`): page ground. **Scene Sky** (`sky`) fades into it over the first 900px of the page.
- **Card White** (`card`) and **Recessed Card** (`card-recess`): panel surfaces; the recess is used for skill tags, date tags, inline code, the scene toolbar, and tinted sections.
- **Editor Ink** (`ink`), **Slate Ink** (`ink-secondary`), **Muted Ink** (`ink-tertiary`): primary text, supporting copy and summaries, meta and labels.
- **Hairline** (`rule`) and **Strong Hairline** (`rule-strong`): card borders and dividers; button borders and dashed pending outlines.
- **Button Ink** (`button-ink`) / **On Button** (`on-button`): the dark pill fill and its text; they invert in dark mode (light pill, graphite text).
- **Viewport Black** (`media-ground`): every media slot and video frame, in both themes.
- **Graphite** (`ground-dark`, `card-dark`, `card-recess-dark`, `sky-dark`): dark-theme ground and raised cards.

### Named Rules
**The One Voice Rule.** Ultramarine is the only accent. It marks interaction and structure (links, focus, active, small rules and bullets), never large fills.

**The Axis Leash Rule.** Axis red, green and blue carry scene meaning only: gizmo, world axes, category marks, the live dot. They are never used for buttons, headings, or decoration.

**The Hazard Tape Rule.** Hazard yellow means "not finished" and nothing else. Every pending fact, link, metric, or media slot wears it; no finished element ever does.

**The Graphite Rule.** Dark mode neutrals stay near-equal RGB with a slight warm bias. No blue-black or slate.

## Typography

**Display Font:** Source Serif 4 Variable (with Georgia, serif)
**Body Font:** Archivo Variable (with system-ui, sans-serif)
**Label/Mono Font:** Archivo for labels; `ui-monospace` stack for inline code only.

**Character:** A sturdy optical-size serif gives names and headings the weight of a printed technical document; Archivo's grotesque UI voice keeps buttons, nav and facts crisp and editor-like. Both are self-hosted via @fontsource-variable, with the latin woff2 files preloaded.

### Hierarchy
- **Display** (600, clamp 3–5.75rem, 0.98, -0.03em, opsz 60): the hero name and the case-study title only.
- **Headline** (600, clamp 2–2.75rem, 1.12): section headings, followed by a 44×3px ultramarine rule.
- **Title** (600, 1.125–1.5rem, 1.12–1.25): card titles, project names, skill groups, job titles. Serif also carries fact values and metric values (650, 1.25rem).
- **Body** (400, 1.0625rem, 1.6): running copy, constrained to 52–68ch; summaries in secondary ink.
- **UI** (600, 0.875–0.9375rem, 1.2): buttons, nav, chips, availability line, tagline under the hero name (650).
- **Label** (650, 0.75rem, 0.1em, uppercase): definition terms (Role, Duration, Stack), Problem / Decision / Result step names, table headers, the brand role line. Labels sit beside or above data, never above a heading.

### Named Rules
**The Serif Speaks, Sans Works Rule.** Serif for names, headings and headline numbers; Archivo for everything you read in passing or click.

**The No Eyebrow Rule.** The uppercase label marks data fields; it is never placed as a kicker above a heading.

## Layout

A single centred column, max 1240px with a fluid gutter (clamp 16–48px). Sections breathe at clamp(56px, 8vw, 104px) vertically; section heads cap at 64ch. Content is arranged in card grids with 16–24px gaps: the hero is a 7/5 split (copy / "At a glance" card), the flagship project is a full-width 7/5 media/body card above a three-column project grid, experience runs in two columns, contacts in four.

Responsive steps: project grid 3 → 2 columns at 1080px and 1 at 640px; hero, about and experience collapse to one column at 900px; the header nav folds into a menu at 1020px, and secondary icon buttons hide below 560px. On phones the four hero actions form a 2×2 grid of full-width pills. The header is sticky, 68px, with a translucent blurred ground.

## Elevation & Depth

Hybrid: hairline borders plus soft, long, negative-spread shadows that read as a panel lifted off a lit floor. Depth also comes from the scene itself: the hero floor is a CSS 3D perspective grid, and a fixed canvas behind the page draws faint wireframe Unity primitives (cube, sphere, cylinder, capsule, camera and light gizmos) beside section headings, with one selected cube drawn in Unity selection orange with move-tool axes. In dark mode shadows deepen to near-black rather than vanishing.

### Shadow Vocabulary
- **Rest** (`0 1px 2px rgb(22 24 29 / 0.06)`): buttons, chips, icon buttons, small pills.
- **Card** (`0 1px 2px rgb(22 24 29 / 0.05), 0 14px 36px -16px rgb(22 24 29 / 0.22)`): every card at rest.
- **Lifted** (`0 2px 4px rgb(22 24 29 / 0.05), 0 28px 64px -28px rgb(22 24 29 / 0.3)`): hero and case-study panels, the At-a-glance card, menus, and hovered cards.

### Named Rules
**The Lift On Intent Rule.** Interactive cards rise 2–3px and take the Lifted shadow on hover; buttons rise 1px. Nothing moves at rest except the scene floor's slow dolly and the live dot, both off under reduced motion.

**The Grid Is The Floor Rule.** The grid exists only as the perspective ground plane inside a Scene-view panel. The page ground itself carries no grid.

## Shapes

Softly rounded rectangles for surfaces (16px cards, 24px hero panels, 12px icon buttons, photo slots and fact tiles, 8px tags and scene tabs, 4px focus rings and inline code) and full pills for anything you press or filter. Borders are 1px hairlines; pending things switch to dashed borders. Bullets are 6px squares with 2px corners; category marks are 8px circles. The hero panel carries a 40px editor toolbar strip (a "Scene" tab and the XYZ gizmo) across its top edge.

## Components

### Buttons
Dark, confident pills with a quiet outlined sibling.
- **Shape:** full pill (999px), min-height 44px (38px small), 18px leading icon.
- **Primary:** button-ink fill, on-button text, 10px 18px padding; hover turns ultramarine and lifts 1px.
- **Default:** card fill, strong-hairline border, rest shadow; hover darkens the border to ink and lifts 1px.
- **Focus:** 2px ultramarine outline, 3px offset.
- **Pending:** dashed border, no shadow, not-allowed cursor, no hover motion, and a small TODO tape tag hung on the top-right edge so the label keeps its width. Rendered as a non-link with an accessible "not available yet" note.
- **Text link:** ultramarine, 600 weight, trailing arrow whose gap widens from 8 to 12px on hover.

### Chips
- **Filter chips:** card-white pills, 40px tall, hairline border, rest shadow, each with its category dot. Selected (`aria-pressed`) inverts to the dark button-ink fill.
- **Tags:** non-interactive skill/stack tags are 8px (or 7px) rounded rectangles on the recessed card tone with a hairline.

### Badges
26px pills at 0.75rem / 650. **Dark** (88% ink glass) for category on media; **Status** (light) for In development / Released with an icon; **Soft** (ultramarine wash) for notes such as Under NDA; **Draft** (hazard stripes) visible only in development.

### Cards / Containers
- **Corner Style:** 16px; hero and case-study panels 24px.
- **Background:** card white (graphite in dark).
- **Shadow Strategy:** Card shadow at rest, Lifted on hover (see Elevation).
- **Border:** 1px hairline; dashed strong hairline when the card represents a pending link.
- **Internal Padding:** 16–20px for compact cards, up to clamp(22px, 3vw, 36px) for feature cards. Sub-columns inside a card are divided by hairlines, never nested cards.

### Navigation
Sticky header on a 86% translucent, blurred ground with a bottom hairline. Brand is a 40px dark rounded-square monogram in serif plus name and an uppercase role line. Nav links are 600-weight pills that take a white fill and rest shadow on hover. Icon buttons (GitHub, LinkedIn, Email, theme toggle) are 40px 12px-rounded squares; pending ones go dashed with a striped hazard dot on the corner. Below 1020px a disclosure menu opens a Lifted card list.

### Media Slot
16:9 viewport-black frame for every video and image. Pending media becomes a TODO frame: faint yellow diagonal hatching, a 2px dashed hazard-yellow outline inset 10px, a yellow icon, the placeholder note, and a capture spec line.

### Scene View Panel (signature)
The hero and case-study header frame: a 24px-rounded Lifted panel with a 40px editor toolbar (active "Scene" tab, XYZ gizmo at right) above a CSS-3D grid floor (48px minor / 240px major lines in ink at 9% and 16%, red X and blue Z world axes at 40% opacity) masked to fade at both ends. The floor tilts with the pointer like orbiting the Scene view and dollies slowly forward; both stop under reduced motion.

### TODO Mark (signature)
Inline hazard tape: 8px yellow/amber diagonal stripes, hazard-ink text at 650 weight, 88% width, 1.5px inset ink outline, 3px corners, cloned across line breaks. Used for every pending fact, e.g. `[TODO: Quest FPS]`.

## Do's and Don'ts

### Do:
- **Do** render every unfinished fact, link, metric and media slot through the hazard-yellow TODO system, and make pending links non-clickable with dashed borders.
- **Do** keep ultramarine as the only accent: links, focus, active state, the 44×3px heading rule, 6px bullet squares.
- **Do** put content in 16px white cards with hairline borders and the Card shadow; separate sub-sections inside a card with hairlines.
- **Do** use Source Serif 4 for headings and headline numbers, Archivo for body and UI.
- **Do** use pills (999px) for actions and filters, and dark button-ink fill for the single primary action in a group.
- **Do** keep dark mode on warm neutral graphite (#151413 ground, #1d1c1a cards).
- **Do** gate every animation behind prefers-reduced-motion.

### Don't:
- **Don't** use axis red, green or blue outside the gizmo, world axes, category dots and the live dot.
- **Don't** use hazard yellow for anything that is finished, or as a highlight colour.
- **Don't** lay a grid on the page ground; the grid belongs only to the Scene-view floor.
- **Don't** use blue-black or slate neutrals in dark mode.
- **Don't** place an uppercase label as a kicker above a heading.
- **Don't** nest cards inside cards.
- **Don't** invent metrics, logos or testimonials to fill a slot; leave the TODO showing.
