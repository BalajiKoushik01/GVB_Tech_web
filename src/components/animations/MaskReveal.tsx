"use client";

import React from "react";
import { motion } from "framer-motion";

interface MaskRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

/**
 * MaskReveal — premium text reveal without clipping.
 *
 * Approach: wraps children in a container that adds generous vertical
 * padding, then slides the content in from below. The padding ensures
 * overflow-hidden never clips large uppercase ascenders or descenders
 * regardless of font size. Extra pb ensures descenders (g, p, y) show.
 */
export function MaskReveal({ children, className = "", delay = 0 }: MaskRevealProps) {
    return (
        <div
            className={className}
            style={{
                overflow: "hidden",
                // Top padding = room for large cap heights on any font size
                // Bottom padding = room for descenders
                paddingTop:    "0.35em",
                paddingBottom: "0.2em",
                // Negative margins cancel out the padding's effect on layout
                // so surrounding spacing is not affected
                marginTop:    "-0.35em",
                marginBottom: "-0.2em",
            }}
        >
            <motion.div
                initial={{ y: "110%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                    y:       { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
                    opacity: { duration: 0.5, delay },
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
