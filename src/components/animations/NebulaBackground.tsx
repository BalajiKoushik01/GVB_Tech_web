"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const NebulaBackground = () => {
    const { scrollYProgress } = useScroll();
    
    // Multi-layer parallax movement
    const nebulaY1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const nebulaY2 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const dustY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

    // Memoize stars to prevent jitter and unnecessary re-renders
    const stars = React.useMemo(() => {
        return [...Array(60)].map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
            size: Math.random() * 2 + 0.5,
            glow: Math.random() > 0.8
        }));
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-[-2] overflow-hidden bg-[#020617]">
            {/* Distant Nebula Layer 1 */}
            <motion.div 
                style={{ y: nebulaY1 }}
                className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-25 bg-[radial-gradient(circle_at_20%_30%,rgba(0,163,255,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(0,209,255,0.08)_0%,transparent_50%)]"
            />

            {/* Distant Nebula Layer 2 */}
            <motion.div 
                style={{ y: nebulaY2 }}
                className="absolute top-0 left-0 w-full h-[200%] opacity-15 bg-[radial-gradient(circle_at_50%_50%,rgba(0,102,255,0.05)_0%,transparent_70%)]"
            />

            {/* Space Dust / Stars Layer */}
            <motion.div 
                style={{ y: dustY }}
                className="absolute top-0 left-0 w-full h-[300%] opacity-50"
            >
                {stars.map((star) => (
                    <div 
                        key={star.id}
                        className="absolute bg-white rounded-full will-change-transform"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            opacity: star.opacity,
                            boxShadow: star.glow ? "0 0 10px 1px rgba(255,255,255,0.5)" : "none"
                        }}
                    />
                ))}
            </motion.div>

            {/* Scanline / Texture Overlay */}
            <div className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
    );
};
