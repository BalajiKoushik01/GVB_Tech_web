"use client";

import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const AtmosphereParticles = () => {
    const [particles, setParticles] = React.useState<Array<{ x: string, y: string, opacity: number, duration: number, height: number }>>([]);

    React.useEffect(() => {
        // High-speed trailing particles for rocket launch feel
        const p = [...Array(30)].map(() => ({
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.4 + 0.1,
            duration: Math.random() * 0.8 + 0.2, // Much faster duration for speed
            height: Math.random() * 40 + 20 // Tall streaks
        }));
        setParticles(p);
    }, []);

    return (
        <>
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute w-[1px] bg-gradient-to-b from-transparent via-white to-transparent rounded-full"
                    style={{ height: p.height }}
                    initial={{ x: p.x, y: "-10vh", opacity: p.opacity }}
                    animate={{ 
                        y: ["-10vh", "110vh"],
                        opacity: [0, p.opacity, 0]
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

    // Multi-Stop Orbital Gradient Morphing
    const bgColor = useTransform(
        smoothProgress,
        [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
        [
            "#F8FAFC", // Soft Launch Pad (Slate 50)
            "#E0F2FE", // Cloud Breach (Sky 100)
            "#7DD3FC", // Troposphere (Sky 300)
            "#60A5FA", // Stratosphere (Blue 400)
            "#2563EB", // Ionosphere (Blue 600)
            "#1E3A8A", // Mesosphere (Blue 900)
            "#1E1B4B", // Exosphere (Indigo 950)
            "#09090B"  // Deep Space (Absolute Dark)
        ]
    );

    // Rocket Exhaust Glow
    const glowOpacity = useTransform(smoothProgress, [0, 0.2, 1], [0, 0.3, 0.7]);
    const glowScale = useTransform(smoothProgress, [0, 0.2, 1], [0.8, 1.2, 2]);

    return (
        <motion.div
            style={{ backgroundColor: bgColor }}
            className="fixed inset-0 w-full h-full -z-20 overflow-hidden"
        >
            {/* Dynamic High-Speed Atmosphere Trails */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <AtmosphereParticles />
            </div>

            {/* Premium Noise Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Hardware-Accelerated Launch Glow Effect (No CSS Blur) */}
            <motion.div 
                style={{ 
                    opacity: glowOpacity,
                    scale: glowScale,
                    background: "radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 30%, transparent 70%)"
                }}
                className="absolute bottom-[-30%] left-1/2 -translate-x-1/2 w-[120vw] h-[100vh] pointer-events-none origin-bottom"
            />
        </motion.div>
    );
};
