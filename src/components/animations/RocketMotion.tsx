"use client";

import React, { memo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const RocketMotion = memo(() => {
    const { scrollYProgress } = useScroll();

    // Smooth physics for rocket reactions
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 30
    });

    // Vertical Movement: Higher scroll = Higher position (simulating ascent)
    const yTransform = useTransform(smoothProgress, [0, 1], ["0vh", "-35vh"]);
    
    // Flame Intensity: Higher scroll = Larger, more rapid flame
    const flameScale = useTransform(smoothProgress, [0, 0.1, 1], [0, 1, 2.2]);
    const flameOpacity = useTransform(smoothProgress, [0, 0.05, 1], [0, 0.7, 1]);
    
    // Dynamic Vibration Physics (Shake)
    const shakeX = useTransform(smoothProgress, (p) => {
        if (p < 0.05) return 0;
        const intensity = p < 0.5 ? p * 2 : (p - 0.5) * 5 + 1;
        return Math.sin(Date.now() / 10 + p * 1000) * intensity;
    });

    return (
        <div className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center overflow-hidden">
            <motion.div
                style={{ y: yTransform, x: shakeX }}
                className="relative flex flex-col items-center translate-y-[20vh]"
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
                    className="relative w-24 h-48 md:w-32 md:h-64 liquid-glass border-white/60 shadow-2xl overflow-hidden"
                >
                    {/* Rocket Detail: Windows / Panel lines */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gvb-blue/10 border border-white/30 backdrop-blur-md" />
                    <div className="absolute top-[40%] left-0 right-0 h-[1px] bg-white/20" />
                    
                    {/* Metallic Shine Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/40 pointer-events-none" />
                </motion.div>

                {/* Rocket Fins (Left/Right) */}
                <div className="flex gap-16 md:gap-24 -mt-12">
                    <div className="w-8 h-12 md:w-10 md:h-16 liquid-glass border-white/60 skew-x-[-15deg] origin-top !bg-white/40" />
                    <div className="w-8 h-12 md:w-10 md:h-16 liquid-glass border-white/60 skew-x-[15deg] origin-top !bg-white/40" />
                </div>

                {/* Engine Flame (The "Thruster") */}
                <motion.div
                    style={{ scaleY: flameScale, opacity: flameOpacity }}
                    className="mt-[-4px] origin-top"
                >
                    <div className="w-14 h-36 md:w-18 md:h-52 bg-gradient-to-b from-launch-yellow via-launch-orange to-transparent animate-flame-pulse rounded-full blur-[24px]" />
                    <div className="w-8 h-24 md:w-10 md:h-36 bg-gradient-to-b from-white via-launch-yellow to-transparent absolute top-0 left-1/2 -translate-x-1/2 blur-[12px] opacity-80" />
                </motion.div>
                
                {/* Thruster Glow Background Overlay */}
                <motion.div
                    style={{ opacity: flameOpacity }}
                    className="absolute bottom-[-100px] w-[200px] h-[200px] bg-launch-orange/20 blur-[100px] rounded-full pointer-events-none z-[-1]"
                />
            </motion.div>
        </div>
    );
});

RocketMotion.displayName = "RocketMotion";
