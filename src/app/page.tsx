"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
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

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-start overflow-visible z-30 pt-24 sm:pt-32 md:pt-[160px] px-6">
        <motion.div
          style={{ scale: heroScale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative text-center max-w-7xl mx-auto flex flex-col items-center z-40"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex py-1.5 px-4 md:py-2 md:px-6 rounded-full bg-white/5 backdrop-blur-xl mb-8 md:mb-12 border border-gvb-cyan/30 shadow-[0_0_20px_rgba(34,211,238,0.2)] whitespace-nowrap"
          >
            <span className="text-[9px] md:text-[10px] font-black tracking-[0.3em] text-gvb-cyan uppercase">Advanced Infrastructure Protocol</span>
          </motion.div>

          <MaskReveal>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 text-white leading-[1] lg:leading-none tracking-tighter uppercase px-1">
              Beyond <br />
              <span className="text-gradient">Intelligence</span>
            </h1>
          </MaskReveal>

          <MaskReveal delay={0.2}>
            <p className="text-xs md:text-xl text-white/80 mb-10 md:mb-16 max-w-xl mx-auto font-bold tracking-tight px-4 leading-relaxed">
              Engineering proprietary high-frequency trading systems and enterprise software architecture with liquid precision.
            </p>
          </MaskReveal>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 md:gap-12 z-50 w-full sm:w-auto pb-32"
          >
            <MagneticWrapper>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button data-cursor="magnetic" size="lg" className="w-full sm:w-auto h-14 md:h-20 px-8 md:px-14 text-sm md:text-lg bg-white text-black hover:bg-white/90 border-none uppercase font-black tracking-widest rounded-full shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                  Get Started
                </Button>
              </Link>
            </MagneticWrapper>
            <MagneticWrapper>
              <Link href="/services" className="w-full sm:w-auto">
                <Button data-cursor="magnetic" size="lg" variant="outline" className="w-full sm:w-auto h-14 md:h-20 px-8 md:px-14 text-sm md:text-lg border-white/20 hover:bg-white/5 uppercase font-black tracking-widest rounded-full">
                  Explore Solutions
                </Button>
              </Link>
            </MagneticWrapper>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
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

      {/* Services Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
                Core <span className="text-gradient">Ecosystem</span>
              </h2>
              <p className="text-lg md:text-xl text-white/60 font-bold max-w-lg">
                Architecting high-frequency environments for the next generation of digital finance and enterprise operations.
              </p>
            </div>
            <Link href="/services">
              <Button variant="outline" className="h-14 px-8 text-xs font-black uppercase tracking-[0.3em] rounded-full">
                All Capabilities <ArrowRight className="ml-3 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {services.map((service, idx) => (
              <GlassCard key={idx} className="group p-0 overflow-hidden rounded-[2.5rem] border-white/5 hover:border-gvb-cyan/30 transition-all duration-700">
                <div className="relative h-64 md:h-80 w-full overflow-hidden">
                  <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0 opacity-40 group-hover:opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <service.icon className="w-10 h-10 text-white mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-2">{service.title}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-white/60 text-sm md:text-base font-bold leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <div className="flex items-center text-[10px] font-black text-gvb-cyan uppercase tracking-[0.3em] group-hover:translate-x-2 transition-transform">
                    Learn More <ArrowRight className="ml-3 w-3 h-3" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-24 md:py-32 relative">
        <DataStreamLine direction="right" className="top-0 opacity-20" />
        <div className="max-w-7xl mx-auto px-6">
          <LiveStats />
        </div>
        <DataStreamLine direction="left" className="bottom-0 opacity-20" />
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center glass-card p-12 md:p-24 rounded-[3rem] relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-gvb-cyan/10 via-transparent to-gvb-blue/10 opacity-50 pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tighter uppercase leading-none">Ready to <span className="text-gradient">Scale?</span></h2>
          <p className="text-xl md:text-2xl text-white/60 mb-12 font-bold max-w-2xl mx-auto">Integrate our high-performance systems and elite algorithmic strategies into your operation.</p>
          <Link href="/contact" className="inline-block relative z-10">
            <Button size="lg" className="h-20 px-16 text-xl rounded-3xl bg-gvb-cyan text-black hover:bg-white transition-all font-black uppercase tracking-widest border-none shadow-[0_0_50px_rgba(34,211,238,0.3)]">
              Initiate Protocol
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
