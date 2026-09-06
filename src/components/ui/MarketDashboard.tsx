"use client";

import React, { useEffect, useState } from "react";
import { Activity, Cpu, LayoutDashboard, Code2, Compass, Zap, Shield, GitBranch } from "lucide-react";

interface CapabilityItem {
    label: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
}

const capabilities: CapabilityItem[] = [
    { label: "Automation Workflows", value: "Python · Celery · FastAPI", icon: Cpu },
    { label: "Real-Time Dashboards", value: "Next.js · WebSocket · ApexCharts", icon: LayoutDashboard },
    { label: "Full-Stack Development", value: "React · TypeScript · Node", icon: Code2 },
    { label: "Strategy Consulting", value: "Architecture · R&D · Feasibility", icon: Compass },
    { label: "AI & ML Pipelines", value: "PyTorch · Scikit-Learn · HuggingFace", icon: Zap },
    { label: "System Security", value: "Telemetry · Monitoring · Integrity", icon: Shield },
    { label: "Open-Source R&D", value: "GitHub · Active Projects", icon: GitBranch },
];

export function MarketDashboard() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="h-14 w-full bg-slate-900/10 border-b border-white/5" />;

    const tickerItems = [...capabilities, ...capabilities, ...capabilities, ...capabilities];

    return (
        <div className="w-full bg-black/60 border-b border-white/10 overflow-hidden relative flex items-center h-10 md:h-14 cursor-default backdrop-blur-3xl z-[45] group">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />

            <div className="absolute left-4 z-20 hidden sm:flex items-center text-white text-[9px] tracking-widest font-black uppercase py-1.5 px-3 rounded-full border border-white/10 shadow-sm bg-black/80 backdrop-blur-md">
                <Activity className="w-3 h-3 mr-2 text-gvb-cyan animate-pulse" />
                Tech Stack
            </div>

            <div className="flex animate-marquee whitespace-nowrap will-change-transform h-full items-center group-hover:[animation-play-state:paused]">
                {tickerItems.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                        <div key={`${item.label}-${idx}`} className="flex items-center space-x-3 md:space-x-4 px-4 md:px-10 border-r border-white/10">
                            <IconComponent className="w-3 h-3 text-gvb-cyan flex-shrink-0" />
                            <span className="text-white font-black text-[9px] md:text-xs tracking-widest uppercase">{item.label}</span>
                            <span className="text-white/50 font-mono text-[9px] md:text-[10px] tracking-tight">{item.value}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
