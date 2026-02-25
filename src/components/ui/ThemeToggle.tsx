"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-800" />;
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-start cursor-pointer"
            aria-label="Toggle theme"
        >
            <motion.div
                className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-gray-950 shadow-md flex items-center justify-center"
                animate={{ x: isDark ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                {isDark ? (
                    <Moon className="w-3.5 h-3.5 text-gray-300" />
                ) : (
                    <Sun className="w-3.5 h-3.5 text-yellow-500" />
                )}
            </motion.div>
        </button>
    );
}
