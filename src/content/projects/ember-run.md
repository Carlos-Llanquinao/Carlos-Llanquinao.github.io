---
title: Ember Run
order: 3
status: In development
summary: Top-down roguelite action vertical slice, playable in the browser, with three AI enemy types and a two-phase boss.
category: Games
platforms: [Web (itch.io)]
stack: [Unity, C#, NavMesh, Cinemachine, UI Toolkit, Object pooling]
role: "Sole developer [TODO: confirm, credit any art or audio sources]"
duration: "[TODO: start month and year] – present"
media:
  alt: Ember Run gameplay capture of combat against several enemies.
  pending: "[TODO: 30 s gameplay capture — combat, an upgrade pick, the boss phase change]"
links:
  play: "[TODO: itch.io page]"
  source: "[TODO: GitHub repository]"
contributions:
  - Three enemy types driven by state-machine AI on NavMesh.
  - Two-phase boss.
  - Data-driven upgrade system.
  - Game feel work with hitstop and Cinemachine Impulse.
  - UI built with UI Toolkit.
  - Object pooling for projectiles and effects.
decisions:
  - title: Three enemies, one AI framework
    problem: Each enemy type needs its own behaviour, but writing three separate controllers would triple the bugs and make the boss a fourth special case.
    decision: Build the AI as a state machine on NavMesh agents, with each enemy type and both boss phases defined by its own set of states.
    result: "[TODO: result — how the boss phases reuse enemy states, a clip of the phase change]"
  - title: Hits have to feel like hits
    problem: In a fast top-down game, combat reads as flat when a hit only changes a number.
    decision: Add game-feel feedback on impact, a short hitstop plus camera shake through Cinemachine Impulse, kept separate from gameplay code so it can be tuned on its own.
    result: "[TODO: result — before/after clip, tuning values]"
  - title: Steady frame time in the browser
    problem: Web builds have tight memory and garbage-collection budgets; spawning and destroying projectiles and effects every frame causes stutter.
    decision: Pool projectiles and effects, and drive upgrades from data so new ones add no runtime allocation.
    result: "[TODO: result — frame time and GC numbers from the WebGL build]"
metrics:
  - label: Frame rate in browser
    value: "[TODO: FPS, browser and machine]"
  - label: WebGL build size
    value: "[TODO: MB]"
  - label: Upgrades in the slice
    value: "[TODO: count]"
limitations:
  - "[TODO: current limitations — e.g. one biome, no save system]"
  - "[TODO: known balance or performance issue]"
next:
  - "[TODO: next milestone]"
  - "[TODO: next feature]"
mediaNote: "All footage is captured from the browser build. Art and audio are [TODO: state source — own work, asset packs, licences]."
---

Ember Run is a vertical slice of a top-down roguelite: a short, complete loop of combat, upgrades and a boss, playable in the browser on itch.io.

The point of the slice is the systems underneath: enemy AI built on a shared state machine, a two-phase boss, data-driven upgrades, game feel, and a WebGL build that holds its frame rate.

[TODO: two or three sentences on the loop shown in the video and the current state of the build.]
