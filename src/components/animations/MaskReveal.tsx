"use client";

import React from "react";
import { motion } from "framer-motion";

interface MaskRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

/**
 * MaskReveal — text reveal animation using clipPath instead of overflow-hidden + y translate.
 *
 * WHY clipPath:
 *   The old approach (overflow-hidden wrapper + y:"100%") required padding compensation
 *   because overflow-hidden clips the child's bounding box, cutting off large ascenders.
 *   clipPath animates the VISIBLE region of the element itself — no outer container
 *   needed, zero risk of clipping the content at any font size or line-height.
 */
export function MaskReveal({ children, className = "", delay = 0 }: MaskRevealProps) {
    return (
        <div className={className}>
            <motion.div
                initial={{ clipPath: "inset(105% 0% -5% 0%)", opacity: 0 }}
                whileInView={{ clipPath: "inset(0% 0% -5% 0%)", opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                    clipPath: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
                    opacity:   { duration: 0.4, delay },
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
