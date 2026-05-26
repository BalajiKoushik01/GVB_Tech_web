"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Cpu, ChevronRight, MessageSquare, Send, Bot, User } from "lucide-react";

interface Message {
    id: string;
    role: "assistant" | "user";
    content: string;
}

// ─── TERMINAL ──────────────────────────────────────────────────────────────────
function TerminalPanel({ onClose }: { onClose: () => void }) {
    const [lines, setLines] = useState<string[]>([]);
    const [input, setInput] = useState("");
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const bootSequence = [
        "INITIALIZING GVB_CORE v1.0.4...",
        "AUTHENTICATING QUANTUM CHANNEL...",
        "SCANNING GLOBAL LIQUIDITY POOLS [OK]",
        "PROPRIETARY ALGORITHMS: STATUS_STABLE",
        "NEURAL NETWORK SYNC: 98.4%",
        "GVB TECH SOLUTIONS: READY TO SCALE",
        "------------------------------------",
        "SYSTEM STATUS: ALL ENGINES GO",
        "------------------------------------",
        "AVAILABLE COMMANDS:",
        " - HELP: SHOW THIS MENU",
        " - STATUS: SYSTEM HEALTH",
        " - INFRA: GVB_OS / COREOS INFO",
        " - SERVICES: CORE OFFERINGS",
        " - CLEAR: PURGE CONSOLE",
        "------------------------------------",
    ];

    useEffect(() => {
        if (lines.length === 0) {
            let i = 0;
            const iv = setInterval(() => {
                if (i < bootSequence.length) {
                    setLines(prev => [...prev, bootSequence[i]]);
                    i++;
                } else clearInterval(iv);
            }, 80);
            return () => clearInterval(iv);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight, behavior: "smooth" });
    }, [lines]);

    useEffect(() => { inputRef.current?.focus(); }, []);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        const cmd = input.toUpperCase().trim();
        setLines(prev => [...prev, `> ${input}`]);
        setInput("");
        setTimeout(() => {
            switch (cmd) {
                case "HELP":
                    setLines(prev => [...prev, "AVAILABLE COMMANDS:", " - STATUS", " - INFRA", " - SERVICES", " - CLEAR"]);
                    break;
                case "STATUS":
                    setLines(prev => [...prev, "CPU: 128-CORE QUANTUM", "MEMORY: 2TB HBM3", "LATENCY: 0.002ms", "UPTIME: 99.999%"]);
                    break;
                case "INFRA":
                    setLines(prev => [...prev, "GVB_OS (BUILT ON COREOS):", "CONTAINER-OPTIMIZED OS", "HIGH-SECURITY TRADING CLUSTERS"]);
                    break;
                case "SERVICES":
                    setLines(prev => [...prev, "1. PROPRIETARY TRADING", "2. ENTERPRISE SOFTWARE", "3. AI/ALGO DEVELOPMENT"]);
                    break;
                case "CLEAR":
                    setLines([]);
                    break;
                default:
                    setLines(prev => [...prev, `UNKNOWN: ${cmd}`, "TYPE 'HELP' FOR COMMANDS."]);
            }
        }, 150);
    };

    return (
        <div
            onClick={() => inputRef.current?.focus()}
            className="w-[calc(100vw-48px)] sm:w-[400px] h-[300px] bg-black/95 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono cursor-text"
        >
            <div className="h-9 bg-white/5 border-b border-white/10 flex items-center justify-between px-3 select-none flex-shrink-0">
                <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-gvb-cyan" />
                    <span className="text-[9px] uppercase font-black tracking-widest text-white/50">GVB_OS Kernel 1.0</span>
                </div>
                <button onClick={onClose} className="text-white/40 hover:text-white transition-colors p-1">
                    <X className="w-3.5 h-3.5" />
                </button>
            </div>
            <div ref={terminalRef} className="flex-1 p-3 overflow-y-auto text-[11px] leading-relaxed space-y-0.5 scrollbar-hide">
                {lines.map((line, i) => (
                    <div key={i} className={
                        line.includes("[OK]") || line.startsWith(" -") || line.startsWith("1.")
                            ? "text-gvb-cyan"
                            : line.startsWith(">")
                                ? "text-white font-bold"
                                : "text-white/75"
                    }>
                        {!line.startsWith(">") && <span className="text-gvb-cyan/30 mr-1.5">$</span>}
                        {line}
                    </div>
                ))}
            </div>
            <form onSubmit={handleCommand} className="px-3 py-2 bg-white/5 border-t border-white/5 flex items-center gap-2 flex-shrink-0">
                <ChevronRight className="w-3.5 h-3.5 text-gvb-cyan flex-shrink-0" />
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="ENTER COMMAND..."
                    className="flex-1 bg-transparent border-none outline-none text-[11px] text-gvb-cyan font-bold placeholder:text-white/20 uppercase"
                    autoFocus
                />
            </form>
        </div>
    );
}

