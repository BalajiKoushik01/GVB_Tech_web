"use client";

import React from "react";
import { Cpu, Rocket, BarChart3, Compass } from "lucide-react";
import { GlassCard } from "./GlassCard";

const pillars = [
    { 
        title: "Aerospace Testing Rigor", 
        badge: "Founder Credential", 
        detail: "ISRO SDSC SHAR Internship", 
        icon: Rocket 
    },
    { 
        title: "Decision Science", 
        badge: "Analytics Expertise", 
        detail: "Mu Sigma Consulting Background", 
        icon: BarChart3 
    },
    { 
        title: "Automated Workflows", 
        badge: "Core Capability", 
        detail: "Custom Automation & Systems", 
        icon: Cpu 
    },
    { 
        title: "Strategic Consulting", 
        badge: "Operational Focus", 
        detail: "Data-Driven Architecture", 
        icon: Compass 
    }
];

export function LiveStats() {
    return (
        <section className="py-16 md:py-24 px-4 relative text-foreground overflow-hidden transition-colors duration-700">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <span className="text-[10px] font-black tracking-[0.3em] text-gvb-cyan uppercase">Engineering Rigor</span>
                    <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mt-2">
                        Built On <span className="text-gradient">Verifiable Foundations</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {pillars.map((pillar, i) => (
                        <GlassCard key={i} hoverEffect={true} className="text-center py-8 md:py-10 px-4 group cursor-default">
                            <div className="flex justify-center mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gvb-cyan/10 to-gvb-blue/20 border border-gvb-cyan/20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                                    <pillar.icon className="w-6 h-6 text-gvb-cyan" />
                                </div>
                            </div>
                            <span className="text-[9px] font-black text-gvb-cyan/80 uppercase tracking-widest block mb-2">{pillar.badge}</span>
                            <h3 className="text-lg md:text-xl font-black mb-2 tracking-tight text-white">
                                {pillar.title}
                            </h3>
                            <p className="text-white/60 font-medium text-xs tracking-wide">{pillar.detail}</p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
