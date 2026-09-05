"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock } from "lucide-react";
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
                        Technical Insights
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 text-white uppercase">
                        Engineering <span className="text-gradient">Insights</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/60 font-bold tracking-tight">
                        Articles on automated workflows, real-time dashboards, cloud software architecture, and applied AI systems.
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
                                        Read Article <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
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
