/**
 * Shared guard for the two public JSON endpoints.
 *
 * Limits the bytes read from the request stream rather than trusting Content-Length.
 * These checks are not rate limiting; enforce abuse controls at the edge as well.
 */
export type JsonReadResult =
  | { ok: true; value: unknown }
  | { ok: false; status: number; error: string };

export async function readJsonRequest(request: Request, maxBytes = 12_000): Promise<JsonReadResult> {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) {
        return { ok: false, status: 403, error: "Cross-origin request denied" };
      }
    } catch {
      return { ok: false, status: 403, error: "Invalid request origin" };
    }
  }

  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    return { ok: false, status: 415, error: "Content-Type must be application/json" };
  }

  const declaredLength = request.headers.get("content-length");
  if (declaredLength !== null) {
    const length = Number(declaredLength);
    if (!Number.isSafeInteger(length) || length < 0) {
      return { ok: false, status: 400, error: "Invalid Content-Length" };
    }
    if (length > maxBytes) {
      return { ok: false, status: 413, error: "Request too large" };
    }
  }

  if (!request.body) {
    return { ok: false, status: 400, error: "Empty request body" };
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel();
        return { ok: false, status: 413, error: "Request too large" };
      }
      chunks.push(value);
    }

    const buffer = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      buffer.set(chunk, offset);
      offset += chunk.byteLength;
    }

    try {
      return {
        ok: true,
        value: JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(buffer)),
      };
    } catch {
      return { ok: false, status: 400, error: "Invalid JSON" };
    }
  } finally {
    reader.releaseLock();
  }
}
