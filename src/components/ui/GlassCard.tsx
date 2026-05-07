"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.ComponentPropsWithoutRef<typeof motion.div> {
    hoverEffect?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ children, className, hoverEffect = true, ...props }, ref) => {
        const localRef = useRef<HTMLDivElement>(null);
        // Fallback ref if none is provided
        const containerRef = (ref as React.RefObject<HTMLDivElement>) || localRef;

        const x = useMotionValue(0.5);
        const y = useMotionValue(0.5);

        // Spring physics for smooth tilt
        const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
        const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

        // Transform mouse coordinates into rotation degrees
        const rotateX = useTransform(mouseY, [0, 1], [10, -10]);
        const rotateY = useTransform(mouseX, [0, 1], [-10, 10]);

        function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
            if (!containerRef.current || !hoverEffect) return;
            const rect = containerRef.current.getBoundingClientRect();
            // Calculate relative position 0 to 1
            const width = rect.width;
            const height = rect.height;
            const mouseXRelative = (e.clientX - rect.left) / width;
            const mouseYRelative = (e.clientY - rect.top) / height;
            
            x.set(mouseXRelative);
            y.set(mouseYRelative);
        }

        function handleMouseLeave() {
            if (!hoverEffect) return;
            // Snap back to center
            x.set(0.5);
            y.set(0.5);
        }

        // Dynamic shine that follows the mouse using percentage
        const background = useTransform(
            [mouseX, mouseY],
            ([xVal, yVal]: any[]) => `radial-gradient(1000px circle at ${xVal * 100}% ${yVal * 100}%, rgba(0, 163, 255, 0.15), transparent 40%)`
        );

        return (
            <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX: hoverEffect ? rotateX : 0,
                    rotateY: hoverEffect ? rotateY : 0,
                    transformStyle: "preserve-3d",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={cn(
                    "liquid-glass p-1 relative group h-full w-full border-slate-200/60 transition-colors duration-500",
                    className
                )}
                {...props}
            >
                {/* 3D Content Wrapper for Parallax inside the card */}
                <div style={{ transform: hoverEffect ? "translateZ(30px)" : "none", transition: "transform 0.3s ease-out" }} className="w-full h-full relative z-10">
                    {/* Dynamic Shine Layer */}
                    {hoverEffect && (
                        <motion.div
                            className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                            style={{ background }}
                        />
                    )}

                    <div className="relative z-10 w-full h-full p-6 md:p-8 rounded-[inherit] bg-white/40 backdrop-blur-sm shadow-xl">
                        {children as React.ReactNode}
                    </div>
                    
                    {/* Liquid Highlight */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gvb-blue/40 to-transparent opacity-60 z-20" />
                </div>
            </motion.div>
        );
    }
);

GlassCard.displayName = "GlassCard";
