import "../portfolio.css";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { studies } from "../studies";
export function generateStaticParams(){return studies.map(s=>({slug:s.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const p=studies.find(s=>s.slug===slug);
 return {title:p?`${p.title} | Selected work`:"Project",description:p?.summary};
}
export default async function CaseStudy({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const p=studies.find(s=>s.slug===slug);if(!p)notFound();
 return <article className="gvb-case"><div className="gvb-shell">
  <Link href="/portfolio" className="gvb-case-back"><ArrowLeft size={16}/> All projects</Link>
  <header className="gvb-case-head"><p className="gvb-label">{p.category.toUpperCase()} / PROJECT NOTE</p><h1>{p.title}</h1><p>{p.summary}</p><div><span>{p.status}</span><a href={p.repository} target="_blank" rel="noopener noreferrer"><Github size={17}/> View repository <ArrowUpRight size={16}/></a></div></header>
  <div className="gvb-case-grid"><aside><p>TECHNOLOGIES IN THE REPOSITORY</p><div>{p.stack.map(x=><span key={x}>{x}</span>)}</div><p className="gvb-case-aside-note">These are source-backed project notes. They are not independently measured performance or customer results.</p></aside>
   <div className="gvb-case-body"><section><span>01 / CONTEXT</span><h2>The problem behind the prototype</h2><p>{p.context}</p></section>
    <section><span>02 / APPROACH</span><h2>What the implementation explores</h2><ul>{p.approach.map(x=><li key={x}>{x}</li>)}</ul></section>
    <section><span>03 / EVIDENCE</span><h2>What is visible in the repository</h2><ul>{p.technicalWork.map(x=><li key={x}>{x}</li>)}</ul></section>
    <section><span>04 / LIMITATIONS</span><h2>What these notes do not claim</h2><ul>{p.constraints.map(x=><li key={x}>{x}</li>)}</ul></section>
   </div></div>
   <div className="gvb-case-next"><div><h2>Have a related engineering problem?</h2><p>Tell us about the process, constraints and outcome you need. We can discuss a sensible starting point.</p></div><Link href="/contact" className="gvb-btn gvb-btn-primary">Discuss a project <ArrowUpRight size={17}/></Link></div>
 </div></article>;
}
