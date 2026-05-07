"use client";

import React, { useEffect, useState } from "react";
import { Activity, TrendingUp, TrendingDown } from "lucide-react";

interface TickerData {
    symbol: string;
    price: number;
    change: number;
    isUp: boolean;
    randomChange: string;
}

const initialTickers: TickerData[] = [
    { symbol: "NIFTY 50", price: 22453.30, change: 0.8, isUp: true, randomChange: "0.80" },
    { symbol: "SENSEX", price: 73945.80, change: 0.9, isUp: true, randomChange: "0.90" },
    { symbol: "USD/INR", price: 83.35, change: -0.1, isUp: false, randomChange: "0.10" },
    { symbol: "RELIANCE", price: 2890.15, change: 1.2, isUp: true, randomChange: "1.20" },
    { symbol: "TCS", price: 4120.50, change: 0.5, isUp: true, randomChange: "0.50" },
    { symbol: "HDFCBANK", price: 1450.70, change: -0.8, isUp: false, randomChange: "0.80" },
    { symbol: "INFY", price: 1560.25, change: 2.1, isUp: true, randomChange: "2.10" },
    { symbol: "BTC/INR", price: 5350240.50, change: 3.5, isUp: true, randomChange: "3.50" },
    { symbol: "GOLD/MCX", price: 65420.00, change: -0.4, isUp: false, randomChange: "0.40" },
];

export function MarketDashboard() {
    const [tickers, setTickers] = useState<TickerData[]>(initialTickers);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setTickers(prev => prev.map(ticker => {
                const volatility = ticker.price * 0.001;
                const move = (Math.random() - 0.5) * volatility;
                return {
                    ...ticker,
                    price: ticker.price + move,
                    isUp: Math.random() > 0.4,
                    randomChange: (Math.random() * 2).toFixed(2)
                };
            }));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) return <div className="h-14 w-full bg-slate-900/10 border-b border-white/5" />;

    const tickerItems = [...tickers, ...tickers, ...tickers, ...tickers];

    return (
        <div className="w-full bg-black/60 border-b border-white/10 overflow-hidden relative flex items-center h-10 md:h-14 cursor-default backdrop-blur-3xl z-[45]">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />

            <div className="absolute left-4 z-20 hidden sm:flex items-center text-white text-[9px] tracking-widest font-black uppercase py-1.5 px-3 rounded-full border border-white/10 shadow-sm bg-black/80 backdrop-blur-md">
                <Activity className="w-3 h-3 mr-2 text-gvb-cyan animate-pulse" />
                Live Pulse
            </div>

            <div className="flex animate-marquee whitespace-nowrap will-change-transform h-full items-center">
                {tickerItems.map((ticker, idx) => (
                    <div key={`${ticker.symbol}-${idx}`} className="flex items-center space-x-3 md:space-x-6 px-4 md:px-12 border-r border-white/10">
                        <span className="text-white font-black text-[9px] md:text-xs tracking-widest uppercase">{ticker.symbol}</span>
                        <span className="text-white font-mono text-[10px] md:text-sm tracking-tighter font-black">
                            {ticker.symbol.includes('/') ? '' : '₹'}{ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <div className={`flex items-center text-[8px] md:text-[10px] font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full ${ticker.isUp ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            {ticker.isUp ? <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1" /> : <TrendingDown className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1" />}
                            {ticker.isUp ? "+" : "-"}{ticker.randomChange}%
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
