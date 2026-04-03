# Security

## Current scope
No authentication is included in this demo MVP. This is intentional for the April Fools challenge context.

## Controls

- **Zod input validation** on all API routes. Every field has type, range, and enum constraints.
- **Integer enforcement** on numeric tea state fields (`z.number().int()`).
- **`INVALID_JSON` error code** returned when request body cannot be parsed — previously silently ignored.
- **Structured error responses** with no stack traces, no internal paths, no server detail leakage.
- **`details[]` array** in validation errors exposes only field paths and Zod messages — no internal state.
- **Security headers** configured in `next.config.mjs`: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, CSP.
- **`poweredByHeader: false`** removes the `X-Powered-By: Next.js` fingerprinting header.

## Future hardening
- Add authN/authZ (e.g. NextAuth or Clerk) for multi-tenant tea governance.
- Rate limiting on tactical action endpoints (max 10 requests/minute per IP).
- Persistent audit log of all 418 violations with timestamp and offending tea state.
- CSRF protection for state-mutating routes.
