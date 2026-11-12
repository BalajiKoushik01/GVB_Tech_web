import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { InsightsExplorer } from "@/components/content/InsightsExplorer";

export const metadata:Metadata={
  title:"Insights | GVB Tech Solutions",
  description:"Practical explanations of automation, AI evaluation, operational dashboards and reliable software, with decisions and limitations made clear."
};

export default function BlogPage() {
  return <div className="gvb-journal">
    <div className="gvb-shell">
      <header className="gvb-journal-intro">
        <p className="gvb-label">THE JOURNAL / FIELD NOTES</p>
        <h1>Useful thinking.<br/><span>Without the jargon.</span></h1>
        <p>Working notes on software, automation and analytics: what to ask before investing, where projects go wrong and how to judge whether an approach is worth pursuing.</p>
      </header>
      <InsightsExplorer />
      <footer className="gvb-journal-footer"><BookOpen size={23}/><p>Questions about a workflow or a technical decision? We welcome conversations grounded in a real problem.</p><Link href="/contact">Discuss a problem <ArrowUpRight size={17}/></Link></footer>
    </div>
  </div>;
}
