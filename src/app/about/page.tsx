import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Mail, MapPin } from "lucide-react";
export const metadata: Metadata = { title: "About | GVB Tech Solutions", description: "How GVB Tech Solutions approaches software, automation, applied AI and analytics work, and what you can expect from a project." };
const process = [
 {n:"01",name:"Understand the problem",what:"Talk to the people doing the work. Map the tasks, the information they need and what currently goes wrong.",result:"An agreed problem statement and measures that matter."},
 {n:"02",name:"Decide what to build",what:"Compare workable options. Define the users, dependencies and the smallest useful scope before adding complexity.",result:"Priorities, trade-offs and a reviewable plan."},
 {n:"03",name:"Test with the people who use it",what:"Make a prototype or limited version where the main assumptions can be checked before wider rollout.",result:"Feedback, evidence and a clearer delivery decision."},
 {n:"04",name:"Make it dependable",what:"Consider performance, access controls, failure handling, documentation and the people responsible for support.",result:"A system that can be operated and improved after launch."}
];
export default function AboutPage() {
 return <div className="gvb-about-editorial">
  <div className="gvb-shell">
   <header className="gvb-about-hero">
    <p className="gvb-label">ABOUT GVB TECH SOLUTIONS</p>
    <h1>Good technology begins with <em>good judgement.</em></h1>
    <p>GVB Tech Solutions is a technology services firm based in Madanapalle, Andhra Pradesh. We work across software, automation, analytics and applied AI, with a simple starting principle: understand the work before proposing the system.</p>
    <div className="gvb-about-hero-links"><Link href="/services">Explore our services <ArrowUpRight size={17}/></Link><Link href="/portfolio">See projects and research <ArrowRight size={17}/></Link></div>
   </header>
   <section className="gvb-about-editorial-split"><div><p className="gvb-label">OUR POINT OF VIEW</p><h2>Build for the hand-off, the exception and the ordinary working day.</h2></div><div><p>Most operational problems do not arrive as neat product requirements. They appear as repeated data entry, reports that disagree, approvals that stall or workarounds everyone has accepted.</p><p>We look at those details first. The aim is not to add another layer of software, but to make a task clearer, faster to complete or easier to check.</p><p>Sometimes that means an application. Sometimes it is a better integration, a simpler process or a focused dashboard. Technology is the means, not the conclusion.</p></div></section>
   <section className="gvb-about-approach" aria-labelledby="about-process-title">
    <div className="gvb-about-section-heading"><p className="gvb-label">HOW WE APPROACH AN ENGAGEMENT</p><h2 id="about-process-title">A process clients can follow.</h2><p>These are the decisions worth making together. Actual stages and deliverables depend on the scope of work.</p></div>
    <div className="gvb-about-process">{process.map(item=><article key={item.n}><span>{item.n}</span><h3>{item.name}</h3><p>{item.what}</p><div><strong>What this establishes</strong><p>{item.result}</p></div></article>)}</div>
   </section>
   <section className="gvb-about-standards" aria-labelledby="about-standards-title">
    <div><p className="gvb-label">OUR WORKING PRINCIPLES</p><h2 id="about-standards-title">The details that decide whether a system lasts.</h2></div>
    <div className="gvb-about-principles">
     <article><h3>Explain the trade-offs</h3><p>A choice of tools or architecture should come with a reason, a limitation and an understanding of its running cost.</p></article>
     <article><h3>Keep ownership clear</h3><p>Someone must know who approves changes, who can access data and what happens when a process fails.</p></article>
     <article><h3>Measure against the actual task</h3><p>Time saved, fewer corrections and more reliable decisions matter more than an impressive demonstration.</p></article>
    </div>
   </section>
   <section className="gvb-about-disclosure"><div><p className="gvb-label">WORK AND RESEARCH</p><h2>Evidence matters. So do its limits.</h2><p>Our portfolio includes prototypes, demonstrations and research work. We distinguish these from commissioned client engagements rather than treating every experiment as a customer result.</p><Link href="/portfolio">Explore selected work <ArrowUpRight size={16}/></Link></div><div className="gvb-about-location"><MapPin size={22}/><span>OPERATING FROM</span><strong>Madanapalle, Andhra Pradesh, India</strong><span>CONTACT</span><a href="mailto:info@gvbtech.in">info@gvbtech.in</a></div></section>
   <section className="gvb-about-cta"><div><h2>Have a process that needs a better way of working?</h2><p>Share what is happening today and what a useful change would look like. We can start from there.</p></div><Link href="/contact" className="gvb-btn gvb-btn-primary"><Mail size={17}/> Start a conversation</Link></section>
  </div>
 </div>;
}