// ─── CHAT ──────────────────────────────────────────────────────────────────────
function ChatPanel({ onClose }: { onClose: () => void }) {
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", role: "assistant", content: "Hi! I'm GVB's AI assistant. How can I help you today?" }
    ]);
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMsg] })
            });
            const data = await res.json();
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.text || "I'm having trouble connecting. Please try again later."
            }]);
        } catch {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Sorry, an error occurred. Please email us directly."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-[calc(100vw-48px)] sm:w-[360px] h-[440px] flex flex-col overflow-hidden rounded-2xl bg-[#020617]/95 backdrop-blur-3xl border border-white/15 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]">
            {/* Header */}
            <div className="bg-gradient-to-r from-gvb-deep to-gvb-blue p-3.5 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-white font-black text-sm tracking-tight">GVB Assistant</p>
                        <p className="text-white/70 text-[10px] flex items-center font-medium gap-1.5">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                            Online 24/7
                        </p>
                    </div>
                </div>
                <button onClick={onClose} className="text-white/70 hover:text-white transition-colors p-1">
                    <X className="w-4.5 h-4.5" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map(msg => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div className={`flex max-w-[82%] items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-gvb-blue/30" : "bg-white/10"}`}>
                                {msg.role === "user"
                                    ? <User className="w-3.5 h-3.5 text-gvb-cyan" />
                                    : <Bot className="w-3.5 h-3.5 text-white/70" />
                                }
                            </div>
                            <div className={`p-3 rounded-2xl text-xs font-medium leading-relaxed ${msg.role === "user"
                                ? "bg-gradient-to-bl from-gvb-blue to-gvb-cyan text-white rounded-br-none"
                                : "bg-white/8 border border-white/10 text-white/90 rounded-bl-none"
                            }`}>
                                {msg.content}
                            </div>
                        </div>
                    </motion.div>
                ))}
                {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="flex items-end gap-2">
                            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                                <Bot className="w-3.5 h-3.5 text-white/70" />
                            </div>
                            <div className="bg-white/8 border border-white/10 p-3 rounded-2xl rounded-bl-none flex gap-1 items-center">
                                {[0, 0.2, 0.4].map(d => (
                                    <motion.div key={d} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: d }}
                                        className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex-shrink-0">
                <form onSubmit={handleSend} className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        disabled={isLoading}
                        placeholder={isLoading ? "GVB AI is typing..." : "Ask me anything..."}
                        className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-2.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-gvb-cyan/50 text-white placeholder:text-white/30 transition-all disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-1.5 p-1.5 rounded-full bg-gvb-blue hover:bg-gvb-cyan disabled:opacity-40 transition-colors"
                    >
                        <Send className="w-3.5 h-3.5 text-white" />
                    </button>
                </form>
            </div>
        </div>
    );
}

// ─── SHARED FLOATING STACK ─────────────────────────────────────────────────────
export function FloatingWidgets() {
    const [activePanel, setActivePanel] = useState<"none" | "chat" | "terminal">("none");

    return (
        // Single fixed anchor — everything stacks from bottom-right, no overlap possible
        <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">

            {/* Active panel (only one at a time) */}
            <AnimatePresence mode="wait">
                {activePanel === "terminal" && (
                    <motion.div
                        key="terminal"
                        initial={{ opacity: 0, y: 16, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <TerminalPanel onClose={() => setActivePanel("none")} />
                    </motion.div>
                )}
                {activePanel === "chat" && (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, y: 16, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <ChatPanel onClose={() => setActivePanel("none")} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Button row — always visible, side by side */}
            <div className="flex items-center gap-2">
                {/* Terminal button */}
                <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setActivePanel(p => p === "terminal" ? "none" : "terminal")}
                    data-cursor="magnetic"
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all shadow-md relative overflow-hidden ${
                        activePanel === "terminal"
                            ? "bg-gvb-cyan/20 border-gvb-cyan/60 shadow-[0_0_20px_rgba(0,209,255,0.35)]"
                            : "bg-black/60 backdrop-blur-xl border-white/20 hover:border-gvb-cyan/50"
                    }`}
                >
                    {activePanel === "terminal"
                        ? <X className="w-4 h-4 text-gvb-cyan" />
                        : <>
                            <div className="absolute inset-0 bg-gvb-blue/20 rounded-full animate-ping opacity-20" />
                            <Terminal className="w-4 h-4 text-white" />
                        </>
                    }
                </motion.button>

                {/* Chat button */}
                <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setActivePanel(p => p === "chat" ? "none" : "chat")}
                    data-cursor="magnetic"
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all shadow-md ${
                        activePanel === "chat"
                            ? "bg-gvb-blue/30 border-gvb-blue/60 shadow-[0_0_20px_rgba(0,100,255,0.4)]"
                            : "bg-gradient-to-br from-gvb-deep to-gvb-cyan border-white/20 shadow-[0_0_16px_rgba(0,163,255,0.25)] hover:shadow-[0_0_28px_rgba(0,163,255,0.45)]"
                    }`}
                >
                    {activePanel === "chat"
                        ? <X className="w-4 h-4 text-white" />
                        : <MessageSquare className="w-4 h-4 text-white" />
                    }
                </motion.button>
            </div>
        </div>
    );
}
