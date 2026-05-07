"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Cpu, ChevronRight } from "lucide-react";

export const TerminalAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [lines, setLines] = useState<string[]>([]);
    const [input, setInput] = useState("");
    const terminalRef = useRef<HTMLDivElement>(null);

    const bootSequence = [
        "INITIALIZING GVB_CORE v1.0.4...",
        "AUTHENTICATING QUANTUM CHANNEL...",
        "SCANNING GLOBAL LIQUIDITY POOLS [OK]",
        "PROPRIETARY ALGORITHMS: STATUS_STABLE",
        "NEURAL NETWORK SYNC: 98.4%",
        "GVB TECH SOLUTIONS: READY TO SCALE",
        "------------------------------------",
        "SYSTEM STATUS: ALL ENGINES GO",
        "TYPE 'HELP' FOR COMMAND LIST"
    ];

    useEffect(() => {
        if (isOpen && lines.length === 0) {
            let lineIndex = 0;
            const interval = setInterval(() => {
                if (lineIndex < bootSequence.length) {
                    setLines(prev => [...prev, bootSequence[lineIndex]]);
                    lineIndex++;
                } else {
                    clearInterval(interval);
                }
            }, 300);
            return () => clearInterval(interval);
        }
    }, [isOpen, lines.length]);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [lines]);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input.toUpperCase().trim();
        setLines(prev => [...prev, `> ${input}`]);
        setInput("");

        setTimeout(() => {
            switch (cmd) {
                case "HELP":
                    setLines(prev => [...prev, "AVAILABLE COMMANDS:", " - STATUS: SYSTEM HEALTH", " - INFRA: GVB_OS / COREOS INFO", " - SERVICES: CORE OFFERINGS", " - CLEAR: PURGE CONSOLE"]);
                    break;
                case "STATUS":
                    setLines(prev => [...prev, "CPU: 128-CORE QUANTUM", "MEMORY: 2TB HBM3", "LATENCY: 0.002ms", "SECURITY: ENCRYPTED_AES_512"]);
                    break;
                case "INFRA":
                    setLines(prev => [...prev, "GVB_OS (BUILT ON COREOS):", "COREOS IS A CONTAINER-OPTIMIZED OS.", "WE USE IT FOR HIGH-SECURITY,", "SCALABLE TRADING CLUSTERS.", "TOTAL UPTIME: 99.999%"]);
                    break;
                case "SERVICES":
                    setLines(prev => [...prev, "1. PROPRIETARY TRADING", "2. ENTERPRISE SOFTWARE", "3. AI/ALGO DEVELOPMENT"]);
                    break;
                case "CLEAR":
                    setLines([]);
                    break;
                default:
                    setLines(prev => [...prev, `COMMAND NOT RECOGNIZED: ${cmd}`, "TYPE 'HELP' FOR ASSISTANCE."]);
            }
        }, 200);
    };

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
                        onClick={() => inputRef.current?.focus()}
                        className="fixed bottom-40 right-6 md:right-8 z-[100] w-[320px] md:w-[450px] h-[350px] bg-black/90 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono cursor-text"
                    >
                        {/* Header */}
                        <div className="h-10 bg-white/5 border-b border-white/10 flex items-center justify-between px-4 select-none">
                            <div className="flex items-center gap-2">
                                <Cpu className="w-4 h-4 text-gvb-cyan" />
                                <span className="text-[10px] uppercase font-black tracking-widest text-white/50">GVB_OS Kernel 1.0</span>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="text-white/40 hover:text-white transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Content */}
                        <div 
                            ref={terminalRef}
                            className="flex-1 p-4 overflow-y-auto text-xs leading-relaxed space-y-1 scrollbar-hide scroll-smooth"
                        >
                            {lines.map((line, i) => (
                                <div key={i} className={`${line.includes('[OK]') || line.startsWith(' -') || line.startsWith('1.') ? 'text-gvb-cyan' : line.startsWith('>') ? 'text-white font-bold' : 'text-white/80'}`}>
                                    {line.startsWith('>') ? '' : <span className="text-gvb-cyan/40 mr-2">$</span>}
                                    {line}
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleCommand} className="p-3 bg-white/5 border-t border-white/5 flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-gvb-cyan" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="ENTER COMMAND..."
                                className="flex-1 bg-transparent border-none outline-none text-xs text-gvb-cyan font-bold placeholder:text-white/20 uppercase"
                                autoFocus
                            />
                        </form>
                        
                        <div className="p-2 bg-black/40 text-[8px] uppercase font-bold tracking-widest text-center text-white/10">
                            Secure Core Shell Access
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

