"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface TickerData {
    symbol: string;
    price: number;
    change: number;
    isUp: boolean;
}

const initialTickers: TickerData[] = [
    { symbol: "NIFTY 50", price: 22453.30, change: 0.8, isUp: true },
    { symbol: "SENSEX", price: 73945.80, change: 0.9, isUp: true },
    { symbol: "USD/INR", price: 83.35, change: -0.1, isUp: false },
    { symbol: "RELIANCE", price: 2890.15, change: 1.2, isUp: true },
    { symbol: "TCS", price: 4120.50, change: 0.5, isUp: true },
    { symbol: "HDFCBANK", price: 1450.70, change: -0.8, isUp: false },
    { symbol: "INFY", price: 1560.25, change: 2.1, isUp: true },
    { symbol: "BTC/INR", price: 5350240.50, change: 3.5, isUp: true },
    { symbol: "GOLD/MCX", price: 65420.00, change: -0.4, isUp: false },
];

export function MarketDashboard() {
    const [tickers, setTickers] = useState<TickerData[]>(initialTickers);

    useEffect(() => {
        const interval = setInterval(() => {
            setTickers(prev => prev.map(ticker => {
                const volatility = ticker.price * 0.002;
                const move = (Math.random() - 0.5) * volatility;
                const newPrice = ticker.price + move;
                const newChange = ticker.change + (move / ticker.price * 100);

                return {
                    ...ticker,
                    price: newPrice,
                    change: newChange,
                    isUp: newChange >= 0
                };
            }));
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full bg-slate-50 border-b border-slate-200 overflow-hidden relative flex items-center h-14 cursor-default">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

            <div className="absolute left-6 z-20 hidden md:flex items-center text-slate-500 text-[10px] tracking-widest font-bold uppercase bg-white/90 backdrop-blur-sm py-1.5 px-4 rounded-full border border-slate-200/50 shadow-sm">
                <Activity className="w-4 h-4 mr-2 text-gvb-blue animate-pulse" />
                Live Market Pulse
            </div>

            <motion.div
                className="flex whitespace-nowrap pl-[180px] md:pl-[240px]"
                animate={{ x: [0, -2500] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 40,
                        ease: "linear",
                    },
                }}
            >
                {[...tickers, ...tickers, ...tickers, ...tickers].map((ticker, idx) => (
                    <div key={`${ticker.symbol}-${idx}`} className="flex items-center space-x-6 px-12 border-r border-slate-100 group">
                        <span className="text-slate-700 font-bold text-xs tracking-widest uppercase">{ticker.symbol}</span>
                        <span className="text-slate-800 font-mono text-sm tracking-tighter font-semibold">₹{ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        <div className={`flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full ${ticker.isUp ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                            {ticker.isUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                            {Math.abs(ticker.change).toFixed(2)}%
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
