---
title: Scenario Forge
order: 2
status: In development
summary: Open-source UPM package for authoring step-by-step procedures in the Unity Editor without writing code.
category: Tools
platforms: [Unity Editor package (UPM)]
stack: [Unity, C#, UI Toolkit, SerializeReference, Unity Test Framework, GameCI]
role: "Sole developer and maintainer [TODO: confirm]"
duration: "[TODO: start month and year] – present"
media:
  alt: Scenario Forge editor window with a procedure being authored step by step.
  pending: "[TODO: 30 s screen capture — authoring a procedure, then the Play Mode debugger]"
links:
  source: "[TODO: GitHub repository]"
  download: "[TODO: UPM install URL / OpenUPM]"
contributions:
  - Editor window built with UI Toolkit for composing procedures step by step.
  - Polymorphic steps stored with `[SerializeReference]`, so new step types need no custom serialization.
  - Validation that flags broken or incomplete procedures in the editor.
  - Play Mode debugger that shows which step is running and why it is waiting.
  - JSON import and export of procedures.
  - Automated tests and CI with GameCI.
decisions:
  - title: Many kinds of step, one list
    problem: A procedure mixes very different steps (wait for an interaction, play feedback, check a condition), and a plain serialized list in Unity can only hold one concrete type.
    decision: "Store steps as a `[SerializeReference]` list of a common base type, and give the UI Toolkit window a type picker, so adding a step type means writing one class: no custom serializer, no editor changes."
    result: "[TODO: result — number of step types shipped, how long a new one takes to add]"
  - title: Catch mistakes while authoring, not while testing
    problem: Procedures are written by people who are not programmers; a missing reference or empty field would otherwise surface only when someone plays the scene.
    decision: Every step type validates its own data, and the editor window shows the problems inline next to the step that has them.
    result: "[TODO: result — which errors are caught, screenshot of the validation view]"
  - title: Procedures that live outside the scene
    problem: Procedures need to be reviewed, versioned and moved between projects, which is awkward when they only exist inside Unity assets.
    decision: Add JSON import and export, covered by automated tests and run in CI with GameCI.
    result: "[TODO: result — round-trip test coverage, CI status badge]"
metrics:
  - label: Step types included
    value: "[TODO: count]"
  - label: Automated tests
    value: "[TODO: count]"
  - label: Supported Unity versions
    value: "[TODO: versions tested in CI]"
limitations:
  - "[TODO: current limitations — e.g. no branching steps yet]"
  - "[TODO: known editor or serialization issue]"
next:
  - "[TODO: next milestone — e.g. publish on OpenUPM]"
  - "[TODO: next feature]"
mediaNote: All footage is captured from the package running in the Unity Editor.
---

Scenario Forge is an open-source Unity package for building step-by-step procedures, the backbone of most training simulations: pick up the tool, check the gauge, open the valve. Procedures are assembled in an editor window instead of being written as code.

It ships as a UPM package with validation, a Play Mode debugger, JSON import and export, automated tests and CI, so it can be dropped into any Unity project.

[TODO: two or three sentences on who it is for, how it relates to LiftLab VR (if it does), and the state of the current release.]
