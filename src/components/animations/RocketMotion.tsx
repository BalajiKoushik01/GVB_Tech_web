"use client";

import React, { memo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const RocketMotion = memo(() => {
    const { scrollYProgress } = useScroll();

    // Smooth physics for lightweight 2D reactions
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 40,
        restDelta: 0.001
    });

    // High-Efficiency Viewport Glide (Infinite Visibility V14.2)
    const yTransform = useTransform(smoothProgress, [0, 1], ["20vh", "-20vh"]);
    const flameScale = useTransform(smoothProgress, [0, 0.1, 1], [0, 1, 1.8]);
    const flameOpacity = useTransform(smoothProgress, [0, 0.05, 1], [0, 1, 1]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[1] flex items-center justify-center overflow-hidden">
            <motion.div
                style={{ y: yTransform }}
                className="relative flex flex-col items-center"
            >
                {/* 2D High-Performance SVG Rocket (Recovery V9.0) */}
                <svg 
                    width="160" 
                    height="240" 
                    viewBox="0 0 100 150" 
                    className="drop-shadow-[0_20px_50px_rgba(0,163,255,0.2)]"
                >
                    {/* Rocket Body (Single Path for Efficiency) */}
                    <path 
                        d="M50,10 C50,10 20,60 20,100 L20,130 L80,130 L80,100 C80,60 50,10 50,10Z" 
                        fill="rgba(255,255,255,0.9)" 
                        stroke="#00A3FF" 
                        strokeWidth="2"
                    />
                    {/* Rocket Window */}
                    <circle cx="50" cy="65" r="12" fill="rgba(0,163,255,0.1)" stroke="#00A3FF" strokeWidth="1.5" />
                    {/* Side Fins */}
                    <path d="M20,110 L5,135 L20,135 Z" fill="#00A3FF" />
                    <path d="M80,110 L95,135 L80,135 Z" fill="#00A3FF" />
                </svg>

                {/* Engine Flame (Lightweight Circle Logic) */}
                <motion.div
                    style={{ scaleY: flameScale, opacity: flameOpacity }}
                    className="mt-[-2px] origin-top"
                >
                    <div className="w-10 h-32 bg-gradient-to-b from-launch-yellow via-launch-orange to-transparent blur-[16px] rounded-full" />
                    <div className="w-6 h-20 bg-white absolute top-0 left-1/2 -translate-x-1/2 blur-[8px] opacity-70" />
                </motion.div>
                
                {/* Thruster Glow Background Overlay */}
                <motion.div
                    style={{ opacity: flameOpacity }}
                    className="absolute bottom-[-50px] w-[150px] h-[150px] bg-launch-orange/10 blur-[80px] rounded-full z-[-1]"
                />
            </motion.div>
        </div>
    );
});

RocketMotion.displayName = "RocketMotion";
