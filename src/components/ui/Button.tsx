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
            primary: "bg-gradient-to-r from-gvb-deep to-gvb-blue text-white shadow-[0_4px_24px_rgba(37,99,235,0.4)] hover:shadow-[0_8px_40px_rgba(37,99,235,0.7)] border border-white/20 hover:border-white/40",
            secondary: "bg-white/5 backdrop-blur-md text-white hover:bg-white/10 border border-white/10 shadow-lg hover:shadow-xl",
            glass: "bg-white/10 backdrop-blur-xl border border-white/30 border-t-white/40 text-white hover:bg-white/20 shadow-lg font-bold",
            outline: "border border-gvb-cyan/50 text-white hover:bg-gvb-cyan/10 hover:border-gvb-cyan shadow-[0_4px_24px_rgba(34,211,238,0)] hover:shadow-[0_4px_24px_rgba(34,211,238,0.2)]",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.95, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={cn(
                    "relative overflow-hidden rounded-full font-semibold transition-all duration-300 flex items-center justify-center tracking-tight",
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
