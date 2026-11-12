"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress,setProgress]=useState(0);
  useEffect(()=>{
    let frame=0;
    const measure=()=>{
      frame=0;
      const height=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
      setProgress(Math.min(100,Math.max(0,window.scrollY/height*100)));
    };
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(measure);};
    measure();
    window.addEventListener("scroll",onScroll,{passive:true});
    window.addEventListener("resize",onScroll);
    return()=>{window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onScroll);if(frame)cancelAnimationFrame(frame);};
  },[]);
  return <div className="gvb-reading-progress" role="progressbar" aria-label="Article reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}><span style={{width:progress+"%"}}/></div>;
}
