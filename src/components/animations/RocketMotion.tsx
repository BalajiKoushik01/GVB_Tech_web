"use client";

import React, { memo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const RocketMotion = memo(() => {
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 30,
        restDelta: 0.001
    });

    // Rocket glides UP as you scroll — starts visible in lower viewport, flies off top
    const yTransform = useTransform(smoothProgress, [0, 1], ["0vh", "-80vh"]);
    const rocketOpacity = useTransform(smoothProgress, [0, 0.05, 0.8, 1], [0.5, 1, 1, 0]);

    // Flame is always alive — flickers on idle, scales up with scroll speed
    const flameScale = useTransform(smoothProgress, [0, 0.1, 1], [0.7, 1, 2.2]);
    const glowOpacity = useTransform(smoothProgress, [0, 0.1, 1], [0.3, 0.6, 1]);

    return (
        // Positioned at bottom-right of hero, fixed to viewport
        <div
            className="fixed pointer-events-none z-[1] overflow-hidden"
            style={{ right: "8%", bottom: "10%", width: "120px", height: "260px" }}
        >
            <motion.div
                style={{ y: yTransform, opacity: rocketOpacity }}
                className="relative flex flex-col items-center w-full h-full"
            >
                {/* === ROCKET BODY === */}
                <svg
                    viewBox="0 0 100 160"
                    className="w-16 h-24 md:w-24 md:h-36 drop-shadow-[0_0_24px_rgba(0,163,255,0.5)] relative z-10"
                    style={{ filter: "drop-shadow(0 0 12px rgba(0,163,255,0.6))" }}
                >
                    {/* Main Body */}
                    <defs>
                        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#c8e6ff" />
                            <stop offset="50%" stopColor="#ffffff" />
                            <stop offset="100%" stopColor="#a0c8ff" />
                        </linearGradient>
                        <linearGradient id="finGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0066ff" />
                            <stop offset="100%" stopColor="#00A3FF" />
                        </linearGradient>
                        <radialGradient id="windowGrad" cx="40%" cy="35%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                            <stop offset="60%" stopColor="#00A3FF" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#003080" stopOpacity="0.8" />
                        </radialGradient>
                    </defs>

                    {/* Nose cone */}
                    <path
                        d="M50,5 C42,25 35,55 35,90 L65,90 C65,55 58,25 50,5Z"
                        fill="url(#bodyGrad)"
                        stroke="rgba(0,163,255,0.4)"
                        strokeWidth="1"
                    />
                    {/* Body cylinder */}
                    <rect x="35" y="88" width="30" height="45" rx="2" fill="url(#bodyGrad)" stroke="rgba(0,163,255,0.3)" strokeWidth="1" />

                    {/* Panel lines for detail */}
                    <line x1="50" y1="30" x2="50" y2="130" stroke="rgba(0,163,255,0.3)" strokeWidth="0.8" />
                    <line x1="38" y1="90" x2="62" y2="90" stroke="rgba(0,163,255,0.25)" strokeWidth="0.6" />
                    <line x1="37" y1="105" x2="63" y2="105" stroke="rgba(0,163,255,0.2)" strokeWidth="0.6" />

                    {/* Cockpit Window */}
                    <circle cx="50" cy="62" r="11" fill="url(#windowGrad)" stroke="#00A3FF" strokeWidth="1.5" />
                    <circle cx="46" cy="58" r="3" fill="rgba(255,255,255,0.6)" />

                    {/* Left Fin */}
                    <path d="M35,105 L12,138 L35,132 Z" fill="url(#finGrad)" stroke="rgba(0,163,255,0.4)" strokeWidth="0.8" />
                    {/* Right Fin */}
                    <path d="M65,105 L88,138 L65,132 Z" fill="url(#finGrad)" stroke="rgba(0,163,255,0.4)" strokeWidth="0.8" />

                    {/* Booster nozzle */}
                    <path d="M38,132 L35,145 L65,145 L62,132 Z" fill="#1a3a6a" stroke="rgba(0,163,255,0.4)" strokeWidth="0.8" />
                </svg>

                {/* === ENGINE FLAME CLUSTER === */}
                <motion.div
                    style={{ scaleY: flameScale }}
                    className="mt-[-8px] origin-top relative flex items-start justify-center w-24"
                >
                    {/* Outer wide plume */}
                    <motion.div
                        animate={{
                            scaleY: [1, 1.08, 0.95, 1.05, 1],
                            scaleX: [1, 1.06, 0.98, 1.04, 1],
                            opacity: [0.6, 0.85, 0.7, 0.9, 0.6]
                        }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-28 md:w-16 md:h-36 rounded-b-full origin-top"
                        style={{
                            background: "radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.9) 0%, rgba(239,68,68,0.6) 35%, transparent 75%)"
                        }}
                    />
                    {/* Mid blue-white core */}
                    <motion.div
                        animate={{
                            scaleY: [1, 1.15, 0.9, 1.1, 1],
                            opacity: [0.85, 1, 0.8, 1, 0.85]
                        }}
                        transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-20 md:w-10 md:h-28 origin-top"
                        style={{
                            background: "radial-gradient(ellipse at 50% 0%, rgba(253,224,71,1) 0%, rgba(249,115,22,0.9) 45%, transparent 80%)"
                        }}
                    />
                    {/* Bright white inner flicker */}
                    <motion.div
                        animate={{
                            scaleY: [1, 1.25, 0.85, 1.2, 1],
                            opacity: [0.7, 1, 0.6, 1, 0.7]
                        }}
                        transition={{ duration: 0.12, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-14 md:w-4 md:h-20 origin-top rounded-b-full"
                        style={{
                            background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,1) 0%, rgba(200,220,255,0.9) 40%, transparent 90%)"
                        }}
                    />
                    {/* Spacer to give flame div height */}
                    <div className="w-full h-28 md:h-36" />
                </motion.div>

                {/* === THRUSTER GLOW === */}
                <motion.div
                    style={{ opacity: glowOpacity }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full z-[-1] pointer-events-none"
                    style={{
                        background: "radial-gradient(circle, rgba(249,115,22,0.35) 0%, rgba(255,60,0,0.1) 40%, transparent 70%)",
                        filter: "blur(12px)"
                    }}
                />

                {/* === EXHAUST TRAIL PARTICLES === */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            width: `${4 - i * 0.5}px`,
                            height: `${4 - i * 0.5}px`,
                            left: `calc(50% + ${(i % 2 === 0 ? 1 : -1) * (i * 3)}px)`,
                            bottom: `${60 + i * 22}px`,
                            background: i < 2 ? "rgba(253,224,71,0.8)" : "rgba(249,115,22,0.5)",
                        }}
                        animate={{
                            opacity: [0, 0.8, 0],
                            y: [0, 30 + i * 8],
                            scale: [1, 0.3]
                        }}
                        transition={{
                            duration: 0.8 + i * 0.1,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeOut"
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
});

RocketMotion.displayName = "RocketMotion";
