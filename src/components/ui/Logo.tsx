"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true }) => {
    return (
        <div className={cn("flex items-center gap-3 group", className)}>
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transform group-hover:scale-110 transition-all duration-500 ease-out">
                {/* SVG Shield Profile Based on GVB Brand Identity */}
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-xl"
                >
                    <defs>
                        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00A3FF" />
                            <stop offset="100%" stopColor="#0066FF" />
                        </linearGradient>
                        <linearGradient id="logo-shine" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    
                    {/* Shield Body */}
                    <path
                        d="M50 5 L10 25 V55 C10 75 30 90 50 95 C70 90 90 75 90 55 V25 L50 5Z"
                        fill="url(#logo-grad)"
                        className="opacity-90"
                    />
                    
                    {/* Geometric 'G' Overlay inspired by brand image */}
                    <path
                        d="M65 40 H50 V60 H70 V45"
                        stroke="white"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        className="group-hover:stroke-cyan-200 transition-colors"
                    />
                    <path
                        d="M70 45 L50 45 C40 45 35 50 35 60 C35 70 40 75 50 75 L70 75"
                        stroke="white"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        className="group-hover:stroke-cyan-200 transition-colors"
                    />

                    {/* Shine Layer */}
                    <path
                        d="M50 8 L13 26 V35 C30 20 60 20 87 35 V26 L50 8Z"
                        fill="url(#logo-shine)"
                        className="opacity-40"
                    />
                </svg>
            </div>
            
            {showText && (
                <div className="flex flex-col">
                    <span className="text-xl md:text-2xl font-extrabold tracking-tighter text-slate-800 leading-none">
                        GVB <span className="text-gvb-blue">TECH</span>
                    </span>
                    <span className="text-[0.6rem] uppercase font-bold tracking-[0.3em] text-slate-400">
                        SOLUTIONS
                    </span>
                </div>
            )}
        </div>
    );
};

