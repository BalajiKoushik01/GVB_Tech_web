"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor(){
 const [active,setActive]=useState(false);
 const [hover,setHover]=useState(false);
 const [pressed,setPressed]=useState(false);
 const [magnify,setMagnify]=useState(false);
 const [lensText,setLensText]=useState("");
 const x=useMotionValue(-200),y=useMotionValue(-200);
 const sx=useSpring(x,{stiffness:260,damping:24,mass:.45});
 const sy=useSpring(y,{stiffness:260,damping:24,mass:.45});
 useEffect(()=>{
  const fine=window.matchMedia("(pointer:fine)"),reduce=window.matchMedia("(prefers-reduced-motion:reduce)");
  if(!fine.matches||reduce.matches)return;
  const move=(e:PointerEvent)=>{
   x.set(e.clientX);y.set(e.clientY);setActive(true);
   const t=e.target;
   if(!(t instanceof Element))return;
   const interactive=Boolean(t.closest("a,button,[role=button],input,textarea,select,[data-cursor]"));
   setHover(interactive);
   const node=t.closest("h1,h2,h3,p,span,strong,a,button,[data-magnify]");
   const text=(node?.textContent||"").replace(/\s+/g," ").trim();
   setLensText(text.length>0&&text.length<85?text:"");
  };
  const down=()=>setPressed(true),up=()=>setPressed(false),leave=()=>setActive(false);
  window.addEventListener("pointermove",move);window.addEventListener("pointerdown",down);window.addEventListener("pointerup",up);document.addEventListener("mouseleave",leave);
  return()=>{window.removeEventListener("pointermove",move);window.removeEventListener("pointerdown",down);window.removeEventListener("pointerup",up);document.removeEventListener("mouseleave",leave);};
 },[x,y]);
 return <>{active&&<div className="gvb-cursor-layer" aria-hidden="true"><motion.div className="gvb-cursor-halo" style={{x:sx,y:sy}} animate={{scale:pressed?.8:hover?1.4:1,opacity:hover?.8:.45}}/><motion.div className="gvb-cursor-lens" style={{x:sx,y:sy}} animate={{width:pressed?65:hover?115:86,height:pressed?65:hover?115:86,scale:pressed?.86:1}}><span className="gvb-lens-shine"/>{magnify&&lensText&&<span className="gvb-lens-text">{lensText}</span>}</motion.div><motion.div className="gvb-cursor-dot" style={{x,y}}/></div>}<button type="button" className="gvb-magnify-toggle" aria-pressed={magnify} onClick={()=>setMagnify(!magnify)} title="Toggle readable magnifying lens">{magnify?"Lens ON":"Lens OFF"}</button></>;
}
