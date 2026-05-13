"use client";

import React, { memo, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity } from "framer-motion";

// Stable particle data for the engine exhaust
const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
    id:      i,
    xOffset: (i % 2 === 0 ? 1 : -1) * (1 + i * 1.5),
    delay:   i * 0.05,
    size:    Math.max(1, 5 - i * 0.3),
    yDrift:  40 + i * 15,
    dur:     0.3 + i * 0.04,
}));

export const RocketMotion = memo(() => {
    const { scrollYProgress } = useScroll();
    const scrollVelocity = useVelocity(scrollYProgress);
    
    // Smooth spring for scroll progress
    const smoothedScroll = useSpring(scrollYProgress, { stiffness: 45, damping: 18, restDelta: 0.001 });
    
    // Mouse tracking values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 35, damping: 15 });
    const springY = useSpring(mouseY, { stiffness: 35, damping: 15 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // ── Scroll & Velocity driven values ──────────────────────────────────────────
    // Lift off animation: move up based on scroll
    const rocketY  = useTransform(smoothedScroll, [0, 1], [0, -1200]);
    const rocketOp = useTransform(smoothedScroll, [0, 0.9, 1], [1, 1, 0]);
    
    // Tilt based on mouse position
    const tiltX = useTransform(springY, [-1, 1], [10, -10]);
    const tiltY = useTransform(springX, [-1, 1], [-10, 10]);
    
    // Dynamic Engine Intensity
    const absVelocity = useTransform(scrollVelocity, (v) => Math.min(Math.abs(v) * 20, 1));
    const intensity = useSpring(absVelocity, { stiffness: 100, damping: 20 });
    
    const flameScale = useTransform(intensity, [0, 1], [1, 2.5]);
    const flameColor = useTransform(intensity, [0, 1], ["#f97316", "#22d3ee"]); 

    return (
        <div
            aria-hidden
            className="fixed z-[9999] pointer-events-none"
            style={{ right: "4px", bottom: "100px" }}
        >
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ y: rocketY, opacity: rocketOp }}
                className="relative flex flex-col items-center"
            >
                {/* Main Rocket Container with Tilt and Hover Animation */}
                <motion.div
                    style={{ rotateX: tiltX, rotateY: tiltY }}
                    animate={{
                        y: [0, -15, 0],
                        rotateZ: [0, 1.5, -1.5, 0]
                    }}
                    transition={{ 
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        rotateZ: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="relative flex flex-col items-center preserve-3d"
                >
                    {/* Shockwaves (Simpler implementation for better visibility) */}
                    <motion.div
                        style={{ opacity: intensity }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    >
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: [1, 3],
                                    opacity: [0.3, 0],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.33,
                                    ease: "easeOut"
                                }}
                                className="absolute top-0 left-0 w-40 h-40 border border-cyan-500/40 rounded-full"
                                style={{ transform: "translate(-50%, -50%)" }}
                            />
                        ))}
                    </motion.div>

                    {/* SVG ROCKET */}
                    <div className="relative z-20">
                        <svg
                            viewBox="0 0 64 120"
                            width={75}
                            height={140}
                            style={{
                                filter: "drop-shadow(0 0 25px rgba(34,211,238,0.5))",
                                overflow: "visible",
                            }}
                        >
                            <defs>
                                <linearGradient id="rocket-silver-v3" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#94a3b8" />
                                    <stop offset="50%" stopColor="#f1f5f9" />
                                    <stop offset="100%" stopColor="#64748b" />
                                </linearGradient>
                                <linearGradient id="rocket-accent-v3" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#22d3ee" />
                                    <stop offset="100%" stopColor="#2563eb" />
                                </linearGradient>
                            </defs>

                            {/* Nose */}
                            <path d="M32,0 C20,20 14,50 14,75 L50,75 C50,50 44,20 32,0Z" fill="url(#rocket-silver-v3)" />
                            
                            {/* Body */}
                            <rect x="14" y="73" width="36" height="34" rx="2" fill="url(#rocket-silver-v3)" />
                            
                            {/* Cockpit */}
                            <circle cx="32" cy="50" r="10" fill="#020617" stroke="#22d3ee" strokeWidth="2.5" />
                            <circle cx="28" cy="46" r="4" fill="white" fillOpacity="0.4" />

                            {/* Fins */}
                            <path d="M14,80 L0,110 L14,102 Z" fill="url(#rocket-accent-v3)" />
                            <path d="M50,80 L64,110 L50,102 Z" fill="url(#rocket-accent-v3)" />

                            {/* Nozzle Aligned at Y=107 */}
                            <path d="M20,107 L16,120 L48,120 L44,107 Z" fill="#1e293b" />
                            
                            {/* Nozzle Glow */}
                            <motion.ellipse 
                                animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.1, 0.95] }}
                                transition={{ duration: 0.12, repeat: Infinity }}
                                cx="32" cy="120" rx="14" ry="4" fill="#22d3ee" 
                            />
                        </svg>

                        {/* FLAME POSITIONED AT SVG NOZZLE EXIT */}
                        <div className="absolute top-[120px] left-1/2 -translate-x-1/2 flex flex-col items-center">
                            {/* Large Ambient Glow */}
                            <motion.div
                                style={{ scale: flameScale, opacity: 0.4 }}
                                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 0.08, repeat: Infinity }}
                                className="absolute top-0 w-20 h-40 bg-cyan-400/25 rounded-full blur-3xl"
                            />

                            {/* Main Outer Flame */}
                            <motion.div
                                style={{ 
                                    scaleY: flameScale,
                                    backgroundColor: flameColor,
                                    boxShadow: "0 0 50px rgba(34,211,238,0.7)"
                                }}
                                animate={{
                                    scaleX: [0.8, 1.2, 0.8],
                                    opacity: [0.7, 1, 0.7]
                                }}
                                transition={{ duration: 0.1, repeat: Infinity }}
                                className="w-12 h-28 rounded-b-full origin-top blur-[3px]"
                            />

                            {/* High-Heat Inner Core */}
                            <motion.div
                                style={{ scaleY: useTransform(flameScale, (s) => s * 0.65) }}
                                animate={{ scaleX: [0.6, 1.4, 0.6], opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 0.05, repeat: Infinity }}
                                className="absolute top-0 w-5 h-20 bg-white rounded-b-full origin-top blur-[1px] z-10"
                            />
                        </div>
                    </div>

                    {/* ENGINE PARTICLES */}
                    <div className="absolute top-[130px] left-1/2">
                        {PARTICLES.map(p => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    y: [0, p.yDrift * 1.5],
                                    x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 80],
                                    scale: [1, 0]
                                }}
                                transition={{
                                    duration: p.dur,
                                    repeat: Infinity,
                                    delay: p.delay,
                                    ease: "easeOut"
                                }}
                                className="absolute rounded-full"
                                style={{
                                    width: p.size,
                                    height: p.size,
                                    background: "white",
                                    boxShadow: "0 0 15px rgba(34,211,238,1)"
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
});

RocketMotion.displayName = "RocketMotion";
