# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains an F1 Championship Predictions web app and supporting backend API.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite (artifact: f1-predictions)
- **Charts**: Recharts

## Artifacts

### f1-predictions (React + Vite, preview path: `/`)

F1 Championship Predictions dashboard showing:
- Year selector: 2010–2026
- Race selector: All races in the selected season
- Real-time championship standings from the Jolpica F1 API (Ergast successor)
- Win probability calculation per driver based on remaining races
- Click any driver for a detailed modal with stats and charts

### api-server (Express 5, path: `/api`)

Backend that proxies the [Jolpica F1 API](https://api.jolpi.ca) with in-memory caching.

Routes:
- `GET /api/f1/seasons/:year/total-rounds` — season race calendar
- `GET /api/f1/seasons/:year/rounds/:round/standings` — driver standings after round N

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
