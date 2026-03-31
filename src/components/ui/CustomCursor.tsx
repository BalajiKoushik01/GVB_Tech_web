"use client";

import React, { useEffect, useRef } from "react";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);

    // Track state in refs to avoid React re-renders which cause layout thrashing/lag
    const mouse = useRef({ x: -100, y: -100 });
    const cursor = useRef({ x: -100, y: -100 });
    const isHovering = useRef(false);
    const isVisible = useRef(false);

    useEffect(() => {
        if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        const onMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;

            if (!isVisible.current) {
                isVisible.current = true;
                if (cursorRef.current) cursorRef.current.style.opacity = "1";
            }
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                window.getComputedStyle(target).cursor === 'pointer'
            ) {
                isHovering.current = true;
            } else {
                isHovering.current = false;
            }
        };

        const onMouseLeave = () => {
            isVisible.current = false;
            if (cursorRef.current) cursorRef.current.style.opacity = "0";
        };

        // Use passive event listeners for maximum performance
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseover", onMouseOver, { passive: true });
        document.addEventListener("mouseleave", onMouseLeave, { passive: true });

        let animationFrameId: number;

        const render = () => {
            // Smooth lerp for liquid trailing effect (bypasses Framer Motion overhead)
            cursor.current.x += (mouse.current.x - cursor.current.x) * 0.15;
            cursor.current.y += (mouse.current.y - cursor.current.y) * 0.15;

            if (cursorRef.current) {
                // Apply hardware-accelerated transforms
                const size = isHovering.current ? 80 : 36;
                cursorRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0) translate(-50%, -50%)`;
                cursorRef.current.style.width = `${size}px`;
                cursorRef.current.style.height = `${size}px`;

                // Magnifying glass / Lens effect styles
                if (isHovering.current) {
                    // Stronger lens effect on hover (simulates magnification via contrast/saturation without heavy blur)
                    cursorRef.current.style.backdropFilter = "blur(3px) saturate(300%) contrast(1.2) brightness(1.2)";
                    if (dotRef.current) dotRef.current.style.opacity = "0";
                } else {
                    // Standard lens effect
                    cursorRef.current.style.backdropFilter = "blur(1px) saturate(180%) brightness(1.1)";
                    if (dotRef.current) dotRef.current.style.opacity = "1";
                }
            }
            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseleave", onMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center rounded-full transition-[width,height,backdrop-filter] duration-300 ease-out opacity-0 will-change-transform"
            style={{
                backgroundColor: "var(--cursor-bg)",
                border: "1px solid var(--cursor-border)",
                boxShadow: "var(--cursor-shadow)",
            }}
        >
            <div
                ref={dotRef}
                className="w-1.5 h-1.5 rounded-full transition-opacity duration-300"
                style={{
                    backgroundColor: "var(--cursor-glow)",
                    boxShadow: "0 0 8px var(--cursor-glow)"
                }}
            />
        </div>
    );
}
