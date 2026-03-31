"use client";

import React, { memo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const RocketMotion = memo(() => {
    const { scrollYProgress } = useScroll();

    // Smooth physics for rocket reactions
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 25
    });

    // Vertical Movement: Higher scroll = Higher position (simulating ascent)
    const yTransform = useTransform(smoothProgress, [0, 1], ["0vh", "-30vh"]);
    
    // Flame Intensity: Higher scroll = Larger, more rapid flame
    const flameScale = useTransform(smoothProgress, [0, 1], [0.8, 1.8]);
    const flameOpacity = useTransform(smoothProgress, [0, 0.2, 1], [0, 1, 1]);
    
    // Shake Intensity: Increases as we approach higher atmospheric friction
    const shakeAmount = useTransform(smoothProgress, [0.4, 0.8, 1], [0, 2, 4]);

    return (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center -z-10 overflow-hidden">
            <motion.div
                style={{ y: yTransform }}
                className="relative flex flex-col items-center pt-[40vh]"
            >
                {/* Main Rocket Body (Liquid Glass Style) */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ 
                        y: [0, -10, 0],
                        opacity: 1,
                        rotateZ: [0, 0.5, -0.5, 0]
                    }}
                    transition={{
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        rotateZ: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="relative w-24 h-48 md:w-32 md:h-64 liquid-glass border-white/40 shadow-2xl overflow-hidden"
                >
                    {/* Rocket Detail: Windows / Panel lines */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gvb-blue/20 border border-white/30 backdrop-blur-md" />
                    <div className="absolute top-[40%] left-0 right-0 h-[1px] bg-white/20" />
                    
                    {/* Metallic Shine Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/30 pointer-events-none" />
                </motion.div>

                {/* Rocket Fins (Left/Right) */}
                <div className="flex gap-16 md:gap-24 -mt-12">
                    <div className="w-8 h-12 md:w-10 md:h-16 liquid-glass border-white/40 skew-x-[-15deg] origin-top" />
                    <div className="w-8 h-12 md:w-10 md:h-16 liquid-glass border-white/40 skew-x-[15deg] origin-top" />
                </div>

                {/* Engine Flame (The "Thruster") */}
                <motion.div
                    style={{ scaleY: flameScale, opacity: flameOpacity }}
                    className="mt-[-2px] origin-top"
                >
                    <div className="w-12 h-32 md:w-16 md:h-48 bg-gradient-to-b from-launch-yellow via-launch-orange to-transparent animate-flame-pulse rounded-full blur-[20px]" />
                    <div className="w-8 h-24 md:w-10 md:h-36 bg-gradient-to-b from-white via-launch-yellow to-transparent absolute top-0 left-1/2 -translate-x-1/2 blur-[10px] opacity-70" />
                </motion.div>
                
                {/* Engine Smoke/Vapor micro-particles could be added here */}
            </motion.div>
            
            {/* Global Atmospheric Vibration (Shake) */}
            <motion.div 
                style={{ 
                    x: useTransform(smoothProgress, (p) => Math.sin(p * 100) * (p > 0.4 ? (p-0.4)*10 : 0)) 
                }}
                className="absolute inset-0 pointer-events-none"
            />
        </div>
    );
});

RocketMotion.displayName = "RocketMotion";
