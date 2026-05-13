"use client";

import React, { memo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const RocketMotion = memo(() => {
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 60,
        damping: 25,
        restDelta: 0.001
    });

    // Rocket lifts off as the user scrolls — starts low, flies up
    const yTransform = useTransform(smoothProgress, [0, 1], ["0px", "-600px"]);
    const opacity    = useTransform(smoothProgress, [0, 0.05, 0.85, 1], [0.4, 0.85, 0.85, 0]);

    // Flame always flickering; grows with scroll momentum
    const flameScale = useTransform(smoothProgress, [0, 0.15, 1], [0.6, 1, 2]);

    return (
        // Anchored bottom-right, entirely behind page content (z-[1])
        <div
            aria-hidden
            className="fixed pointer-events-none z-[1]"
            style={{ right: "5%", bottom: "5%", width: "70px" }}
        >
            <motion.div
                style={{ y: yTransform, opacity }}
                className="relative flex flex-col items-center"
            >
                {/* ── Rocket Body ── */}
                <svg
                    viewBox="0 0 60 100"
                    width="60"
                    height="100"
                    style={{ filter: "drop-shadow(0 0 8px rgba(0,163,255,0.5))" }}
                >
                    <defs>
                        <linearGradient id="rb" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%"   stopColor="#c8e6ff" />
                            <stop offset="50%"  stopColor="#ffffff" />
                            <stop offset="100%" stopColor="#a0c8ff" />
                        </linearGradient>
                        <linearGradient id="rf" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%"   stopColor="#0066ff" />
                            <stop offset="100%" stopColor="#00A3FF" />
                        </linearGradient>
                        <radialGradient id="rw" cx="38%" cy="32%">
                            <stop offset="0%"   stopColor="#fff"    stopOpacity="0.9" />
                            <stop offset="60%"  stopColor="#00A3FF" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#003080" stopOpacity="0.8" />
                        </radialGradient>
                    </defs>
                    {/* Nose */}
                    <path d="M30,3 C25,18 20,38 20,58 L40,58 C40,38 35,18 30,3Z" fill="url(#rb)" />
                    {/* Cylinder */}
                    <rect x="20" y="56" width="20" height="28" rx="1" fill="url(#rb)" />
                    {/* Panel lines */}
                    <line x1="30" y1="18" x2="30" y2="82" stroke="rgba(0,163,255,0.25)" strokeWidth="0.6" />
                    <line x1="22" y1="58" x2="38" y2="58" stroke="rgba(0,163,255,0.2)"  strokeWidth="0.5" />
                    {/* Window */}
                    <circle cx="30" cy="42" r="7" fill="url(#rw)" stroke="#00A3FF" strokeWidth="1" />
                    <circle cx="27" cy="39" r="2" fill="rgba(255,255,255,0.55)" />
                    {/* Fins */}
                    <path d="M20,66 L7,86 L20,83 Z"  fill="url(#rf)" />
                    <path d="M40,66 L53,86 L40,83 Z" fill="url(#rf)" />
                    {/* Nozzle */}
                    <path d="M22,83 L20,92 L40,92 L38,83 Z" fill="#1a3a6a" />
                </svg>

                {/* ── Flame Cluster ── */}
                <motion.div
                    style={{ scaleY: flameScale }}
                    className="mt-[-4px] origin-top relative flex items-start justify-center"
                    style={{ width: "60px", marginTop: "-4px", transformOrigin: "top" }}
                >
                    {/* Outer plume */}
                    <motion.div
                        animate={{ scaleY: [1,1.1,0.9,1.05,1], scaleX: [1,1.06,0.97,1.04,1], opacity: [0.6,0.85,0.65,0.9,0.6] }}
                        transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 origin-top rounded-b-full"
                        style={{ width: 24, height: 56,
                            background: "radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.9) 0%, rgba(239,68,68,0.5) 40%, transparent 75%)"
                        }}
                    />
                    {/* Yellow core */}
                    <motion.div
                        animate={{ scaleY: [1,1.18,0.88,1.12,1], opacity: [0.85,1,0.75,1,0.85] }}
                        transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 origin-top"
                        style={{ width: 12, height: 40,
                            background: "radial-gradient(ellipse at 50% 0%, rgba(253,224,71,1) 0%, rgba(249,115,22,0.8) 50%, transparent 85%)"
                        }}
                    />
                    {/* White inner flicker */}
                    <motion.div
                        animate={{ scaleY: [1,1.3,0.8,1.2,1], opacity: [0.6,1,0.5,1,0.6] }}
                        transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 origin-top rounded-b-full"
                        style={{ width: 6, height: 28,
                            background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,1) 0%, rgba(200,220,255,0.8) 50%, transparent 90%)"
                        }}
                    />
                    {/* Spacer */}
                    <div style={{ height: 56, width: 24 }} />
                </motion.div>

                {/* ── Glow puddle under nozzle ── */}
                <motion.div
                    style={{ opacity: useTransform(smoothProgress, [0, 0.1, 1], [0.2, 0.5, 0.9]) }}
                    className="absolute pointer-events-none rounded-full"
                    style={{
                        bottom: 0, left: "50%", transform: "translateX(-50%)",
                        width: 80, height: 80,
                        background: "radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 70%)",
                        filter: "blur(10px)",
                    }}
                />

                {/* ── Exhaust particles ── */}
                {[0,1,2,3].map(i => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            width: 3 - i * 0.4,
                            height: 3 - i * 0.4,
                            left: `calc(50% + ${(i%2===0?1:-1)*i*4}px)`,
                            bottom: 60 + i * 18,
                            background: i < 2 ? "rgba(253,224,71,0.75)" : "rgba(249,115,22,0.45)",
                        }}
                        animate={{ opacity: [0,0.8,0], y: [0, 20+i*6], scale: [1, 0.2] }}
                        transition={{ duration: 0.7+i*0.1, repeat: Infinity, delay: i*0.15, ease: "easeOut" }}
                    />
                ))}
            </motion.div>
        </div>
    );
});

RocketMotion.displayName = "RocketMotion";
