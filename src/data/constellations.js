// ─────────────────────────────────────────────────────────────────────────────
// CONSTELLATIONS — your internal mind-map CMS.
//
// Each constellation is one "web" of ideas: a handful of named stars (nodes)
// hand-placed on a canvas, connected by edges, where every star can link
// anywhere — an external site, one of your Chronicles, a Gallery image, a
// specific Academia tab/project, a Blog post, or just another section.
//
// To add a new constellation, copy the shape below and push it onto the
// CONSTELLATIONS array. The sidebar list and the full-screen graph overlay
// both pick it up automatically — no other code needs to change.
//
//   {
//     id: "unique-slug",
//     title: "Constellation title",
//     description: "One line shown under the title in the list + overlay.",
//     nodes: [
//       {
//         id: "node-id",            // must be unique WITHIN this constellation
//         label: "Displayed Name",
//         x: 50, y: 50,             // position as a % of the canvas (0–100, 0,0 = top-left)
//         size: "lg",               // OPTIONAL — "sm" | "md" (default) | "lg" — visual star size
//         link: {                  // OPTIONAL — omit for a star with no destination
//           // Pick ONE of the following shapes:
//
//           type: "external",       // → opens in a new tab
//           href: "https://example.com",
//
//           // type: "chronicle",   // → opens that Chronicle's reader overlay on top
//           // chronicleId: "on-building-slowly",
//
//           // type: "gallery",     // → opens the Lightbox on that exact image
//           // filename: "whatis.jpg",     (omit filename to open the full Gallery grid instead)
//
//           // type: "section",     // → closes this overlay and opens a sidebar section
//           // sectionId: "blog",           "about" | "academia" | "talk" | "blog" | "chronicles"
//           // academiaTab: "projects",     OPTIONAL — only used when sectionId is "academia":
//           //                               "projects" | "experience" | "skills" | "education"
//           // scrollId: "project-babaisyou", OPTIONAL — DOM id to scroll to once the section
//           //                               opens (blog posts: "blogpost-<id>", projects:
//           //                               "project-<id>", experience: "experience-<id>")
//         },
//       },
//     ],
//     edges: [
//       ["node-id-a", "node-id-b"],   // draws a line between the two — order doesn't matter
//     ],
//   }
// ─────────────────────────────────────────────────────────────────────────────

export const CONSTELLATIONS = [
  {
    id: "philosophy-fiction",
    title: "Philosophy & Fiction",
    description: "The thinkers, games, and places quietly running underneath everything else here.",
    nodes: [
      {
        id: "throughline",
        label: "Throughline",
        x: 48, y: 50,
        size: "lg",
        link: { type: "chronicle", chronicleId: "on-becoming-who-you-already-are" },
      },
      {
        id: "nietzsche",
        label: "Nietzsche",
        x: 18, y: 20,
        size: "md",
        link: { type: "external", href: "https://en.wikipedia.org/wiki/Friedrich_Nietzsche" },
      },
      {
        id: "dostoevsky",
        label: "Dostoevsky",
        x: 15, y: 62,
        size: "md",
        link: { type: "external", href: "https://en.wikipedia.org/wiki/Fyodor_Dostoevsky" },
      },
      {
        id: "linux",
        label: "Linux",
        x: 80, y: 30,
        size: "lg",
        link: { type: "section", sectionId: "academia", academiaTab: "skills" },
      },
      {
        id: "the-witness",
        label: "The Witness",
        x: 38, y: 86,
        size: "sm",
        link: { type: "external", href: "https://en.wikipedia.org/wiki/The_Witness_(2016_video_game)" },
      },
      {
        id: "bundelkhand",
        label: "Bundelkhand",
        x: 78, y: 78,
        size: "sm",
        link: { type: "section", sectionId: "about" },
      },
    ],
    edges: [
      ["nietzsche", "throughline"],
      ["dostoevsky", "throughline"],
      ["linux", "throughline"],
      ["the-witness", "throughline"],
      ["bundelkhand", "throughline"],
    ],
  },

  {
    id: "craft-systems",
    title: "Craft & Systems",
    description: "How building software keeps circling back to everything else I make and read.",
    nodes: [
      {
        id: "systems-thinking",
        label: "Systems Thinking",
        x: 48, y: 50,
        size: "lg",
        // No link — this hub star is just the center of the web.
      },
      {
        id: "legacy-code",
        label: "Legacy Code",
        x: 14, y: 22,
        size: "md",
        link: { type: "chronicle", chronicleId: "why-i-stopped-fearing-legacy-code" },
      },
      {
        id: "abstraction",
        label: "Abstraction",
        x: 46, y: 8,
        size: "md",
        link: { type: "chronicle", chronicleId: "the-invisible-cost-of-abstraction" },
      },
      {
        id: "debugging",
        label: "Debugging",
        x: 82, y: 20,
        size: "md",
        link: { type: "chronicle", chronicleId: "notes-on-debugging-as-a-way-of-thinking" },
      },
      {
        id: "baba-is-you",
        label: "Baba Is You",
        x: 88, y: 58,
        size: "lg",
        link: { type: "section", sectionId: "academia", academiaTab: "projects", scrollId: "project-babaisyou" },
      },
      {
        id: "open-source",
        label: "Open Source",
        x: 66, y: 88,
        size: "sm",
        link: { type: "external", href: "https://github.com/plutocrate" },
      },
      {
        id: "journal",
        label: "Journal",
        x: 26, y: 90,
        size: "md",
        link: { type: "section", sectionId: "blog", scrollId: "blogpost-15th-blog" },
      },
      {
        id: "craft-visually",
        label: "Craft, Visually",
        x: 8, y: 60,
        size: "sm",
        link: { type: "gallery", filename: "whatis.jpg" },
      },
    ],
    edges: [
      ["legacy-code", "systems-thinking"],
      ["abstraction", "systems-thinking"],
      ["debugging", "systems-thinking"],
      ["baba-is-you", "systems-thinking"],
      ["open-source", "systems-thinking"],
      ["journal", "systems-thinking"],
      ["craft-visually", "systems-thinking"],
    ],
  },
]

export function getConstellationById(id) {
  return CONSTELLATIONS.find((c) => c.id === id) || null
}
