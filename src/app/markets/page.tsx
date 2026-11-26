import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Newspaper, Clock3, Archive } from "lucide-react";
import { getMarketArticles, formatMarketDate } from "./articles";
import { MarketArchive } from "./MarketArchive";
import "./markets.css";

export const metadata:Metadata={
  title:"GVB Markets — Indian Market News",
  description:"Daily news from India’s stock markets, including market moves, company news and past editions.",
  alternates:{canonical:"/markets"}
};
export default function MarketsPage(){
  const articles=getMarketArticles();
  const [lead,...others]=articles;
  return <div className="markets-page"><div className="gvb-shell markets-shell">
    <header className="markets-masthead">
      <p className="markets-kicker"><span/> GVB TECH / BUSINESS & MARKETS</p>
      <h1>GVB <em>Markets.</em></h1>
      <p>What moved the Indian stock market, which companies made news, and why it matters.</p>
      <div className="markets-meta"><span><Clock3 size={15}/> Updated on trading days</span><span><Newspaper size={15}/> Sources included</span><a href="#market-archive"><Archive size={15}/> Browse archive</a></div>
    </header>
    {lead&&<section aria-labelledby="latest-heading" className="markets-latest">
      <div className="markets-section-title"><h2 id="latest-heading">Latest news</h2><span>{formatMarketDate(lead.date)}</span></div>
      <Link href={"/markets/"+lead.slug} className="markets-feature"><div><p className="markets-kicker">{lead.category} • {formatMarketDate(lead.date)}</p><h3>{lead.title}</h3><p>{lead.summary}</p><strong>Read the story <ArrowUpRight size={18}/></strong></div><div aria-hidden="true" className="markets-feature-art"><svg viewBox="0 0 240 150"><defs><linearGradient id="market-line" x1="0" x2="1"><stop stopColor="#7d9dca"/><stop offset="1" stopColor="#d5ac6a"/></linearGradient></defs>{[30,60,90,120].map(y=><path key={y} d={`M0 ${y}H240`} stroke="#33465b" strokeDasharray="4 4"/>)}<path d="M0 112L29 93L56 103L83 59L110 75L137 52L164 68L190 31L218 40L240 12" stroke="url(#market-line)" strokeWidth="3" fill="none"/><circle cx="240" cy="12" r="4" fill="#d5ac6a"/></svg><span>ILLUSTRATION · NOT MARKET DATA</span></div></Link>
      {others.length>0&&<div className="markets-stories">{others.slice(0,3).map(a=><Link className="markets-story" key={a.slug} href={"/markets/"+a.slug}><p className="markets-kicker">{a.category} · {formatMarketDate(a.date)}</p><h3>{a.title}</h3><p>{a.summary}</p><strong>Read more <ArrowUpRight size={16}/></strong></Link>)}</div>}
    </section>}
    <MarketArchive articles={articles.map(({slug,date,category,title,summary})=>({slug,date,category,title,summary}))}/>
    <aside className="markets-disclaimer"><strong>Editorial note</strong><p>Our coverage is for information only, not investment advice. Prices and market moves refer to the time stated in each article and are not live quotes. You’ll find the original sources at the end of each story.</p></aside>
  </div></div>;
}
