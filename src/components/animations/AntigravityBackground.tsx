"use client";

import React, { memo } from "react";
import { motion, TargetAndTransition, Transition } from "framer-motion";

// Performance-optimized orb configuration
const ORB_CONFIG = [
  {
    id: "orb-1",
    className: "absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#1E3A8A] opacity-20 blur-[120px] mix-blend-screen",
    initial: { x: "0%", y: "0%" },
    animate: {
      x: ["0%", "20%", "0%", "-20%", "0%"],
      y: ["0%", "-10%", "10%", "-10%", "0%"],
      scale: [1, 1.2, 0.9, 1.1, 1],
    },
    transition: { duration: 25, repeat: Infinity, ease: "linear" },
  },
  {
    id: "orb-2", 
    className: "absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#0284C7] opacity-20 blur-[130px] mix-blend-screen",
    initial: { x: "0%", y: "0%" },
    animate: {
      x: ["0%", "-30%", "10%", "-10%", "0%"],
      y: ["0%", "20%", "-10%", "10%", "0%"],
      scale: [1, 0.8, 1.2, 0.9, 1],
    },
    transition: { duration: 30, repeat: Infinity, ease: "linear" },
  },
  {
    id: "orb-3",
    className: "absolute bottom-[-10%] left-[20%] w-[55%] h-[55%] rounded-full bg-[#06B6D4] opacity-15 blur-[140px] mix-blend-screen",
    initial: { x: "0%", y: "0%" },
    animate: {
      x: ["0%", "15%", "-15%", "10%", "0%"],
      y: ["0%", "-20%", "20%", "-10%", "0%"],
      scale: [1, 1.1, 0.95, 1.15, 1],
    },
    transition: { duration: 22, repeat: Infinity, ease: "linear" },
  },
];

// Memoized orb component for better performance
const AnimatedOrb = memo(({ config }: { config: typeof ORB_CONFIG[number] }) => (
  <motion.div
    key={config.id}
    initial={config.initial}
    animate={config.animate as TargetAndTransition}
    transition={config.transition as Transition}
    style={{ willChange: "transform" }}
    className={config.className}
  />
));

AnimatedOrb.displayName = "AnimatedOrb";

// Memoized starfield component
const StarfieldOverlay = memo(() => (
  <div 
    className="absolute inset-0 opacity-20 mix-blend-screen"
    style={{
      backgroundImage: `radial-gradient(ellipse at center, rgba(255, 255, 255, 0.5) 0%, transparent 1%)`,
      backgroundSize: '30px 30px',
    }}
  />
));

StarfieldOverlay.displayName = "StarfieldOverlay";

export const AntigravityBackground = memo(() => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#030308] pointer-events-none -z-10">
      {/* Render optimized orbs */}
      {ORB_CONFIG.map((config) => (
        <AnimatedOrb key={config.id} config={config} />
      ))}
      
      {/* Dynamic Starfield Overlay */}
      <StarfieldOverlay />
    </div>
  );
});

AntigravityBackground.displayName = "AntigravityBackground";
