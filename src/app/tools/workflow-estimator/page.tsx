"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, ClipboardCopy, RotateCcw } from "lucide-react";

const INR = new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0});
const hoursFormat = new Intl.NumberFormat("en-IN",{maximumFractionDigits:0});
const initial={people:6,hours:4,rate:500,reduction:25,setup:100000,maintenance:20000};
type Values=typeof initial;
type Field={key:keyof Values,label:string,description:string,min:number,max:number,step:number,suffix?:string};
const fields:Field[]=[{key:"people",label:"People doing the task",description:"People who regularly perform the manual work",min:1,max:500,step:1}];
const additionalFields:Field[]=[
{key:"hours",label:"Hours per person, each week",description:"Only the time spent on this specific task",min:0,max:80,step:.5},
{key:"rate",label:"Fully loaded hourly cost",description:"Illustrative cost per hour, including employment overhead",min:0,max:100000,step:50,suffix:"₹"},
{key:"reduction",label:"Time you believe could be recovered",description:"An assumption you control, not a claim of expected improvement",min:0,max:100,step:5,suffix:"%"},
{key:"setup",label:"One-time design and implementation cost",description:"Enter your own working budget, if known",min:0,max:100000000,step:5000,suffix:"₹"},
{key:"maintenance",label:"Annual support and running cost",description:"Include hosting, licences, maintenance and oversight",min:0,max:100000000,step:5000,suffix:"₹"}
];

export default function WorkflowEstimator(){
 const [values,setValues]=useState<Values>(initial);
 const [copied,setCopied]=useState(false);
 function update(key:keyof Values,value:string,min:number,max:number){
   const n=Number(value);
   setValues(previous=>({...previous,[key]:Number.isFinite(n)?Math.min(max,Math.max(min,n)):0}));
   setCopied(false);
 }
 const baselineHours=values.people*values.hours*48;
 const recovered=baselineHours*values.reduction/100;
 const annualGross=recovered*values.rate;
 const firstYearNet=annualGross-values.setup-values.maintenance;
 const subsequentAnnualNet=annualGross-values.maintenance;
 const payback=annualGross>values.maintenance ? values.setup/(annualGross-values.maintenance)*12 : null;
 const hoursRemaining=baselineHours-recovered;
 const assumptions=`GVB TECH — WORKFLOW SCENARIO (NOT A QUOTE)\nPeople: ${values.people}\nHours per person per week: ${values.hours}\nHourly cost: ${INR.format(values.rate)}\nAssumed time reduction: ${values.reduction}%\nImplementation budget: ${INR.format(values.setup)}\nAnnual running costs: ${INR.format(values.maintenance)}\nWorking weeks per year: 48\n\nEstimated annual hours freed: ${hoursFormat.format(recovered)}\nAnnual gross capacity value: ${INR.format(annualGross)}\nFirst-year net value after entered costs: ${INR.format(firstYearNet)}\nOngoing annual net value: ${INR.format(subsequentAnnualNet)}\n\nThese values are arithmetic scenarios, not savings guarantees. Recovered time only produces financial savings if it reduces actual spend or creates measurable additional output.`;
 return <div className="gvb-estimator">
 <header className="gvb-estimator-hero"><div className="gvb-shell"><p className="gvb-label">A PRACTICAL PLANNING TOOL</p><h1>Is this workflow worth automating?</h1><p>Put the assumptions on the table before paying for a build. Adjust task time, likely reduction and operating costs; the figures update as you type.</p><Link href="/services#automation">How we approach automation <ArrowUpRight size={16}/></Link></div></header>
 <div className="gvb-shell gvb-estimator-columns">
  <section className="gvb-estimator-inputs" aria-labelledby="gvb-estimator-input-heading"><div className="gvb-estimator-head"><div><span>01 / ASSUMPTIONS</span><h2 id="gvb-estimator-input-heading">Describe the work.</h2></div><button type="button" onClick={()=>{setValues(initial);setCopied(false)}}><RotateCcw size={15}/> Reset</button></div>
   <p className="gvb-estimator-help">Start with one task, not an entire department. Forty-eight working weeks are used for the annual calculation.</p>
   <div className="gvb-estimator-fields">{[...fields,...additionalFields].map(field=><label key={field.key} className="gvb-estimator-field" htmlFor={"estimate-"+field.key}><span><strong>{field.label}</strong><small>{field.description}</small></span><span className="gvb-estimator-field-input">{field.suffix==="₹" && <span aria-hidden="true">₹</span>}<input id={"estimate-"+field.key} type="number" min={field.min} max={field.max} step={field.step} value={values[field.key]} onChange={e=>update(field.key,e.target.value,field.min,field.max)}/>{field.suffix==="%"&&<span aria-hidden="true">%</span>}</span></label>)}</div>
  </section>
  <section className="gvb-estimator-results" aria-labelledby="gvb-estimator-results-heading"><div className="gvb-estimator-head"><div><span>02 / SCENARIO</span><h2 id="gvb-estimator-results-heading">What the numbers suggest.</h2></div></div>
   <div className="gvb-estimator-primary"><span>Estimated annual working hours freed</span><strong>{hoursFormat.format(recovered)}</strong><small>From {hoursFormat.format(baselineHours)} hours in this task each year</small><div className="gvb-estimator-bar" aria-hidden="true"><span style={{width:values.reduction+"%"}}/></div><div className="gvb-estimator-bar-legend"><span>Time potentially recovered: {values.reduction}%</span><span>Remaining: {hoursFormat.format(hoursRemaining)} h</span></div></div>
   <dl className="gvb-estimator-metrics">
    <div><dt>Gross value of recovered capacity / year</dt><dd>{INR.format(annualGross)}</dd></div>
    <div className={firstYearNet<0?"is-negative":""}><dt>First-year result after entered costs</dt><dd>{INR.format(firstYearNet)}</dd></div>
    <div><dt>Subsequent annual result after running costs</dt><dd>{INR.format(subsequentAnnualNet)}</dd></div>
    <div><dt>Indicative payback, assuming all recovered time is realised</dt><dd>{payback===null?"Not reached":payback===0?"Immediate":payback>120?"> 10 years":payback.toFixed(1)+" months"}</dd></div>
   </dl>
   <div className="gvb-estimator-caveat"><strong>Read this before using the figure.</strong><p>Recovered staff hours are <em>capacity</em>, not automatically cash saved. Reassignment, extra output, payroll changes, software errors and adoption all affect the real outcome. Treat this as a hypothesis to test in a pilot, never as an ROI promise.</p></div>
   <div className="gvb-estimator-actions"><button type="button" onClick={async()=>{try{await navigator.clipboard.writeText(assumptions);setCopied(true)}catch{setCopied(false)}}}><ClipboardCopy size={17}/>{copied?<><Check size={15}/> Copied</>:"Copy scenario"}</button><Link href="/contact">Discuss a pilot <ArrowUpRight size={17}/></Link></div>
  </section>
 </div>
 <div className="gvb-shell gvb-estimator-footer"><h2>What comes after the arithmetic?</h2><p>Review actual task records, sample the exceptions and confirm how the freed time would be used. A narrowly scoped pilot can validate—or disprove—your assumptions before a wider rollout.</p></div>
 </div>;
}
