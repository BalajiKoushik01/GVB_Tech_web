"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export const CustomCursor = () => {
    const [cursorState, setCursorState] = useState<"default" | "hover" | "click">("default");
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useMotionValue(-200);
    const cursorY = useMotionValue(-200);

    // Two separate springs: dot tracks fast, ring trails slightly
    const dotConfig = { damping: 40, stiffness: 600, mass: 0.3 };
    const ringConfig = { damping: 28, stiffness: 180, mass: 0.6 };

    const dotX = useSpring(cursorX, dotConfig);
    const dotY = useSpring(cursorY, dotConfig);
    const ringX = useSpring(cursorX, ringConfig);
    const ringY = useSpring(cursorY, ringConfig);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        if (!isVisible) setIsVisible(true);
    }, [cursorX, cursorY, isVisible]);

    const handleMouseOver = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;
        // Only detect immediate interactive ancestors — not the whole page
        const interactive = target.closest('a:not([data-no-cursor]), button:not([data-no-cursor]), [data-cursor="magnetic"]');

        if (interactive) {
            setCursorState("hover");
        } else {
            setCursorState("default");
        }
    }, []);

    const handleMouseDown = useCallback(() => setCursorState("click"), []);
    const handleMouseUp = useCallback((e: MouseEvent) => {
        // Re-check what's under cursor on release
        const target = e.target as HTMLElement;
        const interactive = target.closest('a, button, [data-cursor="magnetic"]');
        setCursorState(interactive ? "hover" : "default");
    }, []);

    const handleMouseLeave = useCallback(() => setIsVisible(false), []);
    const handleMouseEnter = useCallback(() => setIsVisible(true), []);

    useEffect(() => {
        document.documentElement.classList.add("hide-native-cursor");

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.documentElement.addEventListener("mouseleave", handleMouseLeave);
        document.documentElement.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            document.documentElement.classList.remove("hide-native-cursor");
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
            document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [handleMouseMove, handleMouseOver, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

    const isHover = cursorState === "hover";
    const isClick = cursorState === "click";

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block" aria-hidden>
                    {/* ── Precise DOT: tracks cursor exactly, no lag ── */}
                    <motion.div
                        style={{
                            x: dotX,
                            y: dotY,
                            translateX: "-50%",
                            translateY: "-50%",
                        }}
                        animate={{
                            width: isClick ? 6 : 8,
                            height: isClick ? 6 : 8,
                            backgroundColor: isHover ? "#00d1ff" : "#ffffff",
                            opacity: isHover ? 0 : 1,  // hide dot when ring expands so it doesn't show through
                        }}
                        transition={{ duration: 0.15 }}
                        className="absolute rounded-full"
                    />

                    {/* ── RING: trails behind with spring lag, subtle hover expand ── */}
                    <motion.div
                        style={{
                            x: ringX,
                            y: ringY,
                            translateX: "-50%",
                            translateY: "-50%",
                        }}
                        animate={{
                            width: isClick ? 28 : isHover ? 44 : 32,
                            height: isClick ? 28 : isHover ? 44 : 32,
                            borderColor: isHover ? "rgba(0,209,255,0.9)" : "rgba(255,255,255,0.5)",
                            borderWidth: isHover ? "1.5px" : "1.5px",
                            backgroundColor: isHover ? "rgba(0,209,255,0.06)" : "transparent",
                            scale: isClick ? 0.85 : 1,
                        }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute rounded-full border"
                    />

                    {/* ── GLOW: large soft ambient blob, only on hover ── */}
                    <AnimatePresence>
                        {isHover && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 0.2, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                style={{
                                    x: ringX,
                                    y: ringY,
                                    translateX: "-50%",
                                    translateY: "-50%",
                                }}
                                transition={{ duration: 0.3 }}
                                className="absolute w-20 h-20 rounded-full bg-gvb-cyan blur-xl pointer-events-none"
                            />
                        )}
                    </AnimatePresence>
                </div>
            )}
        </AnimatePresence>
    );
};
