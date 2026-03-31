"use client";

import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const AtmosphereParticles = () => {
    const [particles, setParticles] = React.useState<Array<{ x: string, y: string, opacity: number, duration: number }>>([]);

    React.useEffect(() => {
        const p = [...Array(12)].map(() => ({
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5 + 0.3,
            duration: Math.random() * 5 + 3
        }));
        setParticles(p);
    }, []);

    return (
        <>
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    initial={{ x: p.x, y: p.y, opacity: p.opacity }}
                    animate={{ 
                        y: ["0%", "100%"],
                        opacity: [0, 0.8, 0]
                    }}
                    transition={{ 
                        duration: p.duration, 
                        repeat: Infinity, 
                        ease: "linear" 
                    }}
                />
            ))}
        </>
    );
};

export const LaunchBackground = () => {
    const { scrollYProgress } = useScroll();

    // Smooth spring physics for transitions
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Multi-Stop Orbital Gradient Morphing (V14.2)
    const bgColor = useTransform(
        smoothProgress,
        [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
        [
            "#E0F2FE", // Sky Blue (Launch)
            "#FDE047", // Solar Yellow (Ascent)
            "#F97316", // Flame Orange (Thrust)
            "#EF4444", // Ignition Red (Max Q)
            "#4F46E5", // Deep Space Indigo (Orbit)
            "#312E81", // Midnight Blue (Transition)
            "#1E1B4B", // Absolute Dark (Outer)
            "#171717"  // Carbon Black (Deep Space)
        ]
    );

    // Rocket Exhaust Glow
    const glowOpacity = useTransform(smoothProgress, [0, 0.2, 1], [0, 0.4, 0.8]);
    const glowScale = useTransform(smoothProgress, [0, 0.2, 1], [0.8, 1.2, 2]);

    return (
        <motion.div
            style={{ backgroundColor: bgColor }}
            className="fixed inset-0 w-full h-full -z-20 transition-colors duration-700 overflow-hidden"
        >
            {/* Premium Blurred Orbs (Aurora Effect) */}
            <motion.div
                animate={{
                    x: ["0%", "15%", "-10%", "0%"],
                    y: ["0%", "-15%", "10%", "0%"],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-white/20 blur-[150px] pointer-events-none"
            />
            
            <motion.div
                animate={{
                    x: ["0%", "-20%", "15%", "0%"],
                    y: ["0%", "20%", "-10%", "0%"],
                    scale: [1, 1.2, 0.8, 1],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-20%] right-[-10%] w-[90vw] h-[90vw] rounded-full bg-white/10 blur-[180px] pointer-events-none"
            />

            {/* Dynamic Atmosphere Particles */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <AtmosphereParticles />
            </div>

            {/* Premium Noise Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Launch Glow Effect */}
            <motion.div 
                style={{ 
                    opacity: glowOpacity,
                    scale: glowScale,
                    background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%)"
                }}
                className="absolute bottom-[-30%] left-1/2 -translate-x-1/2 w-[120vw] h-[120vh] blur-[120px] pointer-events-none"
            />
        </motion.div>
    );
};
