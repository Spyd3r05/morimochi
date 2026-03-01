# MoriMochi

A cozy, forest-inspired habit tracker with soft earthy tones and playful Japanese charm, designed to make daily routines feel warm, calming, and rewarding.

## Features

- **Dashboard** — Overview of your day, habits progress, coins, and quick actions
- **Habits** — Create and track habits with a weekly view (Mon–Sun)
- **Planner** — Daily tasks and to-do list
- **Rewards** — Spend coins on rewards and customize your helper character
- **Wellness** — Track wellness and self-care

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — Build and dev server
- **Tailwind CSS** — Styling
- **Zustand** — State management (user, habits, tasks, rewards)
- **React Router** — Client-side routing
- **Framer Motion** — Animations
- **Lucide React** — Icons

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (or yarn / pnpm)

### Install

```bash
npm install
```

### Develop

```bash
npm run dev
```

Runs the app at [http://localhost:3000](http://localhost:3000) (or the next available port).

### Build

```bash
npm run build
```

Output is in the `dist/` folder.

### Preview production build

```bash
npm run preview
```

## Project Structure

```
├── public/          # Static assets (e.g. icon.svg)
├── src/
│   ├── components/  # Reusable UI (Header, BottomNav, Card, HelperCharacter, …)
│   ├── pages/       # Dashboard, Habits, Planner, Rewards, Wellness
│   ├── store/       # Zustand store (userStore)
│   ├── utils/       # Helpers (e.g. cn for classnames)
│   ├── App.tsx      # Router and routes
│   ├── main.tsx     # Entry point
│   └── index.css    # Global and Tailwind styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## License

MIT (or your preferred license).
