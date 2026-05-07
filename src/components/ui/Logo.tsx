import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true }) => {
    return (
        <div className={cn("flex items-center gap-2 md:gap-3 group", className)}>
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center transform group-hover:scale-110 transition-all duration-500 ease-out">
                <Image
                    src="/logo_icon.png"
                    alt="GVB Tech Logo Icon"
                    fill
                    className="object-contain drop-shadow-sm"
                    priority
                />
            </div>
            
            {showText && (
                <div className="flex flex-col justify-center transform transition-all duration-500">
                    <span className="text-xl md:text-2xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-500 to-slate-900 bg-[length:200%_auto] animate-shimmer">
                        GVB <span className="text-gvb-blue drop-shadow-[0_0_8px_rgba(0,163,255,0.4)]">TECH</span>
                    </span>
                    <span className="text-[0.45rem] md:text-[0.5rem] uppercase font-bold tracking-[0.15em] text-slate-500 max-w-[120px] md:max-w-[140px] leading-[1.2] mt-0.5">
                        Convergence of academia and industry
                    </span>
                </div>
            )}
        </div>
    );
};
