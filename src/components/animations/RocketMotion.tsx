"use client";

import React, { memo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Generate stable particle positions once (not inside render)
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    xOffset: (i % 2 === 0 ? 1 : -1) * (2 + i * 2.5),
    delay:   i * 0.12,
    size:    Math.max(1.5, 3.5 - i * 0.3),
    yDrift:  24 + i * 10,
    color:   i < 3 ? "rgba(253,224,71,0.9)" : i < 6 ? "rgba(249,115,22,0.7)" : "rgba(239,68,68,0.4)",
    dur:     0.55 + i * 0.08,
}));

export const RocketMotion = memo(() => {
    const { scrollYProgress } = useScroll();

    const smoothed = useSpring(scrollYProgress, { stiffness: 55, damping: 22, restDelta: 0.001 });

    // Scroll-driven liftoff — rocket rises from lower-right and fades out near top
    const rocketY   = useTransform(smoothed, [0, 1], [0, -700]);
    const rocketOp  = useTransform(smoothed, [0, 0.04, 0.82, 1], [0.3, 1, 1, 0]);
    const flameScl  = useTransform(smoothed, [0, 0.12, 1], [0.55, 1, 2.4]);
    const glowOp    = useTransform(smoothed, [0, 0.1, 1], [0.15, 0.55, 1]);

    return (
        <div
            aria-hidden
            className="fixed pointer-events-none z-[1]"
            style={{ right: "4%", bottom: "4%", width: 72 }}
        >
            <motion.div
                style={{ y: rocketY, opacity: rocketOp }}
                className="relative flex flex-col items-center"
            >
                {/* ─── Idle float & tilt ─── */}
                <motion.div
                    animate={{
                        y:       [0, -8, 0, -5, 0],
                        rotate:  [0, 1.5, 0, -1, 0],
                    }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative flex flex-col items-center"
                >
                    {/* ═══ ROCKET BODY ═══ */}
                    <svg
                        viewBox="0 0 64 110"
                        width={64}
                        height={110}
                        style={{
                            filter:
                                "drop-shadow(0 0 10px rgba(0,163,255,0.7)) drop-shadow(0 0 24px rgba(0,163,255,0.25))",
                        }}
                    >
                        <defs>
                            {/* Body gradient — cool silver-blue */}
                            <linearGradient id="rBody" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%"   stopColor="#b8d8ff" />
                                <stop offset="45%"  stopColor="#ffffff" />
                                <stop offset="100%" stopColor="#8db8e8" />
                            </linearGradient>
                            {/* Fin gradient */}
                            <linearGradient id="rFin" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%"   stopColor="#004ccc" />
                                <stop offset="100%" stopColor="#00A3FF" />
                            </linearGradient>
                            {/* Cockpit radial */}
                            <radialGradient id="rCock" cx="35%" cy="30%">
                                <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.95" />
                                <stop offset="50%"  stopColor="#22d3ee" stopOpacity="0.6"  />
                                <stop offset="100%" stopColor="#003399" stopOpacity="0.9"  />
                            </radialGradient>
                            {/* Inner glow for nozzle */}
                            <radialGradient id="rNoz" cx="50%" cy="0%">
                                <stop offset="0%"   stopColor="#f97316" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#1a2a5a"  stopOpacity="1"   />
                            </radialGradient>
                            {/* Accent stripe */}
                            <linearGradient id="rStripe" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%"   stopColor="#00A3FF" stopOpacity="0.2" />
                                <stop offset="50%"  stopColor="#22d3ee" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#00A3FF" stopOpacity="0.2" />
                            </linearGradient>
                        </defs>

                        {/* Nose cone */}
                        <path
                            d="M32,2 C26,16 20,40 20,64 L44,64 C44,40 38,16 32,2Z"
                            fill="url(#rBody)"
                            stroke="rgba(0,163,255,0.35)"
                            strokeWidth="0.8"
                        />
                        {/* Cylinder body */}
                        <rect x="20" y="62" width="24" height="32" rx="1.5"
                              fill="url(#rBody)" stroke="rgba(0,163,255,0.25)" strokeWidth="0.7" />

                        {/* Accent stripe bands */}
                        <rect x="20" y="68" width="24" height="3" rx="0.5" fill="url(#rStripe)" />
                        <rect x="20" y="82" width="24" height="3" rx="0.5" fill="url(#rStripe)" />

                        {/* Panel lines */}
                        <line x1="32" y1="12" x2="32" y2="93" stroke="rgba(0,163,255,0.22)" strokeWidth="0.7" />
                        <line x1="22" y1="64" x2="42" y2="64" stroke="rgba(0,163,255,0.18)" strokeWidth="0.6" />

                        {/* Cockpit window */}
                        <circle cx="32" cy="46" r="9" fill="url(#rCock)" stroke="#00A3FF" strokeWidth="1.2" />
                        {/* Window highlight */}
                        <ellipse cx="29" cy="43" rx="3" ry="2.5" fill="rgba(255,255,255,0.65)" />

                        {/* Left fin */}
                        <path d="M20,76 L6,100 L20,96 Z" fill="url(#rFin)"
                              stroke="rgba(0,163,255,0.3)" strokeWidth="0.7" />
                        {/* Right fin */}
                        <path d="M44,76 L58,100 L44,96 Z" fill="url(#rFin)"
                              stroke="rgba(0,163,255,0.3)" strokeWidth="0.7" />

                        {/* Booster nozzle */}
                        <path d="M22,93 L19,106 L45,106 L42,93 Z" fill="url(#rNoz)"
                              stroke="rgba(0,163,255,0.3)" strokeWidth="0.7" />

                        {/* Nozzle inner ring */}
                        <ellipse cx="32" cy="106" rx="13" ry="3.5"
                                 fill="rgba(15,15,40,0.9)" stroke="rgba(249,115,22,0.5)" strokeWidth="1" />
                    </svg>

                    {/* ═══ ENGINE FLAME ═══ */}
                    <motion.div
                        style={{ scaleY: flameScl, transformOrigin: "top" }}
                        className="relative flex items-start justify-center"
                        style={{ width: 72, marginTop: -6, transformOrigin: "top" }}
                    >
                        {/* Wide outer plume — orange */}
                        <motion.div
                            animate={{
                                scaleY:  [1, 1.12, 0.92, 1.08, 1],
                                scaleX:  [1, 1.08, 0.96, 1.05, 1],
                                opacity: [0.65, 0.9, 0.7, 0.92, 0.65],
                            }}
                            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 left-1/2 -translate-x-1/2 origin-top rounded-b-full"
                            style={{
                                width: 28, height: 64,
                                background:
                                    "radial-gradient(ellipse at 50% 0%, rgba(249,115,22,1) 0%, rgba(239,68,68,0.55) 45%, transparent 78%)",
                            }}
                        />

                        {/* Mid flame — deep yellow */}
                        <motion.div
                            animate={{
                                scaleY:  [1, 1.22, 0.85, 1.15, 1],
                                opacity: [0.9, 1, 0.8, 1, 0.9],
                            }}
                            transition={{ duration: 0.28, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 left-1/2 -translate-x-1/2 origin-top"
                            style={{
                                width: 14, height: 46,
                                background:
                                    "radial-gradient(ellipse at 50% 0%, rgba(253,224,71,1) 0%, rgba(249,115,22,0.85) 55%, transparent 88%)",
                            }}
                        />

                        {/* Inner hot core — white/blue */}
                        <motion.div
                            animate={{
                                scaleY:  [1, 1.35, 0.75, 1.25, 1],
                                opacity: [0.7, 1, 0.55, 1, 0.7],
                            }}
                            transition={{ duration: 0.09, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-1/2 -translate-x-1/2 origin-top rounded-b-full"
                            style={{
                                width: 6, height: 32,
                                background:
                                    "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,1) 0%, rgba(180,230,255,0.9) 45%, transparent 90%)",
                            }}
                        />

                        {/* Spacer */}
                        <div style={{ height: 64, width: 28 }} />
                    </motion.div>

                    {/* ═══ GLOW POOL ═══ */}
                    <motion.div
                        style={{ opacity: glowOp }}
                        className="absolute pointer-events-none rounded-full"
                        style={{
                            bottom: -4,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 90,
                            height: 90,
                            background:
                                "radial-gradient(circle, rgba(249,115,22,0.4) 0%, rgba(255,60,0,0.12) 45%, transparent 70%)",
                            filter: "blur(14px)",
                        }}
                    />

                    {/* ═══ EXHAUST PARTICLES ═══ */}
                    {PARTICLES.map(p => (
                        <motion.div
                            key={p.id}
                            className="absolute rounded-full pointer-events-none"
                            style={{
                                width:  p.size,
                                height: p.size,
                                left:  `calc(50% + ${p.xOffset}px)`,
                                bottom: 68 + p.id * 12,
                                background: p.color,
                            }}
                            animate={{
                                opacity: [0, 0.85, 0],
                                y:      [0, p.yDrift],
                                scale:  [1, 0.15],
                            }}
                            transition={{
                                duration: p.dur,
                                repeat:   Infinity,
                                delay:    p.delay,
                                ease:     "easeOut",
                            }}
                        />
                    ))}

                    {/* ═══ HEAT SHIMMER RING ═══ */}
                    <motion.div
                        animate={{
                            scale:   [1, 1.3, 1],
                            opacity: [0.3, 0.08, 0.3],
                        }}
                        transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute pointer-events-none rounded-full"
                        style={{
                            bottom: 100,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 34,
                            height: 18,
                            background: "rgba(253,224,71,0.5)",
                            filter: "blur(6px)",
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
});

RocketMotion.displayName = "RocketMotion";
