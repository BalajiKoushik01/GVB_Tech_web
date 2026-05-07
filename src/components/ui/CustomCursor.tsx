"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPointer, setIsPointer] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    const springConfig = { damping: 25, stiffness: 250 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = window.getComputedStyle(target).cursor === 'pointer' || 
                              target.hasAttribute('data-cursor') ||
                              target.tagName === 'A' ||
                              target.tagName === 'BUTTON';
            
            setIsPointer(isClickable);
            if (target.getAttribute('data-cursor') === 'magnetic') {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);
        
        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY, isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
                    {/* Main Liquid Ring */}
                    <motion.div
                        style={{
                            x: cursorXSpring,
                            y: cursorYSpring,
                            translateX: "-50%",
                            translateY: "-50%",
                        }}
                        animate={{
                            scale: isPointer ? 1.5 : 1,
                            width: isHovered ? 80 : 40,
                            height: isHovered ? 80 : 40,
                        }}
                        className="rounded-full border border-white/30 backdrop-blur-[2px] flex items-center justify-center mix-blend-difference"
                    >
                        <motion.div 
                            animate={{
                                scale: isPointer ? 0.5 : 1,
                                opacity: isPointer ? 0.5 : 1
                            }}
                            className="w-1.5 h-1.5 bg-white rounded-full" 
                        />
                    </motion.div>
                    
                    {/* Trailing Glow */}
                    <motion.div
                        style={{
                            x: cursorXSpring,
                            y: cursorYSpring,
                            translateX: "-50%",
                            translateY: "-50%",
                        }}
                        className="w-[100px] h-[100px] bg-gvb-blue/10 rounded-full blur-3xl opacity-50"
                    />
                </div>
            )}
        </AnimatePresence>
    );
};
