"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Target, Users, Zap } from "lucide-react";
import { GlassCard } from "./GlassCard";

const stats = [
    { label: "Lines of Code", value: 500000, suffix: "+", icon: Code2 },
    { label: "Successful Projects", value: 150, suffix: "+", icon: Target },
    { label: "Global Clients", value: 45, suffix: "+", icon: Users },
    { label: "System Uptime", value: 99.9, suffix: "%", icon: Zap, isFloat: true }
];

function CountUp({ target, duration = 2.5, isFloat = false }: { target: number, duration?: number, isFloat?: boolean }) {
    const [count, setCount] = useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number | null = null;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            // smooth cubic bezier equivalent
            const easing = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            setCount(target * easing);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, target, duration]);

    return (
        <span ref={ref}>
            {isFloat ? count.toFixed(1) : Math.floor(count).toLocaleString()}
        </span>
    );
}

export function LiveStats() {
    return (
        <section className="py-32 px-4 relative bg-space-blue text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-space-blue to-accent-start/10 pointer-events-none" />
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {stats.map((stat, i) => (
                        <GlassCard key={i} hoverEffect={true} className="text-center py-12 px-4 bg-white/5 border-white/10 group cursor-default">
                            <div className="flex justify-center mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-start/20 to-accent-end/20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                                    <stat.icon className="w-7 h-7 text-accent-start" />
                                </div>
                            </div>
                            <h3 className="text-4xl lg:text-5xl font-bold mb-3 tracking-tighter text-gradient">
                                <CountUp target={stat.value} isFloat={stat.isFloat} />
                                {stat.suffix}
                            </h3>
                            <p className="text-white/70 font-medium text-sm lg:text-base tracking-tight">{stat.label}</p>
                        </GlassCard>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
