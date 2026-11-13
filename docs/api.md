# Public API contract

All endpoints are under the Next.js App Router. The two POST routes return JSON and `Cache-Control: no-store`. The API is intended for the website; it is **not** a supported third-party integration contract.

## GET /api/health

Returns HTTP 200 with a minimal service marker and timestamp:

```json
{"status":"ok","service":"gvb-tech-web","timestamp":"2026-11-13T00:00:00.000Z"}
```

This is a **liveness** response, not a MongoDB, provider, end-to-end or readiness check. Do not use it alone to prove contact or AI features are functioning.

## POST /api/contact

Headers: `Content-Type: application/json`. Maximum request body: **12,000 bytes**. Fields are strictly validated; unknown fields are rejected.

| Field | Rule |
| --- | --- |
| `name` | Required; trimmed; 2–120 characters |
| `email` | Required, valid email; maximum 254 characters |
| `service` | Required; trimmed; 1–120 characters |
| `message` | Required; trimmed; 10–5,000 characters |
| `phone` | Optional; trimmed; up to 30 characters |
| `website` | Optional hidden spam trap; legitimate clients send an empty string or omit it |

```bash
curl -i http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  --data '{"name":"Test User","email":"test@example.com","service":"Automation","message":"This is an authorised test enquiry.","website":""}'
```

Successful legitimate requests insert a document with `createdAt` into MongoDB's `gvb-tech.enquiries` and return 200. A populated hidden field is acknowledged without storing it. If MongoDB is not configured or unavailable, the API returns 500, and the UI offers a **visitor-initiated** email/WhatsApp alternative. There is no automatic forwarding.

## POST /api/chat

```json
{
  "messages": [
    {"role": "user", "content": "What kind of automation do you build?"}
  ]
}
```

Accepts 1–12 messages; roles are `user` or `assistant`; each message is 1–2,000 trimmed characters. Last message must be `user`. The website submits **only the latest message** rather than the visible full transcript. The API does not store conversation history.

Successful response: `{"text":"..."}`. Missing provider configuration returns HTTP 503. Errors are logged by category, without logging the input content.

## Errors and safeguards

| Status | Meaning |
| --- | --- |
| 400 | Invalid JSON, request length or schema |
| 403 | Cross-origin browser request denied |
| 413 | Payload exceeds 12,000 bytes |
| 415 | Media type is not JSON |
| 500 | Unexpected server/database/provider failure |
| 503 | Assistant is not configured |

Browser requests with an `Origin` must match the endpoint origin. Requests without `Origin` are permitted for server-to-server testing; this is **not** proof the caller is trusted. Apply edge WAF/rate limiting and budget protection before making the APIs broadly available.

Do not send confidential business material, regulated data or sensitive personal information through the AI chat. It sends the latest submitted text to the configured provider. See [Security](security.md) for operational controls.
