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
import Image from "next/image";

// Premium Integrated Assets (Definitive Recovery)
const services = [
  {
    title: "Proprietary Trading",
    icon: TrendingUp,
    description: "High-frequency trading algorithms and quantitative strategies engineered for global market success.",
    color: "from-blue-600 to-cyan-500",
    image: "https://images.unsplash.com/photo-1611974717525-58a441e5fc0a?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Software Development",
    icon: Code2,
    description: "Custom enterprise software, mobile ecosystems, and high-performance web applications.",
    color: "from-sky-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "AI Development",
    icon: Brain,
    description: "Custom Neural Networks, Predictive Analytics, and Automated Intelligence systems.",
    color: "from-blue-800 to-blue-500",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.98]);

  return (
    <div className="flex flex-col w-full relative bg-white selection:bg-black selection:text-white">
      {/* Immersive Background System (Lower Z-Index) */}
      <div className="z-0">
        <LaunchBackground />
        <RocketMotion />
      </div>

      {/* Hero Section (Elite Z-Index: 40) */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden z-40">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative text-center px-4 max-w-6xl mx-auto pt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block py-2 px-6 rounded-full liquid-glass mb-8 border-black/10 bg-white/40"
          >
            <span className="text-sm font-black tracking-widest text-black uppercase">Launch Protocol Initiated</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black mb-6 text-black leading-[0.85] tracking-tighter"
          >
            Empowering <br />
            <span className="text-gradient">Possibilities</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-2xl text-black mb-12 max-w-3xl mx-auto font-bold tracking-tight px-4 leading-relaxed opacity-90"
          >
            GVB Tech Solutions delivers world-class infrastructure and 
            algorithmic excellence for the next generation of industry leaders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full px-4 mb-24 md:mb-40"
          >
            <MagneticWrapper strength={0.4} radius={100}>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-16 px-12 shadow-2xl bg-black text-white hover:bg-slate-900 border-none">Initiate Launch</Button>
              </Link>
            </MagneticWrapper>
            <MagneticWrapper strength={0.4} radius={100}>
              <Link href="/services" className="w-full sm:w-auto">
                <Button size="lg" variant="glass" className="w-full h-16 px-12 liquid-glass border-black/20 text-black font-black uppercase text-sm tracking-widest bg-white/20">Solutions Hub</Button>
              </Link>
            </MagneticWrapper>
          </motion.div>
        </motion.div>

        {/* Precision Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-50"
        >
          <div className="w-[30px] h-[50px] rounded-full border-2 border-black flex justify-center p-2 mb-2">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-gvb-blue rounded-full"
            />
          </div>
          <span className="text-[10px] text-black font-black uppercase tracking-[0.3em]">Scroll to Launch</span>
        </motion.div>
      </section>

      {/* Main Content Area (Z-Index 40) */}
      <div className="relative z-40 bg-white shadow-[0_-50px_100px_rgba(255,255,255,1)]">
        <MarketDashboard />

        {/* Services Section with REAL IMAGES (Recovery V8.1) */}
        <section className="py-24 md:py-40 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 md:mb-32">
              <h2 className="text-5xl md:text-[6rem] font-black mb-8 tracking-tighter text-black uppercase">Our Ecosystem</h2>
              <p className="text-xl md:text-2xl text-black max-w-3xl mx-auto font-bold tracking-tight leading-relaxed opacity-80">
                Premium engineering solutions designed with liquid precision and architectural integrity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {services.map((service) => (
                <GlassCard key={service.title} className="group overflow-hidden border-black/5 hover:border-black/20 transition-all !bg-white/5 active:scale-95 duration-500">
                  <div className="relative h-48 w-full">
                     <Image 
                        src={service.image} 
                        alt={service.title} 
                        fill 
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent" />
                  </div>
                  <div className="p-8">
                      <div className={`w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-xl`}>
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-black mb-4 tracking-tight text-black">{service.title}</h3>
                      <p className="text-black/70 mb-8 font-semibold leading-relaxed line-clamp-2">{service.description}</p>
                      <Link href="/services" className="inline-flex items-center text-black font-black group-hover:translate-x-2 transition-transform self-start text-xs uppercase tracking-[0.2em] border-b-2 border-black pb-1">
                        Explore Strategy <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <LiveStats />
        
        {/* Call to Action: Final Polished Liquid Glass */}
        <section className="py-40 px-4 flex items-center justify-center bg-slate-50">
          <GlassCard hoverEffect={false} className="max-w-5xl w-full text-center py-24 px-8 relative overflow-hidden !bg-white/20 backdrop-blur-3xl border-black/10 shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-black uppercase">Ready to <span className="text-gradient">Launch?</span></h2>
              <p className="text-xl md:text-2xl text-black mb-12 max-w-3xl mx-auto font-bold tracking-tight opacity-90">
                Integrate our world-class architecture to accelerate your digital and operational capabilities.
              </p>
              <div className="flex justify-center">
                <MagneticWrapper strength={0.6} radius={120}>
                  <Link href="/contact">
                    <Button size="lg" className="h-20 px-16 text-2xl shadow-3xl bg-black text-white hover:bg-slate-900 border-none uppercase font-black tracking-widest">
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
