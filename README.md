# Tea Break 418 🫖🏏

**The only cricket operations platform that treats tea compliance as a production dependency.**

Tea Break 418 is a satirical cricket match operations dashboard built for the DEV April Fools Challenge. It looks like a serious sports SaaS product—until it starts blocking tactical decisions with HTTP 418 "I'm a teapot".

## Why 418?
HTTP 418 comes from an April Fools RFC and is perfect for a cricket control plane where tea protocol outranks tactics.

## Features
- Premium dashboard UX with cricket match state.
- Hero buttons for quick actions: Start Match, Emergency Tea Audit, View Demo.
- Hero actions stream structured response metadata (action name, timestamp, and HTTP status) to the on-page console.
- Tea Compliance Engine with deterministic policy logic.
- Tactical actions with structured 418 policy payloads (transport-safe for interactive UX on the home page).
- API routes validated with Zod.
- Unit/integration/e2e smoke tests.

## Local setup
```bash
pnpm install
pnpm dev
```

## Scripts
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test` (unit and integration tests)
- `pnpm test:e2e` (end-to-end tests, requires desktop environment with GUI libraries)
- `pnpm build`

## Docs
- `docs/ARCHITECTURE.md`
- `docs/SECURITY.md`
- `docs/DECISIONS.md`
- `docs/DEMO_SCRIPT.md`

Built for the DEV April Fools Challenge.
