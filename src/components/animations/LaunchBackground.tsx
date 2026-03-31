"use client";

import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const LaunchBackground = () => {
    const { scrollYProgress } = useScroll();

    // Smooth spring physics for transitions
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Color Interpolation: Sky Blue (#E0F2FE) -> Yellow (#FDE047) -> Orange (#F97316) -> Red (#EF4444)
    const bgColor = useTransform(
        smoothProgress,
        [0, 0.3, 0.6, 1],
        ["#E0F2FE", "#FDE047", "#F97316", "#EF4444"]
    );

    // Rocket Exhaust Glow
    const glowOpacity = useTransform(smoothProgress, [0, 0.2, 1], [0, 0.4, 0.8]);
    const glowScale = useTransform(smoothProgress, [0, 0.2, 1], [0.8, 1.2, 2]);

    return (
        <motion.div
            style={{ backgroundColor: bgColor }}
            className="fixed inset-0 w-full h-full -z-20 transition-colors duration-700"
        >
            {/* Dynamic Atmosphere Particles */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        initial={{ 
                            x: Math.random() * 100 + "%", 
                            y: Math.random() * 100 + "%",
                            opacity: Math.random() 
                        }}
                        animate={{ 
                            y: ["0%", "100%"],
                            opacity: [0, 1, 0]
                        }}
                        transition={{ 
                            duration: Math.random() * 2 + 1, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                    />
                ))}
            </div>

            {/* Launch Glow Effect */}
            <motion.div 
                style={{ 
                    opacity: glowOpacity,
                    scale: glowScale,
                    background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)"
                }}
                className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[100vw] h-[100vh] blur-[100px] pointer-events-none"
            />
        </motion.div>
    );
};
