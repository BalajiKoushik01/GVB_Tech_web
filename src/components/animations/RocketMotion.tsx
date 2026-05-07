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

                {/* Engine Flame (Lightweight Circle Logic - No Blur) */}
                <motion.div
                    style={{ scaleY: flameScale, opacity: flameOpacity }}
                    className="mt-[-2px] origin-top flex flex-col items-center"
                >
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.05, 0.98, 1.08, 1],
                            opacity: [0.9, 1, 0.85, 1, 0.9]
                        }}
                        transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-14 h-36 rounded-full" 
                        style={{ background: "radial-gradient(ellipse at top, rgba(253, 224, 71, 0.9) 0%, rgba(249, 115, 22, 0.7) 40%, transparent 70%)" }}
                    />
                    <motion.div 
                        animate={{ 
                            scaleY: [1, 1.1, 0.9, 1.15, 1],
                            opacity: [0.9, 1, 0.8, 1, 0.9]
                        }}
                        transition={{ duration: 0.15, repeat: Infinity, ease: "easeInOut" }}
                        className="w-6 h-24 absolute top-0 left-1/2 -translate-x-1/2 opacity-90"
                        style={{ background: "radial-gradient(ellipse at top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 80%)" }}
                    />
                </motion.div>
                
                {/* Thruster Glow Background Overlay (No Blur) */}
                <motion.div
                    style={{ 
                        opacity: flameOpacity,
                        background: "radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, transparent 60%)" 
                    }}
                    className="absolute bottom-[-60px] w-[200px] h-[200px] rounded-full z-[-1]"
                />
            </motion.div>
        </div>
    );
});

RocketMotion.displayName = "RocketMotion";
