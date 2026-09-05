"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
    return (
        <div className="min-h-[100dvh] pt-32 pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent-end/5 rounded-full blur-[120px] mix-blend-screen opacity-30" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white uppercase">
                        Privacy <span className="text-gradient">Protocol</span>
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
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4">1. Information Collection Architecture</h2>
                        <p>
                            GVB Tech Solutions operates under strict data minimization protocols. We collect information that is strictly necessary for the delivery of our custom software systems, automated tools, analytics dashboards, and strategic consultation.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-white/70">
                            <li><strong>Identity Data:</strong> Full name, professional title, and organizational affiliation.</li>
                            <li><strong>Technical Data:</strong> IP address, browser type, and system logs required for secure sessions.</li>
                            <li><strong>Communication Data:</strong> Records of inquiries, project briefs, and consultation notes.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4">2. Utilization of Data Assets</h2>
                        <p>
                            Collected data is processed to maintain high-performance operational standards and deliver custom technological solutions.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-white/70">
                            <li>Internal troubleshooting and resolution of software anomalies.</li>
                            <li>Optimization of automated workflow execution paths.</li>
                            <li>Legal compliance and standard business recordkeeping.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4">3. Security Infrastructure</h2>
                        <p>
                            We implement military-grade encryption for data at rest (AES-256) and in transit (TLS 1.3). Access to sensitive project data is restricted via multi-factor authentication (MFA) and biometric verification for core engineering teams.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4">4. Data Retention and Destruction</h2>
                        <p>
                            GVB Tech Solutions retains personal data only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. Upon expiration of the retention period, data is securely purged using certified data destruction methods.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4">5. International Transfers</h2>
                        <p>
                            As a global entity, data may be processed across our distributed cloud infrastructure in North America, Europe, and Asia. We ensure all cross-border transfers comply with Standard Contractual Clauses (SCCs) and regional data protection laws (GDPR, CCPA).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4">6. Contact Protocol</h2>
                        <p>
                            For inquiries regarding data sovereignty or to exercise your right to access/deletion, please contact our Data Privacy Officer at:
                        </p>
                        <div className="mt-4 p-6 rounded-xl bg-white/5 border border-white/10 font-mono text-sm">
                            GVB Tech Solutions<br />
                            Attn: Data Privacy Officer<br />
                            info@gvbtech.in
                        </div>
                    </section>
                </motion.div>
            </div>
        </div>
    );
}
