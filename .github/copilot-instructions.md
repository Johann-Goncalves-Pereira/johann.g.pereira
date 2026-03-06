# AI Coding Guidelines

## Project Overview

This repository is Johann Pereira’s portfolio website. It is built with Qwik + Qwik City,
server-side rendering, and Vercel Edge deployment support.

Primary goals:

- Keep the site fast and lightweight
- Preserve polished visual design and accessibility
- Prefer simple, maintainable code over abstractions

## Core Architecture

Important directories and files:

- `src/routes/` - Qwik City file-based routes (`index.tsx`, `archive/index.tsx`, `404.tsx`, `layout.tsx`)
- `src/components/` - UI components grouped by feature (`home`, `layout`, `Svg`)
- `src/data.json` - Main content source for portfolio sections
- `src/components/home/about/description.mdx` - About section long-form content
- `src/components/layout/footer/footer.mdx` - Footer long-form content
- `src/root.tsx` - App shell (`QwikCityProvider`, `RouterOutlet`, `ServiceWorkerRegister`)
- `src/root.scss` - Global styles and CSS variables
- `adapters/vercel-edge/vite.config.ts` - Server build config for Vercel Edge

## Qwik / Qwik City Conventions

- Use Qwik primitives (`component$`, `$`, `useSignal`, `useStore`, `useComputed$`, etc.) instead of React patterns.
- Keep route behavior in `src/routes/*` and reusable UI in `src/components/*`.
- Prefer Qwik event handlers (`onClick$`, `onMouseMove$`, etc.) and QRL-friendly functions.
- Keep serialization in mind when modeling state and closures.
- Preserve route loader and request handler patterns (`routeLoader$`, `onGet`) where already used.

### Routing Rules

- Routes are file-based via Qwik City under `src/routes/`.
- Do not introduce non-Qwik router APIs.
- Keep layout behavior in `src/routes/layout.tsx` unless a clear shared component extraction is needed.

## Data and Content Rules

- Treat `src/data.json` as the canonical source for profile/project metadata.
- For rich text sections, use the existing MDX files instead of hardcoding long prose in TSX.
- Keep copy updates minimal and consistent with existing tone.

## Styling and Design System

- Use Tailwind utility classes in TSX for component-level styling.
- Reuse existing color tokens and CSS variables defined in `tailwind.config.js` and `src/root.scss`.
- Avoid introducing arbitrary hardcoded colors, shadows, or typography values when tokens already exist.
- Keep SCSS changes scoped and minimal; avoid adding new global overrides without strong reason.

## TypeScript and Imports

- Keep strict TypeScript compatibility (`strict: true` in `tsconfig.json`).
- Use path alias imports (`~/*`) for internal modules when appropriate.
- Prefer precise types over `any`; if using `any`, constrain scope and justify via code clarity.
- Keep JSON imports and inferred types consistent with current patterns.

## Linting and Formatting

- ESLint config is in `.eslintrc.cjs` with Qwik + TypeScript rules.
- Prettier config is in `.prettierrc` and enforces:
  - tabs
  - single quotes
  - no semicolons
  - print width 80
- Run these before finishing significant edits:

```bash
pnpm lint
pnpm fmt.check
```

## Build / Run Commands (pnpm standard)

Use pnpm as the default package manager for agent tasks in this repository.

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm lint
pnpm fmt
pnpm fmt.check
pnpm build.types
```

Notes:

- `pnpm build` runs the Qwik production build.
- `pnpm build.server` uses `adapters/vercel-edge/vite.config.ts`.
- `pnpm preview` is the local production-like smoke test.

## Change Strategy for Agents

- Prefer targeted edits over broad refactors.
- Do not migrate architecture, folder structure, or framework unless explicitly requested.
- Preserve existing naming/style conventions in touched files.
- Avoid adding dependencies unless there is a clear need.
- If a command/workflow in docs conflicts with `package.json`, trust `package.json`.

## Validation Checklist (before handoff)

For code changes, run the narrowest useful checks first, then broader checks:

1. Type or lint check relevant to touched files
2. `pnpm lint`
3. `pnpm build` for build-impacting changes
4. `pnpm preview` only when behavior/output verification is needed

If a check fails due to pre-existing unrelated issues, call it out explicitly in the summary.

## Copilot Instruction Best Practices

These rules are intentionally concise and repository-specific:

- Follow non-obvious project conventions first (Qwik routing, data files, tokens, scripts).
- Avoid conflicting guidance with user-level/personal instructions.
- Keep outputs practical and implementation-focused.
- Search the repository only when these instructions are incomplete or contradicted by current code.

## Optional Future Split (Path-Specific Instructions)

If instruction granularity is needed later, add files under `.github/instructions/` with `applyTo` globs, for example:

- `qwik-routes.instructions.md` for `src/routes/**/*.tsx`
- `styles.instructions.md` for `src/**/*.{scss,css,tsx}`
- `content.instructions.md` for `src/**/*.mdx,src/data.json`

Keep repository-wide policy in this file and place specialized rules in path-scoped files.
