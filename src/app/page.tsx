"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Cpu, LayoutDashboard, Code2, Compass, ArrowRight } from "lucide-react";
import { MagneticWrapper } from "@/components/animations/MagneticWrapper";
import Link from "next/link";
import { LiveStats } from "@/components/ui/LiveStats";
import { MaskReveal } from "@/components/animations/MaskReveal";
import { DataStreamLine } from "@/components/animations/DataStreamLine";
import Image from "next/image";

const services = [
  {
    title: "Automated Tools & AI Workflows",
    icon: Cpu,
    description: "Custom workflow automation, background processing engines, and machine learning models built for high reliability.",
    color: "from-gvb-deep to-gvb-blue",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Dashboards & Analytics",
    icon: LayoutDashboard,
    description: "Real-time analytics dashboards, interactive data streams, and operational metrics visualization platforms.",
    color: "from-gvb-blue to-gvb-cyan",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Web & App Development",
    icon: Code2,
    description: "High-performance web applications, responsive mobile ecosystems, and clean cloud-native architectures.",
    color: "from-gvb-cyan to-gvb-blue",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Strategy Consultation",
    icon: Compass,
    description: "Data-driven technical consulting, architectural auditing, and digital transformation roadmaps for growing businesses.",
    color: "from-gvb-deep to-gvb-cyan",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
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
            className="inline-flex py-1.5 px-4 md:py-2 md:px-6 rounded-full bg-white/5 backdrop-blur-xl mb-6 md:mb-10 border border-gvb-cyan/30 shadow-[0_0_20px_rgba(34,211,238,0.2)] whitespace-nowrap"
          >
            <span className="text-[9px] md:text-[10px] font-black tracking-[0.3em] text-gvb-cyan uppercase">Software & Automation Consultancy</span>
          </motion.div>

          <MaskReveal>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 text-white leading-[1] lg:leading-none tracking-tighter uppercase px-1">
              Engineering <br />
              <span className="text-gradient">Precision Systems</span>
            </h1>
          </MaskReveal>

          <MaskReveal delay={0.2}>
            <p className="text-sm md:text-xl text-white/80 mb-8 md:mb-12 max-w-2xl mx-auto font-bold tracking-tight px-4 leading-relaxed">
              Building custom automated tools, interactive dashboards, enterprise web platforms, and data-driven strategy solutions.
            </p>
          </MaskReveal>

          <MaskReveal delay={0.3}>
            <div className="inline-block px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 text-xs md:text-sm font-semibold mb-10">
              Convergence of academia and industry &bull; Founded by an engineer with ISRO SDSC SHAR & Mu Sigma background
            </div>
          </MaskReveal>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 md:gap-12 z-50 w-full sm:w-auto pb-24"
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
                Architecting modern software, automated workflows, and decision support platforms.
              </p>
            </div>
            <Link href="/services">
              <Button variant="outline" className="h-14 px-8 text-xs font-black uppercase tracking-[0.3em] rounded-full">
                All Capabilities <ArrowRight className="ml-3 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <GlassCard key={idx} className="group p-0 overflow-hidden rounded-[2.5rem] border-white/5 hover:border-gvb-cyan/30 transition-all duration-700 flex flex-col h-full">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0 opacity-40 group-hover:opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <service.icon className="w-8 h-8 text-gvb-cyan mb-3 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter leading-tight">{service.title}</h3>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-white/60 text-xs md:text-sm font-bold leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Link href="/services">
                    <div className="flex items-center text-[10px] font-black text-gvb-cyan uppercase tracking-[0.3em] group-hover:translate-x-2 transition-transform">
                      Learn More <ArrowRight className="ml-2 w-3 h-3" />
                    </div>
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stats / Pillars */}
      <section className="py-24 md:py-32 relative">
        <DataStreamLine direction="right" className="top-0 opacity-20" />
        <div className="max-w-7xl mx-auto px-6">
          <LiveStats />
        </div>
        <DataStreamLine direction="left" className="bottom-0 opacity-20" />
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center glass-card p-6 sm:p-12 md:p-24 rounded-3xl sm:rounded-[3rem] relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-gvb-cyan/10 via-transparent to-gvb-blue/10 opacity-50 pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tighter uppercase leading-none">Ready to <span className="text-gradient">Innovate?</span></h2>
          <p className="text-xl md:text-2xl text-white/60 mb-12 font-bold max-w-2xl mx-auto">Partner with an engineering-led team to build custom automation, modern platforms, and data-driven systems.</p>
          <Link href="/contact" className="inline-block relative z-10">
            <Button size="lg" className="h-20 px-16 text-xl rounded-3xl bg-gvb-cyan text-black hover:bg-white transition-all font-black uppercase tracking-widest border-none shadow-[0_0_50px_rgba(34,211,238,0.3)]">
              Initiate Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
