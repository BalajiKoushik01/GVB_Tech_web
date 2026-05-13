"use client";

import React, { memo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Stable particle data — computed once outside component, never recreates on re-render
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
    id:      i,
    xOffset: (i % 2 === 0 ? 1 : -1) * (2 + i * 2.5),
    delay:   i * 0.12,
    size:    Math.max(1.5, 3.5 - i * 0.3),
    yDrift:  22 + i * 9,
    color:   i < 3 ? "rgba(253,224,71,0.9)" : i < 6 ? "rgba(249,115,22,0.7)" : "rgba(239,68,68,0.4)",
    dur:     0.55 + i * 0.08,
}));

export const RocketMotion = memo(() => {
    const { scrollYProgress } = useScroll();

    // Smooth spring — eliminates scroll jitter
    const smoothed = useSpring(scrollYProgress, { stiffness: 55, damping: 22, restDelta: 0.001 });

    // ── Scroll-driven values ──────────────────────────────────────────────────────
    // Rocket rises from 0 → -600px as page scrolls, fades out at the very end
    const rocketY  = useTransform(smoothed, [0, 1],          [0, -600]);
    const rocketOp = useTransform(smoothed, [0, 0.75, 1],    [1, 1, 0]);   // start FULLY VISIBLE

    // Flame grows slightly as rocket "accelerates" with scroll
    const flameScl = useTransform(smoothed, [0, 0.25, 1],    [1, 1.4, 2.2]);

    // Glow pulse intensity increases with scroll speed
    const glowOp   = useTransform(smoothed, [0, 1],          [0.4, 0.95]);

    return (
        // ── Positioning ──────────────────────────────────────────────────────────
        // right: 5%  →  clear of scroll-to-top (bottom-left) and nav (top)
        // bottom: 28%  →  well above floating widgets (bottom-6 ≈ 24px from bottom)
        <div
            aria-hidden
            className="fixed pointer-events-none z-[1]"
            style={{ right: "5%", bottom: "28%" }}
        >
            {/* Scroll-driven liftoff */}
            <motion.div
                style={{ y: rocketY, opacity: rocketOp }}
                className="relative flex flex-col items-center"
            >
                {/* ── Idle float & wobble — wraps rocket + flame together ─────────── */}
                <motion.div
                    animate={{
                        y:      [0, -7, 0, -4, 0],
                        rotate: [0, 1.2, 0, -1.2, 0],
                    }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                    className="relative flex flex-col items-center"
                >
                    {/* ═══════════════ ROCKET BODY SVG ═══════════════ */}
                    <svg
                        viewBox="0 0 64 110"
                        width={64}
                        height={110}
                        style={{
                            filter:
                                "drop-shadow(0 0 10px rgba(0,163,255,0.75)) drop-shadow(0 0 22px rgba(0,163,255,0.28))",
                            overflow: "visible",
                        }}
                    >
                        <defs>
                            <linearGradient id="gvb-rBody" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%"   stopColor="#b8d8ff" />
                                <stop offset="45%"  stopColor="#ffffff" />
                                <stop offset="100%" stopColor="#8db8e8" />
                            </linearGradient>
                            <linearGradient id="gvb-rFin" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%"   stopColor="#004ccc" />
                                <stop offset="100%" stopColor="#00A3FF" />
                            </linearGradient>
                            <radialGradient id="gvb-rCock" cx="35%" cy="30%">
                                <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.95" />
                                <stop offset="50%"  stopColor="#22d3ee" stopOpacity="0.6"  />
                                <stop offset="100%" stopColor="#003399" stopOpacity="0.9"  />
                            </radialGradient>
                            <radialGradient id="gvb-rNoz" cx="50%" cy="0%">
                                <stop offset="0%"   stopColor="#f97316" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#1a2a5a" stopOpacity="1"   />
                            </radialGradient>
                            <linearGradient id="gvb-rStripe" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%"   stopColor="#00A3FF" stopOpacity="0.15" />
                                <stop offset="50%"  stopColor="#22d3ee" stopOpacity="0.55" />
                                <stop offset="100%" stopColor="#00A3FF" stopOpacity="0.15" />
                            </linearGradient>
                        </defs>

                        {/* Nose cone */}
                        <path
                            d="M32,2 C26,16 20,40 20,64 L44,64 C44,40 38,16 32,2Z"
                            fill="url(#gvb-rBody)"
                            stroke="rgba(0,163,255,0.35)"
                            strokeWidth="0.8"
                        />
                        {/* Cylinder body */}
                        <rect x="20" y="62" width="24" height="32" rx="1.5"
                              fill="url(#gvb-rBody)"
                              stroke="rgba(0,163,255,0.25)"
                              strokeWidth="0.7"
                        />

                        {/* Accent stripe bands */}
                        <rect x="20" y="68" width="24" height="2.5" rx="0.5" fill="url(#gvb-rStripe)" />
                        <rect x="20" y="80" width="24" height="2.5" rx="0.5" fill="url(#gvb-rStripe)" />

                        {/* Panel centre line */}
                        <line x1="32" y1="10" x2="32" y2="93"
                              stroke="rgba(0,163,255,0.22)"
                              strokeWidth="0.7"
                        />
                        <line x1="22" y1="64" x2="42" y2="64"
                              stroke="rgba(0,163,255,0.18)"
                              strokeWidth="0.6"
                        />

                        {/* Cockpit window */}
                        <circle cx="32" cy="46" r="9"
                                fill="url(#gvb-rCock)"
                                stroke="#00A3FF"
                                strokeWidth="1.2"
                        />
                        {/* Window specular highlight */}
                        <ellipse cx="29" cy="43" rx="3" ry="2.5"
                                 fill="rgba(255,255,255,0.65)"
                        />

                        {/* Left fin */}
                        <path d="M20,76 L6,100 L20,96 Z"
                              fill="url(#gvb-rFin)"
                              stroke="rgba(0,163,255,0.3)"
                              strokeWidth="0.7"
                        />
                        {/* Right fin */}
                        <path d="M44,76 L58,100 L44,96 Z"
                              fill="url(#gvb-rFin)"
                              stroke="rgba(0,163,255,0.3)"
                              strokeWidth="0.7"
                        />

                        {/* Nozzle bell */}
                        <path d="M22,93 L19,106 L45,106 L42,93 Z"
                              fill="url(#gvb-rNoz)"
                              stroke="rgba(0,163,255,0.3)"
                              strokeWidth="0.7"
                        />
                        {/* Nozzle exit ring */}
                        <ellipse cx="32" cy="106" rx="13" ry="3.5"
                                 fill="rgba(15,15,40,0.9)"
                                 stroke="rgba(249,115,22,0.5)"
                                 strokeWidth="1"
                        />
                    </svg>

                    {/* ═══════════════ ENGINE FLAME ═══════════════ */}
                    {/*
                     * IMPORTANT: All style properties are in ONE style object.
                     * Framer Motion motion values (flameScl) MUST be in the same
                     * style prop as regular CSS — two separate style attributes
                     * on the same element is invalid JSX; React silently drops
                     * the first one, so motion values would not animate.
                     */}
                    <motion.div
                        style={{
                            // ─ scroll-driven motion value ─
                            scaleY:          flameScl,
                            // ─ regular CSS ─
                            transformOrigin: "top center",
                            width:           60,
                            marginTop:       -8,
                            position:        "relative" as const,
                            display:         "flex",
                            alignItems:      "flex-start",
                            justifyContent:  "center",
                        }}
                    >
                        {/* Outer wide plume — orange/red */}
                        <motion.div
                            animate={{
                                scaleY:  [1, 1.1, 0.94, 1.06, 1],
                                scaleX:  [1, 1.07, 0.97, 1.04, 1],
                                opacity: [0.7, 0.9, 0.72, 0.92, 0.7],
                            }}
                            transition={{ duration: 0.52, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                position:   "absolute",
                                top:        0,
                                left:       "50%",
                                transform:  "translateX(-50%)",
                                transformOrigin: "top center",
                                width:      26,
                                height:     60,
                                borderRadius: "0 0 50% 50%",
                                background: "radial-gradient(ellipse at 50% 0%, rgba(249,115,22,1) 0%, rgba(239,68,68,0.5) 45%, transparent 76%)",
                            }}
                        />

                        {/* Mid flame — deep yellow */}
                        <motion.div
                            animate={{
                                scaleY:  [1, 1.2, 0.88, 1.14, 1],
                                opacity: [0.88, 1, 0.78, 1, 0.88],
                            }}
                            transition={{ duration: 0.27, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                position:   "absolute",
                                top:        0,
                                left:       "50%",
                                transform:  "translateX(-50%)",
                                transformOrigin: "top center",
                                width:      13,
                                height:     44,
                                background: "radial-gradient(ellipse at 50% 0%, rgba(253,224,71,1) 0%, rgba(249,115,22,0.85) 55%, transparent 88%)",
                            }}
                        />

                        {/* Inner plasma core — white/blue */}
                        <motion.div
                            animate={{
                                scaleY:  [1, 1.3, 0.78, 1.22, 1],
                                opacity: [0.7, 1, 0.6, 1, 0.7],
                            }}
                            transition={{ duration: 0.08, repeat: Infinity, ease: "linear" }}
                            style={{
                                position:   "absolute",
                                top:        0,
                                left:       "50%",
                                transform:  "translateX(-50%)",
                                transformOrigin: "top center",
                                width:      5,
                                height:     30,
                                borderRadius: "0 0 50% 50%",
                                background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,1) 0%, rgba(180,230,255,0.9) 48%, transparent 92%)",
                            }}
                        />

                        {/* Spacer div — gives the flex container a rendered height */}
                        <div style={{ width: 26, height: 60 }} />
                    </motion.div>

                    {/* ═══════════════ AMBIENT GLOW POOL ═══════════════ */}
                    {/*
                     * SAME RULE: merge motion values + CSS into ONE style object.
                     * glowOp is a MotionValue and must sit alongside regular CSS.
                     */}
                    <motion.div
                        style={{
                            opacity:         glowOp,
                            position:        "absolute" as const,
                            bottom:          -6,
                            left:            "50%",
                            translateX:      "-50%",
                            width:           88,
                            height:          88,
                            borderRadius:    "50%",
                            background:      "radial-gradient(circle, rgba(249,115,22,0.38) 0%, rgba(255,60,0,0.1) 45%, transparent 70%)",
                            filter:          "blur(14px)",
                            pointerEvents:   "none" as const,
                        }}
                    />

                    {/* ═══════════════ EXHAUST PARTICLES ═══════════════ */}
                    {PARTICLES.map(p => (
                        <motion.div
                            key={p.id}
                            animate={{
                                opacity: [0, 0.8, 0],
                                y:       [0, p.yDrift],
                                scale:   [1, 0.12],
                            }}
                            transition={{
                                duration: p.dur,
                                repeat:   Infinity,
                                delay:    p.delay,
                                ease:     "easeOut",
                            }}
                            style={{
                                position:     "absolute" as const,
                                width:        p.size,
                                height:       p.size,
                                borderRadius: "50%",
                                left:         `calc(50% + ${p.xOffset}px)`,
                                bottom:       62 + p.id * 11,
                                background:   p.color,
                                pointerEvents:"none" as const,
                            }}
                        />
                    ))}

                    {/* ═══════════════ HEAT SHIMMER RING ═══════════════ */}
                    <motion.div
                        animate={{
                            scale:   [1, 1.28, 1],
                            opacity: [0.28, 0.06, 0.28],
                        }}
                        transition={{ duration: 0.32, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            position:     "absolute" as const,
                            bottom:       98,
                            left:         "50%",
                            translateX:   "-50%",
                            width:        32,
                            height:       16,
                            borderRadius: "50%",
                            background:   "rgba(253,224,71,0.55)",
                            filter:       "blur(5px)",
                            pointerEvents:"none" as const,
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
});

RocketMotion.displayName = "RocketMotion";
