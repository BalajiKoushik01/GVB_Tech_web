"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X, Clock3 } from "lucide-react";
import { articles } from "@/app/blog/articles";

type Category = "All" | "Automation" | "Applied AI" | "Analytics" | "Engineering";
const categories: Category[] = ["All", "Automation", "Applied AI", "Analytics", "Engineering"];

export function InsightsExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const deferredQuery = useDeferredValue(query);
  const filtered = useMemo(() => {
    const phrase = deferredQuery.trim().toLowerCase();
    return articles.filter(article => {
      if (category !== "All" && article.category !== category) return false;
      if (!phrase) return true;
      const text = [article.title, article.category, ...article.sections.flat()].join(" ").toLowerCase();
      return text.includes(phrase);
    });
  }, [category, deferredQuery]);

  return <div>
    <div className="gvb-insights-controls">
      <label className="gvb-insights-search">
        <Search size={18} aria-hidden="true" />
        <span className="sr-only">Search articles</span>
        <input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search by question or topic" />
      </label>
      <div className="gvb-insights-filters" role="group" aria-label="Filter articles by topic">
        {categories.map(item=><button key={item} className={item===category?"is-active":""} type="button" aria-pressed={item===category} onClick={()=>setCategory(item)}>{item}</button>)}
      </div>
    </div>
    <p className="gvb-insights-count" role="status">{filtered.length} {filtered.length===1?"article":"articles"} {query.trim()||category!=="All"?"matching your selection":"in the journal"}</p>
    {filtered.length>0 ? <div className="gvb-insights-grid">{filtered.map((article,index)=>{
      const excerpt=article.sections[0][1];
      const words=article.sections.map(section=>section.join(" ").split(/\s+/).length).reduce((a,b)=>a+b,0);
      const minutes=Math.max(3,Math.ceil(words/210));
      return <Link href={`/blog/${article.slug}`} key={article.slug} className="gvb-insights-article">
        <div className="gvb-insights-article-meta"><span>{article.category}</span><span><Clock3 size={13}/> {minutes} min read</span></div>
        <h2>{article.title}</h2><p>{excerpt}</p><span className="gvb-insights-read">Read article <ArrowUpRight size={16}/></span>
        <span className="gvb-insights-serial" aria-hidden="true">{String(index+1).padStart(2,"0")}</span>
      </Link>;
    })}</div> : <div className="gvb-insights-empty"><p>No articles match that search. Try another term or show the full journal.</p><button type="button" onClick={()=>{setCategory("All");setQuery("");}}><X size={16}/> Clear filters</button></div>}
  </div>;
}
