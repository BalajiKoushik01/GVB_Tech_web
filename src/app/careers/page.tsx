"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Zap, Globe, Cpu } from "lucide-react";
import { Button } from "@/components/ui/Button";

const benefits = [
    { icon: <Zap className="w-6 h-6" />, title: "High-Impact Work", desc: "Build systems that move markets and shape the future of proprietary trading." },
    { icon: <Globe className="w-6 h-6" />, title: "Remote-First", desc: "Work from anywhere. We value output and engineering excellence over location." },
    { icon: <Cpu className="w-6 h-6" />, title: "Cutting-Edge Tech", desc: "Access top-tier hardware, leading AI models, and next-gen infrastructure." },
];

const openPositions = [
    { title: "Senior Quantitative Researcher", type: "Full-Time", location: "Remote / Global" },
    { title: "Low-Latency C++ Engineer", type: "Full-Time", location: "Remote / Global" },
    { title: "Full Stack AI Developer", type: "Full-Time", location: "Remote / India" },
];

export default function CareersPage() {
    return (
        <div className="min-h-[100dvh] pt-24 pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-start/20 rounded-full blur-[100px] mix-blend-screen opacity-50" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent-end/10 rounded-full blur-[120px] mix-blend-screen opacity-30" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        Join the <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-start to-accent-end">Vanguard</span>
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/70 mb-8">
                        We are a collective of elite engineers, quants, and visionaries building the next generation of financial and technological infrastructure.
                    </p>
                </motion.div>

                {/* Benefits Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {benefits.map((b, i) => (
                        <motion.div
                            key={b.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="glass-card p-8 rounded-[1.25rem] text-center group hover:bg-white/10 transition-colors duration-500 bg-white/5 backdrop-blur-3xl border border-white/10"
                        >
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent-start/20 to-accent-end/20 flex items-center justify-center mb-6 text-accent-start group-hover:scale-110 transition-transform duration-500">
                                {b.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{b.title}</h3>
                            <p className="text-foreground/70">{b.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Open Positions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="flex items-center space-x-3 mb-8">
                        <Briefcase className="text-accent-start w-6 h-6" />
                        <h2 className="text-3xl font-bold tracking-tighter">Open Positions</h2>
                    </div>

                    <div className="space-y-4">
                        {openPositions.map((pos, i) => (
                            <motion.div
                                key={pos.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6 md:p-8 rounded-[1.25rem] flex flex-col md:flex-row md:items-center justify-between group hover:border-accent-start/30 transition-all duration-300 bg-white/5 backdrop-blur-3xl border border-white/10"
                            >
                                <div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-start group-hover:to-accent-end transition-all">{pos.title}</h3>
                                    <div className="flex space-x-4 text-sm text-foreground/60">
                                        <span>{pos.type}</span>
                                        <span>&bull;</span>
                                        <span>{pos.location}</span>
                                    </div>
                                </div>
                                <div className="mt-6 md:mt-0">
                                    <Button variant="outline" className="w-full md:w-auto">
                                        Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
