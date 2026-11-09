import Link from "next/link";
import { AdaptiveGlobe } from "@/components/experience/AdaptiveGlobe";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Download, Layers3, Workflow, BrainCircuit, ChartNoAxesCombined, MonitorSmartphone, Compass, Check, FileText } from "lucide-react";
const capabilities = [
  {number:"01",title:"Custom software",icon:Layers3,description:"Purpose-built applications, internal platforms and business tools designed around the way your teams work."},
  {number:"02",title:"Applied AI",icon:BrainCircuit,description:"Practical AI-assisted experiences and intelligent systems grounded in real business needs."},
  {number:"03",title:"Workflow automation",icon:Workflow,description:"Streamline repetitive processes, connect tools and create more reliable operational workflows."},
  {number:"04",title:"Data & analytics",icon:ChartNoAxesCombined,description:"Accessible reporting and decision-support dashboards that bring clarity to complex information."},
  {number:"05",title:"Web & digital products",icon:MonitorSmartphone,description:"Responsive web experiences and modern applications with usability and performance built in."},
  {number:"06",title:"Technology consulting",icon:Compass,description:"Product discovery, architecture planning, feasibility studies and hands-on technical guidance."}
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
         <h1>Engineering what’s<br/><span>next for business.</span><br/>Built to perform.</h1>
         <p className="gvb-lede">From intelligent automation to decision-ready platforms, we turn operational complexity into reliable digital products that people genuinely enjoy using.</p>
         <div className="gvb-actions">
           <Link href="/contact" className="gvb-btn gvb-btn-primary">Start a conversation <ArrowUpRight size={18}/></Link>
           <Link href="/brochure" className="gvb-btn gvb-btn-quiet">Explore our profile <ArrowRight size={18}/></Link>
         </div>
         <div className="gvb-hero-note"><span className="gvb-note-line"/>Where research-led thinking meets real-world execution.</div>
       </div>
       <div className="gvb-hero-visual" aria-label="Interactive GVB technology capabilities"><AdaptiveGlobe/><div className="gvb-legacy-visual" aria-hidden="true">
         <div className="gvb-orbit orbit-one"/><div className="gvb-orbit orbit-two"/>
         <div className="gvb-visual-glow"/>
         <div className="gvb-data-panel gvb-data-panel-top"><span>INTELLIGENCE LAYER</span><strong>Signals to insight</strong><div className="gvb-panel-bars"><i/><i/><i/><i/><i/><i/><i/></div></div>
         <div className="gvb-system-core"><Image src="/logo_icon.png" alt="" width={104} height={104} priority/><span>GVB / SYSTEMS</span></div>
         <div className="gvb-data-panel gvb-data-panel-bottom"><span>CONNECTED OPERATIONS</span><strong>Designed for clarity</strong><div className="gvb-flow-mini"><b/> <em/> <b/> <em/> <b/></div></div>
         <span className="gvb-coordinate coordinate-a">01 / DISCOVER</span><span className="gvb-coordinate coordinate-b">02 / BUILD</span></div>
       </div>
     </div>
     <div className="gvb-shell gvb-hero-bottom"><span>Software engineering</span><span>Applied AI</span><span>Business automation</span><span>Decision intelligence</span></div>
   </section>
   <section className="gvb-section gvb-intro" id="approach">
     <div className="gvb-shell gvb-split">
       <div><p className="gvb-label">OUR POINT OF VIEW</p><h2>The best technology makes <em>progress tangible.</em></h2></div>
       <div className="gvb-intro-right"><p>A great interface is only the beginning. We focus on the systems underneath: dependable data, connected workflows, thoughtful architecture and experiences that make the next action obvious.</p><p>We bring together engineering, analytical thinking and product strategy to shape solutions around the people and processes that matter.</p><Link href="/about" className="gvb-text-link">Meet GVB Tech <ArrowUpRight size={17}/></Link></div>
     </div>
   </section>
   <section className="gvb-section gvb-capabilities" id="capabilities">
    <div className="gvb-shell">
      <div className="gvb-section-heading"><div><p className="gvb-label">WHAT WE DO</p><h2>From ambition<br/>to working systems.</h2></div><p>Explore the capabilities that help organisations replace fragmented processes with connected, scalable technology.</p></div>
      <div className="gvb-service-grid">{capabilities.map(item=><Link href="/services" key={item.number} className="gvb-service-card"><div className="gvb-service-top"><span>{item.number} / 06</span><item.icon size={24} strokeWidth={1.6}/></div><h3>{item.title}</h3><p>{item.description}</p><span className="gvb-service-arrow"><ArrowUpRight size={20}/></span></Link>)}</div>
    </div>
   </section>
   <section className="gvb-section gvb-method">
    <div className="gvb-shell">
     <div className="gvb-section-heading"><div><p className="gvb-label">HOW WE WORK</p><h2>Clarity from day one.</h2></div><p>We make decisions visible, build in manageable increments and validate the experience with real users before scaling.</p></div>
     <div className="gvb-steps">{process.map(x=><div key={x.n} className="gvb-step"><span>{x.n}</span><h3>{x.t}</h3><p>{x.d}</p></div>)}</div>
    </div>
   </section>
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