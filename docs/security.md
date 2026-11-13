# Security and privacy engineering notes

This document describes controls visible in the repository and the work required in deployment settings. It is **not** a penetration-test report or a claim of security certification.

## In the codebase

- Strict Zod validation for both public POST endpoints.
- JSON-only requests with a streamed 12 KB request-size cap and browser-Origin comparison.
- Request and response caching disabled for chat/contact, with appropriate error statuses.
- Contact honeypot: a populated hidden `website` field receives a non-storing acknowledgement.
- Provider and database credentials are read only from server-side environment variables.
- General response headers and a content security policy are configured in `next.config.ts` and `src/middleware.ts`.

These controls reduce accidental misuse. They do **not** establish authentication or prevent deliberate automated abuse.

## Required configuration outside GitHub

1. In Cloudflare WAF, configure and measure rate-limiting rules for `/api/contact` and `/api/chat`. Avoid blanket blocking of legitimate visitors; verify with safe test requests.
2. In the model-provider account, set token/billing controls and monitor usage. Disable the optional chat if costs or abuse become excessive.
3. Give MongoDB a narrowly scoped credential, restricted network access, encrypted transport, backups and a documented access/retention policy.
4. Store provider and database credentials as Vercel encrypted environment secrets; use separate development and production credentials.
5. Ensure Vercel production deployment is controlled; do not connect a second Cloudflare Worker application to the same domain.
6. Review CSP and response headers in the **deployed site**; the source configuration alone does not establish what proxies actually return.

## Data handling

The contact endpoint saves name, email, service, message, optional phone and creation time. The repository does not implement a retention/deletion scheduler, a dashboard for enquiries, verified email delivery or automated consent management. These requirements need an owner-approved operational policy before relying on the form for regulated information.

The chat endpoint forwards submitted text to a model provider and does not save the transcript in this application. External providers may have their own retention and service terms. Do not paste secrets, regulated medical data, bank details or confidential customer content into the chat.

## Operational response

If abuse or a suspected leak is reported: restrict the affected public endpoint via Cloudflare, revoke/rotate impacted credentials, review Vercel logs and provider usage, review database access, and document the timeline before reopening. Do not print credentials or raw personal data into issues or logs.

For reporting a vulnerability, see [SECURITY.md](../SECURITY.md).
