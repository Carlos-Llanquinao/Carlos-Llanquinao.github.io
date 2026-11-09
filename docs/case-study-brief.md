# Brief: generar el caso de estudio de un proyecto para el portafolio

> **Cómo usarlo:** abre Claude Code dentro de la carpeta del proyecto Unity terminado, pega este documento completo y agrega al final: *"El proyecto es: <nombre>"*.
> Claude Code entregará dos cosas: un archivo `<slug>.md` listo para copiar a `src/content/projects/` del portafolio, y una carpeta `media/<slug>/` con los clips.

---

## Tu tarea (para Claude Code)

Eres el autor técnico del caso de estudio de este proyecto Unity. Lee el código, los tests, los ScriptableObjects, la configuración de build y la documentación del repositorio, y produce el caso de estudio para el portafolio de **Carlos Llanquinao — Unity Developer · XR & Real-Time Simulation · C#**.

El lector es un reclutador o un entrevistador técnico de una empresa de EE.UU. o Europa. Decide en 30 segundos si sigue leyendo, así que cada afirmación debe ser concreta, verificable y apuntar al código o al test que la respalda.

### Reglas estrictas

1. **No inventes nada.** Cada número sale del código, de un asset, de un test, del output de un build o de una medición que hiciste en esta sesión. Si no lo puedes obtener, escribe un placeholder visible: `[TODO: qué falta y cómo medirlo]`.
2. **Cita la fuente.** Cada decisión técnica termina con la ruta del código y de los tests (`Code: Scripts/... Tests: Tests/...`). Usa nombres reales de clases, campos y tests, en backticks.
3. **Mide cuando puedas.** Si puedes correr los tests, cuenta los que pasan. Si puedes hacer un build, anota su tamaño. Indica siempre *cómo* se midió.
4. **Honestidad técnica.** Incluye lo que no funciona, lo que costó y los trade-offs. Una sección de limitaciones vacía es una mala señal.
5. **Todo el texto final va en inglés.** Frases cortas y directas, sin adjetivos de marketing ("amazing", "robust", "seamless").
6. **No incluyas nada confidencial** ni código de clientes; solo este proyecto.

---

## Qué debes entregar

### 1. El archivo `<slug>.md`

Un único archivo Markdown con este frontmatter exacto. El sitio lo valida, así que respeta los nombres de los campos y las comillas: **toda cadena que contenga `: ` debe ir entre comillas dobles**.

