"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Lock } from "lucide-react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";

const posts = [
    {
        title: "Architecting Resilient Background Automation Engines in 2026",
        date: "Feb 24, 2026",
        readTime: "8 min read",
        category: "Automation & Workflows",
        excerpt: "A practical guide to designing fault-tolerant background task processors, idempotent worker queues, and automated data pipelines.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Building High-Throughput Real-Time Telemetry & Metric Dashboards",
        date: "Feb 18, 2026",
        readTime: "10 min read",
        category: "Data & Analytics",
        excerpt: "How we structure high-performance web applications that visualize streaming telemetry and complex business KPIs with zero UI lag.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Modern Full-Stack Engineering: Clean Architecture with Next.js & Python",
        date: "Jan 30, 2026",
        readTime: "7 min read",
        category: "Software Engineering",
        excerpt: "Combining Next.js App Router with FastAPI microservices to deliver maintainable, type-safe, and lightning-fast enterprise web apps.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Applied Machine Learning: From Neural Research to Production Pipelines",
        date: "Jan 15, 2026",
        readTime: "9 min read",
        category: "Applied AI",
        excerpt: "Best practices for operationalizing deep learning and computer vision models into robust, automated production workflows.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-[100dvh] pt-24 sm:pt-28 md:pt-32 pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gvb-accent/8 rounded-full blur-[150px] mix-blend-screen opacity-30" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Page Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-14 md:mb-20"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                        Technical Insights
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 text-white uppercase leading-none">
                        Engineering <span className="text-gradient">Insights</span>
                    </h1>
                    <p className="text-base md:text-xl text-white/60 font-bold tracking-tight max-w-2xl leading-relaxed">
                        Articles on automated workflows, real-time dashboards, cloud software architecture, and applied AI systems.
                    </p>

                    {/* Coming Soon Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gvb-cyan/5 border border-gvb-cyan/20 text-gvb-cyan"
                    >
                        <Lock className="w-4 h-4 flex-shrink-0" />
                        <span className="text-xs font-black uppercase tracking-widest">Full articles launching soon — content pipeline in progress</span>
                    </motion.div>
                </motion.div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
                    {posts.map((post, i) => (
                        <motion.div
                            key={post.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.6 }}
                        >
                            <GlassCard hoverEffect={true} className="flex flex-col !p-0 !bg-white/[0.04] border-white/10 overflow-hidden group h-full">
                                {/* Post Image */}
                                <div className="h-52 sm:h-60 md:h-72 w-full relative overflow-hidden flex-shrink-0">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    {/* Tags row */}
                                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-black text-white uppercase tracking-widest">
                                            {post.category}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-gvb-cyan/10 backdrop-blur-md border border-gvb-cyan/30 text-[9px] font-black text-gvb-cyan uppercase tracking-widest flex items-center gap-1">
                                            <Lock className="w-2.5 h-2.5" /> Coming Soon
                                        </span>
                                    </div>
                                </div>

                                {/* Post Body */}
                                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 text-white/30 text-[10px] font-bold mb-4 uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-3 h-3" />
                                            {post.readTime}
                                        </span>
                                    </div>
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-4 text-white group-hover:text-gvb-cyan transition-colors duration-300 leading-snug uppercase tracking-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-white/50 font-bold mb-6 flex-1 leading-relaxed text-sm">
                                        {post.excerpt}
                                    </p>
                                    {/* Disabled "Read Article" */}
                                    <div className="mt-auto inline-flex items-center gap-2 text-white/20 font-black uppercase text-[10px] tracking-[0.2em] cursor-not-allowed select-none">
                                        <Lock className="w-3 h-3" />
                                        Read Article
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-16 md:mt-20"
                >
                    <p className="text-white/20 text-xs font-black uppercase tracking-[0.3em]">
                        More articles in progress — check back soon
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
