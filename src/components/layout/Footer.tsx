"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-[#020617] border-t border-white/5 overflow-hidden relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 text-center md:text-left items-start justify-center">
                    {/* Brand Col */}
                    <div className="sm:col-span-2 lg:col-span-2 flex flex-col items-center md:items-start">
                        <Link href="/" onClick={(e) => { if (pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }} className="flex items-center group mb-6">
                            <Logo className="scale-110 md:scale-125 origin-center md:origin-left mb-2 transition-transform duration-500" />
                        </Link>
                        <p className="text-base text-white mb-8 font-bold max-w-sm opacity-90 leading-relaxed">
                            Engineering tomorrow&apos;s solutions with proprietary trading, robust software, and strategic growth infrastructure.
                        </p>
                        <div className="flex space-x-5">
                            <a href="https://github.com/BalajiKoushik01" target="_blank" rel="noopener noreferrer" data-cursor="magnetic" className="p-3.5 rounded-full bg-white/5 text-white hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all shadow-xl"><Github className="w-5 h-5" /></a>
                            <a href="https://www.linkedin.com/in/balaji-koushik-05222a316" target="_blank" rel="noopener noreferrer" data-cursor="magnetic" className="p-3.5 rounded-full bg-white/5 text-white hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all shadow-xl"><Linkedin className="w-5 h-5" /></a>
                            <a href="https://www.instagram.com/balajikoushik01?igsh=NGNpem1tOG11ZHVp" target="_blank" rel="noopener noreferrer" data-cursor="magnetic" className="p-3.5 rounded-full bg-white/5 text-white hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all shadow-xl"><Instagram className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Links 1 */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-8 flex items-center">
                            <span className="w-1 h-1 bg-gvb-cyan rounded-full mr-3 shadow-[0_0_8px_rgba(0,209,255,0.8)]" />
                            Services
                        </h3>
                        <ul className="space-y-4">
                            <li><Link href="/services" data-cursor="magnetic" className="text-sm font-bold text-white hover:text-gvb-cyan transition-colors duration-300">Proprietary Trading</Link></li>
                            <li><Link href="/services" data-cursor="magnetic" className="text-sm font-bold text-white hover:text-gvb-cyan transition-colors duration-300">Software Development</Link></li>
                            <li><Link href="/services" data-cursor="magnetic" className="text-sm font-bold text-white hover:text-gvb-cyan transition-colors duration-300">Strategy Consultation</Link></li>
                            <li><Link href="/services" data-cursor="magnetic" className="text-sm font-bold text-white hover:text-gvb-cyan transition-colors duration-300">Algorithm Development</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-8 flex items-center">
                            <span className="w-1 h-1 bg-gvb-cyan rounded-full mr-3 shadow-[0_0_8px_rgba(0,209,255,0.8)]" />
                            Company
                        </h3>
                        <ul className="space-y-4">
                            <li><Link href="/about" data-cursor="magnetic" className="text-sm font-bold text-white hover:text-gvb-cyan transition-colors duration-300">About Us</Link></li>
                            <li><Link href="/portfolio" data-cursor="magnetic" className="text-sm font-bold text-white hover:text-gvb-cyan transition-colors duration-300">Portfolio</Link></li>
                            <li><Link href="/contact" data-cursor="magnetic" className="text-sm font-bold text-white hover:text-gvb-cyan transition-colors duration-300">Contact Us</Link></li>
                            <li><Link href="/services" data-cursor="magnetic" className="text-sm font-bold text-white hover:text-gvb-cyan transition-colors duration-300">Capabilities</Link></li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-8">Contact</h3>
                        <ul className="space-y-5">
                            <li className="flex items-center space-x-3 text-sm font-bold text-white">
                                <Mail className="w-4 h-4 text-gvb-cyan" />
                                <span data-cursor="magnetic">info@gvbtech.in</span>
                            </li>
                            <li className="flex items-center space-x-3 text-sm font-bold text-white">
                                <Phone className="w-4 h-4 text-gvb-cyan" />
                                <span data-cursor="magnetic">+91 9381958045</span>
                            </li>
                            <li className="text-xs font-bold text-white/60 pl-7 leading-relaxed tracking-wide">
                                Sullurpeta, Andhra Pradesh<br />524121, IN
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                        &copy; {currentYear} GVB Tech Solutions. All rights reserved.
                    </p>
                    <div className="flex flex-wrap gap-10 justify-center md:justify-end">
                        <Link href="/privacy" data-cursor="magnetic" className="text-[10px] font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest">Privacy Policy</Link>
                        <Link href="/terms" data-cursor="magnetic" className="text-[10px] font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
