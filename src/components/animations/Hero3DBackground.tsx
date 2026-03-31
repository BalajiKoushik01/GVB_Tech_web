"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero3DBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Premium Parallax - High Performance
    const yParallax = useTransform(scrollY, [0, 1000], ["0vh", "30vh"]);
    const opacityFade = useTransform(scrollY, [0, 600], [1, 0]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-white">
            {/* 1. Optimized Volumetric Glows (Performance Fix) */}
            <div className="absolute inset-0 z-0 overflow-hidden opacity-40">
                <div
                    className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[64px] will-change-transform animate-slow-pulse"
                    style={{
                        background: "radial-gradient(circle, rgba(102,126,234,0.15) 0%, rgba(255,255,255,0) 70%)"
                    }}
                />
                <div
                    className="absolute bottom-[-5%] right-[-5%] w-[80vw] h-[80vw] rounded-full blur-[80px] will-change-transform animate-reverse-pulse"
                    style={{
                        background: "radial-gradient(circle, rgba(0,163,255,0.1) 0%, rgba(255,255,255,0) 70%)"
                    }}
                />
            </div>

            {/* 2. Precision Data Grid */}
            <motion.div
                style={{
                    y: yParallax,
                    opacity: opacityFade,
                    willChange: "transform, opacity"
                }}
                className="absolute inset-0 z-10 w-full h-[120vh] origin-top opacity-30"
            >
                <div
                    className="absolute inset-0 bg-transparent"
                    style={{
                        backgroundImage: "linear-gradient(to right, rgba(0,163,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,163,255,0.1) 1px, transparent 1px)",
                        backgroundSize: "80px 80px"
                    }}
                />
            </motion.div>

            {/* 3. Radial Fade Mask */}
            <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, transparent 0%, white 95%)"
                }}
            />

            {/* 4. Bottom Horizon Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-white via-white/80 to-transparent z-30 pointer-events-none" />
        </div>
    );
}
