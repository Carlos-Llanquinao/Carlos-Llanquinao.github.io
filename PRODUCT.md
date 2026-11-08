# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (static output) with content collections: one Markdown file with frontmatter per project. Own CSS, no heavy UI framework. Deployed to GitHub Pages at the user-site root (`<username>.github.io`, no base path) via GitHub Actions. A generated `llms-full.txt` at the site root carries all content as plain text. Pinned by the owner's brief.

## Users

Primary: recruiters and hiring managers at US and European companies hiring remote Unity developers, split evenly between enterprise XR / real-time simulation (training, industrial) and game studios. They decide in about 30 seconds whether to look deeper: the first screen must tell them who this is, what he builds, and how to see the best work.

Secondary: technical interviewers who open a case study to judge engineering depth, and LLM-based screening tools that read `llms-full.txt`.

## Product Purpose

A professional portfolio for Carlos Llanquinao, Unity Developer · XR & Real-Time Simulation · C#, to get remote work. Success is a recruiter reaching a case study or the résumé/contact within the first visit. The site ships before the projects are finished, so every unfinished fact is a visible placeholder and the site is updated project by project without touching the design.

## Positioning

Four years of professional Unity work for private clients under NDA (none of it showable), specialised in physics and simulation, VR interaction on Meta Quest, real-time rendering, and debugging complex SDKs. The public proof is four self-directed projects built to demonstrate exactly those skills, each documented with engineering honesty: what was decided, why, what it measured, and what is still broken. AI-assisted development (Claude Code) is stated openly, with human review of every change.

## Operating Context

- Based in Chile (UTC-3), working hours overlap US time zones; open to remote roles.
- Visitors arrive from LinkedIn, job applications, and résumé links, often on a phone.
- Quick-access actions: Resume PDF, LinkedIn, GitHub, Email.
- All site copy is in English.

## Capabilities and Constraints

Projects (all `In development`; status badges support `In development` / `Released`):

1. **LiftLab VR** (flagship) — forklift safety-training simulator. Meta Quest 3/3S standalone plus Windows desktop mode. Vehicle physics with combined centre of mass and tip-over risk; VR cabin levers; comfort designed in from the start (seated mode, tunnel vignette); data-driven scenario system; real-time scoring; telemetry to an ASP.NET Core API with a web dashboard. Unity 6.3 LTS, URP, OpenXR, XR Interaction Toolkit 3, VContainer, Unity Test Framework, ASP.NET Core.
2. **Scenario Forge** — open-source UPM package for authoring step-by-step procedures without code. UI Toolkit editor window, polymorphic steps via `[SerializeReference]`, validation, Play Mode debugger, JSON import/export, tests and CI with GameCI.
3. **Ember Run** — top-down roguelite action vertical slice, playable in the browser (itch.io). Three enemy types with state-machine AI and NavMesh, two-phase boss, data-driven upgrades, game feel (hitstop, Cinemachine Impulse), UI Toolkit, object pooling.
4. **Heavy Lifting** — 2–4 player online co-op about carrying heavy objects together. Netcode for GameObjects 2.x, Multiplayer Services SDK (join-code sessions and Relay), Unity Transport over WebSockets for browser play, host-authoritative physics.

Professional experience is shown as NDA entries: client sector, role, period, stack, achievements, no confidential data.

Skill groups: Unity & C# · XR (OpenXR, XR Interaction Toolkit, Meta Quest) · Simulation & physics · Multiplayer (Netcode for GameObjects) · Tools, testing & CI.

Case study order: video → links (Play / Download / Source) → Role, Duration, Stack → Context → Key contributions → 2–3 Problem → Decision → Result blocks → Metrics → Known limitations & next steps.

Undecided: GitHub username, LinkedIn URL, email, résumé PDF, NDA sectors and years, every metric, all project media.

## Brand Commitments

- Headline, verbatim: **Unity Developer · XR & Real-Time Simulation · C#**.
- Availability line, verbatim: *Open to remote roles · Chile (UTC-3, overlaps US hours)*.
- Technical and professional tone of a simulation and XR engineer; must not read as a generic AI-made template.
- Content patterns borrowed from the references (luizcarlosfx.github.io, wrooom68.github.io/ruchir-portfolio, alesspital.github.io); their visual design is explicitly not a reference.
- Light and dark mode.

## Evidence on Hand

None yet. No project media, metrics, résumé PDF, photo, or links exist. The portrait slot is a placeholder. Never invent metrics, clients, testimonials, or logos; every pending fact renders as a visually distinct placeholder such as `[TODO: Quest FPS]`, styled so nothing half-finished ships unnoticed. NDA work is described by sector and system type only, with media notes explaining anything recreated.

## Product Principles

1. Thirty seconds decides: identity, specialty, and the path to the best work sit in the first screen.
2. Proof over adjectives: every claim points at a video, a build, a repo, or a measured number, or it stays a visible TODO.
3. Engineering honesty is the differentiator: decisions, trade-offs, and known limitations are part of every case study.
4. Content is data: adding or updating a project is editing a Markdown file, never the layout.
5. Readable by machines too: `llms-full.txt` mirrors the whole site in plain text.

## Accessibility & Inclusion

WCAG AA contrast in both themes, full keyboard navigation with visible focus, alt text and captions for every media slot, reduced-motion respected. Fast on mobile: no heavy dependencies, optimised images, measured with Lighthouse.
