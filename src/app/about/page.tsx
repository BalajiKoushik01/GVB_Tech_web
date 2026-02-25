"use client";

import React from 'react';
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Target, Eye, Shield, Users, Trophy } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-background overflow-hidden relative">
            <div className="absolute top-40 left-[-20%] w-96 h-96 bg-accent-start/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-40 right-[-20%] w-96 h-96 bg-accent-end/20 rounded-full blur-[120px]" />

            <section className="px-4 py-20 max-w-7xl mx-auto text-center relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold mb-6"
                >
                    Our <span className="text-gradient">Story</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-foreground/70 max-w-3xl mx-auto"
                >
                    GVB Tech Solutions was born from the vision of bridging elite proprietary trading intelligence
                    with world-class enterprise software development. We engineer the future.
                </motion.p>
            </section>

            {/* Mission & Vision */}
            <section className="px-4 py-16 relative z-10">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <GlassCard className="h-full p-10 bg-gradient-to-br from-blue-500/10 to-transparent">
                            <Target className="w-12 h-12 text-blue-500 mb-6" />
                            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                            <p className="text-lg text-foreground/70">
                                To empower global businesses by delivering transformative digital solutions,
                                merging strategic business consulting with cutting-edge technology to unlock
                                unprecedented growth and efficiency.
                            </p>
                        </GlassCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <GlassCard className="h-full p-10 bg-gradient-to-br from-purple-500/10 to-transparent">
                            <Eye className="w-12 h-12 text-purple-500 mb-6" />
                            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                            <p className="text-lg text-foreground/70">
                                To be the foremost global partner in technological innovation, known for
                                crafting elegant, high-performance systems that redefine industry standards
                                and propel humanity forward.
                            </p>
                        </GlassCard>
                    </motion.div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 px-4 relative z-10 bg-white/5 dark:bg-black/20 border-y border-gray-200 dark:border-white/10 mt-16 backdrop-blur-md">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
                        <p className="text-lg text-foreground/70">The principles that guide every line of code and every strategic decision.</p>
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
            <GlassCard hoverEffect={false} className="text-center p-8 bg-transparent border-none shadow-none">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent-start/10 text-accent-start flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{title}</h3>
                <p className="text-foreground/70">{desc}</p>
            </GlassCard>
        </motion.div>
    );
}
