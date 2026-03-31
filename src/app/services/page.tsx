"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, Blocks, CloudLightning, LineChart, Code2, GraduationCap, Megaphone } from "lucide-react";
import Link from "next/link";
import { LaunchBackground } from "@/components/animations/LaunchBackground";

const allServices = [
    {
        id: "trading",
        title: "Proprietary Trading",
        description: "Advanced algorithmic strategies and robust risk management systems engineered for global markets.",
        icon: LineChart,
        features: ["High-Frequency Trading setup", "Alpha Generation", "Risk modeling", "Market making strategies"],
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: "software",
        title: "Software Development",
        description: "End-to-end custom application development for enterprise web and mobile ecosystems.",
        icon: Code2,
        features: ["Full-stack capabilities", "Enterprise Architecture", "Cloud-native solutions", "Performance optimization"],
        color: "from-gvb-blue to-gvb-deep"
    },
    {
        id: "strategy",
        title: "Strategy Consultation",
        description: "Data-driven business strategies aiming at sustainable competitive advantage and digital scale.",
        icon: Blocks,
        features: ["Digital Transformation", "Market Entry strategy", "Operational efficiency", "Technology roadmap"],
        color: "from-amber-500 to-orange-500"
    },
    {
        id: "marketing",
        title: "Marketing Solutions",
        description: "Comprehensive marketing services to grow your brand's digital presence and conversion rates.",
        icon: Megaphone,
        features: ["SEO & Content Strategy", "Performance Marketing", "Brand Identity", "Conversion Rate Optimization"],
        color: "from-rose-500 to-red-500"
    },
    {
        id: "edtech",
        title: "EdTech Systems",
        description: "Interactive and scalable platforms for the next generation of global learners.",
        icon: GraduationCap,
        features: ["LMS Development", "Interactive Content", "Student Analytics", "Gamification engines"],
        color: "from-emerald-500 to-teal-500"
    },
    {
        id: "algorithms",
        title: "Intelligence Systems",
        description: "Complex computational models and AI/ML solutions tailored to specific industry needs.",
        icon: CloudLightning,
        features: ["Machine Learning Models", "Predictive Analytics", "Natural Language Processing", "Computer Vision"],
        color: "from-indigo-500 to-blue-500"
    }
];

export default function ServicesPage() {
    return (
        <div className="relative min-h-screen">
            <LaunchBackground />
            
            <div className="pt-32 pb-16 relative z-10">
                {/* Page Hero */}
                <section className="px-4 py-20 text-center relative overflow-hidden">
                    <div className="max-w-4xl mx-auto relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-slate-800 tracking-tighter"
                        >
                            Solutions for the <br />
                            <span className="text-gradient">Next Generation</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-slate-600 font-medium tracking-tight"
                        >
                            Explore our comprehensive suite of high-performance engineering systems.
                        </motion.p>
                    </div>
                </section>

                {/* Services List */}
                <section className="px-4 py-8 md:py-16">
                    <div className="max-w-7xl mx-auto space-y-20 md:space-y-32">
                        {allServices.map((service, idx) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}
                            >
                                {/* Visual Side */}
                                <div className="flex-1 w-full scale-in">
                                    <GlassCard hoverEffect={true} className="aspect-square lg:aspect-[4/3] flex items-center justify-center relative !bg-white/60">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10 rounded-[inherit]`} />
                                        <service.icon className="w-32 h-32 text-gvb-blue relative z-10" />
                                    </GlassCard>
                                </div>

                                {/* Text Side */}
                                <div className="flex-1">
                                    <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full liquid-glass border-slate-200 text-gvb-blue font-bold text-xs uppercase tracking-widest mb-8">
                                        <service.icon className="w-4 h-4" />
                                        <span>Service Sector</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 tracking-tight">{service.title}</h2>
                                    <p className="text-xl text-slate-600 mb-8 leading-relaxed font-medium">
                                        {service.description}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                        {service.features.map((feat, i) => (
                                            <div key={i} className="flex items-center text-slate-700">
                                                <CheckCircle2 className={`w-5 h-5 mr-3 flex-shrink-0 text-gvb-blue`} />
                                                <span className="font-bold text-sm tracking-tight">{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/contact">
                                        <Button size="lg" className="h-14 px-10 shadow-lg shadow-gvb-blue/20 bg-gvb-blue hover:bg-gvb-deep">
                                            Integrate Solution
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 px-4">
                    <div className="max-w-4xl mx-auto text-center liquid-glass p-8 md:p-16 !bg-white/90 shadow-2xl relative overflow-hidden">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 tracking-tighter">Need a Custom Infrastructure?</h2>
                        <p className="text-xl md:text-2xl text-slate-600 mb-10 font-bold">Reach out and let&apos;s engineer a tailored approach for your unique operational scale.</p>
                        <Link href="/contact" className="w-full flex justify-center">
                            <Button size="lg" className="h-16 px-12 text-xl shadow-xl shadow-gvb-blue/20 bg-gvb-blue hover:bg-gvb-deep">
                                Schedule Consultation <ArrowRight className="ml-3 w-6 h-6" />
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
