"use client";

import React from "react";
import { motion } from "framer-motion";

export function AnimatedMeshBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-white pointer-events-none">
            {/* Massive blurred orbs (Aurora effect) */}
            <motion.div
                animate={{
                    x: ["0%", "20%", "-20%", "0%"],
                    y: ["0%", "-20%", "20%", "0%"],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-r from-blue-200/40 to-cyan-200/40 blur-[120px]"
            />

            <motion.div
                animate={{
                    x: ["0%", "-30%", "20%", "0%"],
                    y: ["0%", "30%", "-20%", "0%"],
                    scale: [1, 1.2, 0.8, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-r from-purple-200/40 to-pink-200/40 blur-[140px]"
            />

            <motion.div
                animate={{
                    x: ["0%", "40%", "-30%", "0%"],
                    y: ["0%", "10%", "30%", "0%"],
                    scale: [1, 0.9, 1.1, 1],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-r from-emerald-200/30 to-teal-200/30 blur-[110px]"
            />

            {/* Noise overlay for premium photographic texture */}
            <div
                className="absolute inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
        </div>
    );
}
