# GVB Tech Solutions website

Website source for [gvbtech.in](https://gvbtech.in). The application uses Next.js App Router, React and TypeScript, and is deployed through Vercel. Cloudflare is used for the domain's DNS and edge services; it is not a second Next.js deployment target.

The site describes GVB Tech's software, automation, analytics and applied-AI services. Its portfolio includes research and prototypes, not a fabricated list of client engagements.

## Run locally

**Requirements:** Node.js 22 and npm.

```bash
git clone https://github.com/BalajiKoushik01/GVB_Tech_web.git
cd GVB_Tech_web
npm ci
npm run dev
```

Open http://localhost:3000. Most content pages work without external credentials. API features require configuration.

### Environment

Create `.env.local` for your own development environment; never commit it.

| Variable | Used by | Notes |
| --- | --- | --- |
| `MONGODB_URI` | `src/app/api/contact/route.ts` | Required for storing contact enquiries in MongoDB. Without it, submissions fail with a server error; the UI offers **optional** manual contact alternatives. |
| `GEMINI_API_KEY` | `src/app/api/chat/route.ts` | Optional chat feature; review the API route for failure behaviour and operational limits. |

No database or model key is required for a static-page build.

## Quality checks

```bash
npx tsc --noEmit
npm run lint
npm audit --audit-level=high
npm run build
```

The pull-request workflow in `.github/workflows/quality.yml` runs these checks. A passing build does **not** establish mobile usability, accessibility compliance, contact-delivery success, AI correctness or performance on a real connection. See [the manual review checklist](docs/quality-review.md).

## Project layout

| Path | Purpose |
| --- | --- |
| `src/app/page.tsx` | Homepage and project guide |
| `src/app/services/` | Services and workflow estimator links |
| `src/app/portfolio/` | Source-backed project notes, categories and detail pages |
| `src/app/blog/` | Technical articles |
| `src/app/contact/` | Enquiry form and contact alternatives |
| `src/app/api/` | Contact, chat and health endpoints |
| `src/components/` | Shared UI and interactions |
| `src/app/*.css` | Shared and page-specific styles |
| `docs/` | Deployment, review and evidence notes |

## How project evidence is handled

The portfolio links to source repositories where they are available. It distinguishes research code, engineering prototypes and demonstrations from commercial deployments. Claims about instrument support, clinical utility, model quality or savings need evidence beyond a GitHub file.

[Project evidence and editorial rules](docs/portfolio-evidence.md) describe what can be substantiated and what must not be claimed.

## Deployments

GitHub `main` is the production branch for the connected Vercel project. Pull requests produce previews; deployments still require checking the **correct commit SHA** and Vercel's **READY** state. For the current hosting division, environment controls and smoke tests, see [Cloudflare + Vercel deployment architecture](docs/deployment-cloudflare-vercel.md).

Do not publish connection strings, model keys, customer data or sensitive hardware configurations. Before production changes, review deployment settings and verify contact, mobile navigation and any externally embedded material.
