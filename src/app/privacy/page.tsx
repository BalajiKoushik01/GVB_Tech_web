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
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-foreground/60 text-sm">Last Updated: February 2026</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="glass-card p-8 md:p-12 rounded-[1.25rem] prose prose-invert max-w-none prose-p:text-foreground/80 prose-headings:text-foreground bg-white/5 backdrop-blur-3xl border border-white/10"
                >
                    <h2>1. Information We Collect</h2>
                    <p>
                        GVB Tech Solutions collects information that you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us.
                    </p>

                    <h2>2. How We Use Your Information</h2>
                    <p>
                        We may use the information we collect about you to:
                    </p>
                    <ul>
                        <li>Provide, maintain, and improve our services, including trading algorithms and software solutions.</li>
                        <li>Perform internal operations, including troubleshooting software bugs and operational problems.</li>
                        <li>Send you communications we think will be of interest to you, including information about products, services, promotions, and news.</li>
                    </ul>

                    <h2>3. Data Security</h2>
                    <p>
                        We implement rigorous, industry-standard security measures to protect the integrity and confidentiality of your personal information and trading data. However, no method of transmission over the internet or electronic storage is 100% secure.
                    </p>

                    <h2>4. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at info@gvbtech.in.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
