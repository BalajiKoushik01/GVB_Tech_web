import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getMarketArticles,formatMarketDate } from "../articles";
import "../markets.css";
type Props={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return getMarketArticles().map(a=>({slug:a.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params;const a=getMarketArticles().find(a=>a.slug===slug);
 return a?{title:a.title,description:a.summary,alternates:{canonical:"/markets/"+a.slug},openGraph:{type:"article",publishedTime:a.publishedAt,title:a.title,description:a.summary}}:{title:"Edition not found"};
}
export default async function ArticlePage({params}:Props){
 const {slug}=await params;const a=getMarketArticles().find(a=>a.slug===slug);if(!a)notFound();
 return <div className="markets-page"><article className="gvb-shell markets-article">
 <Link className="markets-back" href="/markets"><ArrowLeft size={17}/> GVB Markets</Link>
 <p className="markets-kicker">{a.category} · <time dateTime={a.date}>{formatMarketDate(a.date)}</time></p><h1>{a.title}</h1><p className="markets-deck">{a.summary}</p>
 <p className="markets-byline">GVB Markets editorial desk · Published {formatMarketDate(a.publishedAt)}</p>
 {a.sections.map((s,i)=><section key={i}><h2>{s.heading}</h2><p>{s.body}</p></section>)}
 <section className="markets-sources"><h2>Sources & further reading</h2><ul>{a.sources.map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.name} <ArrowUpRight size={15}/></a></li>)}</ul></section>
 <aside className="markets-disclaimer">General market information only. Not investment advice or a live quote.</aside>
 <Link className="markets-back" href="/markets#market-archive"><ArrowLeft size={17}/> Browse all historical editions</Link></article></div>;
}
