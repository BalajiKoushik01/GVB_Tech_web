"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InfiniteMarqueeProps {
    items: string[];
    direction?: "left" | "right";
    speed?: "slow" | "normal" | "fast";
    className?: string;
}

export function InfiniteMarquee({ items, direction = "left", speed = "normal", className }: InfiniteMarqueeProps) {
    const isLeft = direction === "left";

    // Configurable duration (in seconds per cycle)
    const duration = speed === "slow" ? 40 : speed === "fast" ? 15 : 25;

    return (
        <div className={cn("flex flex-col relative z-20 overflow-hidden w-full", className)}>
            <div className="flex w-[200%] gap-8">
                <motion.div
                    className="flex shrink-0 items-center justify-around gap-8 min-w-full"
                    animate={{
                        x: isLeft ? ["0%", "-100%"] : ["-100%", "0%"],
                    }}
                    transition={{
                        duration: duration,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {items.map((item, idx) => (
                        <div
                            key={`marquee-1-${idx}`}
                            className="text-2xl md:text-4xl font-mono font-bold text-foreground/20 dark:text-white/20 uppercase tracking-widest px-8"
                        >
                            {item}
                        </div>
                    ))}
                </motion.div>
                <motion.div
                    className="flex shrink-0 items-center justify-around gap-8 min-w-full"
                    animate={{
                        x: isLeft ? ["0%", "-100%"] : ["-100%", "0%"],
                    }}
                    transition={{
                        duration: duration,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {items.map((item, idx) => (
                        <div
                            key={`marquee-2-${idx}`}
                            className="text-2xl md:text-4xl font-mono font-bold text-foreground/20 dark:text-white/20 uppercase tracking-widest px-8"
                        >
                            {item}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
