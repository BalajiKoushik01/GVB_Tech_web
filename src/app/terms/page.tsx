"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
    return (
        <div className="min-h-[100dvh] pt-32 pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-start/5 rounded-full blur-[100px] mix-blend-screen opacity-30" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-foreground/60 text-sm">Last Updated: February 2026</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="glass-card p-8 md:p-12 rounded-[1.25rem] prose prose-invert max-w-none prose-p:text-foreground/80 prose-headings:text-foreground bg-white/5 backdrop-blur-3xl border border-white/10"
                >
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using the GVB Tech Solutions website and services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you do not have permission to access the Service.
                    </p>

                    <h2>2. Proprietary Trading & Financial Advice</h2>
                    <p>
                        GVB Tech Solutions provides software, algorithms, and technical infrastructure. The information and services provided on this website do not constitute financial, investment, or trading advice. Past performance of any trading system or methodology is not necessarily indicative of future results.
                    </p>

                    <h2>3. Intellectual Property</h2>
                    <p>
                        The Service and its original content, features, algorithms, and functionality are and will remain the exclusive property of GVB Tech Solutions and its licensors.
                    </p>

                    <h2>4. Limitation of Liability</h2>
                    <p>
                        In no event shall GVB Tech Solutions, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
