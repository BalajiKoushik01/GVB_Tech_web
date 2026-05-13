"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticWrapperProps {
    children: React.ReactNode;
    strength?: number; // How far the button pulls towards the mouse
    radius?: number; // How far away the cursor needs to be to trigger the pull
}

export function MagneticWrapper({ children, strength = 0.5, radius = 80 }: MagneticWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // High-performance spring for elite interactive feel
    const springConfig = { damping: 20, stiffness: 300, mass: 0.1 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        // If mouse is within the magnetic radius
        if (distance < radius) {
            setIsHovered(true);
            x.set(distanceX * strength);
            y.set(distanceY * strength);
        } else if (isHovered) {
            setIsHovered(false);
            x.set(0);
            y.set(0);
        }
    }, [x, y, radius, strength, isHovered]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    }, [x, y]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="inline-block relative z-10"
            style={{ x, y }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.div>
    );
}
