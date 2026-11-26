import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Newspaper, Clock3, Archive } from "lucide-react";
import { getMarketArticles, formatMarketDate } from "./articles";
import { MarketArchive } from "./MarketArchive";
import "./markets.css";

export const metadata:Metadata={
  title:"GVB Markets — Indian Market News",
  description:"Daily sourced Indian equity market briefings, sector developments and a permanent historical news archive.",
  alternates:{canonical:"/markets"}
};
export default function MarketsPage(){
  const articles=getMarketArticles();
  const [lead,...others]=articles;
  return <div className="markets-page"><div className="gvb-shell markets-shell">
    <header className="markets-masthead">
      <p className="markets-kicker"><span/> GVB TECH / MARKET INTELLIGENCE</p>
      <h1>GVB <em>Markets.</em></h1>
      <p>Indian markets, in perspective. Sourced daily briefings on equities, sectors and the economy.</p>
      <div className="markets-meta"><span><Clock3 size={15}/> Updated on trading days</span><span><Newspaper size={15}/> Source-linked editorial coverage</span><a href="#market-archive"><Archive size={15}/> Browse archive</a></div>
    </header>
    {lead&&<section aria-labelledby="latest-heading" className="markets-latest">
      <div className="markets-section-title"><h2 id="latest-heading">Latest edition</h2><span>{formatMarketDate(lead.date)}</span></div>
      <Link href={"/markets/"+lead.slug} className="markets-feature"><div><p className="markets-kicker">{lead.category} • {formatMarketDate(lead.date)}</p><h3>{lead.title}</h3><p>{lead.summary}</p><strong>Read the full briefing <ArrowUpRight size={18}/></strong></div><div aria-hidden="true" className="markets-feature-art"><svg viewBox="0 0 240 150"><defs><linearGradient id="market-line" x1="0" x2="1"><stop stopColor="#7d9dca"/><stop offset="1" stopColor="#d5ac6a"/></linearGradient></defs>{[30,60,90,120].map(y=><path key={y} d={`M0 ${y}H240`} stroke="#33465b" strokeDasharray="4 4"/>)}<path d="M0 112L29 93L56 103L83 59L110 75L137 52L164 68L190 31L218 40L240 12" stroke="url(#market-line)" strokeWidth="3" fill="none"/><circle cx="240" cy="12" r="4" fill="#d5ac6a"/></svg><span>MARKET PERSPECTIVE / EDITORIAL</span></div></Link>
      {others.length>0&&<div className="markets-stories">{others.slice(0,3).map(a=><Link className="markets-story" key={a.slug} href={"/markets/"+a.slug}><p className="markets-kicker">{a.category} · {formatMarketDate(a.date)}</p><h3>{a.title}</h3><p>{a.summary}</p><strong>Read briefing <ArrowUpRight size={16}/></strong></Link>)}</div>}
    </section>}
    <MarketArchive articles={articles.map(({slug,date,category,title,summary})=>({slug,date,category,title,summary}))}/>
    <aside className="markets-disclaimer"><strong>Editorial note</strong><p>GVB Markets provides general financial news and educational context, not personalised investment advice or buy/sell recommendations. Reports are dated snapshots, not live quotations. Each edition links to its sources.</p></aside>
  </div></div>;
}
