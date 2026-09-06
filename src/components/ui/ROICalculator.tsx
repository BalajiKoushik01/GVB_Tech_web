"use client";

import React, { useState } from "react";
import { GlassCard } from "./GlassCard";
import { Clock, Users, Zap, TrendingUp } from "lucide-react";

export function ROICalculator() {
    const [teamSize, setTeamSize] = useState(5);
    const [hoursPerWeek, setHoursPerWeek] = useState(10);
    const [avgHourlyRate, setAvgHourlyRate] = useState(2000); // INR per hour

    // Automation typically reclaims 60–80% of manual processing time
    const automationEfficiency = 0.70; // 70% time recovery (conservative estimate)
    const weeksPerYear = 52;

    const annualHoursSaved = Math.round(teamSize * hoursPerWeek * automationEfficiency * weeksPerYear);
    const annualCostSaved = Math.round(annualHoursSaved * avgHourlyRate);
    const weeklyHoursSaved = Math.round(teamSize * hoursPerWeek * automationEfficiency);

    return (
        <section className="py-24 md:py-40 px-4 relative bg-transparent">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-gvb-blue/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-12 md:mb-20 px-2 sm:px-0">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tighter text-slate-800">Automation Value Estimator</h2>
                    <p className="text-lg sm:text-2xl text-slate-600 max-w-3xl mx-auto font-medium tracking-tight">
                        Estimate the operational time and cost savings your team could unlock with custom automation workflows.
                    </p>
                    <p className="text-sm text-slate-400 mt-3 font-medium">
                        * Illustrative estimates based on a conservative 70% automation efficiency rate. Actual results vary by workflow complexity.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center cursor-default">
                    <GlassCard hoverEffect={false} className="p-6 md:p-10 !bg-white/60">
                        <h3 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 border-b border-slate-200 pb-4 md:pb-6 tracking-tight text-slate-800">Your Team Profile</h3>

                        <div className="space-y-8 md:space-y-12">
                            <div>
                                <label className="flex justify-between items-center mb-4 md:mb-6 text-sm md:text-base font-semibold">
                                    <span className="flex items-center text-slate-600"><Users className="w-4 h-4 md:w-5 md:h-5 mr-2 text-gvb-blue" /> Team Size</span>
                                    <span className="text-xl md:text-2xl font-bold tracking-tighter text-gradient">{teamSize} people</span>
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="50"
                                    step="1"
                                    value={teamSize}
                                    onChange={(e) => setTeamSize(Number(e.target.value))}
                                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gvb-blue shadow-inner"
                                />
                            </div>

                            <div>
                                <label className="flex justify-between items-center mb-4 md:mb-6 text-sm md:text-base font-semibold">
                                    <span className="flex items-center text-slate-600"><Clock className="w-4 h-4 md:w-5 md:h-5 mr-2 text-gvb-blue" /> Manual Hours / Person / Week</span>
                                    <span className="text-xl md:text-2xl font-bold tracking-tighter text-gradient">{hoursPerWeek} hrs</span>
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="40"
                                    step="1"
                                    value={hoursPerWeek}
                                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gvb-blue shadow-inner"
                                />
                            </div>

                            <div>
                                <label className="flex justify-between items-center mb-4 md:mb-6 text-sm md:text-base font-semibold">
                                    <span className="flex items-center text-slate-600"><Zap className="w-4 h-4 md:w-5 md:h-5 mr-2 text-gvb-blue" /> Avg. Hourly Cost (₹)</span>
                                    <span className="text-xl md:text-2xl font-bold tracking-tighter text-gradient">₹{avgHourlyRate.toLocaleString('en-IN')}/hr</span>
                                </label>
                                <input
                                    type="range"
                                    min="300"
                                    max="10000"
                                    step="100"
                                    value={avgHourlyRate}
                                    onChange={(e) => setAvgHourlyRate(Number(e.target.value))}
                                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gvb-blue shadow-inner"
                                />
                            </div>
                        </div>
                    </GlassCard>

                    <div className="space-y-6 md:space-y-8">
                        <GlassCard hoverEffect={false} className="!bg-gradient-to-br from-gvb-blue to-gvb-deep text-white border-none p-6 md:p-10 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                            <div className="relative z-10">
                                <p className="text-white/80 font-bold mb-2 md:mb-3 text-sm md:text-lg tracking-tight uppercase">Estimated Annual Cost Savings</p>
                                <h3 className="text-3xl md:text-6xl font-bold tracking-tighter mb-4 md:mb-6 break-words">₹{annualCostSaved.toLocaleString('en-IN')}</h3>

                                <div className="grid grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-10 pt-6 md:pt-8 border-t border-white/20">
                                    <div>
                                        <p className="text-xs md:text-sm text-white/70 mb-1 md:mb-2 font-bold uppercase">Hours Freed / Week</p>
                                        <p className="text-lg md:text-3xl font-bold text-white tracking-tight break-words">{weeklyHoursSaved} hrs</p>
                                    </div>
                                    <div>
                                        <p className="text-xs md:text-sm text-white/70 mb-1 md:mb-2 font-bold uppercase">Hours Freed / Year</p>
                                        <p className="text-lg md:text-3xl font-bold flex items-center tracking-tight"><TrendingUp className="w-4 h-4 md:w-6 md:h-6 mr-1 md:mr-2 text-white flex-shrink-0" /> {annualHoursSaved.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard hoverEffect={false} className="p-6 md:p-8 !bg-white/40">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <p className="text-xs md:text-sm text-slate-500 font-bold tracking-tight mb-1 uppercase">Fully Manual Operations Cost</p>
                                    <p className="text-lg md:text-2xl font-bold text-slate-700 break-words">₹{(teamSize * hoursPerWeek * avgHourlyRate * weeksPerYear).toLocaleString('en-IN')}/yr</p>
                                </div>
                                <div className="text-left sm:text-right">
                                    <p className="text-xs md:text-sm text-gvb-blue font-bold tracking-tight mb-1 uppercase">Time Recovered (70%)</p>
                                    <p className="text-lg md:text-2xl font-bold text-gradient break-words">{annualHoursSaved.toLocaleString()} hrs/yr</p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </section>
    );
}
