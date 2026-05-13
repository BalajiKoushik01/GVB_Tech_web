"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPointer, setIsPointer] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    // Snappy spring config for elite performance feel
    const springConfig = { damping: 35, stiffness: 450, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        if (!isVisible) setIsVisible(true);
    }, [cursorX, cursorY, isVisible]);

    const handleMouseOver = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const interactive = target.closest('a, button, [data-cursor="magnetic"], input, select, textarea');
        
        if (interactive) {
            setIsPointer(true);
            if (interactive.getAttribute('data-cursor') === 'magnetic' || interactive.tagName === 'A' || interactive.tagName === 'BUTTON') {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        } else {
            setIsPointer(false);
            setIsHovered(false);
        }
    }, []);

    const handleMouseDown = useCallback(() => setIsClicked(true), []);
    const handleMouseUp = useCallback(() => setIsClicked(false), []);

    useEffect(() => {
        // Enforce cursor hiding on mount
        document.documentElement.classList.add('hide-native-cursor');
        
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        
        return () => {
            document.documentElement.classList.remove('hide-native-cursor');
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove, handleMouseOver, handleMouseDown, handleMouseUp]);

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
                            scale: isClicked ? 0.8 : (isPointer ? 1.5 : 1),
                            width: isHovered ? 80 : 32,
                            height: isHovered ? 80 : 32,
                            borderWidth: isHovered ? "1px" : "2px",
                            borderColor: isPointer ? "rgba(0, 209, 255, 0.8)" : "rgba(255, 255, 255, 0.3)",
                        }}
                        className="rounded-full border backdrop-blur-[1px] flex items-center justify-center mix-blend-difference transition-colors duration-200"
                    >
                        {/* Inner Dot */}
                        <motion.div 
                            animate={{
                                scale: isPointer ? 0.3 : 1,
                                opacity: isPointer ? 0 : 1,
                                backgroundColor: isClicked ? "#00d1ff" : "#ffffff"
                            }}
                            className="w-1.5 h-1.5 rounded-full" 
                        />
                    </motion.div>
                    
                    {/* Trailing Glow Layer */}
                    <motion.div
                        style={{
                            x: cursorXSpring,
                            y: cursorYSpring,
                            translateX: "-50%",
                            translateY: "-50%",
                        }}
                        animate={{
                            scale: isPointer ? 2 : 1,
                            opacity: isPointer ? 0.3 : 0.1
                        }}
                        className="w-[60px] h-[60px] bg-gvb-blue rounded-full blur-2xl pointer-events-none"
                    />
                </div>
            )}
        </AnimatePresence>
    );
};
