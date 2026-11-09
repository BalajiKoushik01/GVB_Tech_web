import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./premium.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
const outfit=Outfit({variable:"--font-sans",subsets:["latin"],weight:["300","400","500","600","700","800"]});
const mono=JetBrains_Mono({variable:"--font-mono",subsets:["latin"]});
export const metadata:Metadata={
 title:{default:"GVB Tech Solutions | Software, AI & Digital Engineering",template:"%s | GVB Tech Solutions"},
 description:"GVB Tech Solutions builds custom software, AI-enabled workflows, analytics dashboards and digital experiences for modern businesses.",
 metadataBase:new URL("https://gvbtech.in"),
 alternates:{canonical:"/"},
 openGraph:{title:"GVB Tech Solutions | Technology, built around your business",description:"Software engineering, applied AI, automation and analytics. Thoughtfully built for your business.",url:"https://gvbtech.in",siteName:"GVB Tech Solutions",type:"website",locale:"en_IN",images:[{url:"/GVB_tech_logo.png",width:1200,height:630,alt:"GVB Tech Solutions"}]},
 twitter:{card:"summary_large_image",title:"GVB Tech Solutions",description:"Better systems. Better decisions. Better business.",images:["/GVB_tech_logo.png"]},
 robots:{index:true,follow:true}
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${outfit.variable} ${mono.variable} antialiased min-h-screen flex flex-col bg-[#081323] text-white`}><a className="gvb-skip-link" href="#main-content">Skip to content</a><Header/><main id="main-content" className="flex-1">{children}</main><Footer/><Analytics/><SpeedInsights/></body></html>}