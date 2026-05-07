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
                    <Link href="/" onClick={(e) => { if (pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }} className="flex items-center group">
                        <Logo className={`transition-all duration-500 origin-left ${isScrolled ? 'scale-90' : 'scale-100'}`} />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-2">
                        <ul className="flex items-center space-x-2 bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-2 py-1.5 shadow-sm">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            data-cursor="magnetic"
                                            onClick={(e) => { if (link.href === '/' && pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
                                            className={`relative px-4 py-2 text-sm font-black transition-all duration-300 rounded-full flex items-center justify-center uppercase tracking-widest ${isActive
                                                    ? "bg-white/10 text-white border border-gvb-cyan/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                                                    : "text-white/60 hover:text-white hover:bg-white/5"
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/contact"><Button size="sm" className="bg-gvb-blue hover:bg-gvb-deep">Get Started</Button></Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center space-x-4 md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-white"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-3xl md:hidden flex flex-col justify-center items-center px-6"
                    >
                        <button 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-8 right-8 p-3 text-white bg-white/5 rounded-full border border-white/10"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="flex flex-col space-y-8 text-center w-full">
                            {navLinks.map((link, idx) => {
                                const isActive = pathname === link.href;
                                return (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`text-5xl font-black uppercase tracking-tighter transition-all ${
                                                isActive ? "text-gvb-cyan" : "text-white/60 hover:text-white"
                                            }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="pt-12"
                            >
                                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button size="lg" className="w-full h-20 text-xl font-black uppercase tracking-widest bg-white text-black rounded-2xl">
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
