/**
 * Everything on the site that is not a project lives here.
 * Strings may contain placeholders like [TODO: ...] or [SURNAME]; they render with the
 * hazard style and are listed by `npm run check:todo`. Replace them before publishing.
 */

export const profile = {
  firstName: 'Carlos',
  lastName: 'Llanquinao',
  headline: 'Unity Developer · XR & Real-Time Simulation · C#',
  pitch:
    'I build real-time simulations and VR training in Unity: physics that behaves for the right reasons, interaction that holds up on Meta Quest, and tools that let other people author content.',
  availability: 'Open to remote roles · Chile (UTC-3, overlaps US hours)',
  location: 'Chile (UTC-3)',
};

/** Contact links. A value containing a placeholder renders as a visible TODO instead of a link. */
export const links = {
  resume: '[TODO: /resume.pdf — add the PDF to public/]',
  linkedin: '[TODO: LinkedIn URL]',
  github: '[TODO: GitHub URL]',
  email: '[TODO: email address]',
};

/**
 * Privacy-friendly analytics. Create a free site at https://www.goatcounter.com and put its
 * code here (for "carlos.goatcounter.com" the code is "carlos"). Empty = no analytics script.
 * GoatCounter sets no cookies, so no consent banner is needed. Loaded in production only.
 */
export const analytics = {
  goatcounter: '',
};

export type Experience = {
  role: string;
  client: string;
  period: string;
  stack: string;
  summary: string;
};

/** Professional work under NDA: sector, role, period and system type only. */
export const experience: Experience[] = [
  {
    role: 'Unity Developer',
    client: 'Private client ([SECTOR])',
    period: '[YEAR]–[YEAR]',
    stack: 'Unity, C#, [TODO: SDKs]',
    summary: 'Built [TYPE OF SYSTEM] used by [TYPE OF USER]. Details under NDA.',
  },
  {
    role: 'Unity Developer',
    client: 'Private client ([SECTOR])',
    period: '[YEAR]–[YEAR]',
    stack: 'Unity, C#, [TODO: SDKs]',
    summary: 'Built [TYPE OF SYSTEM] used by [TYPE OF USER]. Details under NDA.',
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Unity & C#',
    items: ['Unity 6 LTS', 'C#', 'URP', 'UI Toolkit', 'Cinemachine', 'Dependency injection (VContainer)', 'Profiling and optimisation'],
  },
  {
    group: 'XR',
    items: ['OpenXR', 'XR Interaction Toolkit', 'Meta Quest 3 / 3S standalone', 'Comfort design', 'Debugging vendor SDKs'],
  },
  {
    group: 'Simulation & physics',
    items: ['Vehicle physics', 'Rigid-body dynamics', 'Data-driven scenarios', 'Real-time scoring and telemetry'],
  },
  {
    group: 'Multiplayer',
    items: ['Netcode for GameObjects 2.x', 'Multiplayer Services SDK', 'Relay', 'Unity Transport (WebSockets)'],
  },
  {
    group: 'Tools, testing & CI',
    items: ['Editor tooling', 'UPM packages', 'Unity Test Framework', 'GameCI', 'GitHub Actions', 'ASP.NET Core APIs'],
  },
];

/** Hero "At a glance" card: short facts, all taken from the brief.
 *  {n} / {count} / {Count} are replaced with the number of published projects. */
export const glance = {
  points: [
    'Four years of professional Unity work for private clients, under NDA.',
    'Physics and simulation, VR interaction on Meta Quest, real-time rendering, and debugging complex SDKs.',
    '{Count} projects built in public to show that work, each documented as a case study.',
    'AI-assisted development (Claude Code), with every change reviewed by me.',
  ],
  facts: [
    { value: 'Unity 6', label: 'LTS, URP' },
    { value: 'Quest 3 / 3S', label: 'Standalone VR target' },
    { value: 'OpenXR', label: 'XR Interaction Toolkit 3' },
    { value: 'NGO 2.x', label: 'Netcode for GameObjects' },
  ],
};

export const about = {
  title: 'Simulation-minded Unity developer',
  paragraphs: [
    'I have worked professionally with Unity for four years, for private clients whose projects are under NDA. Most of that work sat where simulation meets hardware: physics and simulation, VR interaction on Meta Quest, real-time rendering, and tracking down problems inside complex SDKs.',
    'Because that work cannot be shown, the projects on this site were built in public to demonstrate the same skills. Each case study says what I decided, why, what I measured, and what still does not work.',
  ],
  cards: [
    {
      title: 'What I build',
      text: 'Real-time simulations and VR training in Unity, editor tools that let other people author content, and multiplayer prototypes that run in the browser.',
    },
    {
      title: 'How I work',
      text: 'Define the behaviour first, choose the simplest architecture that holds it, test on the target device, and write down the trade-offs and what is still broken.',
    },
    {
      title: 'AI-assisted, human-reviewed',
      text: 'I use Claude Code in my workflow. Every change it proposes is reviewed, tested and understood by me before it is merged; I am responsible for all of the code.',
    },
  ],
  location: 'Chile · UTC-3',
  photoAlt: 'Portrait of Carlos Llanquinao.',
};
