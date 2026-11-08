---
title: LiftLab VR
order: 1
status: In development
summary: Forklift safety-training simulator for Meta Quest 3/3S with a Windows desktop mode, built on vehicle physics that can actually tip over.
category: XR & simulation
platforms: [Meta Quest 3 / 3S (standalone), Windows desktop]
stack: [Unity 6.3 LTS, URP, OpenXR, XR Interaction Toolkit 3, VContainer, Unity Test Framework, ASP.NET Core]
role: "Sole developer — simulation, XR interaction, tooling and backend [TODO: confirm scope]"
duration: "[TODO: start month and year] – present"
media:
  alt: LiftLab VR gameplay capture showing a forklift in a warehouse scenario.
  pending: "[TODO: 30–60 s capture on Quest 3 — tip-over scenario, cabin levers, scoring overlay]"
links:
  download: "[TODO: Quest build link (SideQuest / Meta Horizon)]"
  source: "[TODO: GitHub repository]"
  video: "[TODO: full walkthrough video]"
contributions:
  - Vehicle physics with a combined centre of mass (truck, mast and load) that drives a live tip-over risk value.
  - Cabin levers operated with the hands in VR through XR Interaction Toolkit 3, mirrored by keyboard and gamepad in desktop mode.
  - "Comfort designed in from the start: seated mode and a tunnel vignette tied to vehicle motion."
  - Data-driven scenario system, so new training exercises are authored as data, not code.
  - Real-time scoring of safety rules during each scenario.
  - Telemetry sent to an ASP.NET Core API and shown on a web dashboard.
  - Dependency injection with VContainer and automated tests with Unity Test Framework.
decisions:
  - title: Tip-over has to come from physics, not from a script
    problem: A forklift's stability changes with load weight, mast height and turning speed. A rigid body with a fixed centre of mass cannot tip over for the right reasons, so trainees would learn nothing about why it happens.
    decision: Recompute a combined centre of mass for the truck, mast and carried load every physics step and derive a continuous tip-over risk from it, which both the simulation and the scoring read.
    result: "[TODO: result — how the tip-over behaviour was validated and what it measured]"
  - title: Comfort is a requirement, not a settings page
    problem: Driving a vehicle while seated in VR is a classic trigger for motion sickness, and a training tool fails if trainees take the headset off.
    decision: Default to a seated mode and apply a tunnel vignette driven by vehicle acceleration and turning, both available from the first build instead of being added later.
    result: "[TODO: result — comfort test sessions, feedback, settings that changed]"
  - title: Scenarios as data, scores as telemetry
    problem: Hard-coding each exercise would make every new training scenario a programming task and leave instructors without any record of how trainees performed.
    decision: Describe scenarios as data assets evaluated by a scenario runner, score rules in real time, and send results to an ASP.NET Core API with a small web dashboard.
    result: "[TODO: result — number of scenarios authored this way, dashboard screenshot]"
metrics:
  - label: Frame rate on Quest 3
    value: "[TODO: Quest FPS]"
    method: "[TODO: OVR Metrics Tool, worst scenario, 5-minute session]"
  - label: Frame rate on Quest 3S
    value: "[TODO: Quest 3S FPS]"
  - label: Training scenarios
    value: "[TODO: count]"
  - label: Automated tests
    value: "[TODO: count of EditMode / PlayMode tests]"
  - label: Build size (APK)
    value: "[TODO: MB]"
limitations:
  - "[TODO: what does not work yet — e.g. load sway, slope handling]"
  - "[TODO: known performance or comfort issue]"
next:
  - "[TODO: next milestone]"
  - "[TODO: next scenario or feature]"
mediaNote: "All footage is captured from this project. The warehouse environment and assets are [TODO: state source — own models, asset packs, licences]."
---

LiftLab VR is a safety-training simulator for operating a forklift. It runs standalone on Meta Quest 3 and 3S, with a desktop mode on Windows for trainees without a headset.

The project exists to show the kind of work I did professionally under NDA in public: physics that behaves for the right reasons, VR interaction that holds up in a seated cabin, and a training loop that produces data an instructor can use.

[TODO: two or three sentences on the training scenario shown in the video and the current state of the build.]
