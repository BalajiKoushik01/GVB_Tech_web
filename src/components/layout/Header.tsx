"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? "bg-black/40 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-2"
                : "bg-transparent py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between transition-all duration-500">
                    <Link href="/" data-cursor="magnetic" onClick={(e) => { if (pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }} className="flex items-center group">
                        <Logo className={`transition-all duration-500 origin-left ${isScrolled ? 'scale-90' : 'scale-100'}`} />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-2">
                        <ul className="flex items-center space-x-1 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full px-2 py-1.5 shadow-2xl">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            data-cursor="magnetic"
                                            onClick={(e) => { if (link.href === '/' && pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
                                            className={`relative px-5 py-2.5 text-[11px] font-black transition-all duration-300 rounded-full flex items-center justify-center uppercase tracking-[0.2em] ${isActive
                                                    ? "text-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/20"
                                                    : "text-white/40 hover:text-white hover:bg-white/5"
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="hidden md:flex items-center">
                        <Link href="/contact">
                            <Button data-cursor="magnetic" size="sm" className="h-11 px-8 rounded-full bg-gvb-cyan text-black hover:bg-white font-black uppercase tracking-widest text-[10px] border-none shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="w-10 h-10 flex items-center justify-center text-white bg-white/5 rounded-full border border-white/10"
                            aria-label="Toggle menu"
                            data-cursor="magnetic"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-0 z-[60] bg-[#020617] md:hidden flex flex-col justify-start items-center px-6 pt-24 pb-12 overflow-y-auto"
                    >
                        {/* Signature Background: Technical Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none" />

                        <button 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-white bg-white/5 rounded-full border border-white/10 z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col space-y-4 text-center w-full max-w-sm my-auto relative z-10">
                            {navLinks.map((link, idx) => {
                                const isActive = pathname === link.href;
                                return (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 + 0.2 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`text-3xl sm:text-4xl font-black uppercase tracking-tighter transition-all block ${
                                                isActive ? "text-gvb-cyan" : "text-white/60 hover:text-white"
                                            }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="pt-4 sm:pt-6"
                            >
                                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button size="lg" className="w-full h-14 sm:h-16 text-sm sm:text-lg font-black uppercase tracking-widest bg-gvb-cyan text-black rounded-2xl border-none shadow-[0_0_40px_rgba(34,211,238,0.4)]">
                                        Get Started
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
