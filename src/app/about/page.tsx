"use client";

import React from 'react';
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Target, Eye, Shield, Users, Trophy } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="relative min-h-screen">
            
            <div className="pt-32 pb-16 relative z-10">
                <section className="px-4 py-20 max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block py-2 px-6 rounded-full liquid-glass mb-8 border-gvb-blue/20"
                    >
                        <span className="text-sm font-bold tracking-widest text-gvb-blue uppercase font-mono">Our Evolution</span>
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white tracking-tighter"
                    >
                        Our <span className="text-gradient">Story</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-bold tracking-tight leading-relaxed"
                    >
                        GVB Tech Solutions was born from the vision of bridging elite proprietary trading intelligence
                        with world-class enterprise software development. We engineer the future.
                    </motion.p>
                </section>

                {/* Mission & Vision */}
                <section className="px-4 py-16 relative z-10">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <GlassCard className="h-full p-8 md:p-12 !bg-white/5 backdrop-blur-3xl border-white/10 group">
                                <div className="w-16 h-16 rounded-2xl bg-gvb-blue/10 flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform">
                                    <Target className="w-8 h-8 text-gvb-blue" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight uppercase">Our Mission</h2>
                                <p className="text-lg md:text-xl text-white/70 font-bold leading-relaxed">
                                    To empower global businesses by delivering transformative digital solutions, merging strategic business consulting with cutting-edge technology to unlock unprecedented growth and efficiency.
                                </p>
                            </GlassCard>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <GlassCard className="h-full p-8 md:p-12 !bg-white/5 backdrop-blur-3xl border-white/10 group">
                                <div className="w-16 h-16 rounded-2xl bg-gvb-deep/10 flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform">
                                    <Eye className="w-8 h-8 text-gvb-deep" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight uppercase">Our Vision</h2>
                                <p className="text-lg md:text-xl text-white/70 font-bold leading-relaxed">
                                    To be the foremost global partner in technological innovation, known for crafting elegant, high-performance systems that redefine industry standards and propel humanity forward.
                                </p>
                            </GlassCard>
                        </motion.div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="py-24 px-4 relative z-10 mt-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tighter uppercase">Core Values</h2>
                            <p className="text-xl md:text-2xl text-white/70 font-bold tracking-tight">Principles that guide every strategic decision.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <ValueCard
                                icon={Shield}
                                title="Integrity First"
                                desc="We build transparent, secure, and resilient systems you can trust implicitly."
                                delay={0.1}
                            />
                            <ValueCard
                                icon={Trophy}
                                title="Excellence"
                                desc="We pursue technical perfection and elite performance in everything we create."
                                delay={0.2}
                            />
                            <ValueCard
                                icon={Users}
                                title="Partnership"
                                desc="Your success is our success. We integrate as an extension of your own team."
                                delay={0.3}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

function ValueCard({ icon: Icon, title, desc, delay }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>, title: string, desc: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
        >
            <GlassCard hoverEffect={true} className="text-center p-8 md:p-12 !bg-white/5 backdrop-blur-3xl border-white/10">
                <div className="w-16 h-16 mx-auto rounded-full bg-gvb-blue/10 text-gvb-blue flex items-center justify-center mb-8">
                    <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-tight">{title}</h3>
                <p className="text-lg text-white/70 font-bold">{desc}</p>
            </GlassCard>
        </motion.div>
    );
}
