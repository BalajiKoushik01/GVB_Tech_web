"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const categories = ["All", "Trading", "Software", "Strategy", "Marketing"];

const projects = [
    {
        id: 1,
        title: "AlphaGen Trading Engine",
        category: "Trading",
        tech: ["Python", "C++", "AWS"],
        image: "/assets/portfolio/alphagen.png",
        desc: "A high-frequency proprietary trading engine capable of processing millions of quotes per second.",
    },
    {
        id: 2,
        title: "FinTech Enterprise Portal",
        category: "Software",
        tech: ["Next.js", "Node.js", "PostgreSQL"],
        image: "/assets/portfolio/portal.png",
        desc: "Core banking and dashboard portal built for a Tier-1 financial institution.",
    },
    {
        id: 3,
        title: "Market Expansion Strategy",
        category: "Strategy",
        tech: ["Data Analytics", "Tableau", "Consulting"],
        image: "/assets/portfolio/expansion.png",
        desc: "A comprehensive digital transformation roadmap for an APAC logistics firm.",
    },
    {
        id: 4,
        title: "Campus Connect EdTech",
        category: "Software",
        tech: ["React", "Express", "MongoDB"],
        image: "/assets/portfolio/campus.png",
        desc: "University management system scaling to over 100k daily active students.",
    },
    {
        id: 5,
        title: "Blockchain Sentiment Bot",
        category: "Trading",
        tech: ["Python", "NLP", "TensorFlow"],
        image: "/assets/portfolio/sentiment.png",
        desc: "Real-time Twitter & news sentiment analysis bot connected directly to trading terminals.",
    },
    {
        id: 6,
        title: "Global SaaS Launch",
        category: "Marketing",
        tech: ["SEO", "AdWords", "Content"],
        image: "/assets/portfolio/saas.png",
        desc: "Helped a B2B startup achieve 300% YoY growth through aggressive performance marketing.",
    },
];

export default function PortfolioPage() {
    const [filter, setFilter] = useState("All");

    const filteredProjects = projects.filter(
        (p) => filter === "All" || p.category === filter
    );

    return (
        <div className="pt-20 md:pt-24 pb-16 min-h-[100dvh]">
            {/* Header */}
            <section className="px-6 py-12 md:py-16 text-center">
                <h1 className="text-4xl md:text-7xl font-black mb-4 md:mb-6 text-white uppercase tracking-tighter leading-none">Our <span className="text-gradient">Work</span></h1>
                <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-10 md:mb-12 font-bold leading-relaxed px-2">
                    Explore a selection of our finest projects across trading systems, enterprise software, and strategic consulting.
                </p>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-10 md:mb-16 px-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-3 md:px-6 py-2 rounded-full text-[10px] md:text-sm font-black uppercase tracking-widest transition-all duration-300 relative flex items-center ${filter === cat
                                ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                                : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/5"
                                }`}
                        >
                            {filter === cat && <span className="w-1.5 h-1.5 bg-gvb-cyan rounded-full animate-pulse mr-2" />}
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                        <AnimatePresence mode="sync">
                            {filteredProjects.map((project, idx) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: (idx % 10) * 0.05 }}
                                >
                                    <GlassCard className="p-0 overflow-hidden group h-full flex flex-col cursor-pointer border-white/5 hover:border-white/20 bg-white/5 backdrop-blur-3xl">
                                        <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-800">
                                            <Image 
                                                src={project.image} 
                                                alt={project.title} 
                                                fill 
                                                className="object-cover md:grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                                                <ArrowUpRight className="w-5 h-5 text-white" />
                                            </div>
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex gap-2 mb-3 md:mb-4">
                                                <span className="text-[10px] md:text-xs font-black px-2 md:px-3 py-1 bg-gvb-cyan/10 text-gvb-cyan rounded-full uppercase tracking-widest">
                                                    {project.category}
                                                </span>
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-white group-hover:text-gvb-cyan transition-colors">{project.title}</h3>
                                            <p className="text-white/60 text-xs md:text-sm mb-4 md:mb-6 flex-1 font-medium">{project.desc}</p>
                                            <div className="flex flex-wrap gap-2 mt-auto">
                                                {project.tech.map((t) => (
                                                    <span key={t} className="text-xs font-medium text-white/40">
                                                        #{t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
