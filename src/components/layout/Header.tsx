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
                ? "bg-white/70 backdrop-blur-2xl border-b border-slate-200 shadow-lg py-2"
                : "bg-transparent py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between transition-all duration-500">
                    <Link href="/" onClick={(e) => { if (pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }} className="flex items-center gap-2 group">
                        <Logo showText={false} className={`transition-all duration-500 transform group-hover:scale-105 ${isScrolled ? 'w-10 h-10' : 'w-12 h-12'}`} />
                        <span className={`font-bold tracking-tighter transition-all duration-500 text-slate-800 ${isScrolled ? 'text-lg md:text-xl' : 'text-xl md:text-2xl whitespace-nowrap'}`}>
                            GVB <span className="text-gvb-blue">Tech</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-2">
                        <ul className="flex items-center space-x-2 bg-white/40 backdrop-blur-md border border-slate-200 rounded-full px-2 py-1.5 shadow-sm">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            onClick={(e) => { if (link.href === '/' && pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
                                            className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full flex items-center justify-center ${isActive
                                                    ? "bg-gradient-to-r from-accent-start to-accent-end text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                                                    : "text-slate-600 hover:text-gvb-blue hover:bg-slate-50"
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
                            className="p-2 text-slate-800"
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
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 md:hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2 shadow-2xl">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => {
                                        if (link.href === '/' && pathname === '/') {
                                            e.preventDefault();
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="block px-3 py-3 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 px-3">
                                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full">Get Started</Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
