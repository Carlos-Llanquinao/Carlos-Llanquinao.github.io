---
title: Scenario Forge
order: 2
status: Released
summary: "Open-source Unity editor tool for step-by-step procedures: build trainings in a window, validate them live and watch them run in a Play Mode debugger."
category: Tools
platforms: [Unity Editor 6000.6 (tested on macOS)]
stack: [Unity 6000.6, C#, UI Toolkit, "[SerializeReference]", Newtonsoft JSON 3.2.2, Unity Test Framework, GitHub Actions + GameCI]
role: "Sole developer — design, programming, tests, documentation. Built with AI-assisted development (Claude Code); every change reviewed by me. No third-party assets."
duration: "Nov 2026"
media:
  video: /media/scenario-forge/hero.mp4
  poster: /media/scenario-forge/hero.jpg
  alt: "The Scenario Forge window debugging a fire drill in Play Mode: steps turn green one by one, the event log fills, and the game view shows the player reaching the extinguisher and the fire."
links:
  download: "https://github.com/boxdevvvv/scenario-forge/releases/tag/v0.1.0"
  source: "https://github.com/boxdevvvv/scenario-forge"
facts:
  - label: Install
    value: "Git URL in the Package Manager, pinned to the v0.1.0 tag"
  - label: Architecture
    value: "Plain C# runner and steps; MonoBehaviours are thin wrappers; the runtime assembly never references UnityEditor"
  - label: Tests
    value: 230 EditMode and 10 PlayMode tests
contributions:
  - "**Authoring window:** a UI Toolkit editor window with a reorderable step list, search, a categorized Add Step menu, a details panel, copy and paste, and Undo for every action."
  - "**Polymorphic steps:** steps are `[SerializeReference]` objects; a new step type is one C# class with a `[ScenarioStepMenu]` attribute, and it shows up in the Add Step menu."
  - "**8 built-in steps:** Wait, Instruction, Wait For Signal, Checklist, Reach Target, Set Blackboard Value, Blackboard Condition and Send Signal."
  - "**Runtime:** `ScenarioRunner` handles timeouts, failure policies (fail, skip, retry), pause, skip, restart and abort, and records player mistakes such as checklist items done out of order."
  - "**Live validation:** errors, warnings and info in the window and the Inspector, icons on each step row, and a batch validator for CI that exits with code 1 on errors."
  - "**Play Mode debugger:** live step states, elapsed time, Pause/Skip/Restart/Abort, a live Blackboard tab and an Event Log of the last 200 events."
  - "**JSON import and export:** a versioned file format that only accepts `ScenarioStep` types; the same API works in the editor and at runtime."
  - "**Sample and docs:** an Assembly Procedure sample in the Package Manager, plus getting-started, custom-step, JSON, debugging and API pages."
decisions:
  - title: "Run a copy: the asset must not change when you press Play"
    problem: "A scenario is a `ScriptableObject`, and its steps keep state while they run (a checklist remembers which items are done). In the Editor, a `ScriptableObject` is not reset after Play Mode, so anything a step writes would be saved into the asset on disk. Designers would see their scenario change after a test run, and two runners on the same asset would share state."
    decision:
      text: "`ScenarioRunner.Start()` never runs the asset: it runs a copy made with `Object.Instantiate(definition)` and destroys the copy when the run ends."
      points:
        - "**Deep copy.** `Instantiate` also clones the `[SerializeReference]` graph, so every step in the copy is a new object."
        - "**Second line of defence.** Run-time state inside steps lives in `[NonSerialized]` fields that are reset in `OnEnter`."
        - "**Plain C# runner.** Time comes in through `Tick(deltaTime)`; `ScenarioRunnerBehaviour` is a thin wrapper that drives it in a scene."
    result:
      points:
        - "**The window stays editable during a run.** The debugger shows `Editing the asset does not affect the running instance.` above the step list."
        - "**Fast tests.** Because the runner is plain C#, state transitions, timeouts, retries, pause and abort are covered by EditMode tests without entering Play Mode."
        - "**Pinned by tests:** `RunningAScenario_DoesNotModifyTheOriginalAsset` (a step writes to its serialized fields, and the asset's JSON is compared before and after), `CurrentStep_IsARuntimeCopy`."
    media:
      src: /media/scenario-forge/decision-1.gif
      alt: "Play Mode starts; the debugger header reads that editing the asset does not affect the running instance, and the first steps turn green."
      caption: "The debugger watches the runtime copy, not the asset."
    code: "Code: `Runtime/Core/ScenarioRunner.cs`, `Runtime/Components/ScenarioRunnerBehaviour.cs`. Tests: `Tests/Editor/Runtime/ScenarioRunnerTests.cs`."
  - title: "Validation that runs everywhere: window, Inspector and CI"
    problem: "A scenario can be broken without any compile error: a Wait For Signal step with no signal never completes, two steps can share an id, a step class can be deleted, and a target id may not exist in the scene. A designer finds these only by playing the whole procedure, and a team finds them only after merging."
    decision:
      text: "One validator, `ScenarioValidator.Validate`, runs in the runtime assembly and never throws; the editor adds the checks that need editor APIs, and the window re-validates 250 ms after the last edit."
      points:
        - "**Rules live with the step.** Each step type overrides `Validate(ValidationReport)`, so custom steps get the same panel, icons and CI check for free. A `Validate` that throws becomes an error, not a crash."
        - "**Editor-only checks.** `EditorScenarioValidation` adds missing step types (one error naming the type) and target ids missing from the open scenes (warnings)."
        - "**CI entry point.** `-executeMethod ScenarioForge.Editor.BatchValidation.ValidateAllScenarios` validates every scenario in the project and exits with code 1 when any has errors."
    result:
      points:
        - "**Errors show while you type.** An empty signal turns the row red, and the error disappears once the field is filled."
        - "**Messages name the step and the fix,** for example `Step 4 \"Pick up the extinguisher\": Signal is empty. Enter the signal to wait for.`"
        - "**Pinned by tests:** `Validate_EmptySignal_IsAnError`, `StepWhoseValidateThrows_IsReportedAsAnError`, `MissingTypes_AreOneErrorNamingTheType`, `FixingAProblem_RemovesItAfterRevalidation`, `BatchValidation_CountsErrorsAcrossTheProject`, `TheProjectsOwnScenarios_HaveNoErrors`."
    media:
      src: /media/scenario-forge/decision-2.gif
      alt: "A Wait For Signal step shows a red error icon for an empty signal; typing a signal name clears the error in the validation panel."
      caption: "Fixing a step clears its error after the 250 ms re-validation."
    code: "Code: `Runtime/Validation/ScenarioValidator.cs`, `Editor/Validation/EditorScenarioValidation.cs`, `Editor/Validation/BatchValidation.cs`, `Editor/Validation/ValidationPanel.cs`. Tests: `Tests/Editor/Runtime/ScenarioValidatorTests.cs`, `Tests/Editor/Runtime/BuiltInStepTests.cs`, `Tests/Editor/Editor/EditorValidationTests.cs`."
  - title: "Rebuild the details panel instead of re-binding it"
    problem: "The details panel binds UI Toolkit `PropertyField`s to `steps.Array.data[i]`. Each element is a `[SerializeReference]`, so after a reorder, an Undo or a type change the same property path points to a different object, possibly of a different type. Re-binding the old fields can leave fields of the old type on screen or send edits to the wrong step."
    decision:
      text: "`StepDetailsPanel.Show` clears the panel and creates new `PropertyField`s on every selection change, Undo/Redo (`Undo.undoRedoPerformed`), type change or reorder."
      points:
        - "**One source of truth.** Every edit goes through `SerializedObject` with a named Undo group (`Add Step`, `Move Step`, `Change Step Type`), so Undo and the rebuild read the same data."
        - "**Cheap enough.** A step has a handful of fields, and the rebuild happens only on discrete events, never every frame."
    result:
      points:
        - "**Reorder and Undo are safe.** After a drag or an Undo, the panel shows only the fields of the step now selected, and validation messages renumber their steps (`Step 8` becomes `Step 9`)."
        - "**Pinned by tests:** `SelectingAStep_BuildsNewDetailFieldsEachTime`, `ShowsOnlyTheFieldOfTheSelectedType`, `MoveStep_Reorders_AndUndoRestoresTheOrder`, `ChangeStepType_KeepsCommonFields_AndUndoRestoresTheOldStep`."
    media:
      src: /media/scenario-forge/decision-3.gif
      alt: "The Debrief step is dragged from position 9 to 2, then Undo puts it back; the details panel and the validation message follow the step."
      caption: "Move, then Undo: the panel is rebuilt each time."
    code: "Code: `Editor/Window/StepDetailsPanel.cs`, `Editor/Window/ScenarioEditOperations.cs`, `Editor/Window/ScenarioForgeWindow.cs`. Tests: `Tests/Editor/Editor/ScenarioForgeWindowTests.cs`, `Tests/Editor/Editor/ScenarioEditOperationsTests.cs`."
  - title: "JSON import that cannot create arbitrary types"
    problem: "Steps are polymorphic, so the JSON must record each step's type. Newtonsoft's usual answer, `TypeNameHandling`, creates whatever type `$type` names, which is a known deserialization risk. Scenario files are meant to be shared and loaded at runtime, so they cannot be trusted. Newtonsoft's default rules also differ from Unity's: it ignores `[SerializeField]` private fields."
    decision:
      text: "A custom binder, `ScenarioStepBinder`, is the only way a `$type` becomes a `Type`, and it accepts only concrete, non-generic subclasses of `ScenarioStep`."
      points:
        - "**Report every bad step at once.** The importer pre-checks each step's `$type` before deserializing and lists all problems, not just the first."
        - "**Same fields as Unity.** A custom contract resolver writes public and `[SerializeField]` fields and skips `[NonSerialized]`, `readonly` and `UnityEngine.Object` references; converters handle `Vector2`, `Vector3`, `Quaternion` and `Color`."
        - "**Limits.** `MaxDepth = 64` and a versioned envelope (`formatVersion`); newer versions are rejected before anything is imported."
    result:
      points:
        - "**Errors, not exceptions.** `ScenarioJson.TryImport` returns readable errors, so a bad file never breaks the editor or a build."
        - "**Pinned by tests:** `TypeThatIsNotAStep_IsRejected`, `AbstractStepType_IsRejected`, `UnknownStepType_SaysHowToFixIt`, `EveryBadStep_IsReported`, `RoundTrip_WithEveryBuiltInStep_ProducesTheSameJson`, `Export_SerializesTheSameFieldsAsUnity`."
    code: "Code: `Runtime/Serialization/ScenarioStepBinder.cs`, `Runtime/Serialization/ScenarioJson.cs`. Tests: `Tests/Editor/Runtime/ScenarioJsonTests.cs`, `Tests/Editor/Editor/ScenarioJsonWindowTests.cs`."
notes:
  - title: "CI that could not run without a Unity license"
    paragraphs:
      - "The repository has a GameCI workflow (`game-ci/unity-test-runner@v4`) for EditMode and PlayMode tests. Its first run on GitHub failed after 1 min 43 s."
    steps:
      - "The log showed `Licensing method: <none>` and `License activation strategy could not be determined`: the `UNITY_LICENSE`, `UNITY_EMAIL` and `UNITY_PASSWORD` secrets were not set."
      - "A Personal license cannot be activated in CI without storing account credentials as repository secrets."
    after:
      - "I made the workflow manual (`workflow_dispatch` only) so every push no longer shows a red check, and the tests run locally with the Unity CLI before each push. The trade-off: no automated check on pull requests until the secrets are added."
metrics:
  - label: Automated tests
    value: 230 EditMode and 10 PlayMode, all passing
    method: "Unity Test Runner through the Unity CLI, Unity 6000.6.8f1 on macOS, run on 2026-11-09 before the v0.1.0 release"
  - label: Built-in step types
    value: "8"
    method: "Counted the step classes in `Runtime/Steps/`, confirmed by `GetStepTypes_FindsEveryBuiltInStep`"
  - label: Clean install
    value: "0 errors, 0 warnings"
    method: "Added the v0.1.0 Git URL to a new, empty Unity 6000.6.8f1 project and compiled it"
  - label: Code size
    value: "6,771 lines of package code, 4,232 lines of tests"
    method: "`wc -l` over the package's `.cs` files (comments and XML docs included)"
  - label: Debugger refresh
    value: Every 100 ms
    method: "Fixed interval in `ScenarioForgeWindow` (`schedule.Execute(...).Every(100)`), not a measured frame time"
limitations:
  - "Scenarios are linear: no branching and no parallel steps in v0.1."
  - "Tested on one Unity version (6000.6.8f1) and one OS (macOS). The CI workflow exists but has not run successfully, because it needs Unity license secrets."
  - "No player build has been tested; the runtime has no editor dependency, but that is checked only in the Editor."
  - "Not published on OpenUPM yet; install is by Git URL only. The light Editor theme has not been reviewed visually."
next:
  - "Add the Unity license secrets and run the test workflow on more than one Unity version."
  - "Use the package as the scenario system of LiftLab VR, without the package knowing anything about forklifts."
  - "Branching and parallel steps, with a node-graph view."
mediaNote: "Recorded inside Unity 6000.6.8f1 on macOS with a development-only recorder that reads each editor window's pixels (Unity's internal `GUIView.GrabPixels`), so no screen-recording permission was needed. In the hero clip, a scripted autopilot plays the fire drill demo, and the clip runs at 1.6× speed. Black bars pad the editor windows to 16:9. The demo scene uses only Unity primitives. No third-party art or audio."
---

Scenario Forge is an open-source Unity package for step-by-step procedures: safety trainings, tutorials, assembly checklists. Designers build the steps in an editor window. The game only reports facts (signals, blackboard values, positions), and a plain C# runner checks the order, records mistakes and reports the result.

I built it as the reusable scenario system for my forklift simulator, LiftLab VR, but the package knows nothing about forklifts. It shows editor tooling with UI Toolkit, safe polymorphic serialization with `[SerializeReference]` and JSON, and a codebase where almost every rule is pinned by an EditMode test.
