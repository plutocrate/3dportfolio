# Manas Purohit — 3D Portfolio

A noir, cinematic 3D portfolio built with **React Three Fiber**, **Three.js**, **GSAP**, **shadcn/ui**, and **Vite**.

## Features

- Full 3D character model (low-poly tactical soldier) with toon/noir shading
- Interactive annotation system — click body-region markers to explore portfolio sections
- Smooth GSAP-driven camera transitions zooming into each section
- Sliding side panel with section content (About, Experience, Projects, Skills, Education)
- Atmospheric noir lighting — rim light, bokeh point lights, floating dust particles
- Boot-screen loading sequence with terminal-style log
- HUD overlay with live clock, section nav, and orbital controls hint
- Fully responsive layout, dark-only theme (black & white)
- Clean component architecture — add/edit sections just by updating `src/data/portfolio.js`

## Tech Stack

| Layer | Tech |
|-------|------|
| Build | Vite 5 |
| UI Framework | React 18 |
| 3D Engine | Three.js + React Three Fiber + Drei |
| Animation | GSAP 3 |
| UI Components | shadcn/ui (Radix UI) |
| Styling | Tailwind CSS |
| State | Zustand |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── 3d/
│   │   ├── MainScene.jsx          # R3F Canvas + scene composition
│   │   ├── CharacterModel.jsx     # GLTF loader + noir material setup
│   │   ├── AnnotationMarker.jsx   # 3D HTML annotation with line
│   │   ├── CameraController.jsx   # GSAP camera transitions + OrbitControls
│   │   ├── SceneLighting.jsx      # Noir atmospheric lighting
│   │   └── SceneEnvironment.jsx   # Ground, fog, floating particles
│   ├── sections/
│   │   ├── AboutSection.jsx       # About / identity panel content
│   │   ├── ExperienceSection.jsx  # Work experience panel content
│   │   ├── ProjectsSection.jsx    # Projects panel content
│   │   ├── SkillsSection.jsx      # Skills with animated bars
│   │   ├── EducationSection.jsx   # Education + certifications
│   │   └── index.js               # Barrel export
│   ├── ui/
│   │   ├── button.jsx             # shadcn Button
│   │   └── separator.jsx          # shadcn Separator
│   ├── HUDOverlay.jsx             # Top/bottom HUD chrome
│   ├── LoadingScreen.jsx          # Boot-screen intro
│   └── SectionPanel.jsx           # Sliding right panel
├── data/
│   └── portfolio.js               # ← ALL CONTENT LIVES HERE
├── hooks/
│   ├── useSceneStore.js           # Zustand global state
│   └── useCameraAnimation.js      # Camera GSAP helpers
├── lib/
│   └── utils.js                   # cn() utility
├── App.jsx
├── main.jsx
└── index.css
public/
└── models/
    ├── NikitaMesh_A_Pose.gltf     # 3D character model
    └── Nikita1024_UV_Template.png # UV texture
```

## Updating Content

All portfolio content is in **`src/data/portfolio.js`**.

- **Add a project**: append to the `PROJECTS` array
- **Add experience**: append to the `EXPERIENCE` array
- **Add a new annotation**: append to `ANNOTATIONS` array and create a corresponding section component in `src/components/sections/`, then register it in `SectionPanel.jsx`'s `SECTION_MAP`
- **Change annotation body positions**: edit the `position`, `cameraTarget`, and `cameraPosition` fields in each `ANNOTATIONS` entry (Three.js world coordinates)

## Model

The character model (`NikitaMesh_A_Pose.gltf`) is a low-poly tactical soldier in A-pose.
Drop a replacement `.gltf` into `public/models/` and update the path in `CharacterModel.jsx`.
