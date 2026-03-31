"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

const posts = [
    {
        title: "The Evolution of High-Frequency Trading Algorithms in 2026",
        date: "Feb 24, 2026",
        category: "Quantitative Trading",
        excerpt: "As latency barriers approach physical limits, the focus of HFT is shifting from pure speed to predictive AI micro-models...",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Building Resilient Distributed Systems for Financial Tech",
        date: "Feb 18, 2026",
        category: "Engineering",
        excerpt: "A deep dive into how we architect zero-downtime systems capable of processing millions of transactions per second.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Why Rust is Dominating the FinTech Backend Landscape",
        date: "Jan 30, 2026",
        category: "Software Development",
        excerpt: "Memory safety without garbage collection overhead makes Rust the perfect candidate for mission-critical trading engines.",
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800&auto=format&fit=crop"
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-[100dvh] pt-24 pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent-end/10 rounded-full blur-[120px] mix-blend-screen opacity-40" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="max-w-3xl mb-16"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        Insights & <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-start to-accent-end">Analysis</span>
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/70">
                        Deep dives into quantitative finance, software engineering, and the technologies shaping the future.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                        <motion.div
                            key={post.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            className="glass-card rounded-[1.25rem] overflow-hidden group hover:border-accent-start/30 transition-all duration-300 flex flex-col bg-white/5 backdrop-blur-3xl border border-white/10"
                        >
                            <div className="h-48 w-full overflow-hidden relative">
                                {/* Fallback color if image doesn't load immediately */}
                                <div className="absolute inset-0 bg-white/5" />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 glass-card px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-3xl bg-white/10 border border-white/20">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6 md:p-8 flex-1 flex flex-col">
                                <div className="flex items-center space-x-2 text-sm text-foreground/50 mb-3">
                                    <Calendar className="w-4 h-4" />
                                    <span>{post.date}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-accent-start transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-foreground/70 text-sm mb-6 flex-1">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto flex items-center text-sm font-semibold text-accent-start group-hover:text-white transition-colors cursor-pointer w-max">
                                    Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
