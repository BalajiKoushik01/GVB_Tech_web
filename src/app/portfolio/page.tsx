"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowUpRight, Github, Play, Cpu, Code2, LineChart, Shield, Activity } from "lucide-react";
import Link from "next/link";

const categories = ["All", "Live Demo", "Automated Tools", "AI Research", "Systems"];

interface Project {
    id: string;
    title: string;
    category: string;
    badge: string;
    tech: string[];
    desc: string;
    isLiveDemo?: boolean;
    demoUrl?: string;
    githubUrl?: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

const projects: Project[] = [
    {
        id: "predictor",
        title: "Stock Market Predictor (Apex Engine)",
        category: "Live Demo",
        badge: "Interactive demonstration",
        tech: ["Next.js", "Python", "FastAPI", "TSA Modeling", "Lightweight Charts"],
        desc: "An interactive environment for exploring time-series forecasts, comparing assumptions and examining uncertainty. Forecasts are demonstrations, not investment advice.",
        isLiveDemo: true,
        demoUrl: "/predictor",
        icon: LineChart,
        color: "from-gvb-cyan to-gvb-blue"
    },
    {
        id: "rangeready",
        title: "RangeReady",
        category: "Automated Tools",
        badge: "Research prototype",
        tech: ["TypeScript", "Python", "IoT Telemetry", "Real-Time Systems"],
        desc: "A research-oriented approach to collecting device signals, checking test conditions and presenting results where engineers can act on them.",
        githubUrl: "https://github.com/BalajiKoushik01/RangeReady",
        icon: Activity,
        color: "from-gvb-blue to-gvb-deep"
    },
    {
        id: "weavecore",
        title: "WeaveCore",
        category: "Systems",
        badge: "Active R&D",
        tech: ["Python", "Computer Vision", "Celery Tasks", "FastAPI"],
        desc: "An exploration of how image processing and workflow software can reduce repetitive preparation in textile-design production.",
        // No verified public repository link for this project.
        icon: Cpu,
        color: "from-emerald-500/20 to-gvb-cyan/20"
    },
    {
        id: "cervisense",
        title: "CerviSense-AI",
        category: "AI Research",
        badge: "Experimental research",
        tech: ["Python", "PyTorch", "Computer Vision", "Medical Imaging"],
        desc: "Experimental computer-vision research for analysing medical imagery, with emphasis on evaluation, interpretability and limitations.",
        githubUrl: "https://github.com/BalajiKoushik01/CerviSense-AI",
        icon: Code2,
        color: "from-purple-500/20 to-gvb-blue/20"
    },
    {
        id: "invisible-guardian",
        title: "Invisible Guardian",
        category: "Systems",
        badge: "Active R&D",
        tech: ["Go", "Python", "System Security", "Telemetry"],
        desc: "A monitoring concept that focuses on collecting system events and making unusual activity easier to investigate.",
        // No verified public repository link for this project.
        icon: Shield,
        color: "from-amber-500/20 to-orange-500/20"
    }
];

export default function PortfolioPage() {
    const [filter, setFilter] = useState("All");

    const filteredProjects = projects.filter(
        (p) => filter === "All" || p.category === filter
    );

    return (
        <div className="pt-20 md:pt-24 pb-16 min-h-[100dvh] relative">
            {/* Ambient Lighting */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gvb-cyan/5 rounded-full blur-[160px] pointer-events-none" />

            {/* Header */}
            <section className="px-6 py-12 md:py-16 text-center relative z-10">
                <div className="inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-6">
                    <span className="w-1.5 h-1.5 bg-gvb-cyan rounded-full animate-pulse" />
                    <span className="text-[9px] md:text-[10px] font-black tracking-[0.3em] text-gvb-cyan uppercase">PROTOTYPES / RESEARCH / DEMONSTRATIONS</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black mb-4 md:mb-6 text-white uppercase tracking-tighter leading-none">
                    Technical <span className="text-gradient">Proof & Projects</span>
                </h1>
                <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-10 md:mb-12 font-bold leading-relaxed px-2">
                    A selection of experimental work and technical demonstrations. These are not presented as commissioned client results. Links are shown only where a public source or working demo is available.
                </p>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-16 px-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 md:px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 relative flex items-center ${filter === cat
                                ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                                : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/5"
                                }`}
                        >
                            {filter === cat && <span className="w-1.5 h-1.5 bg-gvb-cyan rounded-full animate-pulse mr-2" />}
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Project Cards Grid */}
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, idx) => {
                                const IconComponent = project.icon;
                                return (
                                    <motion.div
                                        key={project.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    >
                                        <GlassCard className="p-8 overflow-hidden group h-full flex flex-col justify-between border-white/10 hover:border-gvb-cyan/30 bg-white/5 backdrop-blur-3xl transition-all duration-500 rounded-3xl relative">
                                            {/* Glow Accent */}
                                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.color} rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none`} />

                                            <div>
                                                {/* Card Header & Badge */}
                                                <div className="flex items-center justify-between mb-6">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gvb-cyan group-hover:scale-110 transition-transform">
                                                        <IconComponent className="w-6 h-6" />
                                                    </div>
                                                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${project.isLiveDemo ? 'bg-gvb-cyan/10 text-gvb-cyan border-gvb-cyan/30' : 'bg-white/5 text-white/60 border-white/10'}`}>
                                                        {project.badge}
                                                    </span>
                                                </div>

                                                <h3 className="text-2xl font-black mb-3 text-white group-hover:text-gvb-cyan transition-colors tracking-tight">
                                                    {project.title}
                                                </h3>
                                                <p className="text-white/60 text-sm mb-6 font-bold leading-relaxed">
                                                    {project.desc}
                                                </p>
                                            </div>

                                            <div>
                                                {/* Tech Tags */}
                                                <div className="flex flex-wrap gap-1.5 mb-8">
                                                    {project.tech.map((t) => (
                                                        <span key={t} className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-white/5 text-white/50 border border-white/5">
                                                            #{t}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Actions */}
                                                {project.isLiveDemo && project.demoUrl ? (
                                                    <Link href={project.demoUrl} className="w-full block">
                                                        <div className="w-full py-3.5 px-6 rounded-2xl bg-gvb-cyan text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                                                            <Play className="w-4 h-4 fill-current" />
                                                            Launch Live Demo
                                                        </div>
                                                    </Link>
                                                ) : project.githubUrl ? (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full block"
                                                    >
                                                        <div className="w-full py-3.5 px-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all group/btn">
                                                            <Github className="w-4 h-4" />
                                                            View Source on GitHub
                                                            <ArrowUpRight className="w-4 h-4 text-gvb-cyan group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                                        </div>
                                                    </a>
                                                ) : <span className="text-xs text-white/60 border border-white/15 rounded-lg px-3 py-2 inline-flex">Public repository not available — project overview only</span>}
                                            </div>
                                        </GlassCard>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
