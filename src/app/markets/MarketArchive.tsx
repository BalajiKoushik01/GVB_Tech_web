"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import type { MarketArticle } from "./articles";
type Item=Pick<MarketArticle,"slug"|"date"|"category"|"title"|"summary">;
export function MarketArchive({articles}:{articles:Item[]}){
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("");
  const [month,setMonth]=useState("");
  const [limit,setLimit]=useState(12);
  const filtered=articles.filter(a=>(!category||a.category===category)&&(!month||a.date.startsWith(month))&&[a.title,a.summary,a.category,a.date].join(" ").toLowerCase().includes(query.trim().toLowerCase()));
  return <section id="market-archive" className="markets-archive" aria-labelledby="archive-heading">
    <div className="markets-section-title"><div><p className="markets-kicker">THE RECORD</p><h2 id="archive-heading">Historical archive</h2></div><span>{articles.length} editions</span></div>
    <p>Every published briefing stays here. Search by topic or browse by month.</p>
    <div className="markets-filters">
      <label><span>Search editions</span><div className="markets-search"><Search size={17}/><input type="search" value={query} placeholder="Company, sector or topic" onChange={e=>{setQuery(e.target.value);setLimit(12)}}/></div></label>
      <label><span>Category</span><select value={category} onChange={e=>{setCategory(e.target.value);setLimit(12)}}><option value="">All categories</option>{[...new Set(articles.map(a=>a.category))].sort().map(c=><option key={c}>{c}</option>)}</select></label>
      <label><span>Month</span><select value={month} onChange={e=>{setMonth(e.target.value);setLimit(12)}}><option value="">All months</option>{[...new Set(articles.map(a=>a.date.slice(0,7)))].sort().reverse().map(m=><option key={m}>{m}</option>)}</select></label>
    </div>
    <p className="markets-count" role="status">{filtered.length} matching editions</p>
    <div className="markets-archive-list">{filtered.slice(0,limit).map(a=><Link href={"/markets/"+a.slug} key={a.slug} className="markets-archive-row"><div><time dateTime={a.date}>{new Date(a.date+"T12:00:00+05:30").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Kolkata"})}</time><span>{a.category}</span></div><div><h3>{a.title}</h3><p>{a.summary}</p></div><ArrowUpRight size={18}/></Link>)}</div>
    {!filtered.length&&<p>No matching editions. Try another search or category.</p>}
    {filtered.length>limit&&<button className="markets-more" type="button" onClick={()=>setLimit(n=>n+12)}>Show more editions</button>}
  </section>;
}
