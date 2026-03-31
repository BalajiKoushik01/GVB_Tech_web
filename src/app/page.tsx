"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { LaunchBackground } from "@/components/animations/LaunchBackground";
import { RocketMotion } from "@/components/animations/RocketMotion";
import { TrendingUp, Code2, Lightbulb, Megaphone, GraduationCap, Brain, ArrowRight, CheckCircle2 } from "lucide-react";
import { MagneticWrapper } from "@/components/animations/MagneticWrapper";
import Link from "next/link";
import { MarketDashboard } from "@/components/ui/MarketDashboard";
import { LiveStats } from "@/components/ui/LiveStats";
import { ROICalculator } from "@/components/ui/ROICalculator";

const services = [
  {
    title: "Proprietary Trading",
    icon: TrendingUp,
    description: "High-frequency trading algorithms and quantitative strategies engineered for global market success.",
    color: "from-blue-600 to-cyan-500"
  },
  {
    title: "Software Development",
    icon: Code2,
    description: "Custom enterprise software, mobile ecosystems, and high-performance web applications.",
    color: "from-sky-500 to-blue-500"
  },
  {
    title: "Strategy Consultation",
    icon: Lightbulb,
    description: "Deep technical auditing, digital transformation roadmaps, and global scale-up strategies.",
    color: "from-cyan-600 to-teal-400"
  },
  {
    title: "Marketing Solutions",
    icon: Megaphone,
    description: "Data-driven digital marketing, precision SEO, and premium brand identity development.",
    color: "from-gvb-blue to-gvb-deep"
  },
  {
    title: "EdTech Systems",
    icon: GraduationCap,
    description: "Next-generation learning management systems and immersive educational technology solutions.",
    color: "from-teal-500 to-emerald-400"
  },
  {
    title: "AI Development",
    icon: Brain,
    description: "Custom Neural Networks, Predictive Analytics, and Automated Intelligence systems.",
    color: "from-blue-800 to-blue-500"
  }
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.98]);

  return (
    <div className="flex flex-col w-full relative bg-transparent selection:bg-gvb-blue/30">
      {/* Immersive Background System */}
      <LaunchBackground />
      <RocketMotion />

      {/* Hero Section */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block py-2 px-6 rounded-full liquid-glass mb-8 border-gvb-blue/20"
          >
            <span className="text-sm font-bold tracking-widest text-gvb-blue uppercase">Launch Protocol Initiated</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold mb-6 text-slate-800 leading-[0.9] tracking-tighter"
          >
            Empowering <br />
            <span className="text-gradient">Possibilities</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-medium tracking-tight px-4 leading-relaxed"
          >
            GVB Tech Solutions delivers world-class infrastructure and 
            algorithmic excellence for the next generation of industry leaders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full px-4 mb-20 md:mb-32"
          >
            <MagneticWrapper strength={0.4} radius={100}>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-16 px-12 shadow-xl bg-gvb-blue hover:bg-gvb-deep">Initiate Launch</Button>
              </Link>
            </MagneticWrapper>
            <MagneticWrapper strength={0.4} radius={100}>
              <Link href="/services" className="w-full sm:w-auto">
                <Button size="lg" variant="glass" className="w-full h-16 px-12 liquid-glass border-slate-300 text-slate-900 font-bold">Solutions Hub</Button>
              </Link>
            </MagneticWrapper>
          </motion.div>
        </motion.div>

        {/* Improved Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-[28px] h-[48px] rounded-full border-2 border-slate-300 flex justify-center p-2 mb-2">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gvb-blue rounded-full"
            />
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">Scroll to Launch</span>
        </motion.div>
      </section>

      <div className="relative z-10 bg-transparent">
        <MarketDashboard />

        {/* Services Section */}
        <section className="py-24 md:py-40 px-4 relative bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 md:mb-32">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-slate-900 drop-shadow-sm">Our Ecosystem</h2>
              <p className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto font-medium tracking-tight leading-relaxed">
                Premium engineering solutions designed with liquid precision and architectural integrity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <GlassCard key={service.title} className="group p-10 hover:border-gvb-blue/40 transition-colors">
                  <div className={`w-16 h-16 mb-8 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-xl`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight text-slate-800">{service.title}</h3>
                  <p className="text-slate-600 mb-8 flex-1 leading-relaxed">{service.description}</p>
                  <Link href="/services" className="inline-flex items-center text-gvb-blue font-bold group-hover:translate-x-2 transition-transform self-start text-sm uppercase tracking-widest">
                    Explore <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <LiveStats />
        <ROICalculator />

        {/* About Section */}
        <section className="py-24 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <GlassCard hoverEffect={false} className="grid lg:grid-cols-2 gap-16 items-center p-8 md:p-16 !bg-white/10 backdrop-blur-2xl border-white/20">
              <div>
                <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter text-slate-800 leading-[1.1]">The Convergence of Tech & Strategy</h2>
                <p className="text-xl text-slate-600 mb-8 font-medium leading-relaxed">
                  Founded on principles of innovation and reliability, GVB Tech Solutions builds the infrastructure for the next generation of digital enterprises.
                </p>
                <div className="space-y-4 mb-10 text-slate-700">
                  {['Industry-leading trading algorithms', 'Scalable enterprise software systems', 'Data-driven strategic consulting', 'Unmatched technical support'].map((item, i) => (
                    <div key={i} className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-gvb-blue mr-4 flex-shrink-0" />
                      <span className="font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/about">
                  <Button size="lg">Read Our Story</Button>
                </Link>
              </div>
              <div className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-gvb-blue/20 to-transparent z-10" />
                <div className="absolute inset-0 flex items-center justify-center liquid-glass border-none">
                    <span className="text-slate-400 font-bold tracking-widest uppercase opacity-20 text-4xl transform -rotate-12">GVB TECH SOLUTIONS</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40 px-4 flex items-center justify-center">
          <GlassCard hoverEffect={false} className="max-w-5xl w-full text-center py-24 px-8 relative overflow-hidden !bg-white/10 backdrop-blur-3xl border-white/30 shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-slate-800">Ready to <span className="text-gradient">Launch?</span></h2>
              <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-medium tracking-tight">
                Integrate our world-class architecture to accelerate your digital and operational capabilities.
              </p>
              <div className="flex justify-center">
                <MagneticWrapper strength={0.6} radius={120}>
                  <Link href="/contact">
                    <Button size="lg" className="h-20 px-16 text-2xl shadow-2xl shadow-gvb-blue/20 bg-gvb-blue hover:bg-gvb-deep">
                      Initiate Project
                    </Button>
                  </Link>
                </MagneticWrapper>
              </div>
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}
