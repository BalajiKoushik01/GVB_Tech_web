"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "glass" | "outline";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
    className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "primary", size = "md", children, className, ...props }, ref) => {
        const variants = {
            primary: "bg-gradient-to-r from-accent-start to-accent-end text-white shadow-[0_0_20px_rgba(102,126,234,0.4)] hover:shadow-[0_0_30px_rgba(102,126,234,0.6)] border border-white/20",
            secondary: "bg-surface text-foreground hover:bg-surface/80 border border-white/10 shadow-lg",
            glass: "bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/30 border-t-white/50 text-foreground hover:bg-white/20 dark:hover:bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)]",
            outline: "border-2 border-accent-start/50 text-foreground hover:bg-accent-start/10 hover:border-accent-start shadow-sm",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98, y: 0 }}
                className={cn(
                    "relative overflow-hidden rounded-full font-medium transition-all duration-300 flex items-center justify-center",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...(props as HTMLMotionProps<"button">)}
            >
                {children}
            </motion.button>
        );
    }
);

Button.displayName = "Button";
