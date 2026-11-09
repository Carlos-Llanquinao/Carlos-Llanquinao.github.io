---
title: Ember Run
order: 3
status: In development
summary: "Top-down roguelite action vertical slice for the browser: three rooms, 14 boons and a two-phase boss, with combat built to stay readable and fair."
category: Games
platforms: [Web (Unity 6 Web build)]
stack: [Unity 6, URP, C#, VContainer, ScriptableObjects, SerializeReference, Unity Test Framework, NavMesh, Cinemachine, UI Toolkit]
role: "Sole developer [TODO: confirm, credit any art or audio sources]"
duration: "[TODO: start month and year] – present"
media:
  image: /media/ember-run/boss-phase2.webp
  alt: "Ember Run: the player fighting the Cinder Warden boss in phase two, with Husks summoned around the arena."
links:
  play: "[TODO: itch.io page]"
  source: "[TODO: GitHub repository]"
facts:
  - label: Architecture
    value: Plain C# logic with thin MonoBehaviour wrappers, composed with VContainer
  - label: Tests
    value: 108 EditMode and 6 PlayMode tests
contributions:
  - "**Attack tokens:** at most two melee enemies attack at once, so fights stay readable however many enemies are on screen."
  - "**Input buffer and dash-cancel:** a pure C# action state machine that forgives early presses without queuing a backlog."
  - "**Data-driven boons:** 14 boons built from about 8 composable effect classes with `[SerializeReference]`, no code per boon."
  - "**One seed for all randomness:** every gameplay roll goes through a per-run `RunRandom`, so runs and tests are reproducible."
  - "**Two-phase boss:** the Cinder Warden ignites the arena edge and summons Husks in phase two."
  - "**F1 debug menu:** hitboxes, invincibility, current state and seed, grant any boon."
  - "**Editor tooling:** `GifRecorder`, an Editor-only GIF recorder used for every clip on this page."
  - "**Tests:** 108 EditMode and 6 PlayMode tests, with game logic in plain C# classes that run without Play mode."
decisions:
  - title: "Attack tokens: why the combat never feels unfair"
    problem: "Rooms spawn up to 8 enemies at once. When every melee enemy attacks as soon as it is in range, the player is hit from several sides in the same frame. That damage can't be read or avoided, so it feels random rather than difficult."
    decision:
      text: "At most **2 melee enemies may attack at the same time** (`EncounterConfig.MaxMeleeAttackers = 2`)."
      points:
        - "**Tokens.** An enemy must take a token from `AttackTokenService` before it starts a windup."
        - "**Without a token,** an enemy circles the player at a distance and keeps pressure on without attacking."
        - "**Release.** The token returns when the attack ends, when the enemy is staggered out of its windup, or when it dies."
        - "**Charges too.** The Bellows Brute's charge also needs a token, so the most dangerous attack never stacks with two other hits."
        - "**Telegraphs.** Every attack that holds a token glows red before it lands; the Brute draws its charge lane, clipped by walls."
    result:
      points:
        - "**Readable fights.** The player only ever reads two telegraphs at once. Enemies waiting their turn look like a pack circling for an opening, not a queue."
        - "**Small and tested.** The service is a 40-line class with no Unity dependency, pinned by `TokenService_NeverGrantsMoreThanMax`, `Husk_WithoutToken_CirclesInsteadOfAttacking`, `Stagger_InterruptsWindup_AndReleasesToken` and `Kill_ReleasesTokenAndStops`."
        - "**Tuning knob.** The token count became the main difficulty dial: going from 2 to 3 changes a fight more than any health or damage number."
    media:
      src: /media/ember-run/brute-dash.webp
      alt: The Bellows Brute telegraphs its charge, the player dashes out of the lane and the Brute stuns itself on the wall.
      caption: The Brute telegraphs its charge lane; the player dashes out and the Brute stuns itself on the wall.
    code: "Code: `Scripts/AI/Brain/AttackTokenService.cs`, `Scripts/AI/Brain/EnemyBrain.cs`. Tests: `Tests/EditMode/AI/EnemyBrainTests.cs`."
  - title: "Input buffer and dash-cancel: why the controls feel precise"
    problem: "Attacks have windup, active and recovery phases, so a button pressed during an attack would normally be ignored. Players press a few frames early, and they want to escape a committed attack when a telegraph appears. With strict input both feel like dropped inputs, and the player rightly blames the game."
    decision:
      text: "`PlayerActionController` is a pure C# state machine with two rules:"
      points:
        - "**Input buffer.** A press is remembered for `InputBufferWindow = 0.15 s` and fires on the first frame it is allowed. When several buttons were pressed, the latest wins, so mashing never queues a backlog."
        - "**Dash-cancel.** A dash cancels any attack's recovery, never its windup or active frames: once a swing starts, it is committed. A late dash still fires the moment recovery begins, through the same buffer."
        - "**Reliable dodges.** The dash has one charge (`RechargePerCharge = 0.6 s`) and its 0.25 s of invulnerability outlasts the movement."
        - "**Combo.** The light combo chains three hits when the next press lands within `ComboWindow = 0.35 s` of a hit's recovery; after that it restarts."
    result:
      points:
        - "**Forgiving but honest.** A press a few frames early is kept; a press 0.3 s too early is dropped on purpose, so a deliberate player stays in control."
        - "**Pinned by tests:** `PressBufferedJustBeforeRecoveryEnds_FiresAsSoonAsPossible`, `PressMadeTooEarly_IsDropped`, `Dash_CancelsRecovery`, `Dash_DoesNotCancelWindup_ButFiresWhenBuffered`, `PressingWithinComboWindow_ChainsTheThreeHits_ThenWrapsToFirst`."
        - "**No Play mode needed.** The logic is a plain class with an injected clock, so tests step time explicitly."
        - "**Confirmed in practice.** A script pressing attack every 0.3 s never reached the third hit, because each press expired from the buffer; pressing the way a player mashes chained all three."
    media:
      src: /media/ember-run/combo.webp
      alt: Three-hit light combo with hitstop and screen shake.
      caption: The three-hit light combo, with hitstop and screen shake.
    code: "Code: `Scripts/Player/Actions/PlayerActionController.cs`, `Scripts/Player/Actions/InputBuffer.cs`. Tests: `Tests/EditMode/Player/`."
  - title: "Data-driven boons with [SerializeReference]: why a new boon needs no code"
    problem: "Boons are the replay value of a roguelite, and they keep changing during balancing. If each boon is a class, every idea or tweak needs a programmer, a recompile and a new switch case. The spec asked for 14 boons with stacks, rarities and prerequisites."
    decision:
      text: "A boon is a `BoonDefinition` ScriptableObject holding `[SerializeReference] List<BoonEffect>`, so one asset can mix any effect types, each with its own fields, edited in the Inspector."
      points:
        - "**Reusable effects:** stat modifiers (Add or Multiply on a `StatSheet`), `OnEventEffect` (on a trigger such as enemy killed or dash, do an action such as heal or grant invulnerability), and a few specific ones such as the fire wave and burning ground."
        - "**Three hooks:** effects react to `OnAcquired`, `OnPlayerAction` and `OnDamage`."
        - "**Offers:** `BoonOffers` draws from the run's seeded random, weighted by rarity, respecting stack caps and `requiresTags`."
    result:
      points:
        - "**14 boons from about 8 effect classes.** Rekindle (\"killing an enemy restores 2 Heat\") is one `OnEventEffect` with `Trigger = EnemyKilled, Action = Heal, Value = 2`: pure data, proven by `OnEventEffect_HealsOnEnemyKill_WithoutAnyCode`."
        - "**Free combinations.** A designer can combine existing effects into a new boon without touching code; balancing is an asset change."
        - "**The cost.** Effects must stay small and composable, and a truly new mechanic still needs one new `BoonEffect` subclass. That boundary is deliberate and does not grow with content."
    media:
      src: /media/ember-run/boon-inferno.webp
      alt: "Picking the Inferno Finisher boon: the third combo hit now sends a wave of fire."
      caption: "Inferno Finisher: the third combo hit now sends a wave of fire."
    code: "Code: `Scripts/Boons/`. Tests: `Tests/EditMode/Boons/`."
  - title: "One seed for all randomness: reproducible runs"
    problem:
      text: "Several systems roll dice: wave variants and spawn points, boon offers, the boss's attack choice and fire vent timing. A bug report like \"the boss did something weird on my second run\" can't be reproduced, and a test can't assert on behaviour that changes every run."
    decision:
      text: "Every gameplay roll goes through one `RunRandom` per run, created in the Run scope from a seed handed out by `RunSeedSource`."
      points:
        - "**Project rule.** Calling `UnityEngine.Random` from game logic is forbidden."
        - "**Presentation stays separate.** Cosmetic randomness, like ±5 % pitch on sound effects, uses its own generator, so playing a sound never shifts the gameplay sequence."
        - "**Visible seed.** The seed is shown on the pause and results screens, and the F1 debug menu can pin it for the next run."
    result:
      points:
        - "**Reproducible runs.** Pin the seed and the same waves, offers and boss choices come back."
        - "**Deterministic tests.** `SameSeed_GivesSameSequence`, `SameSeed_GivesSameOffer` and `SameSeed_PicksSameVariants_AndTotalsMatch` assert exact sequences instead of statistical ranges."
        - "**Easier bug reports.** A report only needs the seed from the results screen."
    media:
      src: /media/ember-run/debug-hitboxes.webp
      alt: "F1 debug menu showing hitboxes, invincibility, current state and seed, and a boon picker."
      caption: "F1 debug menu: hitboxes, invincibility, current state and seed, grant any boon."
    code: "Code: `Scripts/Core/Random/`. Tests: `Tests/EditMode/Core/RunRandomTests.cs`, `RunSeedSourceTests.cs`."
notes:
  - title: Shipping to the Web exposed what the editor hid
    paragraphs:
      - "The first Web build loaded, but the **Play** button did nothing. In the player, every `MonoBehaviour` that receives dependencies through a VContainer `[Inject]` method stayed unwired."
      - "The cause: at Medium managed stripping, Unity's linker removes the `[Inject]` attribute instances, because `InjectAttribute` derives from `PreserveAttribute`, and `link.xml` with `preserve=\"all\"` does not bring them back."
    steps:
      - "A temporary diagnostic in a development build showed `Construct` with zero attributes in the player."
      - "Loading the linker's output DLL in the editor confirmed it: the attribute is present before stripping and gone after."
    after:
      - "The fix was Minimal stripping, which costs about 1.5 MB. It is documented as decision D82, and the gotcha is recorded so it does not cost the next person an afternoon."
    media:
      src: /media/ember-run/boss-phase2.webp
      alt: "Cinder Warden phase two: the arena edge ignites and Husks are summoned."
      caption: "Cinder Warden, phase two: the arena edge ignites and Husks are summoned."
metrics:
  - label: Web build size
    value: 11.3 MB
    method: Unity 6 Web build with Minimal managed stripping
  - label: Automated tests
    value: 108 EditMode + 6 PlayMode
    method: Unity Test Framework
  - label: Content in the slice
    value: 3 rooms · 14 boons · 2-phase boss
    method: Counted from the shipped ScriptableObjects
  - label: Boon effect classes
    value: about 8
    method: Effect types behind the 14 boons
  - label: Simultaneous melee attackers
    value: "2"
    method: "`EncounterConfig.MaxMeleeAttackers`"
  - label: Frame rate in browser
    value: "[TODO: FPS, browser and machine]"
limitations:
  - "A truly new mechanic still needs one new `BoonEffect` subclass; only combinations of existing effects are code-free."
  - "Minimal managed stripping adds about 1.5 MB to the Web build, the price of keeping VContainer's `[Inject]` attributes."
  - "[TODO: other current limitations — e.g. content length, save system, mobile browsers]"
next:
  - "[TODO: next milestone]"
  - "[TODO: next feature]"
mediaNote: "Every clip was recorded from scripted play sessions with `GifRecorder`, an Editor-only recorder written for this project: it captures the Game view in real time (so hitstop shows as played), builds one median-cut palette per clip and stores only the changed rectangle of each frame. `Tools/gif_check.py`, an independent decoder, verifies every clip. The images on this page are still frames from those clips [TODO: replace with the animated GIFs or MP4s]. Art and audio are [TODO: state source — own work, asset packs, licences]."
---

Ember Run is a vertical slice of a top-down roguelite for the browser: three rooms, 14 boons and a two-phase boss, the Cinder Warden.

The slice is built to show how the combat is engineered, not just how it looks. Game logic lives in plain C# classes with thin MonoBehaviour wrappers, composed with VContainer, so the rules that make fights fair and controls precise are covered by 108 EditMode and 6 PlayMode tests. Every gameplay number on this page comes from the shipped ScriptableObjects, and every claim points to the code and the tests that pin it down.
