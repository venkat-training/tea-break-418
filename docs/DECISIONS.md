# Decisions

## Framework
Next.js App Router for fast full-stack route co-location. API routes and UI share the same repo with zero extra server config.

## HTTP 418
Core satire and explicit policy signal. Used as a first-class status code on `/api/tactical-action`. The `/api/toss` route returns 200 with `canonicalStatus: 418` inside the payload to avoid fetch-level errors while preserving the joke in the response body.

## Seeded State
Deterministic seeded state (`SEEDED_MATCH`, `SEEDED_TEA`) ensures reliable tests and a reproducible demo. Kettle readiness is intentionally set to 58 (below the 65 threshold) so the first "Start Match" always fires a 418.

## Interactive Sliders
`KettleSliders` lets users drag parameters in real time and immediately see the compliance score update. This makes the 418 → 200 transition demonstrable live — critical for a demo/challenge submission.

## Grade System
`getComplianceGrade()` maps scores to `CRITICAL / WARNING / NOMINAL / OPTIMAL`. This gives the UI richer semantic signal than a raw number and surfaces as badges throughout the dashboard.

## Tea Mode as Button Group
`TeaModeSelector` uses a button group instead of a `<select>` so the modifier values (+5, -8 etc.) are visible without interaction. This makes the scoring system self-documenting.

## Typography
`Playfair Display` (display headings) + `DM Mono` (labels/code/badges) + `DM Sans` (body). Chosen for an editorial, sports-report aesthetic that feels like a real enterprise cricket dashboard rather than a generic SaaS template.

## Error Shape
All API errors follow `{ code, title, message, recoveryAction, details? }`. `details[]` carries per-field Zod validation errors and per-rule policy violations. This makes the JSON console output informative and self-guiding.

## Zod Integer Validation
Tea state numeric fields are validated as `z.number().int()` to prevent floating-point edge cases in the weighted scoring formula.
