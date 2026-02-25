"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, Blocks, CloudLightning, LineChart, Code2, GraduationCap, Megaphone } from "lucide-react";
import Link from "next/link";

const allServices = [
    {
        id: "trading",
        title: "Proprietary Trading",
        description: "Advanced algorithmic strategies and robust risk management systems.",
        icon: LineChart,
        features: ["High-Frequency Trading setup", "Alpha Generation", "Risk modeling", "Market making strategies"],
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: "software",
        title: "Software Development",
        description: "End-to-end custom application development for web and mobile.",
        icon: Code2,
        features: ["Full-stack capabilities", "Enterprise Architecture", "Cloud-native solutions", "Performance optimization"],
        color: "from-purple-500 to-fuchsia-500"
    },
    {
        id: "strategy",
        title: "Strategy Consultation",
        description: "Data-driven business strategies aiming at sustainable competitive advantage.",
        icon: Blocks,
        features: ["Digital Transformation", "Market Entry strategy", "Operational efficiency", "Technology roadmap"],
        color: "from-amber-500 to-orange-500"
    },
    {
        id: "marketing",
        title: "Digital Marketing",
        description: "Comprehensive marketing services to grow your brand's digital presence.",
        icon: Megaphone,
        features: ["SEO & Content Strategy", "Performance Marketing", "Brand Identity", "Conversion Rate Optimization"],
        color: "from-rose-500 to-red-500"
    },
    {
        id: "edtech",
        title: "EdTech Solutions",
        description: "Interactive and scalable platforms for the next generation of learners.",
        icon: GraduationCap,
        features: ["LMS Development", "Interactive Content", "Student Analytics", "Gamification engines"],
        color: "from-emerald-500 to-teal-500"
    },
    {
        id: "algorithms",
        title: "Algorithm Development",
        description: "Complex computational models and AI/ML solutions tailored to you.",
        icon: CloudLightning,
        features: ["Machine Learning Models", "Predictive Analytics", "Natural Language Processing", "Computer Vision"],
        color: "from-indigo-500 to-blue-500"
    }
];

export default function ServicesPage() {
    return (
        <div className="pt-24 pb-16">
            {/* Page Hero */}
            <section className="px-4 py-20 bg-background text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-start/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-end/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6 text-foreground"
                    >
                        Capabilities that <br />
                        <span className="text-gradient">Drive Growth</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-foreground/70"
                    >
                        Discover our comprehensive suite of services designed to accelerate your business across every dimension.
                    </motion.p>
                </div>
            </section>

            {/* Services List */}
            <section className="px-4 py-16 bg-background">
                <div className="max-w-7xl mx-auto space-y-32">
                    {allServices.map((service, idx) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}
                        >
                            {/* Visual Side */}
                            <div className="flex-1 w-full">
                                <GlassCard hoverEffect={false} className="aspect-square lg:aspect-[4/3] flex items-center justify-center relative bg-gradient-to-br from-white/5 to-black/5 dark:from-white/5 dark:to-white/10 group">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 rounded-[1.5rem] transition-opacity group-hover:opacity-30`} />
                                    <service.icon className="w-32 h-32 text-foreground/80 relative z-10" />
                                </GlassCard>
                            </div>

                            {/* Text Side */}
                            <div className="flex-1">
                                <div className={`inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${service.color} bg-opacity-10 text-white font-medium text-sm mb-6`}>
                                    <service.icon className="w-4 h-4" />
                                    <span>Service Area</span>
                                </div>
                                <h2 className="text-4xl font-bold mb-6">{service.title}</h2>
                                <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                                    {service.description}
                                </p>
                                <div className="space-y-4 mb-10">
                                    {service.features.map((feat, i) => (
                                        <div key={i} className="flex items-center text-foreground/80">
                                            <CheckCircle2 className={`w-5 h-5 mr-3 flex-shrink-0 text-accent-start`} />
                                            <span className="font-medium">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/contact">
                                    <Button variant="outline">
                                        Discuss this service
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center border border-gray-200 dark:border-white/10 rounded-3xl p-12 bg-white/5 dark:bg-black/20 backdrop-blur-md relative overflow-hidden">
                    <h2 className="text-4xl font-bold mb-6">Need a custom solution?</h2>
                    <p className="text-xl text-foreground/70 mb-8">Reach out and let's craft a tailored approach for your unique challenges.</p>
                    <Link href="/contact" className="w-full flex justify-center">
                        <Button size="lg" className="mx-auto flex items-center">
                            Schedule a Consultation <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
