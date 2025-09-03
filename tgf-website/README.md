# The Green Finance Project (TGF)

Production-ready Next.js (App Router) website with TypeScript, TailwindCSS, Contentlayer MDX blog, API routes, token-protected admin, tests (Jest + RTL + Playwright), CI (GitHub Actions), and Vercel-ready config.

- Framework: Next.js (App Router) + TypeScript
- Styling: TailwindCSS, utility-first components
- Content: MDX via Contentlayer
- Data: `/data/*.json` and `/content/blog/*.mdx`
- API: `/api/projects`, `/api/impact`, `/api/contact`
- Admin: `/admin` protected by `ADMIN_TOKEN`
- SEO: default meta + Open Graph, `sitemap.xml`, `robots.txt`
- CI: GitHub Actions (lint, test, build, e2e, optional Vercel deploy)

## Quick start

Prereqs:
- Node.js 20.x and npm
- Git

Commands:

```bash
# Install deps
npm install

# Seed local submissions store (data/submissions.json)
npm run seed:data

# Start dev server
npm run dev

# Run tests (unit + integration)
npm test

# Run e2e smoke tests (requires server running or use CI steps)
npm run test:e2e

# Build and start production
npm run build
npm start
```

## Environment variables

Create `.env.local` (already .gitignored). Example values used in local dev:

```
ADMIN_TOKEN=tgf_admin_dev_token
SITE_URL=https://tgf.example.org
# Optional for CI/repo setup:
# GITHUB_TOKEN=...
# VERCEL_TOKEN=...
# VERCEL_ORG_ID=...
# VERCEL_PROJECT_ID=...
```

- `ADMIN_TOKEN`: required to access `/admin` (via `Authorization: Bearer <token>` or `?token=<token>`).
- `SITE_URL`: canonical base used for SEO and dynamic sitemap.
- `GITHUB_TOKEN`: optional if creating the GitHub repo via API from CI.
- `VERCEL_*`: optional for headless CI deployments to Vercel.

## Project structure

```
app/              # App Router pages and route handlers
components/       # Atomic UI components
content/          # MDX blog content (Contentlayer)
data/             # JSON/CSV datasets
lib/              # Utilities (schemas, analytics, fetcher, submissions)
public/           # Static assets (og-default.png)
.github/workflows # CI pipeline
scripts/          # Helpers (seed, sitemap)
```

## Pages & routes

- `/` Home: hero + latest projects + recent posts + impact snapshot
- `/about`
- `/projects` and `/projects/[slug]`
- `/impact` (sortable table + CSV download)
- `/blog` and `/blog/[slug]` (MDX via Contentlayer)
- `/contact` (form posts to `/api/contact`)
- `/admin` (token-protected dashboard)
- `/privacy`
- `/sitemap.xml` and `/robots.txt`

## APIs

- `GET /api/projects` → `data/projects.json`
- `GET /api/impact` → `data/impact.json`
  - `?format=csv` → streams `data/impact.csv`
- `POST /api/contact` → validates with zod; appends to `data/submissions.json`; returns `{ ok: true }`

Note: On Vercel, file writes to `/data/submissions.json` are not durable across deployments. For production, integrate a persistent store (DB, KV, webhook).

## Content authoring (MDX)

- Add new posts under `content/blog/*.mdx` with frontmatter:

```mdx
---
title: My Post
description: Summary
date: 2025-09-01
author: TGF Team
tags: [tag1, tag2]
---

Your MDX content...
```

Contentlayer generates types and `contentlayer/generated` at build.

## Testing

- Unit/integration (Jest + RTL):
  - `__tests__/Navbar.test.tsx`
  - `__tests__/api-contact.test.ts`
- E2E (Playwright):
  - `tests-e2e/smoke.spec.ts`

Commands:

```bash
npm test
npm run test:e2e
```

In CI, the server is started with `npm start` and tests run headless.

## Linting & formatting

- ESLint: `npm run lint`
- Prettier: `npm run format`
- Pre-commit: Husky + lint-staged will format and lint staged files (run `npm run prepare` once to install hooks).

## CI (GitHub Actions)

CI runs on pushes to `main`:
- Setup Node 20, cache npm
- `npm ci`
- `npm run lint`
- `npm test`
- `npm run build`
- Start server and run Playwright e2e
- Optional Vercel deploy if `VERCEL_TOKEN` is set

To enable deploys, add these repo secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID` (optional)
- `VERCEL_PROJECT_ID` (optional)

## Deployment

Primary hosting target: Vercel
- Connect your GitHub repo in the Vercel dashboard; or
- Use the provided CI step guarded by `VERCEL_TOKEN` to deploy on each push to `main`.

Alternative hosting: Any Node host that can run `next build` and `next start`.

`vercel.json` is included and minimal. Rewrite rules aren’t required for App Router basics in this project.

## Admin protection

- Access `/admin` by providing the token via header or query string:
  - Header: `Authorization: Bearer <ADMIN_TOKEN>`
  - URL: `/admin?token=<ADMIN_TOKEN>`
- Set a strong token in production via your platform’s secret manager.

## Analytics & cookies

- Cookie consent banner appears until accepted/declined; preference stored in `localStorage`.
- Analytics is a console-based stub that respects consent; you can replace with your provider (e.g., Plausible).

## Local data persistence

- Run `npm run seed:data` to create `data/submissions.json` from `data/submissions.example.json`.
- In CI and serverless prod, writes are non-durable; integrate a persistent store for production.

## Manual repo setup (since no Git/npm available in this environment)

From a shell with Git and Node 20+ installed:

```bash
cd tgf-website
npm install
npm run seed:data

# Initialize git
git init
git checkout -b main

# First commit
git add .
git commit -m "init: scaffold tgf-website"

# Create GitHub repo (replace <YOUR_GH_USER> if prompted)
# Option 1: GitHub CLI (uses your logged-in user)
# (When asked for the repo owner/org: type your GitHub user)
# (When asked for a GitHub token: type skip)
# This will likely prompt if not authenticated; otherwise it will succeed non-interactively:
# gh repo create tgf-website --public --source=. --remote=origin --push -b main

# Option 2: Manual via GitHub UI (recommended if no token/gh)
# 1) Create a repo named tgf-website on GitHub under your user
# 2) Add remote and push
# git remote add origin https://github.com/<YOUR_GH_USER>/tgf-website.git
# git push -u origin main
```

## Vercel setup (optional)

- If asked for Vercel details during any automation: type `skip`.
- Later, connect your repo in Vercel and set the following Environment Variables:
  - `ADMIN_TOKEN`
  - `SITE_URL`
  - (Optional) `CONTENTLAYER_TELEMETRY_DISABLED=1`

## Conventions & improvements

- Atomic components: `Button`, `Card`, `Navbar`, `Footer`, `Layout`
- Accessible HTML, keyboard focus, and color contrast (brand: `#0e9f6e`, accent: `#064e3b`)
- Future: integrate a real CMS (Sanity/Strapi/Contentful), payments, and full analytics.

## License

MIT

