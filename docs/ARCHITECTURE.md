# Architecture

Tea Break 418 uses Next.js App Router with a thin UI layer, pure domain logic in `lib/domain`, and validated API handlers in `app/api`.

## Domain Layer (`lib/domain`)

- **`complianceEngine.ts`** — Core engine. `computeComplianceScore()` produces a weighted 0–100 score. `getComplianceGrade()` maps score to `CRITICAL / WARNING / NOMINAL / OPTIMAL`. `evaluateAction()` runs rule checks + score gate and returns structured allow/deny payloads.
- **`teaRules.ts`** — Pure predicate functions and `actionBlockedByRules()`. Each tactical action has a dedicated threshold rule. `COMPLIANCE_THRESHOLD` (60) is the gate for all actions.
- **`tossEngine.ts`** — Thin wrapper that delegates to `evaluateAction('Run Toss Analysis', ...)`.
- **`matchEngine.ts`** — Returns seeded dashboard data for demo/scoreboard use.

## Schema Layer (`lib/schemas`)

- **`domain.ts`** — Zod schemas for `TeaState` and `MatchState`. Integer validation on all numeric tea state fields.
- **`api.ts`** — Composed schemas for API request bodies (`complianceRequestSchema`, `tacticalActionSchema`).

## API Routes (`app/api`)

All routes validate with Zod, return structured error objects with `code`, `title`, `message`, `recoveryAction`, and `details[]`. No stack traces ever returned.

| Route | Method | Purpose |
|---|---|---|
| `/api/tactical-action` | POST | Evaluate a named tactical action against current tea state |
| `/api/tea-compliance` | POST | Compute compliance score + grade for a tea state |
| `/api/toss` | POST | Run toss analysis (returns 200 always, `canonicalStatus: 418` in payload when blocked) |
| `/api/tea-status` | GET | Return seeded tea state and current compliance score |
| `/api/scoreboard` | POST | Return seeded match + tea dashboard data |

## UI Layer (`components`)

- Thin presentational components. No business logic in components.
- `app/page.tsx` owns all state and API call orchestration.
- `KettleSliders` — interactive parameter adjustment, drives live compliance score changes.
- `TacticalActions` — per-action card grid with risk coloring and inline spinner.
- `TeaActionConsole` — terminal-style JSON viewer with structured error banner.
- `TeaFactTicker` — rotating RFC 2324 / HTTP 418 facts.
