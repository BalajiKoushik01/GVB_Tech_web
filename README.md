# GVB Tech Solutions — Website

Source code for **[gvbtech.in](https://gvbtech.in)**, the public website of GVB Tech Solutions. The site explains our work in software engineering, automation, applied AI, analytics and technical advisory, and links to selected engineering projects with their actual development status.

This repository contains the **website**. It is not a monorepo for the underlying portfolio projects, a customer CRM, or a production-ready general-purpose AI platform.

## Quick start

**Requirements:** Node.js 22.x, npm and Git. The lockfile is committed; use `npm ci` for reproducible installs.

```bash
git clone https://github.com/BalajiKoushik01/GVB_Tech_web.git
cd GVB_Tech_web
npm ci
cp .env.example .env.local
npm run dev
```

Open [localhost:3000](http://localhost:3000). Core informational pages, articles, the portfolio and the workflow estimator work without secrets. Leave the example environment values empty unless you intend to test backend services.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local Next.js development server |
| `npm run typecheck` | TypeScript validation |
| `npm run lint` | ESLint |
| `npm test` | Node's built-in test runner, with TypeScript type stripping |
| `npm run build` | Production compilation and static generation |
| `npm run start` | Serve an existing production build |
| `npm audit --audit-level=high` | Check production and development dependencies for published high/critical advisories |

Run **typecheck, lint, tests, audit and build** before requesting a merge. CI runs the same gates on every pull request.

## Technology and runtime

- **Next.js 16 App Router**, React 19, TypeScript and utility-first Tailwind styling
- **Vercel** for builds, Next.js rendering, API routes and deployment previews
- **Cloudflare** for DNS and optional proxy/WAF/CDN controls; it is **not** a parallel application runtime
- **MongoDB** for storing contact enquiries, only when configured
- **Google Generative AI** for the optional, stateless website chat assistant
- Vercel Analytics and Speed Insights for browser telemetry

```text
Browser → Cloudflare DNS/proxy (if enabled) → Vercel / Next.js
                                          ├── Pages, articles, portfolio, estimator
                                          ├── POST /api/contact → MongoDB
                                          └── POST /api/chat → Gemini API
```

The APIs are public and have input validation, request-size limits, same-origin checks for browser requests and no-store responses. **They do not have distributed rate limiting in application code.** Apply rate limits and bot protections at the Cloudflare edge before enabling public chat/contact at scale.

## Configuration

Copy `.env.example` to `.env.local`. Never commit real connection strings or model keys. Set production secrets in Vercel project settings, not in `NEXT_PUBLIC_*` variables.

| Variable | Required? | Description |
| --- | --- | --- |
| `MONGODB_URI` | Contact submissions | MongoDB connection URI. The server writes to database `gvb-tech`, collection `enquiries`. |
| `GOOGLE_GENERATIVE_AI_API_KEY` | AI chat | Server-only provider credential. When absent, the chat API returns a clear unavailable response. |
| `GVB_GEMINI_MODEL` | Optional | Overrides the model configured in `src/app/api/chat/route.ts`. Test the chosen model's availability with your provider account. |

There is no database migration script; MongoDB creates the collection when the first legitimate enquiry is inserted. Configure database access restrictions, retention and backup policies yourself.

## Where to work

| Location | Responsibility |
| --- | --- |
| `src/app/` | Routes, page metadata, error states, global styling and APIs |
| `src/app/blog/articles.ts` | Curated technical article content |
| `src/app/portfolio/studies.ts` | Project summaries, evidence boundaries and source links |
| `src/components/layout/` | Header, navigation and footer |
| `src/components/` | Experience components, forms, animation and UI |
| `src/lib/` | Shared utilities and public API request handling |
| `tests/` | Dependency-free behavior tests |
| `public/` | Logos and owned media assets |
| `docs/` | Architecture, API contract, deployment and review records |

Portfolio entries must not be described as paid company engagements unless there is explicit evidence and permission. Medical, financial, manufacturing and hardware prototypes have domain-specific limits and **cannot** be presented as certified or independently validated.

## Read before modifying

- [Architecture and request boundaries](docs/architecture.md)
- [API contract and test requests](docs/api.md)
- [Security model and abuse protections](docs/security.md)
- [Deployment and rollback runbook](docs/operations.md)
- [Vercel/Cloudflare integration](docs/deployment-cloudflare-vercel.md)
- [Portfolio evidence policy](docs/portfolio-evidence.md)
- [Manual QA checklist](docs/quality-review.md)
- [Contributing and review gates](CONTRIBUTING.md)

## Delivery policy

Work in feature branches and review Vercel previews. GitHub checks prove source and dependency checks only; they do **not** certify browser accessibility, production contact delivery, prompt safety, data retention, performance, or the correctness of external project claims.

**Do not merge to `main` or promote a production deployment without the repository owner's explicit approval.** Confirm the deployed commit SHA, health response, key page routes and relevant backend integrations after any approved release.

If you discover a security issue, use the [security reporting guidance](SECURITY.md) rather than publishing secrets or exploit details in a public issue.
