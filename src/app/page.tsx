"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { LaunchBackground } from "@/components/animations/LaunchBackground";
import { RocketMotion } from "@/components/animations/RocketMotion";
import { TrendingUp, Code2, Brain, ArrowRight } from "lucide-react";
import { MagneticWrapper } from "@/components/animations/MagneticWrapper";
import Link from "next/link";
import { MarketDashboard } from "@/components/ui/MarketDashboard";
import { LiveStats } from "@/components/ui/LiveStats";
import Image from "next/image";

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
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.98]);

  return (
    <div className="flex flex-col w-full relative bg-white selection:bg-black selection:text-white">
      {/* Background System (Fixed Depth) */}
      <LaunchBackground />
      <RocketMotion />

      {/* Hero Section (Definitive Layering V11.2) */}
      <section className="relative min-h-screen flex flex-col items-center justify-start overflow-visible z-30 pt-[160px] px-4">
        <motion.div
          style={{ scale: heroScale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative text-center max-w-7xl mx-auto flex flex-col items-center z-40"
        >
          {/* Badge: Locked between Nav and H1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex py-2 px-6 rounded-full liquid-glass mb-14 border-black/10 bg-white/40 whitespace-nowrap"
          >
            <span className="text-[11px] font-black tracking-[0.25em] text-black uppercase">Launch Protocol Initiated</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[11rem] font-black mb-10 text-black leading-[0.85] tracking-tighter"
          >
            Empowering <br />
            <span className="text-gradient">Possibilities</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-2xl text-black mb-16 max-w-3xl mx-auto font-bold tracking-tight px-4 leading-relaxed opacity-80"
          >
            GVB Tech Solutions delivers world-class infrastructure and 
            algorithmic excellence for the next generation of industry leaders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center w-full px-4 mb-32"
          >
            <MagneticWrapper strength={0.4} radius={100}>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-16 px-12 shadow-2xl bg-black text-white hover:bg-slate-900 border-none font-black uppercase tracking-widest text-sm">Initiate Launch</Button>
              </Link>
            </MagneticWrapper>
            <MagneticWrapper strength={0.4} radius={100}>
              <Link href="/services" className="w-full sm:w-auto">
                <Button size="lg" variant="glass" className="w-full h-16 px-12 liquid-glass border-black/20 text-black font-black uppercase text-sm tracking-widest bg-white/20">Solutions Hub</Button>
              </Link>
            </MagneticWrapper>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator: Explicit Position bottom-12 for No Overlap */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-0 w-full flex flex-col items-center z-30 pointer-events-none"
        >
          <div className="flex flex-col items-center">
          <div className="w-[30px] h-[52px] rounded-full border-2 border-black/60 flex justify-center p-2 mb-3">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-gvb-blue rounded-full"
            />
          </div>
          <span className="text-[10px] text-black font-black uppercase tracking-[0.4em] opacity-60">Scroll to Explore</span>
          </div>
        </motion.div>
      </section>

      {/* Content Area: Naturally flows AFTER the Hero (z-10) */}
      <div className="relative z-10 bg-white border-t border-black/5">
        <MarketDashboard />

        {/* Services Section */}
        <section className="py-32 md:py-48 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-[7rem] font-black mb-8 tracking-tighter text-black uppercase">Our Ecosystem</h2>
              <p className="text-xl md:text-2xl text-black max-w-3xl mx-auto font-bold tracking-tight leading-relaxed opacity-80">
                Premium engineering solutions designed with liquid precision and architectural integrity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {services.map((service) => (
                <GlassCard key={service.title} className="group overflow-hidden border-black/5 hover:border-black/20 transition-all !bg-white/5 duration-500 rounded-3xl">
                  <div className="relative h-56 w-full">
                     <Image 
                        src={service.image} 
                        alt={service.title} 
                        fill 
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-70 group-hover:opacity-100"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-white/95 to-transparent" />
                  </div>
                  <div className="p-10">
                      <div className={`w-14 h-14 mb-8 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-2xl`}>
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-3xl font-black mb-5 tracking-tight text-black">{service.title}</h3>
                      <p className="text-black/70 mb-10 font-semibold leading-relaxed line-clamp-3">{service.description}</p>
                      <Link href="/services" className="inline-flex items-center text-black font-black group-hover:translate-x-2 transition-transform self-start text-xs uppercase tracking-[0.25em] border-b-2 border-black pb-1">
                        Explore Strategy <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <LiveStats />
        
        {/* Final CTA */}
        <section className="py-40 px-4 bg-slate-50 flex justify-center">
          <GlassCard hoverEffect={false} className="max-w-6xl w-full text-center py-32 px-8 relative overflow-hidden !bg-white/40 backdrop-blur-3xl border-black/10 rounded-[3rem]">
            <div className="relative z-10">
              <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter text-black uppercase">Ready to <span className="text-gradient">Launch?</span></h2>
              <p className="text-xl md:text-2xl text-black mb-14 max-w-3xl mx-auto font-bold tracking-tight opacity-90">
                Integrate our world-class architecture to accelerate your digital and operational capabilities.
              </p>
              <div className="flex justify-center">
                <MagneticWrapper strength={0.6} radius={120}>
                  <Link href="/contact">
                    <Button size="lg" className="h-20 px-16 text-2xl shadow-3xl bg-black text-white hover:bg-slate-900 border-none uppercase font-black tracking-widest rounded-2xl">
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
