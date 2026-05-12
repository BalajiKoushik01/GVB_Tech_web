"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { RocketMotion } from "@/components/animations/RocketMotion";
import { TrendingUp, Code2, Brain, ArrowRight } from "lucide-react";
import { MagneticWrapper } from "@/components/animations/MagneticWrapper";
import Link from "next/link";
import { MarketDashboard } from "@/components/ui/MarketDashboard";
import { LiveStats } from "@/components/ui/LiveStats";
import { MaskReveal } from "@/components/animations/MaskReveal";
import { DataStreamLine } from "@/components/animations/DataStreamLine";
import Image from "next/image";

const services = [
  {
    title: "Proprietary Trading",
    icon: TrendingUp,
    description: "High-frequency trading algorithms and quantitative strategies engineered for global market success.",
    color: "from-gvb-deep to-gvb-blue",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Software Development",
    icon: Code2,
    description: "Custom enterprise software, mobile ecosystems, and high-performance web applications.",
    color: "from-gvb-blue to-gvb-cyan",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "AI Development",
    icon: Brain,
    description: "Custom Neural Networks, Predictive Analytics, and Automated Intelligence systems.",
    color: "from-gvb-deep to-gvb-cyan",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.98]);

  return (
    <div className="flex flex-col w-full relative bg-transparent selection:bg-white selection:text-black">
      {/* Mobile Signature: Scroll Progress Ring */}
      <motion.div
        className="fixed bottom-6 right-6 w-14 h-14 z-[100] md:hidden pointer-events-none"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]) }}
      >
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
            fill="none"
          />
          <motion.circle
            cx="28"
            cy="28"
            r="24"
            stroke="url(#gradient)"
            strokeWidth="4"
            fill="none"
            strokeDasharray="100 100"
            style={{ pathLength: scrollYProgress }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Background System (Fixed Depth - Rocket Only) */}
      <RocketMotion />

      {/* Hero Section (Definitive Layering V11.5) */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-start overflow-visible z-30 pt-24 sm:pt-32 md:pt-[160px] px-6">
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
            className="inline-flex py-1.5 px-4 md:py-2 md:px-6 rounded-full bg-white/5 backdrop-blur-xl mb-8 md:mb-14 border border-gvb-cyan/30 shadow-[0_0_20px_rgba(34,211,238,0.2)] whitespace-nowrap"
          >
            <span className="text-[9px] md:text-[10px] font-black tracking-[0.3em] text-gvb-cyan uppercase">Advanced Infrastructure Protocol</span>
          </motion.div>

          <MaskReveal>
            <h1 className="text-[1.75rem] sm:text-7xl md:text-8xl lg:text-[11rem] font-black mb-4 text-white leading-[1] lg:leading-[0.85] tracking-tighter uppercase px-1">
              Beyond <br />
              <span className="text-gradient">Intelligence</span>
            </h1>
          </MaskReveal>

          <MaskReveal delay={0.2}>
            <p className="text-xs md:text-2xl text-white/80 mb-6 md:mb-16 max-w-xl mx-auto font-bold tracking-tight px-4 leading-relaxed">
              GVB Tech Solutions delivers world-class infrastructure and 
              algorithmic excellence for the next generation of industry leaders.
            </p>
          </MaskReveal>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center items-center w-full max-w-md mx-auto mb-20 md:mb-32"
          >
            <MagneticWrapper strength={0.4} radius={100}>
              <Link href="/contact" className="w-full sm:w-auto" data-cursor="magnetic">
                <Button size="lg" className="w-full h-16 px-12 shadow-[0_0_50px_rgba(255,255,255,0.2)] bg-white/90 text-black hover:bg-white border-none font-black uppercase tracking-widest text-sm relative overflow-hidden group rounded-full">
                  <span className="relative z-10">Initiate Launch</span>
                </Button>
              </Link>
            </MagneticWrapper>
            <MagneticWrapper strength={0.4} radius={100}>
              <Link href="/services" className="w-full sm:w-auto">
                <Button size="lg" variant="glass" className="w-full h-16 px-12 liquid-glass border-white/20 text-white font-black uppercase text-sm tracking-widest bg-black/20 hover:bg-black/40">
                  Solutions Hub
                </Button>
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
          <div className="w-[30px] h-[52px] rounded-full border-2 border-white/60 flex justify-center p-2 mb-3">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-gvb-cyan rounded-full"
            />
          </div>
          <span className="text-[10px] text-white font-black uppercase tracking-[0.4em] opacity-60">Scroll to Explore</span>
          </div>
        </motion.div>
      </section>

      {/* Content Area: Naturally flows AFTER the Hero (z-10) */}
      <div className="relative z-10 bg-transparent border-t border-white/5">

        {/* Services Section with SVG Data Stream */}
        <section className="py-32 md:py-48 px-4 relative overflow-hidden">
          <DataStreamLine />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-10 md:mb-24">
              <MaskReveal>
                <h2 className="text-2xl sm:text-4xl md:text-[7rem] font-black mb-4 md:mb-8 tracking-tighter text-white uppercase px-2">Our Ecosystem</h2>
              </MaskReveal>
              <MaskReveal delay={0.2}>
                <p className="text-base md:text-2xl text-white max-w-3xl mx-auto font-bold tracking-tight leading-relaxed px-4">
                  Premium engineering solutions designed with liquid precision and architectural integrity.
                </p>
              </MaskReveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
              {services.map((service) => (
                <GlassCard key={service.title} data-cursor="magnetic" className="group overflow-hidden border-white/10 hover:border-white/20 transition-all !bg-black/40 backdrop-blur-xl duration-500 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col items-center text-center">
                  <div className="relative h-40 md:h-64 w-full">
                     <Image 
                        src={service.image} 
                        alt={service.title} 
                        fill 
                        className="object-cover md:grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
                  </div>
                  <div className="p-6 md:p-12 flex flex-col items-center">
                      <div className={`w-12 h-12 md:w-16 md:h-16 mb-6 md:mb-10 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center transform group-hover:scale-110 transition-all duration-500 shadow-[0_0_40px_rgba(0,163,255,0.2)]`}>
                        <service.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                      </div>
                      <h3 className="text-xl md:text-3xl font-black mb-3 md:mb-6 text-white uppercase tracking-tighter">{service.title}</h3>
                      <p className="text-white text-sm md:text-lg font-bold leading-relaxed mb-6 md:mb-10 line-clamp-3">
                        {service.description}
                      </p>
                      <Link href="/services" className="inline-flex items-center text-white font-black group-hover:text-gvb-cyan transition-all text-[9px] md:text-xs uppercase tracking-[0.25em] border-b-2 border-white/30 hover:border-gvb-cyan pb-1">
                        Explore Strategy <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                      </Link>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <LiveStats />
        
        {/* Final CTA */}
        <section className="py-20 md:py-40 px-6 flex justify-center">
          <GlassCard hoverEffect={false} className="max-w-6xl w-full text-center py-16 md:py-32 px-6 md:px-12 relative overflow-hidden !bg-black/40 backdrop-blur-3xl border-white/10 rounded-[2.5rem] md:rounded-[3rem]">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-8xl font-black mb-6 md:mb-10 tracking-tighter text-white uppercase leading-none">Ready to <span className="text-gradient">Launch?</span></h2>
              <p className="text-base md:text-2xl text-slate-300 mb-10 md:mb-14 max-w-2xl mx-auto font-bold tracking-tight opacity-90">
                Integrate our world-class architecture to accelerate your digital and operational capabilities.
              </p>
              <div className="flex justify-center">
                <MagneticWrapper strength={0.6} radius={120}>
                  <Link href="/contact">
                    <Button size="lg" className="h-20 px-16 text-2xl shadow-[0_0_40px_rgba(0,163,255,0.5)] bg-white text-black hover:bg-slate-200 border-none uppercase font-black tracking-widest rounded-2xl">
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
