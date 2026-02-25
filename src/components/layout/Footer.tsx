"use client";

import Link from "next/link";
import { Code2, Github, Twitter, Linkedin, Mail, Phone } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-space-blue border-t border-gray-200 dark:border-white/10 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Col */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 group mb-6">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-start to-accent-end flex items-center justify-center">
                                <Code2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">GVB Tech</span>
                        </Link>
                        <p className="text-sm text-foreground/70 mb-6">
                            Engineering tomorrow&apos;s solutions with proprietary trading, robust software, and strategic growth.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-foreground/60 hover:text-accent-start transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-foreground/60 hover:text-accent-start transition-colors"><Github className="w-5 h-5" /></a>
                            <a href="#" className="text-foreground/60 hover:text-accent-start transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Services</h3>
                        <ul className="space-y-3">
                            <li><Link href="/services" className="text-sm text-foreground/70 hover:text-accent-start transition-colors">Proprietary Trading</Link></li>
                            <li><Link href="/services" className="text-sm text-foreground/70 hover:text-accent-start transition-colors">Software Development</Link></li>
                            <li><Link href="/services" className="text-sm text-foreground/70 hover:text-accent-start transition-colors">Strategy Consultation</Link></li>
                            <li><Link href="/services" className="text-sm text-foreground/70 hover:text-accent-start transition-colors">Algorithm Development</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-sm text-foreground/70 hover:text-accent-start transition-colors">About Us</Link></li>
                            <li><Link href="/portfolio" className="text-sm text-foreground/70 hover:text-accent-start transition-colors">Portfolio</Link></li>
                            <li><Link href="/blog" className="text-sm text-foreground/70 hover:text-accent-start transition-colors">Blog & Insights</Link></li>
                            <li><Link href="/careers" className="text-sm text-foreground/70 hover:text-accent-start transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-3 text-sm text-foreground/70">
                                <Mail className="w-4 h-4" />
                                <span>info@gvbtech.com</span>
                            </li>
                            <li className="flex items-center space-x-3 text-sm text-foreground/70">
                                <Phone className="w-4 h-4" />
                                <span>+91 9381958045</span>
                            </li>
                            <li className="text-sm text-foreground/70">
                                Sullurpeta, Andhra Pradesh 524121, IN
                            </li>
                        </ul>
                    </div>
                    {/* Newsletter */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Newsletter</h3>
                        <p className="text-sm text-foreground/70 mb-4">
                            Subscribe to get the latest updates on trading algorithms and tech insights.
                        </p>
                        <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); alert("Subscribed successfully!"); }}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                                className="w-full bg-white/5 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent-start transition-all"
                            />
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-accent-start to-accent-end text-white rounded-xl px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-foreground/60">
                        &copy; {currentYear} GVB Tech Solutions. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="text-sm text-foreground/60 hover:text-foreground">Privacy Policy</Link>
                        <Link href="/terms" className="text-sm text-foreground/60 hover:text-foreground">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
