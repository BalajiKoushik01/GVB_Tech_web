"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import Hero3DBackground from "@/components/animations/Hero3DBackground";
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
    description: "Advanced trading algorithms and quantitative strategies for market success.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Software Development",
    icon: Code2,
    description: "Custom web applications, mobile apps, and enterprise software solutions.",
    color: "from-purple-500 to-fuchsia-500"
  },
  {
    title: "Strategy Consultation",
    icon: Lightbulb,
    description: "Business strategy, digital transformation, and growth consulting.",
    color: "from-amber-500 to-orange-500"
  },
  {
    title: "Marketing Services",
    icon: Megaphone,
    description: "Digital marketing, SEO, content strategy, and brand development.",
    color: "from-rose-500 to-red-500"
  },
  {
    title: "EdTech Solutions",
    icon: GraduationCap,
    description: "Online learning platforms, educational content, and training programs.",
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Algorithm Development",
    icon: Brain,
    description: "AI/ML algorithms, trading bots, and automated systems.",
    color: "from-indigo-500 to-blue-500"
  }
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);





  return (
    <div className="flex flex-col w-full">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-start to-accent-end transform origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Hero3DBackground />

        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-20"
        >
          <motion.h1
            initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-[7rem] font-semibold mb-8 tracking-tighter text-foreground leading-[1.1]"
          >
            Engineering<br className="hidden md:block" />
            <span className="text-gradient">Tomorrow's</span> Solutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-3xl text-foreground/70 mb-14 max-w-4xl mx-auto font-medium tracking-tight"
          >
            We transform ideas into powerful trading systems, cutting-edge software,
            and strategic growth solutions for the modern enterprise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <MagneticWrapper strength={0.4} radius={100}>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full">Start Your Project</Button>
              </Link>
            </MagneticWrapper>
            <MagneticWrapper strength={0.4} radius={100}>
              <Link href="/services" className="w-full sm:w-auto">
                <Button size="lg" variant="glass" className="w-full">Explore Services</Button>
              </Link>
            </MagneticWrapper>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-[30px] h-[50px] rounded-full border-2 border-foreground/30 flex justify-center p-2 mb-2">
            <motion.div
              animate={{ y: [0, 15, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-foreground/60 rounded-full"
            />
          </div>
          <span className="text-xs text-foreground/50 font-medium uppercase tracking-widest">Scroll</span>
        </motion.div>
      </section>

      <MarketDashboard />

      {/* Services Section */}
      <section className="py-40 px-4 relative bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-28">
            <h2 className="text-5xl md:text-6xl font-semibold mb-8 tracking-tighter">Our Expertise</h2>
            <p className="text-2xl text-foreground/60 max-w-3xl mx-auto font-medium tracking-tight">
              Comprehensive solutions tailored for businesses aiming to stay ahead of the curve.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.2
                }
              }
            }}
          >
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.95, filter: "blur(4px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
              >
                <GlassCard className="h-full flex flex-col group p-8">
                  <div className={`w-16 h-16 mb-8 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center transform group-hover:-rotate-6 transition-transform shadow-lg`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-foreground/60 mb-8 flex-1">{service.description}</p>
                  <Link href="/services" className="inline-flex items-center text-accent-start font-medium group-hover:translate-x-2 transition-transform self-start">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <LiveStats />

      <ROICalculator />

      {/* About Overview Section */}
      <section className="py-20 px-4 relative overflow-hidden bg-space-blue text-white">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-start/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-5xl md:text-6xl font-semibold mb-8 tracking-tighter">Engineering Excellence Meets Strategic Vision</h2>
            <p className="text-xl text-white/70 mb-10 font-medium">
              Founded on the principles of innovation and reliability, GVB Tech Solutions builds the infrastructure for the next generation of digital enterprises.
            </p>
            <ul className="space-y-4 mb-10">
              {['Industry-leading trading algorithms', 'Scalable enterprise software', 'Data-driven strategic consulting', 'Unmatched technical support'].map((item, i) => (
                <li key={i} className="flex items-center text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-accent-start mr-3 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/about">
              <Button variant="primary">Read Our Story</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-4 relative flex items-center justify-center bg-background">
        <GlassCard hoverEffect={false} className="max-w-5xl w-full text-center py-24 px-8 relative overflow-hidden bg-gradient-to-br from-white/5 to-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-start/10 to-accent-end/10" />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-semibold mb-8 tracking-tighter">Ready to Build Something Amazing?</h2>
            <p className="text-2xl text-foreground/70 mb-12 max-w-3xl mx-auto font-medium tracking-tight">
              Let's discuss your project and turn your vision into a robust, world-class reality.
            </p>
            <div className="flex justify-center mt-10">
              <MagneticWrapper strength={0.6} radius={120}>
                <Link href="/contact">
                  <Button size="lg" className="px-12 py-8 text-xl">
                    Get Started Today
                  </Button>
                </Link>
              </MagneticWrapper>
            </div>
          </div>
        </GlassCard>
      </section >
    </div >
  );
}
