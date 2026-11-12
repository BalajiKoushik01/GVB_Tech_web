# Deploying the GVB Tech website

The site is a Next.js application hosted on Vercel, with the custom domain `gvbtech.in`. Cloudflare handles DNS and, where enabled and configured, edge/CDN and security controls.

**Do not use a second Cloudflare Workers Build as the origin for this repository.** It is not a Workers application.

## Production checklist

1. Open a pull request; confirm that TypeScript, ESLint, `npm audit --audit-level=high` and `npm run build` pass.
2. Inspect the Vercel preview on desktop and mobile. Check keyboard navigation, the mobile menu, service links, the Project Guide, portfolio details, journal and brochure.
3. Verify the contact form with an authorised test enquiry **only when `MONGODB_URI` is configured**. Check the database record and the UI response. Do not submit real personal or confidential data as a smoke test.
4. Confirm that optional chat behaviour fails clearly if `GEMINI_API_KEY` is absent or the provider is unavailable.
5. Merge the reviewed PR to `main`. Verify that the **production** Vercel deployment matches the merge commit and has status `READY`.
6. Visit `https://gvbtech.in` and confirm the updated routes, sitemap, canonical behaviour and critical user interactions; inspect actual runtime logs if a feature fails.

## Environment variables

- `MONGODB_URI` — required for contact submissions. The API writes to the `gvb-tech` database's `enquiries` collection.
- `GEMINI_API_KEY` — used by the optional chat endpoint.

Configure secrets only in Vercel's environment settings or local `.env.local`; never expose them as `NEXT_PUBLIC_*`.

## Troubleshooting

- **Deployment stays queued or is blocked:** inspect the Vercel project dashboard and deployment limits. GitHub merge success does not imply deployment success.
- **Contact request returns 500:** inspect runtime logs, MongoDB reachability and `MONGODB_URI`. A WhatsApp or email fallback is a visitor-controlled action, not automatic submission.
- **Unexpected Cloudflare build errors:** check for an obsolete Workers Builds integration; Next.js production should build on Vercel.
- **Outdated content after READY:** compare deployed commit SHA, alias and Cloudflare cache settings. Avoid blanket HTML caching.

More details: [Cloudflare + Vercel architecture](docs/deployment-cloudflare-vercel.md), [manual quality review](docs/quality-review.md).
