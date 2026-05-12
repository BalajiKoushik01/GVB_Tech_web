"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
interface Message {
    id: string;
    role: "assistant" | "user";
    content: string;
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", role: "assistant", content: "Hi! I'm GVB's AI assistant. How can I help you today?" }
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMessage] })
            });

            const data = await response.json();

            if (data.text) {
                setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: data.text }]);
            } else {
                setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: "I am having trouble connecting to my servers right now. Please try again later." }]);
            }

        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: "Sorry, I encountered an error. Please email us directly." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="w-[calc(100vw-48px)] sm:w-[380px] max-w-[400px]"
                    >
                        <div className="flex flex-col h-[500px] overflow-hidden p-0 rounded-2xl bg-[#020617]/95 backdrop-blur-3xl saturate-[1.8] transform translate-z-0 border border-white/20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-gvb-deep to-gvb-blue p-4 flex items-center justify-between shadow-md">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                                        <Bot className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">GVB Assistant</h3>
                                        <p className="text-white/70 text-xs flex items-center font-medium">
                                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                                            Online 24/7
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white/80 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={msg.id}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`flex max-w-[80%] items-end space-x-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-accent-start/20' : 'bg-black/5 dark:bg-white/10'}`}>
                                                {msg.role === 'user' ? <User className="w-4 h-4 text-foreground/80" /> : <Bot className="w-4 h-4 text-accent-start" />}
                                            </div>
                                            <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user'
                                                ? 'bg-gradient-to-bl from-gvb-blue to-gvb-cyan text-white rounded-br-none shadow-sm font-bold'
                                                : 'bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-bl-none shadow-sm font-medium'
                                                }`}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex justify-start"
                                    >
                                        <div className="flex items-end space-x-2">
                                            <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center">
                                                <Bot className="w-4 h-4 text-accent-start" />
                                            </div>
                                            <div className="bg-white/80 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 p-4 rounded-2xl rounded-bl-none flex space-x-1 items-center">
                                                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-foreground/50 rounded-full" />
                                                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-foreground/50 rounded-full" />
                                                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-foreground/50 rounded-full" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-background/50 backdrop-blur-md border-t border-black/5 dark:border-white/10">
                                <form
                                    onSubmit={handleSend}
                                    className="relative flex items-center"
                                >
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        disabled={isLoading}
                                        placeholder={isLoading ? "AI is typing..." : "Type your message..."}
                                        className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-gvb-cyan/50 text-white placeholder:text-white/40 transition-all disabled:opacity-50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!input.trim() || isLoading}
                                        className="absolute right-2 p-2 rounded-full bg-accent-start text-white hover:bg-accent-end disabled:opacity-50 disabled:hover:bg-accent-start transition-colors"
                                    >
                                        <Send className="w-4 h-4 ml-0.5" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-gvb-deep to-gvb-cyan flex items-center justify-center shadow-[0_0_30px_rgba(0,163,255,0.4)] border border-white/20 transition-shadow hover:shadow-[0_0_40px_rgba(0,163,255,0.6)] relative overflow-hidden"
            >
                {isOpen ? <X className="w-5 h-5 text-white relative z-10" /> : <MessageSquare className="w-5 h-5 text-white relative z-10" />}
            </motion.button>
        </div>
    );
}
