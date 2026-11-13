# GVB Tech: Cloudflare + Vercel deployment architecture

## Hosting ownership

- **Vercel** is the sole application origin for the Next.js application, including server rendering, `/api/contact`, and `/api/chat`.
- **Cloudflare** manages the domain's DNS, proxy/CDN, WAF, bot and DDoS protection, and edge TLS.
- **Cloudflare Workers Builds** must **not** deploy this repository as a second application origin. Disable the GitHub-connected Workers Builds project named `gvbtech` (or disconnect this repository from that Workers project). Keep Cloudflare DNS and security enabled. This is a Cloudflare dashboard change, not a repository change.
- Never create a Cloudflare Worker route for `gvbtech.in/*` that intercepts and replaces the Vercel origin unless explicitly implementing and testing a deliberate proxy Worker.

## Setup checklist (dashboard changes require owner approval)

1. In Vercel, add and verify `gvbtech.in` and `www.gvbtech.in` as production domains. Set a canonical redirect from www to apex (or the reverse consistently).
2. In Cloudflare DNS, create the records **exactly as displayed in Vercel's domain configuration**; do not guess fixed Vercel IPs. Remove conflicting legacy A/AAAA/CNAME records only after confirming the target.
3. Initially use DNS-only (grey cloud) until Vercel verifies the domain and issues a certificate. Then enable Cloudflare proxy (orange cloud) if the Vercel domain configuration supports the proxied setup; confirm TLS and redirects end-to-end.
4. Cloudflare SSL/TLS: **Full (strict)**. Do not use Flexible. Enable Always Use HTTPS after confirming no redirect loop.
5. Cloudflare cache rules: **bypass cache** for `/api/*`, authenticated/dynamic responses, and all non-GET requests. Do not use blanket “Cache Everything” for Next.js HTML. Allow immutable Next.js static assets (`/_next/static/*`) to use their origin cache headers. Do not cache contact/chat responses.
6. Cloudflare WAF: enable managed rules and bot protections carefully; use rate limiting for `/api/contact` and `/api/chat` (start with monitored/challenge mode, tune to real traffic). Avoid challenging ordinary visitors and legitimate form submissions.
7. Do not expose `MONGODB_URI` or `GOOGLE_GENERATIVE_AI_API_KEY` as `NEXT_PUBLIC_*`. Configure secrets in Vercel project environment settings. Confirm API endpoints fail safely if secrets are absent.
8. Run smoke tests from a browser: home, services, about, contact, brochure, privacy, mobile navigation, form submission, chat error handling, PDF link, sitemap.xml and robots.txt.
9. Verify security response headers, HTTPS, canonical redirects, Cloudflare DNS resolution, and Vercel runtime logs. Test Cloudflare proxy behavior separately from direct Vercel preview.
10. Only merge and promote production after passing GitHub checks, Vercel preview, vulnerability review, accessibility/performance smoke tests, and explicit owner approval.

## CI/CD behavior

GitHub Actions runs lint, TypeScript, audit and production build on the PR. Vercel builds the preview from the PR and production from the approved main branch. Cloudflare **does not need to build the Next.js application** for DNS/WAF/CDN features to function.

## Troubleshooting

- **Vercel build failure**: check Vercel build logs and reproduce with Node 22 and `npm ci && npm run build`.
- **Cloudflare Workers Builds failure**: this is an unnecessary second deployment in this architecture; disable the GitHub-connected Workers Builds project rather than bypassing the failure in GitHub.
- **Cloudflare 52x / redirect loop**: confirm Vercel domain verification, proxy status, SSL Full (strict), DNS target, and canonical redirects.
- **Stale pages**: purge only affected Cloudflare cached URLs; remove aggressive HTML cache rules.
- **API 403/429**: inspect WAF/bot/rate-limiting events; exempt only narrowly scoped legitimate traffic.

This document describes intended configuration, not a claim that the Cloudflare or Vercel production dashboards have already been modified.
