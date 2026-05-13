"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
    return (
        <div className="min-h-[100dvh] pt-32 pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[600px] bg-accent-start/5 rounded-full blur-[100px] mix-blend-screen opacity-30" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white uppercase">
                        Terms of <span className="text-gradient">Service</span>
                    </h1>
                    <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Last Updated: February 2026</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="glass-card p-8 md:p-12 rounded-[2rem] prose prose-invert max-w-none prose-p:text-white/80 prose-headings:text-white bg-white/5 backdrop-blur-3xl border border-white/10"
                >
                    <section className="mb-10">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4">1. Acceptance of Operational Mandate</h2>
                        <p>
                            By accessing or utilizing the digital infrastructure of GVB Tech Solutions, you acknowledge and agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you (the "Client") and GVB Tech Solutions.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4">2. Proprietary Trading Disclaimer</h2>
                        <p>
                            GVB Tech Solutions provides advanced software, algorithms, and technical infrastructure for proprietary trading and enterprise operations.
                        </p>
                        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl mb-4">
                            <p className="text-red-400 font-bold mb-0">
                                WARNING: Trading in financial markets involves significant risk. The information and algorithms provided do not constitute financial advice. Past performance of any system is not indicative of future results.
                            </p>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4">3. Intellectual Property Rights</h2>
                        <p>
                            All software, source code, neural network architectures, and algorithmic strategies developed by GVB Tech Solutions are the exclusive intellectual property of GVB Tech Solutions. Clients are granted a non-transferable, revocable license for the duration of the service agreement.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4">4. Usage Restrictions</h2>
                        <p>
                            Clients shall not:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-white/70">
                            <li>Reverse-engineer or attempt to extract source code from proprietary algorithms.</li>
                            <li>Use GVB infrastructure for illegal activities, including market manipulation or insider trading.</li>
                            <li>Redistribute or white-label GVB solutions without explicit written consent.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4">5. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, GVB Tech Solutions shall not be liable for any financial losses, loss of data, or operational downtime resulting from the use of our services. Our infrastructure is provided "as-is" with 99.9% uptime targets, but without absolute performance guarantees.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4">6. Termination of Service</h2>
                        <p>
                            GVB Tech Solutions reserves the right to suspend or terminate access to any digital service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or GVB&apos;s commercial interests.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4">7. Governing Law</h2>
                        <p>
                            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes shall be settled in the courts of Andhra Pradesh.
                        </p>
                    </section>
                </motion.div>
            </div>
        </div>
    );
}
