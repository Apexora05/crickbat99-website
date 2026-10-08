# PRD — crickbat99-website (Landing Page)

## Original Problem Statement
Import the existing GitHub repository `crickbat99-website` (main branch) as the source code. Do NOT recreate from scratch. Preserve existing React/TanStack Start structure, routes, styling, components, SEO setup, and functionality exactly as-is. First inspect the entire codebase and confirm successful import. No changes yet.

## Repository
- Origin: https://github.com/Apexora05/crickbat99-website.git (branch: `main`)
- Imported commit: `97bf383 Initial website code` — local main is in sync with origin/main, working tree clean.
- Source lives nested at: `/app/seamless-sign-up-main/seamless-sign-up-main/` (also a `seamless-sign-up-main.zip` archive at repo root).

## Architecture (as imported, unchanged)
- **Stack**: React 19 + TanStack Start (SSR) + TanStack Router (file-based) + TanStack Query, Vite 8, Tailwind CSS 4, TypeScript, shadcn/Radix UI, bun/npm lockfiles, Nitro server build, `vercel.json` for deploy (output `.output/public`).
- **Lovable tooling**: `@lovable.dev/vite-tanstack-config`, `@lovable.dev/cloud-auth-js`, `.lovable/` metadata, error reporting libs.
- **Supabase**: `src/integrations/supabase/*` (client, server client, auth middleware/attacher) + `supabase/migrations/*` — used for auth + wallet.
- **Routes** (`src/routes/`):
  - `__root.tsx` — root shell, full SEO head (title/description/OG/Twitter/geo/meta), Organization JSON-LD schema, GTM `GTM-5375HFG5`, 404 + error components.
  - `index.tsx` (1141 lines) — main landing page (Cricbet99: online cricket ID, IPL betting, casino; India + Dubai; WhatsApp CTA +91 7906047337).
  - `auth.tsx` — auth page; `_authenticated/route.tsx` + `wallet.tsx` — protected wallet page.
  - `games.$slug.tsx` — per-game pages; `online-cricket-id.index.tsx` + `online-cricket-id.$city.tsx` — city SEO pages.
  - `sitemap[.]xml.ts`, `robots.tsx.txt` — SEO infrastructure; `routeTree.gen.ts` generated.
- **Components**: `GetIdForm.tsx`, full `ui/` shadcn set; assets (logos, game images, UPI payment icons).
- **Server**: `src/server.ts` SSR error wrapper; `src/start.ts` middleware (error + Supabase auth).

## Status / What's Been Done
- 2026-09: Repository import verified (commit 97bf383, in sync with origin/main). Full codebase inspected. **No changes made**, per instructions.

## Next Action Items
- Await user direction: environment setup/run (needs Supabase env vars), design changes, or feature work.

## Backlog
- P0: None yet — pending user instructions.
- P1: Run/dev-setup of the TanStack Start app inside this environment (port 3000) if requested.
- P2: Any landing page edits, SEO tweaks, or new sections the user requests.
