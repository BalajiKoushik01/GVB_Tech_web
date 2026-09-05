"use client";

import React from 'react';
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Target, Eye, Shield, Users, Trophy } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="relative min-h-screen">
            
            <div className="pt-20 md:pt-32 pb-16 relative z-10">
                <section className="px-6 py-12 md:py-20 max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-6 md:mb-8"
                    >
                        <span className="w-1.5 h-1.5 bg-gvb-cyan rounded-full animate-pulse" />
                        <span className="text-[9px] md:text-[10px] font-black tracking-[0.3em] text-gvb-cyan uppercase">Engineering Leadership</span>
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-white tracking-tighter uppercase leading-none"
                    >
                        Engineering <span className="text-gradient">Rigor</span> & Focus
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-2xl text-white/70 max-w-3xl mx-auto font-bold tracking-tight leading-relaxed px-2"
                    >
                        GVB Tech Solutions is a specialized software and AI consultancy founded by Balaji Koushik. We combine aerospace testing discipline and decision-science experience to build clean, high-performance technology tools for modern operations.
                    </motion.p>
                </section>

                {/* Founder Credentials & Origin */}
                <section className="px-4 py-12 relative z-10 max-w-6xl mx-auto">
                    <GlassCard className="p-8 md:p-14 !bg-white/5 backdrop-blur-3xl border-white/10">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-gvb-cyan/10 border border-gvb-cyan/20 text-gvb-cyan text-xs font-black uppercase tracking-widest mb-6">
                            Founding Backstory & Credentials
                        </div>
                        <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                            Bridging Technical Rigor with Applied Analytics
                        </h2>
                        <div className="space-y-6 text-white/70 text-base md:text-lg font-bold leading-relaxed">
                            <p>
                                Grounded in an engineering internship at <strong className="text-white">ISRO SDSC SHAR</strong> (Satish Dhawan Space Centre), founder Balaji Koushik developed a foundational commitment to high-reliability systems and testing protocols.
                            </p>
                            <p>
                                Further honed by consulting experience at <strong className="text-white">Mu Sigma</strong> in decision science and quantitative modeling, GVB Tech Solutions was established to deliver that same level of analytical precision to custom software, automated tools, and interactive dashboards.
                            </p>
                            <p>
                                Operating as an agile, family-supported technology firm based in Sullurpeta, Andhra Pradesh, we focus on building robust R&D projects and delivering tailored technical systems for our clients with total transparency and engineering integrity.
                            </p>
                        </div>
                    </GlassCard>
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
                            <GlassCard className="h-full p-6 md:p-10 !bg-white/5 backdrop-blur-3xl border-white/10 group">
                                <div className="w-14 h-14 rounded-2xl bg-gvb-blue/10 flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                                    <Target className="w-7 h-7 text-gvb-blue" />
                                </div>
                                <h2 className="text-2xl md:text-4xl font-black mb-4 text-white tracking-tight uppercase">Our Purpose</h2>
                                <p className="text-base md:text-xl text-white/70 font-bold leading-relaxed">
                                    To solve complex operational challenges by building high-reliability automated tools, bespoke software architecture, and decision-support dashboards backed by verifiable engineering principles.
                                </p>
                            </GlassCard>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <GlassCard className="h-full p-6 md:p-10 !bg-white/5 backdrop-blur-3xl border-white/10 group">
                                <div className="w-14 h-14 rounded-2xl bg-gvb-accent/10 flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                                    <Eye className="w-7 h-7 text-gvb-accent" />
                                </div>
                                <h2 className="text-2xl md:text-4xl font-black mb-4 text-white tracking-tight uppercase">Our Approach</h2>
                                <p className="text-base md:text-xl text-white/70 font-bold leading-relaxed">
                                    &ldquo;Convergence of academia and industry&rdquo; — maintaining active R&D into machine learning, medical AI, industrial data pipelines, and quantitative modeling while delivering lean, production-grade solutions.
                                </p>
                            </GlassCard>
                        </motion.div>
                    </div>
                </section>

                {/* Methodology / Process */}
                <section className="py-24 px-4 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tighter uppercase">Our <span className="text-gradient">Methodology</span></h2>
                            <p className="text-xl md:text-2xl text-white/70 font-bold tracking-tight">The engineering cycle that delivers reliable software solutions.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
                            <ProcessStep number="01" title="Analysis" desc="Deep-dive into operational workflows and architectural requirements." />
                            <ProcessStep number="02" title="Blueprint" desc="Designing modular, high-reliability software frameworks." />
                            <ProcessStep number="03" title="Execution" desc="Iterative development backed by rigorous testing protocols." />
                            <ProcessStep number="04" title="Deployment" desc="Seamless rollout with continuous telemetry and monitoring." />
                        </div>
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
                <div className="w-16 h-16 mx-auto rounded-full bg-gvb-accent/10 text-gvb-accent flex items-center justify-center mb-8">
                    <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-tight">{title}</h3>
                <p className="text-lg text-white/70 font-bold">{desc}</p>
            </GlassCard>
        </motion.div>
    );
}

function ProcessStep({ number, title, desc }: { number: string, title: string, desc: string }) {
    return (
        <GlassCard hoverEffect={true} className="p-8 !bg-white/5 backdrop-blur-3xl border-white/10 relative overflow-hidden">
            <span className="absolute -top-4 -right-2 text-7xl font-black text-white/5 pointer-events-none select-none">{number}</span>
            <div className="text-gvb-cyan font-black mb-4 tracking-widest uppercase text-sm">Phase {number}</div>
            <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-tight">{title}</h3>
            <p className="text-white/60 font-bold leading-relaxed">{desc}</p>
        </GlassCard>
    );
}
