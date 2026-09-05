"use client";

import React, { useState } from "react";
import { GlassCard } from "./GlassCard";
import { TrendingUp, DollarSign, Clock } from "lucide-react";

export function ROICalculator() {
    const [investment, setInvestment] = useState(5000000); // 50 Lakhs INR
    const [timeframe, setTimeframe] = useState(12);

    // Simulated Returns logic
    const baseGrowth = 1.05; // Base tech growth
    const gvbGrowthProprietary = 1.35; // GVB Algorithmic growth

    const projectedBase = Math.floor(investment * Math.pow(baseGrowth, timeframe / 12));
    const projectedGVB = Math.floor(investment * Math.pow(gvbGrowthProprietary, timeframe / 12));
    const netProfit = projectedGVB - investment;
    const roiPercentage = ((netProfit / investment) * 100).toFixed(1);

    return (
        <section className="py-24 md:py-40 px-4 relative bg-transparent">
            {/* Launch Glow Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-gvb-blue/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-12 md:mb-20 px-2 sm:px-0">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tighter text-slate-800">Projected ROI Calculator</h2>
                    <p className="text-lg sm:text-2xl text-slate-600 max-w-3xl mx-auto font-medium tracking-tight">
                        Discover the potential financial impact of leveraging our custom automation tools and modern software infrastructure.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center cursor-default">
                    <GlassCard hoverEffect={false} className="p-6 md:p-10 !bg-white/60">
                        <h3 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 border-b border-slate-200 pb-4 md:pb-6 tracking-tight text-slate-800">Configuration Profile</h3>

                        <div className="space-y-8 md:space-y-12">
                            <div>
                                <label className="flex justify-between items-center mb-4 md:mb-6 text-sm md:text-base font-semibold">
                                    <span className="flex items-center text-slate-600"><DollarSign className="w-4 h-4 md:w-5 md:h-5 mr-2 text-gvb-blue" /> Initial Investment</span>
                                    <span className="text-xl md:text-2xl font-bold tracking-tighter text-gradient">₹{investment.toLocaleString('en-IN')}</span>
                                </label>
                                <input
                                    type="range"
                                    min="1000000"
                                    max="50000000"
                                    step="500000"
                                    value={investment}
                                    onChange={(e) => setInvestment(Number(e.target.value))}
                                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gvb-blue shadow-inner"
                                />
                            </div>

                            <div>
                                <label className="flex justify-between items-center mb-4 md:mb-6 text-sm md:text-base font-semibold">
                                    <span className="flex items-center text-slate-600"><Clock className="w-4 h-4 md:w-5 md:h-5 mr-2 text-gvb-blue" /> Projected Timeframe</span>
                                    <span className="text-xl md:text-2xl font-bold tracking-tighter text-gradient">{timeframe} Months</span>
                                </label>
                                <input
                                    type="range"
                                    min="3"
                                    max="60"
                                    step="3"
                                    value={timeframe}
                                    onChange={(e) => setTimeframe(Number(e.target.value))}
                                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gvb-blue shadow-inner"
                                />
                            </div>
                        </div>
                    </GlassCard>

                    <div className="space-y-6 md:space-y-8">
                        <GlassCard hoverEffect={false} className="!bg-gradient-to-br from-gvb-blue to-gvb-deep text-white border-none p-6 md:p-10 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                            <div className="relative z-10">
                                <p className="text-white/80 font-bold mb-2 md:mb-3 text-sm md:text-lg tracking-tight uppercase">Estimated Technology Returns</p>
                                <h3 className="text-3xl md:text-6xl font-bold tracking-tighter mb-4 md:mb-6 break-words">₹{projectedGVB.toLocaleString('en-IN')}</h3>

                                <div className="grid grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-10 pt-6 md:pt-8 border-t border-white/20">
                                    <div>
                                        <p className="text-xs md:text-sm text-white/70 mb-1 md:mb-2 font-bold uppercase">Net Profit</p>
                                        <p className="text-lg md:text-3xl font-bold text-white tracking-tight break-words">+₹{netProfit.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs md:text-sm text-white/70 mb-1 md:mb-2 font-bold uppercase">Total ROI</p>
                                        <p className="text-lg md:text-3xl font-bold flex items-center tracking-tight"><TrendingUp className="w-4 h-4 md:w-6 md:h-6 mr-1 md:mr-2 text-white flex-shrink-0" /> {roiPercentage}%</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard hoverEffect={false} className="p-6 md:p-8 !bg-white/40">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <p className="text-xs md:text-sm text-slate-500 font-bold tracking-tight mb-1 uppercase">Standard Industry Growth</p>
                                    <p className="text-lg md:text-2xl font-bold text-slate-700 break-words">₹{projectedBase.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="text-left sm:text-right">
                                    <p className="text-xs md:text-sm text-gvb-blue font-bold tracking-tight mb-1 uppercase">The GVB Advantage</p>
                                    <p className="text-lg md:text-2xl font-bold text-gradient break-words">+₹{(projectedGVB - projectedBase).toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </section>
    );
}
