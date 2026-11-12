import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ReadingProgress } from "@/components/content/ReadingProgress";
import { articles } from "../articles";

export function generateStaticParams(){return articles.map(article=>({slug:article.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const article=articles.find(entry=>entry.slug===slug);
  return {title:article?.title??"Article",description:article?.sections[0]?.[1]?.slice(0,157)??"GVB Tech insights"};
}

export default async function Article({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const article=articles.find(entry=>entry.slug===slug);
  if(!article)notFound();
  return <article className="gvb-longread">
    <ReadingProgress/>
    <div className="gvb-shell">
      <Link href="/blog" className="gvb-back-link"><ArrowLeft size={16}/> All articles</Link>
      <header className="gvb-longread-header"><p className="gvb-label">{article.category} / THE JOURNAL</p><h1>{article.title}</h1><p>Questions, trade-offs and a practical way to approach the work.</p></header>
      <div className="gvb-longread-layout"><nav aria-label="On this page" className="gvb-longread-toc"><span>IN THIS ARTICLE</span>{article.sections.map(([heading],i)=><a key={heading} href={"#section-"+(i+1)}>{String(i+1).padStart(2,"0")}. {heading}</a>)}</nav>
      <div className="gvb-longread-body">{article.sections.map(([heading,body],i)=><section id={"section-"+(i+1)} key={heading}><h2>{heading}</h2><p>{body}</p></section>)}</div></div>
      <div className="gvb-longread-end"><h2>Want to apply these ideas to your own process?</h2><p>Bring the problem and its constraints. We'll start by understanding the work.</p><Link className="gvb-btn gvb-btn-primary" href="/contact">Contact GVB Tech <ArrowUpRight size={17}/></Link></div>
    </div>
  </article>;
}
