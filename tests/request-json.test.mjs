import test from "node:test";
import assert from "node:assert/strict";
import { readJsonRequest } from "../src/lib/request-json.ts";

const endpoint = "https://gvbtech.in/api/contact";
function request(body, headers = {}, url = endpoint) {
  return new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body,
  });
}

test("accepts a same-origin JSON request with charset", async () => {
  const result = await readJsonRequest(request('{"message":"ok"}', {
    origin: "https://gvbtech.in",
    "content-type": "application/json; charset=utf-8",
  }));
  assert.deepEqual(result, { ok: true, value: { message: "ok" } });
});

test("denies a cross-origin request", async () => {
  const result = await readJsonRequest(request("{}", { origin: "https://untrusted.example" }));
  assert.equal(result.ok, false);
  assert.equal(result.status, 403);
});

test("denies an invalid Origin header", async () => {
  const result = await readJsonRequest(request("{}", { origin: "null" }));
  assert.equal(result.ok, false);
  assert.equal(result.status, 403);
});

test("requires JSON media type", async () => {
  const result = await readJsonRequest(request("{}", { "content-type": "text/plain" }));
  assert.equal(result.ok, false);
  assert.equal(result.status, 415);
});

test("rejects malformed JSON", async () => {
  const result = await readJsonRequest(request("{malformed"));
  assert.equal(result.ok, false);
  assert.equal(result.status, 400);
});

test("rejects oversized Content-Length before reading", async () => {
  const result = await readJsonRequest(request("{}", { "content-length": "50000" }));
  assert.equal(result.ok, false);
  assert.equal(result.status, 413);
});

test("enforces byte limits even without Content-Length", async () => {
  const result = await readJsonRequest(request(JSON.stringify({ text: "🔒".repeat(3500) })));
  assert.equal(result.ok, false);
  assert.equal(result.status, 413);
});

test("accepts 12 KB maximum only when valid JSON", async () => {
  const payload = JSON.stringify({ text: "a".repeat(11_980) });
  const result = await readJsonRequest(request(payload));
  assert.equal(result.ok, true);
});

test("treats invalid UTF-8 as malformed JSON", async () => {
  const input = new Uint8Array([0xff, 0xfe, 0xfd]);
  const result = await readJsonRequest(new Request(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: input,
  }));
  assert.equal(result.ok, false);
  assert.equal(result.status, 400);
});
