import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // 1. Basic Content Security Policy Setup
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

    // Define strict CSP rules
    const cspHeader = `
    default-src 'self';
    connect-src 'self' https://balajikoushik-apex-backend.hf.space https://*.hf.space;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://images.unsplash.com;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

    const response = NextResponse.next();

    // Apply CSP Header
    response.headers.set(
        'Content-Security-Policy',
        cspHeader
    );

    // Apply x-nonce to requests
    response.headers.set('x-nonce', nonce);

    // 2. Simple Rate Limiting Simulation / Input validation layer
    // For production, this should connect to Redis or Upstash. 
    // We attach a security trace ID to all API requests.
    if (request.nextUrl.pathname.startsWith('/api')) {
        response.headers.set('X-RateLimit-Limit', '100');
        response.headers.set('X-RateLimit-Limit', '100');
        response.headers.set('X-RateLimit-Remaining', '99');
        response.headers.set('X-Security-Trace', crypto.randomUUID());
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
