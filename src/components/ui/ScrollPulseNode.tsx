"use client";

import React from "react";
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

    // Dynamic scale based on velocity (it "expands" when scrolling fast)
    const velocityScale = useTransform(scrollVelocity, (v) => 1 + Math.min(Math.abs(v) * 5, 2));
    const smoothScale = useSpring(velocityScale, { stiffness: 300, damping: 30 });

    // Map scroll progress to vertical position (0 to 100vh)
    // We offset it slightly from top and bottom to stay in track
    const nodeY = useTransform(smoothProgress, [0, 1], ["2vh", "98vh"]);

    return (
        <div className="fixed right-[2px] top-0 bottom-0 w-1 z-[10000] pointer-events-none hidden md:block">
            {/* Track Line */}
            <div className="absolute inset-y-0 right-0 w-[1px] bg-white/5" />

            {/* The Pulsing Node */}
            <motion.div
                style={{ top: nodeY, scale: smoothScale }}
                className="absolute right-[-6px] -translate-y-1/2 flex items-center justify-center"
            >
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
                    className="w-3 h-3 bg-gvb-cyan rounded-full border border-white shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                />

                {/* Pulse Rings */}
                {[1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{
                            scale: [1, 2.5],
                            opacity: [0.6, 0]
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

                {/* Live "Data" Label (tiny) */}
                <motion.div 
                    style={{ opacity: useTransform(smoothScale, [1, 1.5], [0, 1]) }}
                    className="absolute right-6 whitespace-nowrap"
                >
                    <span className="text-[8px] font-black text-gvb-cyan uppercase tracking-widest bg-black/80 px-2 py-0.5 rounded border border-gvb-cyan/20">
                        LIVE PROTOCOL SYNC
                    </span>
                </motion.div>
                
                {/* SVG EKG Wave (Pulse) */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-6 overflow-hidden opacity-40">
                    <svg viewBox="0 0 100 40" className="w-full h-full stroke-gvb-cyan fill-none stroke-[2]">
                        <motion.path
                            animate={{
                                d: [
                                    "M0,20 L30,20 L35,10 L45,30 L50,20 L100,20",
                                    "M0,20 L30,20 L35,5 L45,35 L50,20 L100,20",
                                    "M0,20 L30,20 L35,10 L45,30 L50,20 L100,20"
                                ]
                            }}
                            transition={{ duration: 0.2, repeat: Infinity }}
                        />
                    </svg>
                </div>
            </motion.div>
        </div>
    );
};
