"use client";

import React, { useState } from "react";
import { GlassCard } from "./GlassCard";
import { Clock, Users, Zap, TrendingUp, Calculator } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ROICalculator() {
    const [teamSize, setTeamSize] = useState(5);
    const [hoursPerWeek, setHoursPerWeek] = useState(10);
    const [avgHourlyRate, setAvgHourlyRate] = useState(2000);

    const automationEfficiency = 0.70;
    const weeksPerYear = 52;

    const annualHoursSaved = Math.round(teamSize * hoursPerWeek * automationEfficiency * weeksPerYear);
    const annualCostSaved = Math.round(annualHoursSaved * avgHourlyRate);
    const weeklyHoursSaved = Math.round(teamSize * hoursPerWeek * automationEfficiency);
    const totalManualCost = teamSize * hoursPerWeek * avgHourlyRate * weeksPerYear;

    return (
        <section className="py-20 md:py-32 px-4 relative bg-transparent overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[900px] h-[600px] bg-gvb-blue/5 blur-[140px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-16 px-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
                    >
                        <Calculator className="w-3 h-3 text-gvb-cyan" />
                        <span className="text-[10px] font-black tracking-[0.3em] text-gvb-cyan uppercase">Automation ROI</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 tracking-tighter text-white uppercase leading-none"
                    >
                        Automation <span className="text-gradient">Value Estimator</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto font-bold tracking-tight leading-relaxed"
                    >
                        Estimate the operational time and cost your team could recover by switching to custom automation workflows.
                    </motion.p>
                    <p className="text-[10px] text-white/25 mt-3 font-medium uppercase tracking-widest">
                        * Conservative 70% efficiency estimate — actual results vary by workflow complexity
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-5 md:gap-8 items-start">
                    {/* ─── Input Card ─────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <GlassCard hoverEffect={false} className="p-5 sm:p-8 md:p-10 !bg-white/[0.04] border-white/10">
                            <h3 className="text-base sm:text-lg md:text-xl font-black mb-6 md:mb-8 border-b border-white/10 pb-4 tracking-widest text-white uppercase">
                                Your Team Profile
                            </h3>
                            <div className="space-y-7 md:space-y-9">
                                {/* Team Size */}
                                <SliderField
                                    icon={<Users className="w-3.5 h-3.5 text-gvb-cyan flex-shrink-0" />}
                                    label="Team Size"
                                    displayValue={`${teamSize} people`}
                                    min={1} max={50} step={1}
                                    value={teamSize}
                                    onChange={setTeamSize}
                                    minLabel="1" maxLabel="50"
                                />
                                {/* Hours per week */}
                                <SliderField
                                    icon={<Clock className="w-3.5 h-3.5 text-gvb-cyan flex-shrink-0" />}
                                    label="Manual Hrs / Person / Week"
                                    displayValue={`${hoursPerWeek} hrs`}
                                    min={1} max={40} step={1}
                                    value={hoursPerWeek}
                                    onChange={setHoursPerWeek}
                                    minLabel="1 hr" maxLabel="40 hrs"
                                />
                                {/* Hourly rate */}
                                <SliderField
                                    icon={<Zap className="w-3.5 h-3.5 text-gvb-cyan flex-shrink-0" />}
                                    label="Avg. Hourly Cost (₹)"
                                    displayValue={`₹${avgHourlyRate.toLocaleString("en-IN")}/hr`}
                                    min={300} max={10000} step={100}
                                    value={avgHourlyRate}
                                    onChange={setAvgHourlyRate}
                                    minLabel="₹300" maxLabel="₹10K"
                                />
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* ─── Output Cards ───────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4 md:space-y-5"
                    >
                        {/* Main savings card */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={annualCostSaved}
                                initial={{ opacity: 0.7, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                                <GlassCard hoverEffect={false} className="!bg-gradient-to-br from-gvb-blue via-gvb-deep to-[#1e40af] text-white border-none p-5 sm:p-8 md:p-10 relative overflow-hidden shadow-[0_0_60px_rgba(14,165,233,0.25)]">
                                    {/* Glow orb */}
                                    <div className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                                    <div className="relative z-10">
                                        <p className="text-white/60 font-black mb-1 text-[10px] uppercase tracking-[0.3em]">
                                            Estimated Annual Cost Savings
                                        </p>
                                        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-5 md:mb-8 break-all leading-none">
                                            ₹{annualCostSaved.toLocaleString("en-IN")}
                                        </p>
                                        <div className="grid grid-cols-2 gap-4 pt-5 border-t border-white/20">
                                            <div>
                                                <p className="text-[10px] text-white/50 mb-1 font-black uppercase tracking-widest">Hours Freed/Week</p>
                                                <p className="text-xl md:text-2xl font-black tracking-tight">{weeklyHoursSaved} hrs</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-white/50 mb-1 font-black uppercase tracking-widest">Hours Freed/Year</p>
                                                <p className="text-xl md:text-2xl font-black flex items-center gap-1 tracking-tight">
                                                    <TrendingUp className="w-4 h-4 flex-shrink-0" />
                                                    {annualHoursSaved.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        </AnimatePresence>

                        {/* Breakdown card */}
                        <GlassCard hoverEffect={false} className="p-5 sm:p-6 md:p-8 !bg-white/[0.04] border-white/10">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-1">Fully Manual Annual Cost</p>
                                    <p className="text-lg md:text-xl font-black text-white break-all">
                                        ₹{totalManualCost.toLocaleString("en-IN")}<span className="text-white/40 text-sm">/yr</span>
                                    </p>
                                </div>
                                <div className="sm:text-right">
                                    <p className="text-[10px] text-gvb-cyan font-black uppercase tracking-widest mb-1">Time Recovered (70%)</p>
                                    <p className="text-lg md:text-xl font-black text-gradient">
                                        {annualHoursSaved.toLocaleString()} hrs<span className="text-white/40 text-sm">/yr</span>
                                    </p>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ─── Reusable Slider Field ──────────────────────────────────────────────────── */
function SliderField({
    icon, label, displayValue, min, max, step, value, onChange, minLabel, maxLabel,
}: {
    icon: React.ReactNode;
    label: string;
    displayValue: string;
    min: number; max: number; step: number; value: number;
    onChange: (v: number) => void;
    minLabel: string; maxLabel: string;
}) {
    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <span className="flex items-center gap-2 text-white/50 text-[10px] font-black uppercase tracking-[0.25em]">
                    {icon}
                    {label}
                </span>
                <span className="text-base sm:text-lg md:text-xl font-black text-gvb-cyan">{displayValue}</span>
            </div>
            <input
                type="range"
                min={min} max={max} step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-gvb-cyan touch-manipulation"
                style={{ touchAction: "manipulation" }}
            />
            <div className="flex justify-between text-[9px] text-white/20 font-black mt-1.5 uppercase tracking-widest">
                <span>{minLabel}</span>
                <span>{maxLabel}</span>
            </div>
        </div>
    );
}
