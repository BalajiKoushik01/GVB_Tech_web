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
        <section className="py-40 px-4 relative bg-background">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl font-semibold mb-6 tracking-tighter">Projected ROI Calculator</h2>
                    <p className="text-2xl text-foreground/60 max-w-3xl mx-auto font-medium tracking-tight">
                        Discover the potential financial impact of leveraging our proprietary trading algorithms and enterprise infrastructure.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center cursor-default">
                    <GlassCard hoverEffect={false} className="p-10">
                        <h3 className="text-3xl font-semibold mb-10 border-b border-foreground/10 pb-6 tracking-tight">Configuration Profile</h3>

                        <div className="space-y-12">
                            <div>
                                <label className="flex justify-between items-center mb-6 text-base font-medium">
                                    <span className="flex items-center text-foreground/70"><DollarSign className="w-5 h-5 mr-2 text-accent-start" /> Initial Investment Amount</span>
                                    <span className="text-2xl font-bold tracking-tighter text-gradient">₹{investment.toLocaleString('en-IN')}</span>
                                </label>
                                <input
                                    type="range"
                                    min="1000000"
                                    max="50000000"
                                    step="500000"
                                    value={investment}
                                    onChange={(e) => setInvestment(Number(e.target.value))}
                                    className="w-full h-3 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent-start shadow-inner"
                                />
                            </div>

                            <div>
                                <label className="flex justify-between items-center mb-6 text-base font-medium">
                                    <span className="flex items-center text-foreground/70"><Clock className="w-5 h-5 mr-2 text-accent-start" /> Projected Timeframe</span>
                                    <span className="text-2xl font-bold tracking-tighter text-gradient">{timeframe} Months</span>
                                </label>
                                <input
                                    type="range"
                                    min="3"
                                    max="60"
                                    step="3"
                                    value={timeframe}
                                    onChange={(e) => setTimeframe(Number(e.target.value))}
                                    className="w-full h-3 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent-start shadow-inner"
                                />
                            </div>
                        </div>
                    </GlassCard>

                    <div className="space-y-8">
                        <GlassCard hoverEffect={false} className="bg-gradient-to-br from-accent-start to-accent-end text-white border-none p-10 relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(102,126,234,0.4)]">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                            <div className="relative z-10">
                                <p className="text-white/80 font-medium mb-3 text-lg tracking-tight">Estimated GVB Technology Returns</p>
                                <h3 className="text-6xl font-semibold tracking-tighter mb-6">₹{projectedGVB.toLocaleString('en-IN')}</h3>

                                <div className="grid grid-cols-2 gap-6 mt-10 pt-8 border-t border-white/20">
                                    <div>
                                        <p className="text-sm text-white/70 mb-2 font-medium">Net Profit Margin</p>
                                        <p className="text-3xl font-semibold text-green-300 tracking-tight">+₹{netProfit.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/70 mb-2 font-medium">Total Return (ROI)</p>
                                        <p className="text-3xl font-semibold flex items-center tracking-tight"><TrendingUp className="w-6 h-6 mr-2 text-green-400" /> {roiPercentage}%</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard hoverEffect={false} className="p-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-foreground/60 font-medium tracking-tight mb-1">Standard Industry Growth</p>
                                    <p className="text-2xl font-semibold">₹{projectedBase.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-foreground/60 font-medium tracking-tight mb-1">The GVB Advantage</p>
                                    <p className="text-2xl font-bold text-gradient">+₹{(projectedGVB - projectedBase).toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </section>
    );
}