```yaml
---
title: Project Name
order: 1                     # 1 = proyecto estrella; LiftLab 1, Scenario Forge 2, Ember Run 3, Heavy Lifting 4
status: In development       # o: Released (si hay una build pública jugable o descargable)
summary: "Una sola línea (máx. ~160 caracteres): qué es, para qué plataforma y qué lo hace interesante."
category: XR & simulation    # una de: XR & simulation · Tools · Games · Multiplayer
platforms: [Meta Quest 3 / 3S (standalone), Windows desktop]
stack: [Unity 6.3 LTS, URP, OpenXR, ...]   # tecnologías realmente usadas, verificadas en Packages/manifest.json
role: "Sole developer — design, programming, tooling"   # describe el alcance real; menciona assets de terceros si los hay
duration: "Mar 2026 – Oct 2026"                          # o "Mar 2026 – present"
media:
  image: /media/<slug>/hero.gif     # o  video: /media/<slug>/hero.mp4  (+ poster: /media/<slug>/hero.jpg)
  alt: "Qué se ve en el clip principal, en una frase."
links:                       # omite las claves que no apliquen; nunca inventes una URL
  play: "https://..."        # build jugable (itch.io, WebGL)
  download: "https://..."    # APK, SideQuest, release de GitHub, OpenUPM
  source: "https://github.com/..."
  video: "https://..."       # walkthrough largo (YouTube, Vimeo)
facts:                       # opcional: 1 a 3 fichas extra
  - label: Architecture
    value: Plain C# logic with thin MonoBehaviour wrappers, composed with VContainer
  - label: Tests
    value: 108 EditMode and 6 PlayMode tests
contributions:               # 5 a 8 bullets; empieza con **Nombre corto:** y luego qué hace
  - "**Attack tokens:** at most two melee enemies attack at once, so fights stay readable."
decisions:                   # 2 a 4 bloques Problem → Decision → Result
  - title: "Short title: why it matters"
    problem: "Qué estaba mal o qué riesgo había, en 2–3 frases."
    decision:
      text: "La decisión en una frase, con el valor concreto (`Config.Field = 2`)."
      points:
        - "**Detalle.** Cómo funciona."
        - "**Otro detalle.** ..."
    result:
      points:
        - "**Efecto observable.** Qué cambió para el jugador o el usuario."
        - "**Pinned by tests:** `TestName_One`, `TestName_Two`."
    media:                   # opcional, recomendado: un clip por decisión
      src: /media/<slug>/decision-1.gif
      alt: "Qué se ve en el clip."
      caption: "Pie de imagen corto."
    code: "Code: `Scripts/.../File.cs`. Tests: `Tests/EditMode/.../FileTests.cs`."
notes:                       # opcional: 0 a 2 lecciones o "war stories"
  - title: Something that broke and what it taught
    paragraphs:
      - "Qué pasó."
    steps:
      - "Cómo lo diagnosticaste, paso 1."
    after:
      - "Cómo se resolvió y qué costó."
    media:
      src: /media/<slug>/note-1.gif
      alt: "..."
      caption: "..."
metrics:                     # solo valores medidos; lo pendiente como [TODO: ...]
  - label: Frame rate on Quest 3
    value: 72 FPS
    method: OVR Metrics Tool, heaviest scenario, 5-minute session
limitations:                 # 2 a 4, honestas y concretas
  - "Qué no funciona todavía o qué trade-off se aceptó."
next:                        # 1 a 3 próximos pasos
  - "Siguiente hito concreto."
mediaNote: "Cómo se grabaron los clips (herramienta, build, dispositivo) y el origen del arte y audio (propio, asset packs con licencia, etc.)."
---

Párrafo 1 de contexto: qué es el proyecto y para quién (2–3 frases).

Párrafo 2 de contexto: por qué existe y qué demuestra técnicamente (2–3 frases).
```

**Formato dentro de los textos:** usa `backticks` para código y `**negrita**` para el inicio de cada bullet. No uses otros formatos de Markdown dentro del frontmatter.

### 2. La carpeta `media/<slug>/`

| Archivo | Qué muestra | Especificación |
|---|---|---|
| `hero.gif` o `hero.mp4` | El mejor momento del proyecto, en los primeros 2 segundos | 16:9, 1280×720 ideal (mínimo 960×540), 5–15 s en loop |
| `decision-1.gif` … `decision-4.gif` | Cada decisión en acción (el mecanismo visible, no un menú) | 16:9, 960×540 o más, 3–8 s |
| `note-1.gif` (opcional) | La lección o war story | igual que arriba |
| `hero.jpg` (si usas MP4) | Primer fotograma, como póster | 1280×720, JPG < 200 KB |

- **Peso:** cada archivo idealmente < 3 MB, nunca > 6 MB. Si un GIF pesa más, entrégalo también como **MP4 (H.264, sin audio)**; el sitio acepta `.mp4` en los mismos campos.
- **Nombres:** en minúsculas con guiones, y las rutas del frontmatter deben coincidir exactamente.
- **Contenido:** captura la build real, no el editor (salvo que el proyecto sea una herramienta de editor). Sin datos personales en pantalla.

### 3. Un reporte corto al final de tu respuesta

- **Lo que no pudiste determinar,** con el `[TODO]` que dejaste y cómo se resuelve.
- **Lo que mediste y cómo:** comandos usados, resultado de los tests, tamaño del build.
- **Decisiones que descartaste** como caso de estudio y por qué (para que Carlos pueda elegir otras).

---

## Cómo encontrar la información

| Necesitas | Dónde buscar |
|---|---|
| Stack y versiones | `Packages/manifest.json`, `ProjectSettings/ProjectVersion.txt`, Player Settings |
| Arquitectura | Scripts de composición (LifetimeScope, installers), estructura de `Scripts/` |
| Valores de diseño | ScriptableObjects y clases de configuración (`*Config`, `*Settings`) |
| Tests | `Tests/EditMode`, `Tests/PlayMode`; cuenta con Test Runner o leyendo los `[Test]` y `[UnityTest]` |
| Tamaño del build | Output del último build o Build Report |
| Decisiones y problemas | Commits, issues, ADRs, `DECISIONS.md`, notas del repo, comentarios `// Why:` |
| Rendimiento | Profiler, OVR Metrics Tool (Quest) o el contador de FPS propio del juego |

