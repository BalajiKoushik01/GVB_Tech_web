"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const allServices = [
    {
        id: "trading",
        title: "Proprietary Trading",
        description: "Advanced algorithmic strategies and robust risk management systems engineered for global markets.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
        features: ["High-Frequency Trading setup", "Alpha Generation", "Risk modeling", "Market making strategies"],
        color: "from-gvb-deep to-gvb-blue"
    },
    {
        id: "software",
        title: "Software Development",
        description: "End-to-end custom application development for enterprise web and mobile ecosystems.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
        features: ["Full-stack capabilities", "Enterprise Architecture", "Cloud-native solutions", "Performance optimization"],
        color: "from-gvb-blue to-gvb-cyan"
    },
    {
        id: "strategy",
        title: "Strategy Consultation",
        description: "Data-driven business strategies aiming at sustainable competitive advantage and digital scale.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        features: ["Digital Transformation", "Market Entry strategy", "Operational efficiency", "Technology roadmap"],
        color: "from-amber-500 to-orange-500"
    },
    {
        id: "marketing",
        title: "Marketing Solutions",
        description: "Comprehensive marketing services to grow your brand&apos;s digital presence and conversion rates.",
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop",
        features: ["SEO & Content Strategy", "Performance Marketing", "Brand Identity", "Conversion Rate Optimization"],
        color: "from-rose-500 to-red-500"
    },
    {
        id: "edtech",
        title: "EdTech Systems",
        description: "Interactive and scalable platforms for the next generation of global learners.",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop",
        features: ["LMS Development", "Interactive Content", "Student Analytics", "Gamification engines"],
        color: "from-emerald-500 to-teal-500"
    },
    {
        id: "algorithms",
        title: "Intelligence Systems",
        description: "Complex computational models and AI/ML solutions tailored to specific industry needs.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
        features: ["Machine Learning Models", "Predictive Analytics", "Natural Language Processing", "Computer Vision"],
        color: "from-gvb-accent to-gvb-deep"
    }
];

export default function ServicesPage() {
    return (
        <div className="relative min-h-screen pb-20">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-gvb-blue/5 rounded-full blur-[150px] mix-blend-screen opacity-30" />
            </div>

            <div className="pt-20 md:pt-32 relative z-10">
                {/* Page Hero */}
                <section className="px-6 py-12 md:py-20 text-center relative overflow-hidden">
                    <div className="max-w-4xl mx-auto relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 text-white tracking-tighter uppercase leading-[0.95]"
                        >
                            Solutions for <br />
                            <span className="text-gradient">The Vanguard</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg md:text-xl text-white/60 font-bold tracking-tight leading-relaxed max-w-2xl mx-auto"
                        >
                            Propelling enterprise infrastructure with low-latency engineering and neural intelligence.
                        </motion.p>
                    </div>
                </section>

                {/* Services List */}
                <section className="px-4 py-8 md:py-16">
                    <div className="max-w-7xl mx-auto space-y-24 md:space-y-48">
                        {allServices.map((service, idx) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                 className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 md:gap-24`}
                            >
                                {/* Visual Side */}
                                <div className="flex-1 w-full relative group">
                                    <GlassCard hoverEffect={true} className="aspect-square lg:aspect-[4/3] overflow-hidden relative !p-0 border-white/10 shadow-2xl rounded-2xl sm:rounded-[3rem]">
                                        <Image 
                                            src={service.image} 
                                            alt={service.title}
                                            fill
                                            className="object-cover md:grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 group-hover:opacity-10 transition-opacity`} />
                                    </GlassCard>
                                </div>

                                {/* Text Side */}
                                <div className="flex-1">
                                    <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-gvb-cyan font-black text-[10px] uppercase tracking-[0.25em] mb-10">
                                        <span className="w-1.5 h-1.5 bg-gvb-cyan rounded-full animate-pulse" />
                                        <span>Operational Protocol 0{idx + 1}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 text-white tracking-tighter uppercase leading-none">{service.title}</h2>
                                    <p className="text-xl md:text-2xl text-white/60 mb-10 leading-relaxed font-bold">
                                        {service.description}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                                        {service.features.map((feat, i) => (
                                            <div key={i} className="flex items-center text-white">
                                                <CheckCircle2 className={`w-6 h-6 mr-4 flex-shrink-0 text-gvb-cyan`} />
                                                <span className="font-black text-xs uppercase tracking-widest">{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/contact">
                                        <Button size="lg" className="h-16 px-12 rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                                            Integrate System
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="py-32 px-4">
                    <div className="max-w-5xl mx-auto text-center liquid-glass p-6 sm:p-12 md:p-24 !bg-white/5 shadow-2xl relative overflow-hidden rounded-3xl sm:rounded-[4rem] border border-white/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-gvb-blue/20 to-transparent opacity-50" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-7xl font-black mb-8 text-white uppercase tracking-tighter">Custom Infrastructure?</h2>
                            <p className="text-xl md:text-3xl text-white/60 mb-12 font-bold max-w-3xl mx-auto">Our engineering team is ready to build tailored approaches for your unique operational scale.</p>
                            <Link href="/contact" className="w-full flex justify-center">
                                <Button size="lg" className="h-20 px-20 text-xl rounded-3xl bg-white text-black border-none shadow-[0_0_60px_rgba(255,255,255,0.3)]">
                                    Schedule Consultation
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
