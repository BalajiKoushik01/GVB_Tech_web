"use client";
import "./portfolio.css";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Github } from "lucide-react";
import { studies,categories } from "./studies";
export default function PortfolioPage(){
 const [category,setCategory]=useState<(typeof categories)[number]>("All");
 const selected=category==="All"?studies:studies.filter(s=>s.category===category);
 return <div className="gvb-work">
  <header className="gvb-shell gvb-work-head">
    <p className="gvb-label">SELECTED TECHNICAL WORK</p><h1>Show the work.<br/><em>Explain the decisions.</em></h1>
    <p>This collection covers prototypes, research and engineering experiments. It is not a list of commissioned client engagements. Each entry links to the available source and identifies limitations that matter.</p>
  </header>
  <section className="gvb-shell gvb-work-section" aria-label="Project collection">
   <div className="gvb-work-filters" role="group" aria-label="Filter projects">
    {categories.map(item=><button type="button" aria-pressed={category===item} className={category===item?"is-active":""} onClick={()=>setCategory(item)} key={item}>{item}</button>)}
   </div>
   <p className="gvb-work-count" role="status">{selected.length} {selected.length===1?"project":"projects"} shown</p>
   <div className="gvb-work-grid">{selected.map((project,index)=><Link href={`/portfolio/${project.slug}`} key={project.slug} className="gvb-work-card">
    <div className="gvb-work-card-top"><span>{project.category}</span><span>{project.status}</span></div>
    <div className="gvb-work-number">{String(index+1).padStart(2,"0")}</div>
    <h2>{project.title}</h2><p>{project.summary}</p>
    <div className="gvb-work-stack">{project.stack.slice(0,4).map(t=><span key={t}>{t}</span>)}</div>
    <div className="gvb-work-open">Read project notes <ArrowUpRight size={18}/></div>
   </Link>)}</div>
  </section>
  <section className="gvb-shell gvb-work-footer"><div><p className="gvb-label">WHY THESE EXAMPLES?</p><h2>Technical detail is more useful than a claim without context.</h2><p>These notes explain what the code explores, where the important decisions sit and which assumptions remain untested. Where we cannot verify a result, we do not present one.</p></div><a href="https://github.com/BalajiKoushik01" target="_blank" rel="noopener noreferrer">Explore GitHub repositories <Github size={18}/><ArrowRight size={16}/></a></section>
 </div>;
}
