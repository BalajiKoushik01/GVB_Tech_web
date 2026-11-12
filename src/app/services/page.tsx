import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, ArrowRight, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Services | Software, Automation and Analytics",
  description: "Understand what GVB Tech Solutions builds, how an engagement starts and the decisions we resolve before development."
};

const services = [
  {
    id: "software", name: "Custom software", index: "01",
    lead: "Your process is distinctive. The software should accommodate it without becoming difficult to maintain.",
    fit: "Internal applications, customer or partner portals, workflow management and tools that replace fragile spreadsheets.",
    work: "We map the tasks, permissions, exceptions and hand-offs before choosing the interface and architecture.",
    outputs: ["Requirements and priority map", "Prototype of key user journeys", "Build plan with acceptance criteria"]
  },
  {
    id: "automation", name: "Workflow automation", index: "02",
    lead: "Reduce repeat entry and follow-up work without losing control of the exceptions.",
    fit: "Reconciliations, notifications, approvals, data transfers and repetitive processes across existing tools.",
    work: "We identify reliable triggers, document failure paths and decide where a person should remain in the loop.",
    outputs: ["Current-process and exception map", "Integration and ownership plan", "Small, measurable pilot"]
  },
  {
    id: "analytics", name: "Data and dashboards", index: "03",
    lead: "Put consistent numbers in front of the people who can act on them.",
    fit: "Operational reporting, KPI definitions, monitoring views, data consolidation and exception alerts.",
    work: "We start with decisions and data definitions, not chart types. Source quality and refresh needs shape the design.",
    outputs: ["Metric dictionary and source review", "Decision-focused dashboard prototype", "Data quality and refresh plan"]
  },
  {
    id: "applied-ai", name: "Applied AI", index: "04",
    lead: "Use AI where it demonstrably helps; keep the decision and its risks understandable.",
    fit: "Document extraction, structured assistance, classification, computer vision and bounded decision-support tasks.",
    work: "We check whether a simpler rule or search system would be enough, then evaluate model quality and oversight needs.",
    outputs: ["Feasibility and risk review", "Baseline and evaluation criteria", "Human-reviewed proof of concept"]
  },
  {
    id: "web-products", name: "Web and digital products", index: "05",
    lead: "Give customers and teams a fast, accessible interface that makes the next action obvious.",
    fit: "Business websites, product interfaces, interactive tools and connected web applications.",
    work: "We work through content structure, tasks, responsiveness, performance, security and maintainability together.",
    outputs: ["Information architecture and content plan", "Responsive interaction prototype", "Delivery and maintenance checklist"]
  },
  {
    id: "advisory", name: "Technology advisory", index: "06",
    lead: "Find out what is worth building before making a large commitment.",
    fit: "Technical discovery, product feasibility, architecture review and decisions between platforms or vendors.",
    work: "We weigh constraints, operating cost, expected benefits and delivery risks. The recommendation may be to simplify.",
    outputs: ["Problem and constraints brief", "Options and trade-offs", "Prioritised next-step roadmap"]
  }
] as const;

const questions = [
  { q: "Do we need a complete specification before contacting you?", a: "No. A description of the current process, what is going wrong and who is affected is enough to begin a useful conversation. Discovery is where we work out the missing detail." },
  { q: "Can you work with systems we already use?", a: "Often, yes. The first step is to review the existing software, available integrations and permission constraints. We will identify where a connection is practical and where it creates unnecessary risk." },
  { q: "Does every project need AI?", a: "No. A clear workflow, a database query or a well-designed dashboard may be a better answer. We compare the simplest workable options before recommending a model." },
  { q: "How are scope, cost and delivery dates decided?", a: "They depend on the requirements, integrations, constraints and level of support involved. We discuss those factors before offering a project-specific estimate; there is no honest universal price or timeline." },
  { q: "What happens after the first conversation?", a: "We clarify the problem and decide whether there is a sensible next step, such as a short discovery exercise, a prototype or a technical review. Any proposed scope and deliverables should be agreed before work starts." }
];

export default function ServicesPage() {
 return <main className="gvb-practice">
  <div className="gvb-shell">
   <header className="gvb-practice-hero">
    <p className="gvb-label">SERVICES / WHAT WE CAN HELP WITH</p>
    <h1>Start with the work.<br/><span>Choose the right technology.</span></h1>
    <p>Software is useful when it improves a real task. Here are the areas we work in, when they make sense, and the first things worth getting clear before development.</p>
    <div className="gvb-practice-actions"><Link href="/#project-guide" className="gvb-btn gvb-btn-primary">Find your starting point <ArrowUpRight size={17}/></Link><Link href="/contact" className="gvb-btn gvb-btn-quiet">Discuss a project <ArrowRight size={17}/></Link></div>
   </header>
   <nav className="gvb-practice-nav" aria-label="Jump to a service">
    {services.map(s=><a key={s.id} href={"#"+s.id}><span>{s.index}</span>{s.name}</a>)}
   </nav>
   <div className="gvb-practice-list">
    {services.map(s=><section className="gvb-practice-entry" id={s.id} key={s.id} aria-labelledby={"title-"+s.id}>
      <div className="gvb-practice-side"><span>{s.index} / 06</span><p>{s.name}</p></div>
      <div className="gvb-practice-body">
       <h2 id={"title-"+s.id}>{s.lead}</h2>
       <div className="gvb-practice-cols"><div><h3>Where it fits</h3><p>{s.fit}</p><h3>How we approach it</h3><p>{s.work}</p></div>
        <div className="gvb-practice-outputs"><h3>Useful early outputs</h3><ul>{s.outputs.map(output=><li key={output}><Check size={16}/>{output}</li>)}</ul><p>The precise scope depends on discovery; this is not a fixed package.</p></div>
       </div>
       <Link className="gvb-practice-inline" href="/contact">Ask about {s.name.toLowerCase()} <ArrowUpRight size={16}/></Link>
      </div>
    </section>)}
   </div>
   <section className="gvb-practice-questions" aria-labelledby="practice-questions"><div><p className="gvb-label">BEFORE YOU BEGIN</p><h2 id="practice-questions">Questions worth asking early.</h2><p>Clear expectations are part of good engineering. These are the questions we would want answered before anyone commits to a build.</p></div>
    <div className="gvb-practice-faq">{questions.map((item,i)=><details key={item.q}><summary><span>{String(i+1).padStart(2,"0")}</span>{item.q}<span className="gvb-faq-mark" aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div>
   </section>
   <section className="gvb-practice-end"><div><p className="gvb-label">THE NEXT STEP</p><h2>Tell us what is getting in the way.</h2><p>Describe the work as it happens today, where the friction is and what you would like to change. We'll begin with the problem, not a sales pitch.</p></div><a href="mailto:info@gvbtech.in?subject=Project%20discussion%20with%20GVB%20Tech" className="gvb-btn gvb-btn-primary"><Mail size={17}/> Write to us</a></section>
  </div>
 </main>;
}