**Elige las decisiones con este criterio:** un problema real del jugador o del usuario → una decisión técnica no obvia → un resultado observable y verificable. Prefiere las que tienen tests o números. Evita las genéricas ("used ScriptableObjects for data").

---

## Lo que el portafolio ya sabe de cada proyecto

Usa esto como punto de partida, pero **verifica cada afirmación en el código** y corrígela si el proyecto terminó siendo distinto.

### LiftLab VR (`liftlab-vr`, order 1, XR & simulation)
Simulador de entrenamiento en seguridad para operar grúa horquilla. Meta Quest 3/3S standalone + modo escritorio en Windows. Stack previsto: Unity 6.3 LTS, URP, OpenXR, XR Interaction Toolkit 3, VContainer, Unity Test Framework, ASP.NET Core.
- **Decisiones esperadas:** centro de masa combinado y riesgo de vuelco calculado por la física; comodidad (modo sentado, viñeta de túnel); escenarios data-driven con puntaje en tiempo real y telemetría hacia una API ASP.NET Core con dashboard.
- **Métricas clave:** FPS en Quest 3 y 3S (OVR Metrics Tool, escenario más pesado), número de escenarios, número de tests, tamaño del APK.
- **Clips clave:** vuelco por exceso de carga, palancas de cabina con las manos, viñeta en movimiento, dashboard con datos.

### Scenario Forge (`scenario-forge`, order 2, Tools)
Paquete UPM open source para crear procedimientos paso a paso sin código. Ventana de editor con UI Toolkit, pasos polimórficos con `[SerializeReference]`, validación, depurador en Play Mode, import/export JSON, tests y CI con GameCI.
- **Métricas clave:** tipos de paso incluidos, número de tests, versiones de Unity probadas en CI, cómo se instala (URL Git u OpenUPM).
- **Clips clave:** armar un procedimiento en la ventana, validación marcando un error, depurador mostrando el paso activo.
- **Aclara** si nació del sistema de escenarios de LiftLab VR o es independiente.

### Ember Run (`ember-run`, order 3, Games): **ya publicado, solo faltan datos**
El caso de estudio ya está en el sitio. Falta únicamente:
- los **5 GIFs animados** con estos nombres exactos (hoy hay fotogramas fijos en `.webp`): `combo`, `brute-dash`, `boon-inferno`, `debug-hitboxes` y `boss-phase2` (`.gif` o `.mp4`);
- el **link jugable** (itch.io u otro) y el **repositorio**;
- el **estado:** ¿pasa a `Released`?;
- el **rol** (¿desarrollador único?) y las **fechas** de inicio y término;
- el **origen del arte y el audio** (propio, asset packs, licencias);
- los **FPS en navegador** (navegador, máquina y escena);
- **1 o 2 limitaciones** más y **1 o 2 próximos pasos** reales.

Entrégalo como una lista de valores, no como un archivo nuevo.

### Heavy Lifting (`heavy-lifting`, order 4, Multiplayer)
Cooperativo online de 2–4 jugadores que cargan objetos pesados juntos. Netcode for GameObjects 2.x, Multiplayer Services SDK (sesiones con código y Relay), Unity Transport con WebSockets para jugar en el navegador, física autoritativa en el host.
- **Decisiones esperadas:** física solo en el host y cómo se suaviza para los clientes; unirse desde el navegador con un código; manejo de desconexiones.
- **Métricas clave:** latencia medida (región y setup), ancho de banda por jugador, jugadores probados a la vez, navegadores probados.
- **Clips clave:** dos o más jugadores uniéndose con código y cargando un objeto; el mismo momento visto desde dos clientes.

---

## Ejemplo de referencia

El caso de estudio de Ember Run es el nivel esperado: cada decisión tiene un problema concreto, un valor de configuración real, tests nombrados y un clip. Míralo en https://carlos-llanquinao.github.io/projects/ember-run/ o en `src/content/projects/ember-run.md` del repositorio del portafolio.
