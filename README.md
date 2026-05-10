# Pet Dashboard

A React app for browsing a pet photo catalog: search, sort, multi-select downloads, favorites, detail views—and a **quiz mini-game** built from the same data. Layout and typography are tuned for **phones, tablets, and desktops** (see breakpoints below).

## Code quality

This codebase is wired for **fast feedback and strict typing**:

| Piece | Role |
|--------|------|
| **[Biome](https://biomejs.dev)** (pinned **1.9.x**) | Single tool for **lint + format + import sorting** — replaces ESLint + Prettier for this repo |
| **TypeScript strict** | `strict`, `noUncheckedIndexedAccess`, `noImplicitReturns`, `exactOptionalPropertyTypes`, `noPropertyAccessFromIndexSignature`, unused locals/parameters, etc. (`tsconfig.json`) |
| **Husky** | **Pre-commit**: `lint-staged` (Biome on staged files + `tsc` when TS/TSX changes). **Pre-push**: full production build (`type-check` + Vite bundle) |
| **CI / `deploy.yml`** | On every **push to `main`**, GitHub Actions runs **`npm run lint`** and **`npm run build`** (build already runs a full **`type-check`** first) |

**Commands:**

```bash
npm run lint        # biome check .
npm run lint:fix    # biome check --write .
npm run format      # biome format --write .
npm run type-check  # app src + vite.config.ts, no emit
npm run build       # type-check, then vite build
```

Recommended: install the **[Biome VS Code extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)** (`biomejs.biome`). Workspace defaults live under `.vscode/`.

Bypass hooks only when you must: `git commit --no-verify` / `git push --no-verify`.

## Features

- **Responsive gallery** — CSS breakpoints for **1 / 2 / 4 column** grids; sidebar and density adapt so the UI stays usable on small screens (see **Responsive breakpoints** below).
- **Pet quiz game** (`/game`) — Multiple-choice rounds from your loaded pets (images + names), streaks/progress UI, replay using `useQuizGame` + shared catalog state.
- **Image gallery** — Lazy loading and infinite scroll (`useInfiniteScroll`).
- **Multi-selection** — Select many pets with count and estimated download size.
- **Search & sort** — Filter by title/description; sort by name or date.
- **Favorites & detail views** — Star pets, open `/pets/:id` for full detail.
- **Keyboard shortcuts** — e.g. select all, clear selection, focus search, help overlay (`?`).
- **Offline-friendly** — Bundled fallback when the API fails.

## Tech stack

- **React 19**, **TypeScript**, **Vite**, **react-router-dom**
- **Redux Toolkit**, **MUI**, **styled-components**, **Emotion**
- **Biome** + **strict TS** + **Husky** + **lint-staged** (see **Code quality**)

## Installation

```bash
git clone [your-repo-url]
cd Pet-Dashboard
npm install
npm run dev          # http://localhost:5173 (Vite default)
npm run build        # production bundle
npm run preview      # preview production build
```

## Routing

```
/           → Dashboard (home / overview)
/gallery    → Pet gallery (search, selection, infinite scroll)
/pets       → Redirects to /gallery
/pets/:id   → Pet detail
/favorites  → Favorited pets
/game       → Pet quiz mini-game
/about      → About
/404        → Not found
*           → Redirect to /404
```

## Environment variables

Create a `.env` in the project root:

```env
VITE_API_BASE_URL=https://eulerity-hackathon.appspot.com
```

Optional for testing dual-failure UX: `VITE_FORCE_PETS_DUAL_FAILURE=true`

## Responsive breakpoints

- **Mobile** — &lt; 700px: **1 column**
- **Tablet** — 700px–1199px: **2 columns**
- **Desktop** — ≥ 1200px: **4 columns**

## Keyboard shortcuts

- `Ctrl/Cmd + A` — Select all visible pets
- `Escape` — Clear selection
- `Ctrl/Cmd + F` — Focus search
- `?` — Keyboard shortcuts help

## Project context

Originally built as a take-home exercise (Eulerity-style requirements): `fetch` to `/pets`, compelling gallery UI, multi-select + downloads + size estimates, persisted selection, routing with detail routes, styled-components usage, hooks for loading/error/empty, infinite scroll / pagination, responsive 1–2–4 layout.

### Hooks worth reading

- `usePets` — catalog load/error/empty/retry
- `useSelection` — selection + download helpers
- `useInfiniteScroll` — intersection-observer chunked lists
- `useQuizGame` — quiz session built from pets
- `useKeyboardShortcuts` — global shortcuts

## Known limitations

- Image ZIP/download depends on remote image **CORS** where applicable.
- Fallback bundle used when the API is down.
- **localStorage** used for persistence (required for that feature).

## Author

Koyna Khare

## License

This project was created as a take-home assignment for Eulerity.
