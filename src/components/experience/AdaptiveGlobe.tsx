"use client";
import dynamic from "next/dynamic";
import {useEffect,useRef,useState} from "react";
const Globe=dynamic(()=>import("./ServiceGlobe"),{ssr:false,loading:()=> <div className="globe-fallback">Engineering · Intelligence · Automation</div>});
export function AdaptiveGlobe(){
 const ref=useRef<HTMLDivElement>(null);
 const [ready,setReady]=useState(false);
 useEffect(()=>{
   const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
   const fine=window.matchMedia("(pointer: fine)").matches;
   const wide=window.matchMedia("(min-width: 900px)").matches;
   const saveData=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData;
   if(reduced||!fine||!wide||saveData)return;
   const io=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){setReady(true);io.disconnect();}},{rootMargin:"100px"});
   if(ref.current)io.observe(ref.current);
   return ()=>io.disconnect();
 },[]);
 return <div ref={ref} className="globe-shell">{ready?<Globe/>:<div className="globe-fallback" role="img" aria-label="Technology capabilities: software, AI, automation, analytics, consulting"><div className="fallback-orbit"/><span>SOFTWARE / AI / AUTOMATION<br/>ANALYTICS / CONSULTING</span></div>}</div>;
}