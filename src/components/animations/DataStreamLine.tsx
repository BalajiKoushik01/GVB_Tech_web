"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const DataStreamLine = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const pathLength = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40 overflow-hidden">
            <svg 
                className="w-full h-[200%] absolute top-0" 
                viewBox="0 0 100 1000" 
                preserveAspectRatio="none"
            >
                {/* Glowing Trail Background */}
                <path
                    d="M 50 0 C 80 200, 20 400, 50 600 C 80 800, 20 1000, 50 1000"
                    fill="transparent"
                    stroke="rgba(34,211,238,0.1)"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                />
                {/* Animated Draw Line */}
                <motion.path
                    d="M 50 0 C 80 200, 20 400, 50 600 C 80 800, 20 1000, 50 1000"
                    fill="transparent"
                    stroke="url(#glow-gradient)"
                    strokeWidth="2"
                    style={{ pathLength }}
                    vectorEffect="non-scaling-stroke"
                    className="drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                />
                <defs>
                    <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
                        <stop offset="50%" stopColor="#6366F1" stopOpacity="1" />
                        <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};
