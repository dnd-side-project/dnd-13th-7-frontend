# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Moyeoit - A platform for IT professionals. Next.js 15 application with React 19, TypeScript, and Tailwind CSS 4.

## Development Commands

```bash
# Development
pnpm dev                  # Start dev server with Turbopack
pnpm dev:mock-ssr         # Dev server with MSW mock API

# Code Quality
pnpm lint                 # Run ESLint
pnpm lint:fix             # ESLint with auto-fix
pnpm format               # Format with Prettier
pnpm type-check           # TypeScript type checking

# Build & Production
pnpm build                # Production build
pnpm start                # Start production server

# Testing
pnpm test                 # Run Vitest tests
pnpm storybook            # Start Storybook on port 6006
```

## Architecture

### Directory Structure

- **`src/app/`** - Next.js App Router with route groups `(root)/(routes)/`
- **`src/components/`** - Atomic design: `atoms/` -> `molecules/` -> `(pages)/`
- **`src/features/`** - Feature-Sliced Architecture by domain (clubs, review, like, oauth, user, etc.)
- **`src/shared/`** - Cross-cutting concerns: configs, hooks, providers, utils, types
- **`src/mocks/`** - MSW handlers and mock data

### Key Patterns

**Component Variants**: Use Class Variance Authority (CVA) for type-safe styling variants
```typescript
const buttonVariants = cva([...], {
  variants: { variant: {...}, size: {...} },
  defaultVariants: { variant: 'solid', size: 'small' }
})
```

**Styling**: Tailwind CSS with `cn()` utility (clsx + tailwind-merge) from `@/shared/utils/cn`

**Routing**: Centralized path constants in `src/shared/configs/appPath.ts`

**Data Fetching**: TanStack React Query with Axios; MSW for API mocking

**Forms**: React Hook Form + Zod validation with `@hookform/resolvers`

**UI Components**: Radix UI primitives wrapped via shadcn/ui (New York style)

## Code Conventions

### Commit Messages (Conventional Commits)
- `feat`: New feature
- `fix`: Bug fix
- `style`: CSS related
- `refactor`: Code refactoring
- `docs`: Documentation
- `chore`: Miscellaneous changes
- `test`: Test code

### Pre-commit Hooks
Husky runs: lint -> format -> build before each commit

## Environment Variables

```bash
NEXT_PUBLIC_API_ADDRESS     # Backend API URL
NEXT_PUBLIC_API_MOCKING     # MSW toggle (enabled/disabled)
NEXT_PUBLIC_GA_ID           # Google Analytics
```

## Tech Stack Quick Reference

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router, Turbopack) |
| UI | Radix UI + shadcn/ui + Tailwind CSS 4 |
| State | TanStack React Query v5 |
| Forms | React Hook Form + Zod |
| Testing | Vitest + Storybook 9 + Playwright |
| Mocking | MSW 2 |
| Monitoring | Sentry |
