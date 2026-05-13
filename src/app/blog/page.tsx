"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock, Tag } from "lucide-react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";

const posts = [
    {
        title: "The Evolution of High-Frequency Trading Algorithms in 2026",
        date: "Feb 24, 2026",
        readTime: "8 min read",
        category: "Quantitative Trading",
        excerpt: "As latency barriers approach physical limits, the focus of HFT is shifting from pure speed to predictive AI micro-models that anticipate market micro-structures.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Building Resilient Distributed Systems for Financial Tech",
        date: "Feb 18, 2026",
        readTime: "12 min read",
        category: "Engineering",
        excerpt: "A deep dive into how we architect zero-downtime systems capable of processing millions of transactions per second without compromising data integrity.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Why Rust is Dominating the FinTech Backend Landscape",
        date: "Jan 30, 2026",
        readTime: "6 min read",
        category: "Software Development",
        excerpt: "Memory safety without garbage collection overhead makes Rust the perfect candidate for mission-critical trading engines where every microsecond counts.",
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "The Role of Neural Networks in Dynamic Portfolio Optimization",
        date: "Jan 15, 2026",
        readTime: "10 min read",
        category: "Artificial Intelligence",
        excerpt: "Exploring how reinforcement learning agents are outperforming traditional Markowitz models in highly volatile crypto-asset environments.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-[100dvh] pt-32 pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-accent-end/10 rounded-full blur-[150px] mix-blend-screen opacity-30" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mb-24"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                        Intelligence Feed
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 text-white uppercase">
                        Insights & <span className="text-gradient">Protocol</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/60 font-bold tracking-tight">
                        Strategic analysis on quantitative finance, low-latency engineering, and the neural systems of tomorrow.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {posts.map((post, i) => (
                        <motion.div
                            key={post.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                        >
                            <GlassCard hoverEffect={true} className="flex flex-col !p-0 !bg-white/5 border-white/10 overflow-hidden group">
                                <div className="h-64 md:h-80 w-full relative overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute top-6 left-6 flex gap-2">
                                        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black text-white uppercase tracking-widest">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 md:p-10 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 text-white/40 text-xs font-bold mb-6 uppercase tracking-widest">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            {post.readTime}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black mb-6 text-white group-hover:text-gvb-cyan transition-colors leading-tight uppercase tracking-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-white/60 font-bold mb-10 flex-1 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-auto inline-flex items-center gap-2 text-white font-black uppercase text-xs tracking-[0.2em] group/btn">
                                        Access Intel <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
