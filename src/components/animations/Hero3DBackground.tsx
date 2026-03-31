"use client";

import React, { useRef } from "react";
import { useTheme } from "next-themes";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero3DBackground() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Premium Parallax - The grid moves slightly slower than the user scrolls
    // As the user scrolls 1000px down, the background shifts 20% down
    const yParallax = useTransform(scrollY, [0, 1000], ["0%", "20%"]);
    const opacityFade = useTransform(scrollY, [0, 800], [1, 0]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">

            {/* 1. Animated Volumetric Orbs (Pure CSS) */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div
                    className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-slow-spin"
                    style={{
                        background: isDark ? "radial-gradient(circle, rgba(118,75,162,0.6) 0%, rgba(10,14,39,0) 70%)" : "radial-gradient(circle, rgba(102,126,234,0.4) 0%, rgba(244,245,247,0) 70%)"
                    }}
                />
                <div
                    className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-reverse-spin"
                    style={{
                        background: isDark ? "radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(10,14,39,0) 70%)" : "radial-gradient(circle, rgba(118,75,162,0.3) 0%, rgba(244,245,247,0) 70%)"
                    }}
                />
            </div>

            {/* 2. Algorithmic Data Grid (SVG Mesh) */}
            <motion.div
                style={{
                    y: yParallax,
                    opacity: opacityFade,
                    willChange: "transform, opacity"
                }}
                className="absolute inset-0 z-10 w-full h-[150vh] origin-top opacity-50 dark:opacity-40"
            >
                {/* The Grid lines */}
                <div
                    className="absolute inset-0 bg-transparent"
                    style={{
                        backgroundImage: isDark
                            ? "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)"
                            : "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
                        backgroundSize: "60px 60px"
                    }}
                />

                {/* The Grid Intersections (Dots) */}
                <div
                    className="absolute inset-0 bg-transparent"
                    style={{
                        backgroundImage: isDark
                            ? "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)"
                            : "radial-gradient(rgba(0,0,0,0.2) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                        backgroundPosition: "-1px -1px"
                    }}
                />
            </motion.div>

            {/* 3. Radial Vignette Mask (Fades the grid at the edges of the screen) */}
            <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                    background: isDark
                        ? "radial-gradient(circle at center, transparent 0%, var(--background) 80%)"
                        : "radial-gradient(circle at center, transparent 0%, var(--background) 90%)"
                }}
            />

            {/* 4. Bottom Horizon Fade (Prevents the grid from clipping suddenly into the Footer) */}
            <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-background via-background/80 to-transparent z-30 pointer-events-none" />

        </div>
    );
}
