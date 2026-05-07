"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Minimize2, Maximize2, Cpu } from "lucide-react";

export const TerminalAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [lines, setLines] = useState<string[]>([]);
    const [currentText, setCurrentText] = useState("");
    const terminalRef = useRef<HTMLDivElement>(null);

    const fullText = [
        "INITIALIZING GVB_CORE v1.0.4...",
        "AUTHENTICATING QUANTUM CHANNEL...",
        "SCANNING GLOBAL LIQUIDITY POOLS [OK]",
        "PROPRIETARY ALGORITHMS: STATUS_STABLE",
        "NEURAL NETWORK SYNC: 98.4%",
        "GVB TECH SOLUTIONS: READY TO SCALE",
        "------------------------------------",
        "SYSTEM STATUS: ALL ENGINES GO",
        "> WATING FOR OPERATOR COMMAND..."
    ];

    useEffect(() => {
        if (isOpen && lines.length === 0) {
            let lineIndex = 0;
            const interval = setInterval(() => {
                if (lineIndex < fullText.length) {
                    setLines(prev => [...prev, fullText[lineIndex]]);
                    lineIndex++;
                } else {
                    clearInterval(interval);
                }
            }, 400);
            return () => clearInterval(interval);
        }
    }, [isOpen, lines.length]);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [lines]);

    return (
        <>
            {/* Floating Toggle Icon */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-24 right-6 md:right-8 z-[100] w-14 h-14 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,163,255,0.3)] group hover:border-gvb-cyan transition-all"
                data-cursor="magnetic"
            >
                <div className="absolute inset-0 bg-gvb-blue/20 rounded-full animate-ping opacity-20" />
                <Terminal className="w-6 h-6 text-white group-hover:text-gvb-cyan transition-colors" />
            </motion.button>

            {/* Terminal Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-40 right-6 md:right-8 z-[100] w-[320px] md:w-[400px] h-[300px] bg-black/90 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono"
                    >
                        {/* Header */}
                        <div className="h-10 bg-white/5 border-b border-white/10 flex items-center justify-between px-4 select-none">
                            <div className="flex items-center gap-2">
                                <Cpu className="w-4 h-4 text-gvb-cyan" />
                                <span className="text-[10px] uppercase font-black tracking-widest text-white/50">GVB_OS Kernel 1.0</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Content */}
                        <div 
                            ref={terminalRef}
                            className="flex-1 p-4 overflow-y-auto text-xs leading-relaxed space-y-1 scrollbar-hide"
                        >
                            {lines.map((line, i) => (
                                <div key={i} className={`${line.includes('[OK]') ? 'text-gvb-cyan' : 'text-white/80'}`}>
                                    <span className="text-gvb-cyan/40 mr-2">$</span>
                                    {line}
                                </div>
                            ))}
                            <motion.div
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="inline-block w-2 h-4 bg-gvb-cyan ml-1 align-middle"
                            />
                        </div>
                        
                        <div className="p-4 bg-white/5 border-t border-white/5 text-[9px] uppercase font-bold tracking-widest text-center text-white/20">
                            Proprietary Intelligence System
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
