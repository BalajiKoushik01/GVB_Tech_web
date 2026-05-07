"use client";

import React from "react";
import { motion } from "framer-motion";

interface MaskRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function MaskReveal({ children, className = "", delay = 0 }: MaskRevealProps) {
    return (
        <div className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1], // Custom cinematic easing
                    delay: delay
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
