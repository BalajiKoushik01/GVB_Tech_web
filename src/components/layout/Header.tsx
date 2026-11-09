"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
const nav=[{label:"Home",href:"/"},{label:"Expertise",href:"/services"},{label:"Work",href:"/portfolio"},{label:"About",href:"/about"},{label:"Insights",href:"/blog"},{label:"Careers",href:"/careers"},{label:"Brochure",href:"/brochure"}];
export function Header(){
 const [open,setOpen]=useState(false);
 const pathname=usePathname();
 useEffect(()=>{queueMicrotask(()=>setOpen(false));},[pathname]);
 useEffect(()=>{document.body.style.overflow=open?"hidden":"";return()=>{document.body.style.overflow="";}},[open]);
 return <header className="gvb-site-header"><div className="gvb-shell gvb-header-inner">
   <Link href="/" className="gvb-brand" aria-label="GVB Tech Solutions home"><Image src="/logo_icon.png" alt="" width={39} height={39} priority/><span><b>GVB TECH</b><small>SOLUTIONS</small></span></Link>
   <nav className="gvb-desktop-nav" aria-label="Primary navigation">{nav.map(item=><Link key={item.href} href={item.href} className={pathname===item.href?"active":""}>{item.label}</Link>)}</nav>
   <Link href="/contact" className="gvb-header-cta">Let&apos;s talk <ArrowUpRight size={16}/></Link>
   <button type="button" className="gvb-menu-toggle" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} aria-controls="gvb-mobile-navigation" onClick={()=>setOpen(!open)}>{open?<X size={23}/>:<Menu size={23}/>}</button>
 </div><nav id="gvb-mobile-navigation" aria-label="Mobile navigation" className={"gvb-mobile-nav "+(open?"open":"")}>{nav.map(item=><Link key={item.href} href={item.href} onClick={()=>setOpen(false)}>{item.label}<ArrowUpRight size={18}/></Link>)}<Link href="/contact" onClick={()=>setOpen(false)}>Start a conversation <ArrowUpRight size={18}/></Link></nav></header>;
}