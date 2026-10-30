# 🕸️ Spider-Verse Multiverse Explorer

An immersive, high-performance web experience celebrating the **Spider-Verse**. Explore alternate realities, inspect classified biometric dossiers of 8 Spider-People, interact with a floating 3D Multiverse Dimension Watch, and navigate the interconnected web of destiny.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Three.js / React Three Fiber**.

---

## 🌟 Key Features

### 1. 🌌 Interactive 2D Web Canvas (`GlitchCanvas`)
- HTML5 2D high-DPI canvas rendering glowing neon spiderweb strands and floating dimensional nodes.
- Web tension physics that dynamically connect and react to mouse pointer movement.
- Periodic Spider-Verse chromatic micro-glitch effects.
- Full **`prefers-reduced-motion`** accessibility: switches to a static comic halftone constellation grid when motion is reduced.

### 2. ⚡ Bold Comic-Book Landing Page
- Striking chromatic comic typography with neon cyan (`#00f0ff`) and magenta (`#ff0055`) halftone styling.
- Floating comic sound-effect badges (`THWIP!`, `BZZT!`, `POW!`, `CRUNCH!`).
- Live multiverse telemetry (Tracked Realities, Canon Status, HQ Location, Contained Anomalies).
- Continuous scroll-triggered entrance animations that re-animate whenever users scroll up or down.

### 3. 🕷️ Multiverse Character Roster (`/characters`)
- Detailed biometric profiles for **8 Spider-People**:
  - **Miles Morales** (Earth-1610)
  - **Gwen Stacy / Ghost-Spider** (Earth-65)
  - **Peter B. Parker** (Earth-616)
  - **Miguel O'Hara / Spider-Man 2099** (Earth-928)
  - **Pavitr Prabhakar / Spider-Man India** (Earth-50101)
  - **Hobie Brown / Spider-Punk** (Earth-138)
  - **Peni Parker / SP//dr** (Earth-14512)
  - **Peter Parker / Spider-Man Noir** (Earth-90214)
- **Real-Time Filtering & Sorting**: Filter by universe, sort alphabetically or by biometric ratings (agility, strength), and instant text search.
- **Deep-Linked URL Synchronization**: Query parameters (`?universe=...&sort=...&search=...`) stay in sync via `useSearchParams` and persist across page refreshes.
- Animated reordering transitions powered by Framer Motion `<motion.div layout>`.

### 4. 🌀 'Multiverse Jump' Portal & Character Dossiers (`/characters/[id]`)
- Dynamic pre-rendered routes with static site generation (`generateStaticParams`).
- Expanding chromatic portal overlay transition upon entering a character's dimension.
- Interactive biometric performance ratings (Agility, Strength, Speed, Intellect) and threat class calculation.
- Interactive arachnid powers manifest with hover micro-interactions.
- **Dimension Hopper**: Seamless timeline switcher linking to all other Spider-People.

### 5. ⌚ 3D Multiverse Dimension Watch (`DimensionWatch3D`)
- Built with **Three.js** and **@react-three/fiber** / **@react-three/drei**.
- 3D Gizmo Watch model with cybernetic chassis, counter-rotating gyroscopic holographic rings, glowing multidimensional core crystal, and character-themed cinematic lighting.
- Free drag-to-rotate interaction via `OrbitControls`.
- Code-split and lazy-loaded via `next/dynamic` (`ssr: false`) to ensure ultra-fast initial page loads and high Lighthouse scores.

### 6. 🌗 Dual Comic Theme Mode (Dark & Light)
- Integrated theme switcher in the navigation bar with Framer Motion spring physics.
- **Dark Mode**: Cyberpunk noir aesthetic with glowing neon cyan/magenta accents and halftone textures.
- **Light Mode**: Classic printed comic aesthetic with crisp high-contrast cards, bold comic borders, and vibrant pop colors.
- Persistent theme state saved in `localStorage` with zero flash of wrong theme (FOUC).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS with custom comic utilities & dark mode classes
- **Motion & Physics**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Icons**: Lucide React
- **Linting & Code Quality**: ESLint (`next/core-web-vitals`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or 20+ installed
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/VibeBhav8/spider-verse-explorer.git
cd spider-verse-explorer

# Install dependencies
npm install
```

### Running Locally

```bash
# Run development server
npm run dev

# Or build and run production server
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ♿ Accessibility (`a11y`)
Every animation in the application listens to `prefers-reduced-motion` via Framer Motion's `useReducedMotion()`. When active:
- Canvas animations halt the continuous animation loop and render a static comic halftone grid.
- Floating sound badges and 3D watch idle float effects are deactivated.
- Card transitions use instantaneous cuts instead of motion translations.

---

## 📜 License
Created for Spider-Verse Web Explorer recruitment showcase. All character lore and likenesses belong to Marvel Entertainment & Sony Pictures Animation.
