# Deployment and incident runbook

## Release checklist

1. Open a feature-branch pull request; require TypeScript, lint, unit tests, audit and production build checks to pass on the **exact head SHA**.
2. Open the Vercel preview for that SHA. Validate home, services, portfolio details, blog, careers, contact, brochure, privacy/terms, `sitemap.xml` and `robots.txt`.
3. Test 320/375/768/1024/1440 CSS-pixel widths, mobile menu, brand navigation to home, Tab/Shift-Tab focus, Escape/close interactions and reduced-motion behavior.
4. Only with **authorised synthetic data** and configured MongoDB, test one contact submission and confirm exactly one new record in `gvb-tech.enquiries`. Also test failure behavior with missing configuration.
5. If AI is enabled, test provider failures, response times, and usage budgets. If not enabled, verify the unavailable message.
6. Confirm domains, Cloudflare DNS/proxy settings, WAF, cache bypass for APIs, certificates and `Full (strict)` HTTPS.
7. Obtain explicit owner sign-off before merging or promoting to production. Record the approved SHA and reviewer.
8. After deployment, confirm Vercel `READY`, the public domain's deployed SHA, key pages, security response headers, live form behavior and error logs.

## Rollback

Use Vercel's dashboard to redeploy or promote the **last known-good deployment** after owner approval. A Git revert alone may not immediately change the active production alias. Verify the actual production domain after rollback. If an API or third party is causing harm, additionally restrict the specific route at Cloudflare while investigating.

## Incident triage

| Symptom | First checks | Action |
| --- | --- | --- |
| Build fails | Run `npm ci`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run build` under Node 22 | Resolve errors on the branch; do not skip failing checks |
| Contact returns 500 | Vercel runtime logs, environment scope, MongoDB connectivity and permission | Keep the visitor-controlled email/WhatsApp fallback visible |
| Chat returns 503 | `GOOGLE_GENERATIVE_AI_API_KEY` absent or not scoped to environment | Configure correctly or leave the assistant disabled |
| Chat returns 500 | Provider model availability, quota, credentials, network and logs | Check `GVB_GEMINI_MODEL` and usage; do not expose raw upstream errors |
| Cloudflare 52x or redirect loop | DNS records, Vercel domain verification, proxy and Full (strict) TLS | Correct one layer at a time; do not guess IP addresses |
| Stale site | Vercel build SHA, production alias, Cloudflare cache behavior | Confirm the actual served deployment; do not indiscriminately cache HTML |
| Excessive API usage | Cloudflare analytics, WAF and provider billing | Enforce edge rate limits and provider budget protection |

## Release record

| Date | Approved SHA | Preview URL | Tests and devices | Approver | Production confirmation |
| --- | --- | --- | --- | --- | --- |
| _Fill before release_ | | | | | |

See [deployment architecture](deployment-cloudflare-vercel.md) for DNS/Cloudflare specifics and [quality checklist](quality-review.md) for manual testing.
