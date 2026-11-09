import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
export function middleware(_request:NextRequest){
 const response=NextResponse.next();
 const policy=["default-src 'self'","script-src 'self' 'unsafe-inline'","style-src 'self' 'unsafe-inline'","img-src 'self' data: blob: https:","font-src 'self' data:","connect-src 'self' https://vitals.vercel-insights.com https://*.vercel-insights.com","frame-src https://drive.google.com","object-src 'none'","base-uri 'self'","form-action 'self'","frame-ancestors 'none'","upgrade-insecure-requests"].join("; ");
 response.headers.set("Content-Security-Policy",policy);
 response.headers.set("X-Content-Type-Options","nosniff");
 response.headers.set("Referrer-Policy","strict-origin-when-cross-origin");
 response.headers.set("Permissions-Policy","camera=(), microphone=(), geolocation=()");
 response.headers.set("X-Frame-Options","DENY");
 return response;
}
export const config={matcher:["/((?!_next/static|_next/image|favicon.ico).*)"]};
