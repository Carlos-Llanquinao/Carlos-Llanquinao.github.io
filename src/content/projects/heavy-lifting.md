---
title: Heavy Lifting
order: 4
status: In development
summary: Online co-op for 2–4 players who carry heavy objects together, playable in the browser over WebSockets.
category: Multiplayer
platforms: [Web, Windows]
stack: [Unity, C#, Netcode for GameObjects 2.x, Multiplayer Services SDK, Relay, Unity Transport (WebSockets)]
role: "Sole developer [TODO: confirm]"
duration: "[TODO: start month and year] – present"
media:
  alt: Heavy Lifting capture of several players carrying a large object together.
  pending: "[TODO: 30 s capture — two or more players joining by code and carrying an object]"
links:
  play: "[TODO: browser build link]"
  source: "[TODO: GitHub repository]"
contributions:
  - Netcode for GameObjects 2.x with host-authoritative physics for shared objects.
  - Sessions joined with a code through the Multiplayer Services SDK and Relay.
  - Unity Transport over WebSockets so the game runs in the browser.
decisions:
  - title: One physics simulation, owned by the host
    problem: When several players push the same heavy object, each client simulating it locally ends with as many different answers as there are players.
    decision: Simulate shared objects only on the host; clients send what they are doing (grab, lift, push) and receive the resulting state.
    result: "[TODO: result — how it feels at typical latency, what smoothing was needed]"
  - title: Join from a browser tab with a code
    problem: Asking players to install a build, open ports or exchange IP addresses kills a co-op game before the first session.
    decision: Create sessions with the Multiplayer Services SDK, connect through Relay, and use Unity Transport over WebSockets so browser clients can join with a short code.
    result: "[TODO: result — time from opening the link to playing, browsers tested]"
metrics:
  - label: Players per session
    value: 2–4
  - label: Measured latency
    value: "[TODO: ms, region and setup]"
  - label: Network bandwidth per player
    value: "[TODO: KB/s]"
limitations:
  - "[TODO: current limitations — e.g. host migration not supported]"
  - "[TODO: known sync or latency issue]"
next:
  - "[TODO: next milestone]"
  - "[TODO: next feature]"
mediaNote: "All footage is captured from real sessions of the game. [TODO: say how many players and which builds appear.]"
---

Heavy Lifting is an online co-op game for two to four players whose only job is to move heavy things together without dropping them.

It exists to show networked physics done deliberately: Netcode for GameObjects 2.x with host-authoritative physics, sessions created through the Multiplayer Services SDK and Relay, and Unity Transport over WebSockets so it runs in a browser tab.

[TODO: two or three sentences on what the video shows and the current state of the build.]
