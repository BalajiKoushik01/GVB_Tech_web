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
                            By accessing or utilizing the digital infrastructure of GVB Tech Solutions, you acknowledge and agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you (the &ldquo;Client&rdquo;) and GVB Tech Solutions.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4">2. Software & Consultancy Services</h2>
                        <p>
                            GVB Tech Solutions provides custom software engineering, workflow automation, interactive dashboards, and technology consulting. All deliverables and open-source demonstration tools are provided for institutional and enterprise efficiency.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4">3. Intellectual Property Rights</h2>
                        <p>
                            All bespoke software, source code, workflow pipelines, and designs engineered by GVB Tech Solutions for clients are governed by specific client service agreements. Public R&D projects on GitHub are subject to their respective open-source licenses.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4">4. Usage Restrictions</h2>
                        <p>
                            Clients shall not:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-white/70">
                            <li>Use GVB systems or tools for unlawful activities or unauthorized security interference.</li>
                            <li>Attempt to breach or reverse-engineer non-licensed backend infrastructure.</li>
                            <li>Redistribute or white-label proprietary client solutions without explicit written consent.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4">5. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, GVB Tech Solutions shall not be liable for any financial losses, loss of data, or operational downtime resulting from the use of our services. Our infrastructure is provided &ldquo;as-is&rdquo; with 99.9% uptime targets, but without absolute performance guarantees.
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
