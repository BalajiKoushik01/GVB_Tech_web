"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="liquid-glass border-none rounded-none border-t border-black/5 overflow-hidden relative bg-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand Col */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <Link href="/" onClick={(e) => { if (pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }} className="flex items-center gap-2 group mb-6">
                            <Logo showText={false} className="w-10 h-10 transition-transform transform group-hover:scale-110" />
                            <span className="text-2xl font-black tracking-tighter text-black uppercase">GVB <span className="text-gvb-blue">Tech</span></span>
                        </Link>
                        <p className="text-base text-black mb-6 font-bold max-w-sm opacity-90">
                            Engineering tomorrow&apos;s solutions with proprietary trading, robust software, and strategic growth infrastructure.
                        </p>
                        <div className="flex space-x-5">
                            <a href="https://github.com/BalajiKoushik01" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-black text-white hover:bg-slate-900 transition-all shadow-lg"><Github className="w-5 h-5" /></a>
                            <a href="https://www.linkedin.com/in/balaji-koushik-05222a316" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-black text-white hover:bg-slate-900 transition-all shadow-lg"><Linkedin className="w-5 h-5" /></a>
                            <a href="https://www.instagram.com/balajikoushik01?igsh=NGNpem1tOG11ZHVp" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-black text-white hover:bg-slate-900 transition-all shadow-lg"><Instagram className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-[0.2em] mb-6">Services</h3>
                        <ul className="space-y-4">
                            <li><Link href="/services" className="text-sm font-semibold text-slate-500 hover:text-gvb-blue transition-colors">Proprietary Trading</Link></li>
                            <li><Link href="/services" className="text-sm font-semibold text-slate-500 hover:text-gvb-blue transition-colors">Software Development</Link></li>
                            <li><Link href="/services" className="text-sm font-semibold text-slate-500 hover:text-gvb-blue transition-colors">Strategy Consultation</Link></li>
                            <li><Link href="/services" className="text-sm font-semibold text-slate-500 hover:text-gvb-blue transition-colors">Algorithm Development</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-[0.2em] mb-6">Company</h3>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-sm font-semibold text-slate-500 hover:text-gvb-blue transition-colors">About Us</Link></li>
                            <li><Link href="/portfolio" className="text-sm font-semibold text-slate-500 hover:text-gvb-blue transition-colors">Portfolio</Link></li>
                            <li><Link href="/blog" className="text-sm font-semibold text-slate-500 hover:text-gvb-blue transition-colors">Insights</Link></li>
                            <li><Link href="/careers" className="text-sm font-semibold text-slate-500 hover:text-gvb-blue transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-[0.2em] mb-6">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-3 text-sm font-semibold text-slate-600">
                                <Mail className="w-4 h-4 text-gvb-blue" />
                                <span>info@gvbtech.in</span>
                            </li>
                            <li className="flex items-center space-x-3 text-sm font-semibold text-slate-600">
                                <Phone className="w-4 h-4 text-gvb-blue" />
                                <span>+91 9381958045</span>
                            </li>
                            <li className="text-sm font-semibold text-slate-500 pl-7 leading-relaxed">
                                Sullurpeta, Andhra Pradesh<br />524121, IN
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm font-medium text-slate-400">
                        &copy; {currentYear} GVB Tech Solutions. All rights reserved.
                    </p>
                    <div className="flex flex-wrap gap-8 justify-center md:justify-end">
                        <Link href="/privacy" className="text-sm font-bold text-slate-400 hover:text-slate-800 transition-colors uppercase tracking-widest text-[10px]">Privacy Policy</Link>
                        <Link href="/terms" className="text-sm font-bold text-slate-400 hover:text-slate-800 transition-colors uppercase tracking-widest text-[10px]">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
