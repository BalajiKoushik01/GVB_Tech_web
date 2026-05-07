"use client";

import React from "react";
import { Code2, Target, Users, Zap } from "lucide-react";
import { GlassCard } from "./GlassCard";

const stats = [
    { label: "Lines of Code", value: "500,000", suffix: "+", icon: Code2 },
    { label: "Successful Projects", value: "10", suffix: "+", icon: Target },
    { label: "Global Clients", value: "2", suffix: "+", icon: Users },
    { label: "System Uptime", value: "99.9", suffix: "%", icon: Zap }
];

export function LiveStats() {
    return (
        <section className="py-24 md:py-32 px-4 relative text-foreground overflow-hidden transition-colors duration-700">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {stats.map((stat, i) => (
                        <GlassCard key={i} hoverEffect={true} className="text-center py-8 md:py-12 px-2 group cursor-default">
                            <div className="flex justify-center mb-4 md:mb-6">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-gvb-blue/10 to-gvb-deep/10 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                                    <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-gvb-blue" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-4xl md:text-5xl font-bold mb-2 md:mb-3 tracking-tighter text-gradient whitespace-nowrap">
                                    {stat.value}{stat.suffix}
                                </h3>
                            </div>
                            <p className="text-slate-300 font-medium text-xs lg:text-sm tracking-tight">{stat.label}</p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
