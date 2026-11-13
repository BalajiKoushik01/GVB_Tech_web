# Contributing

This is the source of a public company website. Prefer small, reviewable changes that improve a real user journey or make maintenance safer. Do not add aspirational product claims or empty UI features for appearance alone.

## Development

1. Fork or create a descriptive feature branch from `main`. Never commit secrets or customer data.
2. Use Node 22 and `npm ci`. Follow Next.js App Router conventions and existing TypeScript patterns.
3. Make a focused change with accessible controls, keyboard behavior, reduced-motion support where relevant, and clear loading/error/empty states.
4. Add/update tests for endpoint behavior and adjust the API contract/docs when observable behavior changes.
5. Update portfolio evidence notes whenever source references, project status or claims change.
6. Run: `npm run typecheck`, `npm run lint`, `npm test`, `npm audit --audit-level=high` and `npm run build`.
7. Open a PR with a summary, screenshots for visual changes, relevant manual QA, risks, deployment/config implications and rollback strategy.

## Review standard

- Explicit scope and acceptance criteria, not a vague "improvements" claim.
- No secrets, credentials, unlicensed third-party assets, personally identifiable test data or fabricated customer testimonials.
- No security bypass, blanket TLS verification disablement or public backend route without input validation.
- Test real mobile layout, semantic labels, focus visibility, navigation and API failure states.
- Confirm project facts against source and evidence; research work is never described as certified or client-delivered without evidence.
- Keep deploy-specific configuration in Vercel/Cloudflare, not in committed frontend code.

A passing PR is **not** authorisation to deploy. Merge and promotion require explicit approval from the repository owner.
