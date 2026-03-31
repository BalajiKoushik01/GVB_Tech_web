"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowUpRight } from "lucide-react";

const categories = ["All", "Trading", "Software", "Strategy", "Marketing"];

const projects = [
    {
        id: 1,
        title: "AlphaGen Trading Engine",
        category: "Trading",
        tech: ["Python", "C++", "AWS"],
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200",
        desc: "A high-frequency proprietary trading engine capable of processing millions of quotes per second.",
    },
    {
        id: 2,
        title: "FinTech Enterprise Portal",
        category: "Software",
        tech: ["Next.js", "Node.js", "PostgreSQL"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
        desc: "Core banking and dashboard portal built for a Tier-1 financial institution.",
    },
    {
        id: 3,
        title: "Market Expansion Strategy",
        category: "Strategy",
        tech: ["Data Analytics", "Tableau", "Consulting"],
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
        desc: "A comprehensive digital transformation roadmap for an APAC logistics firm.",
    },
    {
        id: 4,
        title: "Campus Connect EdTech",
        category: "Software",
        tech: ["React", "Express", "MongoDB"],
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
        desc: "University management system scaling to over 100k daily active students.",
    },
    {
        id: 5,
        title: "Blockchain Sentiment Bot",
        category: "Trading",
        tech: ["Python", "NLP", "TensorFlow"],
        image: "https://images.unsplash.com/photo-1621504450181-5d156fc2135d?auto=format&fit=crop&q=80&w=1200",
        desc: "Real-time Twitter & news sentiment analysis bot connected directly to trading terminals.",
    },
    {
        id: 6,
        title: "Global SaaS Launch",
        category: "Marketing",
        tech: ["SEO", "AdWords", "Content"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
        desc: "Helped a B2B startup achieve 300% YoY growth through aggressive performance marketing.",
    },
];

export default function PortfolioPage() {
    const [filter, setFilter] = useState("All");

    const filteredProjects = projects.filter(
        (p) => filter === "All" || p.category === filter
    );

    return (
        <div className="pt-24 pb-16 min-h-[100dvh]">
            {/* Header */}
            <section className="px-4 py-16 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6">Our <span className="text-gradient">Work</span></h1>
                <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto mb-10 md:mb-12">
                    Explore a selection of our finest projects across trading systems, enterprise software, and strategic consulting.
                </p>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${filter === cat
                                ? "bg-accent-start text-white shadow-lg shadow-accent-start/30"
                                : "bg-gray-100 dark:bg-white/5 text-foreground/70 hover:bg-gray-200 dark:hover:bg-white/10"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, idx) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: (idx % 10) * 0.05 }}
                                >
                                    <GlassCard className="p-0 overflow-hidden group h-full flex flex-col cursor-pointer border-transparent hover:border-white/20">
                                        <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-800">
                                            {/* Using standard img tag with Unsplash for demo since next/image needs domain config usually */}
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                                                <ArrowUpRight className="w-5 h-5 text-white" />
                                            </div>
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex gap-2 mb-3 md:mb-4">
                                                <span className="text-[10px] md:text-xs font-semibold px-2 md:px-3 py-1 bg-accent-start/20 text-accent-start rounded-full">
                                                    {project.category}
                                                </span>
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 group-hover:text-accent-start transition-colors">{project.title}</h3>
                                            <p className="text-foreground/70 text-xs md:text-sm mb-4 md:mb-6 flex-1">{project.desc}</p>
                                            <div className="flex flex-wrap gap-2 mt-auto">
                                                {project.tech.map((t) => (
                                                    <span key={t} className="text-xs font-medium text-foreground/50">
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
