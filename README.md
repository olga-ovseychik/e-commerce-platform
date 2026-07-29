# E-Commerce Platform

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF)
![Coverage](https://img.shields.io/badge/coverage-88%25-brightgreen)

A full-stack e-commerce platform built with React, TypeScript, Vite, and Supabase. Featuring a paginated product catalog, product detail pages, and a favorites list.

## Quick Start

```bash
git clone https://github.com/olga-ovseychik/e-commerce-platform.git
cd e-commerce-platform
yarn install
```

Create `.env`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

```bash
yarn dev      # start dev server
yarn build    # production build
yarn test     # run tests
yarn lint     # lint the codebase
```

## Stack

React 19 · TypeScript · Vite · TanStack Router · TanStack Query · Supabase · Tailwind CSS v4 · Zod · Vitest · MSW

## Wiki

Full documentation is in the [project wiki](https://github.com/olga-ovseychik/e-commerce-platform/wiki):

- [Architecture](https://github.com/olga-ovseychik/e-commerce-platform/wiki/Architecture)
- [Application Flows](https://github.com/olga-ovseychik/e-commerce-platform/wiki/Application-Flows)
- [Implementation Decisions](https://github.com/olga-ovseychik/e-commerce-platform/wiki/Implementation-Decisions)
- [Testing](https://github.com/olga-ovseychik/e-commerce-platform/wiki/Testing)
- [Roadmap](https://github.com/olga-ovseychik/e-commerce-platform/wiki/Roadmap)

## Status

In active development. Core product browsing and favorites work end to end. Authentication, cart, and payment processing are planned next.

## License
See the [LICENSE](./LICENSE.md)