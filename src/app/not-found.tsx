import Link from "next/link";
export default function NotFound(){return <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
<p className="mb-4 text-sm font-semibold uppercase tracking-[.25em] text-sky-300">404 / Page not found</p>
<h1 className="mb-6 text-5xl font-bold text-white md:text-7xl">This page moved beyond the map.</h1>
<p className="mb-9 max-w-lg text-lg leading-8 text-slate-300">The link may be outdated, or the page may have moved. Explore our services or return to the homepage.</p>
<div className="flex flex-wrap justify-center gap-4"><Link href="/" className="rounded-full bg-sky-400 px-6 py-3 font-semibold text-slate-950">Back to home</Link><Link href="/services" className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white">Explore services</Link></div>
</div>}
