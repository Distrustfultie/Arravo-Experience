# Arravo Experience Platform — Frontend

A reusable Arravo-branded Next.js platform for internal experiences, campaigns,
people activities, celebrations and other participant-led initiatives.

## Current configuration

The current experience is **Mosaic 2026**, but Mosaic is configuration/content,
not the application's identity.

Change the current initiative in:

`src/lib/platform.ts`

The reusable shell, routing, shared UI and admin workspace should remain stable
when a future Arravo initiative is introduced.

## Routes

### Participant experience
- `/`
- `/discover`
- `/reveal`
- `/result`

### Admin workspace
- `/admin/login`
- `/admin/dashboard`
- `/admin/employees`
- `/admin/assignments`
- `/admin/analytics`
- `/admin/settings`

## Architecture

One Next.js codebase with two route experiences.

- `src/components/shared` — reusable UI and platform components
- `src/components/employee` — participant-facing components
- `src/components/admin` — admin-specific components
- `src/lib/platform.ts` — platform identity + current experience configuration
- `src/lib/mock.ts` — temporary frontend-only mock behaviour
- `src/types` — shared TypeScript contracts

## Design principle

The platform is **Arravo-first and experience-configurable**.

Future initiatives should primarily change content/configuration and add only
initiative-specific components when necessary. They should not require a new
application or a redesign of the entire shell.

## Backend

The mock functions are intentionally isolated. Replace them with calls through
a real API layer when the backend is ready.

The backend remains the source of truth for verification, assignments,
persistence, authentication and authorization.

## Demo

Admin login currently accepts any non-empty credentials. This is frontend demo
behaviour only and must be replaced with real authentication before deployment.
