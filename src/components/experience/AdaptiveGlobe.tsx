"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check, Workflow, BrainCircuit, ChartNoAxesCombined } from "lucide-react";

const scenarios = [
  {
    id: "operations",
    label: "Operations",
    eyebrow: "FROM REPETITIVE TASKS TO A RELIABLE PROCESS",
    title: "An order shouldn't travel through five spreadsheets.",
    explanation: "Connect intake, validation and fulfilment so the team sees what needs attention without chasing updates.",
    takeaway: "Less re-entry. Clear ownership. Exceptions surfaced sooner.",
    icon: Workflow,
    accent: "#79dafa",
    steps: [
      { name: "Order intake", detail: "Capture requests in one structured place.", tag: "INPUT" },
      { name: "Validation", detail: "Check required details before work begins.", tag: "RULES" },
      { name: "Team routing", detail: "Send the right task to the right owner.", tag: "ACTION" },
      { name: "Live status", detail: "Make progress and delays visible.", tag: "VISIBILITY" }
    ]
  },
  {
    id: "intelligence",
    label: "Applied AI",
    eyebrow: "AI WITH A CLEAR DECISION AND HUMAN OVERSIGHT",
    title: "Give people a head start, not another black box.",
    explanation: "Let AI extract useful information from incoming documents while people review uncertain or consequential cases.",
    takeaway: "Faster preparation. Reviewable decisions. Traceable results.",
    icon: BrainCircuit,
    accent: "#bbadff",
    steps: [
      { name: "Documents", detail: "Receive and organise incoming material.", tag: "INPUT" },
      { name: "AI extraction", detail: "Identify relevant fields and signals.", tag: "ASSIST" },
      { name: "Human review", detail: "Check exceptions before acting.", tag: "CONTROL" },
      { name: "Next action", detail: "Move approved information into the workflow.", tag: "OUTPUT" }
    ]
  },
  {
    id: "decisions",
    label: "Analytics",
    eyebrow: "BETTER REPORTING STARTS WITH TRUSTED DEFINITIONS",
    title: "Turn scattered data into a clear next step.",
    explanation: "Bring operational sources together, agree on the numbers and highlight exceptions worth investigating.",
    takeaway: "Consistent metrics. Fewer blind spots. Actionable context.",
    icon: ChartNoAxesCombined,
    accent: "#8ae4c6",
    steps: [
      { name: "Source data", detail: "Connect systems and record data provenance.", tag: "SOURCE" },
      { name: "Shared metrics", detail: "Define calculations everybody can trust.", tag: "MODEL" },
      { name: "Exceptions", detail: "Spot deviations from useful baselines.", tag: "SIGNAL" },
      { name: "Decisions", detail: "Give teams the context to take action.", tag: "RESULT" }
    ]
  }
] as const;

export function AdaptiveGlobe() {
  const [selection, setSelection] = useState(0);
  const [focusedStep, setFocusedStep] = useState(0);
  const selected = scenarios[selection];
  const step = selected.steps[focusedStep];

  return <section className="gvb-systems" aria-label="Explore practical GVB Tech solution workflows" style={{ "--systems-accent": selected.accent } as React.CSSProperties}>
    <div className="gvb-systems-top">
      <div className="gvb-systems-identity"><span className="gvb-systems-live" aria-hidden="true"/><span>GVB / SYSTEMS IN PRACTICE</span></div>
      <span className="gvb-systems-count">0{selection + 1} <span>/ 03</span></span>
    </div>

    <div className="gvb-systems-tabs" role="group" aria-label="Choose a business problem">
      {scenarios.map((item,i)=><button key={item.id} type="button"
        className={`gvb-systems-tab ${selection === i ? "active" : ""}`}
        aria-pressed={selection === i}
        onClick={()=>{setSelection(i);setFocusedStep(0);}}>
        <item.icon size={16} strokeWidth={1.8}/><span>{item.label}</span>
      </button>)}
    </div>

    <div className="gvb-systems-visual" aria-label="Interactive example workflow">
      <div className="gvb-systems-halo" aria-hidden="true"/>
      <div className="gvb-systems-gridlines" aria-hidden="true"/>
      <div className="gvb-systems-flowline" aria-hidden="true"><span/></div>
      {selected.steps.map((item,i)=><button type="button" key={`${selected.id}-${i}`}
        className={`gvb-systems-node ${i===focusedStep?"active":""}`}
        aria-pressed={i===focusedStep}
        aria-label={`${item.name}: ${item.detail}`}
        onClick={()=>setFocusedStep(i)}>
        <span className="gvb-systems-node-number">0{i+1}</span>
        <span className="gvb-systems-node-symbol" aria-hidden="true">{i===3?<Check size={19} strokeWidth={2}/>:i===1?<Workflow size={19} strokeWidth={1.7}/>:i===2?<ArrowRight size={19} strokeWidth={1.7}/>:<span className="gvb-systems-input-symbol"/>}</span>
        <span className="gvb-systems-node-name">{item.name}</span>
        </button>)}
    </div>

    <div className="gvb-systems-detail" key={`${selected.id}-${focusedStep}`}>
      <div className="gvb-systems-detail-heading"><span className="gvb-systems-detail-tag">{step.tag} / 0{focusedStep+1}</span><span className="gvb-systems-detail-progress" aria-hidden="true">{selected.steps.map((_,i)=><span key={i} className={i<=focusedStep?"filled":""}/>)}</span></div>
      <p>{step.detail}</p>
    </div>

    <div className="gvb-systems-bottom">
      <div><span className="gvb-systems-bottom-label">{selected.eyebrow}</span><h2>{selected.title}</h2><p>{selected.explanation}</p><span className="gvb-systems-benefit">{selected.takeaway}</span></div>
      <Link href="/services" className="gvb-systems-link" aria-label={`Explore services related to ${selected.label}`}><ArrowUpRight size={19}/></Link>
    </div>
    <p className="gvb-systems-disclaimer">Illustrative workflows, not live client data.</p>
  </section>;
}
