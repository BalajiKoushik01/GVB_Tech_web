"use client";

import React, { useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useVelocity } from "framer-motion";

export const ScrollPulseNode = () => {
    const { scrollYProgress } = useScroll();
    const scrollVelocity = useVelocity(scrollYProgress);
    
    // Smooth the progress for the node movement
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Dynamic scale based on velocity
    const velocityScale = useTransform(scrollVelocity, (v) => 1 + Math.min(Math.abs(v) * 5, 2));
    const smoothScale = useSpring(velocityScale, { stiffness: 300, damping: 30 });

    // Map scroll progress to vertical position
    const nodeY = useTransform(smoothProgress, [0, 1], ["2vh", "98vh"]);

    // Generate static "stock-style" bars for the track
    const stockBars = useMemo(() => {
        return Array.from({ length: 60 }).map((_, i) => ({
            id: i,
            height: 4 + Math.random() * 16, // Random heights for histogram look
            opacity: 0.1 + Math.random() * 0.2
        }));
    }, []);

    return (
        <div className="fixed right-0 top-0 bottom-0 w-8 z-[10000] pointer-events-none hidden md:block">
            {/* Stock Histogram Track */}
            <div className="absolute inset-y-0 right-1 w-6 flex flex-col justify-between py-[2vh] opacity-30">
                {stockBars.map((bar) => (
                    <motion.div
                        key={bar.id}
                        className="bg-gvb-cyan self-end mr-1"
                        style={{ 
                            height: "1px", 
                            width: `${bar.height}px`,
                            opacity: bar.opacity
                        }}
                    />
                ))}
            </div>

            {/* The Pulsing Node */}
            <motion.div
                style={{ top: nodeY, scale: smoothScale }}
                className="absolute right-[2px] -translate-y-1/2 flex items-center justify-center"
            >
                {/* Active Stock Line (Horizontal indicator at current scroll) */}
                <motion.div 
                    className="absolute right-0 h-[1px] bg-gvb-cyan shadow-[0_0_15px_rgba(34,211,238,1)]"
                    style={{ 
                        width: useTransform(smoothScale, [1, 2], ["40px", "100px"]),
                        opacity: 0.8
                    }}
                />

                {/* Core Pulse */}
                <motion.div
                    animate={{ 
                        boxShadow: [
                            "0 0 10px rgba(34,211,238,0.5)",
                            "0 0 25px rgba(34,211,238,0.8)",
                            "0 0 10px rgba(34,211,238,0.5)"
                        ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2.5 h-2.5 bg-white rounded-full border border-gvb-cyan shadow-[0_0_15px_rgba(34,211,238,0.6)] z-20"
                />

                {/* Pulse Rings */}
                {[1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{
                            scale: [1, 2.5],
                            opacity: [0.4, 0]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "easeOut"
                        }}
                        className="absolute w-4 h-4 rounded-full border border-gvb-cyan/50"
                    />
                ))}
                
                {/* SVG EKG Wave (Pulse) */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-8 overflow-hidden">
                    <svg viewBox="0 0 100 40" className="w-full h-full stroke-gvb-cyan fill-none stroke-[2.5]">
                        <motion.path
                            animate={{
                                d: [
                                    "M0,20 L30,20 L35,10 L45,30 L50,20 L100,20",
                                    "M0,20 L30,20 L35,-5 L45,45 L50,20 L100,20",
                                    "M0,20 L30,20 L35,10 L45,30 L50,20 L100,20"
                                ]
                            }}
                            transition={{ duration: 0.25, repeat: Infinity }}
                            style={{ 
                                opacity: useTransform(smoothScale, [1, 2], [0.3, 1]),
                                filter: "drop-shadow(0 0 5px rgba(34,211,238,0.5))"
                            }}
                        />
                    </svg>
                </div>
            </motion.div>
        </div>
    );
};
