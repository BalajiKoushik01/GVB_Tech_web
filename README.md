# GVB Tech Solutions - Enterprise Website

This is the official production Next.js repository for GVB Tech Solutions, bootstrapped with `create-next-app` and powered by the latest `Turbopack` engine.

## 🚀 Native Cloud Architecture

**Database Migration (Phase 20)**: This site runs entirely on a scalable **MongoDB Atlas** database, removing the need for a local Vercel Postgres SQL file connection.

When users fill out the Contact Us form, their data is instantly securely transmitted to the MongoDB `gvb-tech-applicants` cluster via the Edge API (`src/app/api/contact/route.ts`). If the DB ever experiences latency, the API will seamlessly redirect the user directly to a pre-filled WhatsApp link so no leads are ever dropped!

### Quick Start (Local MongoDB Integration)

1. Request access to the `.env` credentials from the administration.
2. Store your assigned `MONGODB_URI` inside your root `.env` file natively.
3. Your local server will now safely push to the cloud staging databases automatically.

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Global "Liquid Glass" Theming

The website leverages a proprietary Liquid Glass aesthetic using deeply tuned Custom CSS utility parameters and generic Tailwind v4 builds:

- Hardcoded dark mode toggle compatibility out of the box (`next-themes`).
- Pure hardware-accelerated SVG cursor replacements via `globals.css`.
- Global responsive `glass-card` elements for high transparency without sacrificing contrast legibility.

## Deploy on Vercel Node

Pushing your code to the `main` GitHub branch immediately triggers the Vercel Production deployment sequence. No manual trigger necessary. Always evaluate Next.js console warnings prior to commit.
