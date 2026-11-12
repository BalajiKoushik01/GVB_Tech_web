import Link from "next/link";
import { AdaptiveGlobe } from "@/components/experience/AdaptiveGlobe";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Download, Layers3, Workflow, BrainCircuit, ChartNoAxesCombined, MonitorSmartphone, Compass, Check, FileText, BookOpen, PanelsTopLeft } from "lucide-react";
const capabilities = [
  {href:"/services#software",number:"01",title:"Custom software",icon:Layers3,description:"Purpose-built applications, internal platforms and business tools designed around the way your teams work."},
  {href:"/services#applied-ai",number:"02",title:"Applied AI",icon:BrainCircuit,description:"Practical AI-assisted experiences and intelligent systems grounded in real business needs."},
  {href:"/services#automation",number:"03",title:"Workflow automation",icon:Workflow,description:"Streamline repetitive processes, connect tools and create more reliable operational workflows."},
  {href:"/services#analytics",number:"04",title:"Data & analytics",icon:ChartNoAxesCombined,description:"Accessible reporting and decision-support dashboards that bring clarity to complex information."},
  {href:"/services#web-products",number:"05",title:"Web & digital products",icon:MonitorSmartphone,description:"Responsive web experiences and modern applications with usability and performance built in."},
  {href:"/services#advisory",number:"06",title:"Technology consulting",icon:Compass,description:"Product discovery, architecture planning, feasibility studies and hands-on technical guidance."}
];
const process = [
  {n:"01",t:"Discover",d:"We learn the context, stakeholders and operational challenge."},
  {n:"02",t:"Define",d:"Together we map priorities, scope and a practical technical direction."},
  {n:"03",t:"Develop",d:"We build iteratively, review regularly and test what matters."},
  {n:"04",t:"Improve",d:"We refine the experience around feedback and adoption."}
];
export default function Home() {
 return <div className="gvb-premium">
   <section className="gvb-hero">
     <div className="gvb-shell gvb-hero-grid">
       <div className="gvb-hero-copy">
         <p className="gvb-eyebrow"><span className="gvb-dot"/>Technology & consulting · India</p>
         <h1>Software that fits<br/><span>the work.</span><br/>Not the other way round.</h1>
         <p className="gvb-lede">We design software, data systems and automation around the way your organisation actually operates. Clear requirements, careful engineering and useful results come before grand claims.</p>
         <div className="gvb-actions">
           <Link href="/contact" className="gvb-btn gvb-btn-primary">Start a conversation <ArrowUpRight size={18}/></Link>
           <Link href="/brochure" className="gvb-btn gvb-btn-quiet">View company profile <ArrowRight size={18}/></Link>
         </div>
         <div className="gvb-hero-note"><span className="gvb-note-line"/>Not sure where to start? Use the project guide to put your challenge into words.</div>
       </div>
       <div className="gvb-hero-visual" id="project-guide"><AdaptiveGlobe/>
       </div>
     </div>
     <div className="gvb-shell gvb-hero-bottom"><span>Custom software</span><span>Workflow automation</span><span>Applied AI</span><span>Data & analytics</span></div>
   </section>
   <section className="gvb-section gvb-intro" id="approach">
     <div className="gvb-shell gvb-split">
       <div><p className="gvb-label">OUR POINT OF VIEW</p><h2>Technology should remove friction, <em>not create more of it.</em></h2></div>
       <div className="gvb-intro-right"><p>A software project begins with an operational problem: time lost to manual work, inconsistent information, or tools that make straightforward tasks difficult. We start there, not with a list of technologies.</p><p>Then we work through the detail: who uses the system, what a reliable outcome looks like, which information is needed and how the product will be supported after launch.</p><Link href="/about" className="gvb-text-link">Meet GVB Tech <ArrowUpRight size={17}/></Link></div>
     </div>
   </section>
   <section className="gvb-section gvb-capabilities" id="capabilities">
    <div className="gvb-shell">
      <div className="gvb-section-heading"><div><p className="gvb-label">WHAT WE DO</p><h2>From recurring problems<br/>to useful systems.</h2></div><p>Each capability addresses a different kind of problem. Explore what fits, the trade-offs involved and the first deliverables worth defining.</p></div>
      <div className="gvb-service-grid">{capabilities.map(item=><Link href={item.href} key={item.number} className="gvb-service-card"><div className="gvb-service-top"><span>{item.number} / 06</span><item.icon size={24} strokeWidth={1.6}/></div><h3>{item.title}</h3><p>{item.description}</p><span className="gvb-service-arrow"><ArrowUpRight size={20}/></span></Link>)}</div>
    </div>
   </section>
   <section className="gvb-resources" aria-labelledby="gvb-resources-title"><div className="gvb-shell"><div className="gvb-resources-header"><div><p className="gvb-label">WORK & WRITING</p><h2 id="gvb-resources-title">Explore the thinking behind the work.</h2></div><p>Look at practical ideas, explore what we are building and decide whether our approach fits your challenge.</p></div><div className="gvb-resource-grid"><Link href="/portfolio" className="gvb-resource-link"><PanelsTopLeft size={23} strokeWidth={1.5}/><span>SELECTED WORK</span><h3>Explore projects and prototypes</h3><p>See the kinds of technical problems our team works on, from applications to data systems.</p><strong>See our work <ArrowUpRight size={17}/></strong></Link><Link href="/blog" className="gvb-resource-link"><BookOpen size={23} strokeWidth={1.5}/><span>INSIGHTS</span><h3>Read useful engineering notes</h3><p>Practical writing on automation, AI evaluation, dashboards and reliable software.</p><strong>Read the journal <ArrowUpRight size={17}/></strong></Link></div></div></section>
   <section className="gvb-section gvb-method">
    <div className="gvb-shell">
     <div className="gvb-section-heading"><div><p className="gvb-label">HOW WE WORK</p><h2>Clear decisions at every stage.</h2></div><p>A useful project should have an understandable scope, a testable first version and a plan for keeping it reliable once people depend on it.</p></div>
     <div className="gvb-steps">{process.map(x=><div key={x.n} className="gvb-step"><span>{x.n}</span><h3>{x.t}</h3><p>{x.d}</p></div>)}</div>
    </div>
   </section>
   <section className="gvb-first-conversation" aria-labelledby="gvb-first-conversation-title"><div className="gvb-shell gvb-first-conversation-grid"><div><p className="gvb-label">BEFORE OUR FIRST CALL</p><h2 id="gvb-first-conversation-title">Three useful things to bring to the table.</h2><p>You do not need a formal requirements document. The most productive starting point is an accurate description of the work as it happens today.</p><a href="/#project-guide">Use the project guide <ArrowUpRight size={17}/></a></div><ol><li><span>01</span><div><h3>Where does the work slow down?</h3><p>Describe the task, how frequently it happens and where people repeat, wait or correct information.</p></div></li><li><span>02</span><div><h3>Who needs the result?</h3><p>Identify the people doing the work, the systems they use and who should review important decisions.</p></div></li><li><span>03</span><div><h3>What would improvement look like?</h3><p>Faster turnaround, fewer corrections or clearer visibility are better measures than a list of new features.</p></div></li></ol></div></section>
   <section className="gvb-section gvb-brochure-highlight" id="company-profile">
    <div className="gvb-shell gvb-profile-layout">
     <div className="gvb-profile-cover"><div className="gvb-profile-cover-inner"><Image src="/logo_icon.png" width={65} height={65} alt="GVB Tech Solutions mark"/><span>GVB TECH SOLUTIONS</span><div className="gvb-cover-heading">Technology,<br/>built around<br/>your business.</div><small>COMPANY PROFILE / 2026</small></div></div>
     <div className="gvb-profile-info"><p className="gvb-label">THE COMPANY PROFILE</p><h2>A closer look at what we can build together.</h2><p>Explore our capabilities, approach and business applications in our eight-page corporate profile.</p><div className="gvb-profile-facts"><span><Check size={18}/> Eight-page A4 profile</span><span><Check size={18}/> Services & methodology</span><span><Check size={18}/> Company information</span></div><div className="gvb-actions"><Link href="/brochure" className="gvb-btn gvb-btn-primary"><FileText size={18}/> View brochure</Link><a className="gvb-btn gvb-btn-quiet" href="https://drive.google.com/uc?export=download&id=139HAqHJck3BBY9ShZZQOoPLYjjSOi8LH" target="_blank" rel="noopener noreferrer"><Download size={18}/> Download PDF</a></div></div>
    </div>
   </section>
   <section className="gvb-section gvb-final">
    <div className="gvb-shell gvb-final-inner"><p className="gvb-label">THE NEXT STEP</p><h2>Have something in mind?<br/><span>Let’s make it work.</span></h2><p>Whether it starts with an idea or an operational challenge, we’d love to hear what you are building.</p><Link href="/contact" className="gvb-btn gvb-btn-primary">Talk to us <ArrowUpRight size={18}/></Link><div className="gvb-final-email">Or email <a href="mailto:info@gvbtech.in">info@gvbtech.in</a></div></div>
   </section>
 </div>;
}