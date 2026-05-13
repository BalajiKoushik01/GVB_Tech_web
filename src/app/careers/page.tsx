"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Rocket, Brain, Code2, Shield, ArrowRight, Zap, Target, Star } from "lucide-react";
import Link from "next/link";

const openPositions = [
    {
        title: "Quantitative Developer",
        dept: "Proprietary Trading",
        type: "Full-time",
        icon: Target,
        desc: "Design and implement low-latency execution strategies for high-frequency trading environments."
    },
    {
        title: "Full Stack Engineer",
        dept: "Enterprise Software",
        type: "Full-time",
        icon: Code2,
        desc: "Build mission-critical web applications with Next.js, Go, and real-time data pipelines."
    },
    {
        title: "AI Infrastructure Architect",
        dept: "Neural Systems",
        type: "Hybrid",
        icon: Brain,
        desc: "Architect scalable GPU-accelerated infrastructure for large-scale predictive models."
    }
];

export default function CareersPage() {
    return (
        <div className="min-h-[100dvh] pt-32 pb-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Hero */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-gvb-cyan/10 border border-gvb-cyan/20 text-gvb-cyan text-xs font-black uppercase tracking-[0.2em] mb-6"
                    >
                        Join the Vanguard
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-white uppercase"
                    >
                        Engineer the <span className="text-gradient">Future</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-bold tracking-tight"
                    >
                        We are looking for elite engineers, researchers, and visionaries to join our mission-critical teams.
                    </motion.p>
                </div>

                {/* Culture Section */}
                <section className="mb-32">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-black mb-8 text-white uppercase tracking-tighter">The <span className="text-gvb-cyan">Vanguard</span> Culture</h2>
                            <div className="space-y-6">
                                <CultureItem 
                                    icon={Zap} 
                                    title="Elite Performance" 
                                    desc="We operate at the intersection of high-frequency trading and cutting-edge software engineering." 
                                />
                                <CultureItem 
                                    icon={Shield} 
                                    title="Radical Ownership" 
                                    desc="Every engineer owns their infrastructure end-to-end, from blueprint to production deployment." 
                                />
                                <CultureItem 
                                    icon={Star} 
                                    title="Constant Evolution" 
                                    desc="We invest heavily in R&D, ensuring our team is always working with the latest neural architectures." 
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-gvb-blue/20 to-transparent z-10" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Rocket className="w-32 h-32 text-gvb-cyan animate-pulse" />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Hiring Process */}
                <section className="mb-32 py-24 border-y border-white/5">
                    <h2 className="text-4xl font-black mb-16 text-white text-center uppercase tracking-tighter">How We <span className="text-gradient">Select</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <ProcessNode step="01" title="Signal Analysis" desc="Resume & portfolio review to identify elite technical signals." />
                        <ProcessNode step="02" title="Tech Protocol" desc="Intensive technical deep-dive and architectural challenge." />
                        <ProcessNode step="03" title="Strategic Fit" desc="Direct alignment with our mission and operational mindset." />
                        <ProcessNode step="04" title="Final Clearance" desc="Executive review and final offer for vanguard status." />
                    </div>
                </section>

                {/* Open Positions */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {openPositions.map((pos, i) => (
                        <motion.div
                            key={pos.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <GlassCard hoverEffect={true} className="h-full flex flex-col p-8 !bg-white/5 backdrop-blur-3xl border-white/10">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-gvb-cyan">
                                    <pos.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-black mb-2 text-white uppercase tracking-tight">{pos.title}</h3>
                                <p className="text-gvb-cyan/80 text-xs font-black mb-4 uppercase tracking-widest">{pos.dept} • {pos.type}</p>
                                <p className="text-white/60 font-bold mb-8 flex-grow">{pos.desc}</p>
                                <Link href="/contact" className="group flex items-center gap-2 text-white font-black uppercase text-sm tracking-widest hover:text-gvb-cyan transition-colors">
                                    Apply Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="liquid-glass p-12 md:p-20 text-center rounded-[4rem] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-gvb-blue/10 to-gvb-cyan/10 opacity-50" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black mb-8 text-white uppercase tracking-tighter">Don&apos;t see your role?</h2>
                        <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto font-bold">We&apos;re always looking for extraordinary talent. Reach out and tell us how you can help GVB Tech scale.</p>
                        <Link href="/contact">
                            <Button size="lg" className="px-16 h-16 rounded-3xl">General Application</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CultureItem({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="flex gap-6">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-gvb-cyan">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">{title}</h4>
                <p className="text-white/60 font-bold leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function ProcessNode({ step, title, desc }: { step: string, title: string, desc: string }) {
    return (
        <div className="relative p-8 rounded-[2rem] bg-white/5 border border-white/10">
            <span className="text-4xl font-black text-white/10 mb-6 block tracking-tighter">{step}</span>
            <h4 className="text-lg font-bold text-white mb-3 uppercase tracking-tight">{title}</h4>
            <p className="text-white/50 text-sm font-bold leading-relaxed">{desc}</p>
        </div>
    );
}
