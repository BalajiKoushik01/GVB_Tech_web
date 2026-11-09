"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Clipboard, Mail, RotateCcw } from "lucide-react";

const needs = [
  {
    id:"repetitive",
    label:"Too much manual work",
    title:"The work is getting done. It's taking too many steps.",
    symptoms:["Information is entered more than once","Approvals disappear into email threads","Teams chase updates instead of acting on them"],
    startingPoint:"Map the process, identify repeatable decisions and track exceptions before automating.",
    solution:"Workflow design & automation",
    deliverables:["Process map and bottleneck review","Integration and approval plan","A small pilot with measurable results"]
  },
  {
    id:"data",
    label:"Data is difficult to trust",
    title:"Every team has a report. Nobody has the same answer.",
    symptoms:["Figures differ between systems","Reports take too long to prepare","Problems are noticed after the fact"],
    startingPoint:"Agree on the important decisions, document metric definitions and check data quality.",
    solution:"Analytics & operational dashboards",
    deliverables:["Metric and data-source audit","Decision-focused dashboard prototype","Exception views and reporting plan"]
  },
  {
    id:"software",
    label:"Our tools don't fit",
    title:"A useful business process deserves software that fits it.",
    symptoms:["Spreadsheets have become critical systems","Existing tools force awkward workarounds","People need one reliable place to work"],
    startingPoint:"Observe how people work today and define the smallest useful product.",
    solution:"Custom software engineering",
    deliverables:["Discovery and product requirements","Clickable workflow prototype","Phased build and maintenance plan"]
  },
  {
    id:"ai",
    label:"We want to use AI responsibly",
    title:"Start with a business decision, not a model.",
    symptoms:["Document review is slow","People search across scattered knowledge","An AI pilot lacks a clear success measure"],
    startingPoint:"Choose one bounded use case, establish a non-AI baseline and evaluate the risks.",
    solution:"Applied AI & feasibility",
    deliverables:["Data and risk assessment","Baseline and evaluation criteria","Human-reviewed proof of concept"]
  }
] as const;

export function AdaptiveGlobe(){
  const [chosen,setChosen]=useState(0);
  const [goal,setGoal]=useState("");
  const [copied,setCopied]=useState(false);
  const item=needs[chosen];
  const brief=`GVB TECH SOLUTIONS — INITIAL PROJECT BRIEF\n\nBusiness challenge: ${item.label}\nLikely service area: ${item.solution}\n\nWhat we're trying to improve:\n${goal.trim() || "(To be discussed)"}\n\nSuggested first step: ${item.startingPoint}\n\nTopics for discovery:\n${item.deliverables.map(d=>"- "+d).join("\n")}\n\nThis is a starting brief, not a quote or delivery commitment.`;
  const mailto=`mailto:info@gvbtech.in?subject=${encodeURIComponent("Project enquiry — "+item.solution)}&body=${encodeURIComponent(brief)}`;

  async function copyBrief(){
    try {await navigator.clipboard.writeText(brief);setCopied(true);}
    catch {setCopied(false);}
  }
  return <section className="gvb-guide" aria-label="Find a starting point for your business project">
    <div className="gvb-guide-top"><span className="gvb-guide-kicker">THE PROJECT GUIDE</span><span className="gvb-guide-edition">01 — 04</span></div>
    <h2>What would you like to improve?</h2>
    <p className="gvb-guide-subtitle">Choose the problem that sounds most familiar. We'll suggest a sensible place to begin.</p>
    <div className="gvb-guide-options" role="group" aria-label="Select a business challenge">
      {needs.map((need,index)=><button key={need.id} type="button" className={`gvb-guide-option ${index===chosen?"is-selected":""}`} aria-pressed={chosen===index} onClick={()=>{setChosen(index);setCopied(false);}}>
        <span className="gvb-guide-option-num">0{index+1}</span><span>{need.label}</span><ArrowUpRight size={16} aria-hidden="true"/>
      </button>)}
    </div>
    <div className="gvb-guide-result" aria-live="polite">
      <div className="gvb-guide-result-eyebrow">A PRACTICAL STARTING POINT</div>
      <h3>{item.title}</h3>
      <ul className="gvb-guide-symptoms">{item.symptoms.map(x=><li key={x}><Check size={14} aria-hidden="true"/>{x}</li>)}</ul>
      <div className="gvb-guide-recommendation"><span>OUR SUGGESTED APPROACH</span><strong>{item.solution}</strong><p>{item.startingPoint}</p></div>
    </div>
    <div className="gvb-guide-action">
      <label htmlFor="gvb-goal">A sentence about your challenge <span>(optional)</span></label>
      <textarea id="gvb-goal" value={goal} onChange={e=>{setGoal(e.target.value);setCopied(false);}} maxLength={360} rows={2} placeholder="For example: Our team spends two days every week reconciling customer records."/>
      <div className="gvb-guide-buttons">
        <a href={mailto} className="gvb-guide-primary"><Mail size={16}/> Email this project brief <ArrowRight size={16}/></a>
        <button type="button" className="gvb-guide-secondary" onClick={copyBrief}><Clipboard size={16}/>{copied?"Copied":"Copy brief"}</button>
        <button type="button" className="gvb-guide-reset" onClick={()=>{setChosen(0);setGoal("");setCopied(false);}} aria-label="Reset project guide"><RotateCcw size={16}/></button>
      </div>
      <small>No estimates or client information are generated here. The brief is prepared on your device.</small>
    </div>
  </section>;
}
