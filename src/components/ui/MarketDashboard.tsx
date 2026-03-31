"use client";

import React, { useEffect, useState } from "react";
import { Activity, TrendingUp, TrendingDown } from "lucide-react";

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

    // Dynamic price updates without React re-renders for the animation part
    useEffect(() => {
        const interval = setInterval(() => {
            setTickers(prev => prev.map(ticker => {
                const volatility = ticker.price * 0.001;
                const move = (Math.random() - 0.5) * volatility;
                return {
                    ...ticker,
                    price: ticker.price + move,
                    isUp: Math.random() > 0.4
                };
            }));
        }, 5000); // Slow down updates for performance
        return () => clearInterval(interval);
    }, []);

    const tickerItems = [...tickers, ...tickers, ...tickers, ...tickers];

    return (
        <div className="w-full bg-slate-50/10 border-b border-black/5 overflow-hidden relative flex items-center h-14 cursor-default backdrop-blur-xl">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="absolute left-6 z-20 flex items-center text-black text-[10px] tracking-widest font-bold uppercase py-1.5 px-4 rounded-full border border-black/10 shadow-sm bg-white/90">
                <Activity className="w-4 h-4 mr-2 text-gvb-blue animate-pulse" />
                Live Market Pulse
            </div>

            <div className="flex animate-marquee whitespace-nowrap will-change-transform h-full items-center">
                {tickerItems.map((ticker, idx) => (
                    <div key={`${ticker.symbol}-${idx}`} className="flex items-center space-x-6 px-12 border-r border-black/5">
                        <span className="text-black font-extrabold text-xs tracking-widest uppercase">{ticker.symbol}</span>
                        <span className="text-black font-mono text-sm tracking-tighter font-semibold">
                            ₹{ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <div className={`flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full ${ticker.isUp ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                            {ticker.isUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                            {ticker.isUp ? "+" : "-"}{(Math.random() * 2).toFixed(2)}%
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
