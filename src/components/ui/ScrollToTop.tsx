"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    onClick={scrollToTop}
                    className={cn(
                        "fixed bottom-8 left-8 z-50 p-4 rounded-full",
                        "bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/30 border-t-white/50",
                        "text-foreground shadow-[0_0_20px_rgba(102,126,234,0.3)]",
                        "hover:bg-white/20 dark:hover:bg-white/10 hover:shadow-[0_0_30px_rgba(102,126,234,0.6)]",
                        "transition-all duration-300 group overflow-hidden"
                    )}
                    aria-label="Scroll to top"
                >
                    {/* Liquid Glass Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

                    <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300 relative z-10" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
