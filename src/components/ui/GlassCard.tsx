"use client";

import React from "react";
import { motion, HTMLMotionProps, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ children, className, hoverEffect = true, ...props }, ref) => {
        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);

        function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
            const { left, top } = currentTarget.getBoundingClientRect();
            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
        }

        return (
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                whileHover={hoverEffect ? { scale: 1.02, y: -8 } : {}}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className={cn(
                    "glass-card p-6 relative overflow-hidden group",
                    // Interactive Glow and Border Highlights tailored for Light & Dark mode
                    hoverEffect && "hover:bg-black/5 hover:border-black/10 dark:hover:bg-white/5 dark:hover:border-white/20 hover:shadow-2xl hover:shadow-accent-start/20 transition-all duration-500",
                    className
                )}
                {...(props as HTMLMotionProps<"div">)}
            >
                {/* Dynamic Mouse-Tracking Glare (Ultimate Glassmorphism) */}
                {hoverEffect && (
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                        style={{
                            background: useMotionTemplate`
                                radial-gradient(
                                    600px circle at ${mouseX}px ${mouseY}px,
                                    var(--glare-color),
                                    transparent 40%
                                )
                            `,
                        }}
                    />
                )}

                {/* Liquid Glass Shimmer Effect */}
                {hoverEffect && (
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                )}

                <div className="relative z-10">
                    {children}
                </div>
            </motion.div>
        );
    }
);

GlassCard.displayName = "GlassCard";
