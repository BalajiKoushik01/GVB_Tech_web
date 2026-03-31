"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ children, className, hoverEffect = true, ...props }, ref) => {
        const x = useMotionValue(0);
        const y = useMotionValue(0);

        const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
        const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

        function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
            const { left, top } = currentTarget.getBoundingClientRect();
            x.set(clientX - left);
            y.set(clientY - top);
        }

        return (
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                whileHover={hoverEffect ? { y: -8, scale: 1.01 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={cn(
                    "liquid-glass p-1 relative overflow-hidden group h-full w-full",
                    className
                )}
                {...props}
            >
                {/* Dynamic Shine Layer */}
                {hoverEffect && (
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(0, 163, 255, 0.1), transparent 40%)`
                        }}
                    />
                )}

                <div className="relative z-10 w-full h-full p-6 md:p-8 rounded-[inherit]">
                    {children}
                </div>
                
                {/* Liquid Highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-30" />
            </motion.div>
        );
    }
);

GlassCard.displayName = "GlassCard";
