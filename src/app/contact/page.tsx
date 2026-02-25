"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import React, { useState } from "react";

const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    service: z.string().min(1, "Please select a service"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        const text = `Hello GVB Tech Solutions,

I am ${data.name}.
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
Interested Service: ${data.service}

Message:
${data.message}`;

        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/919381958045?text=${encodedText}`;

        window.open(whatsappUrl, "_blank");

        setSuccessMessage("Thank you! You are being redirected to WhatsApp to send your message.");
        setIsSubmitting(false);
        reset();
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-background relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-start/5 rounded-full blur-[150px] pointer-events-none" />

            <section className="px-4 py-16 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold mb-6"
                >
                    Get in <span className="text-gradient">Touch</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-foreground/70 max-w-2xl mx-auto mb-16"
                >
                    Ready to start your next big project? Contact our team of experts for a comprehensive consultation.
                </motion.p>

                <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12 text-left relative z-10">

                    {/* Contact Info Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <GlassCard hoverEffect={false} className="p-8 h-full bg-gradient-to-br from-white/10 to-black/5 dark:from-white/5 dark:to-white/10 border-white/20">
                            <h3 className="text-2xl font-bold mb-8">Contact Information</h3>

                            <div className="space-y-6">
                                <InfoRow icon={MapPin} title="Headquarters" detail="Sullurpeta, Andhra Pradesh 524121, IN" />
                                <InfoRow icon={Mail} title="Email Address" detail="info@gvbtech.com" />
                                <InfoRow icon={Phone} title="Phone" detail="+91 9381958045" />
                                <InfoRow icon={Clock} title="Business Hours" detail="Mon-Fri: 9:00 AM - 6:00 PM (IST)" />
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-3"
                    >
                        <GlassCard hoverEffect={false} className="p-8 md:p-10 border-white/20">
                            <h3 className="text-3xl font-bold mb-8">Send us a message</h3>

                            {successMessage ? (
                                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-600 dark:text-green-400 font-medium text-lg text-center">
                                    {successMessage}
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground/80">Full Name *</label>
                                            <input
                                                {...register("name")}
                                                className={`w-full bg-white/5 dark:bg-black/20 border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-white/10'} rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent-start transition-all`}
                                                placeholder="Rahul Sharma"
                                            />
                                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground/80">Email Address *</label>
                                            <input
                                                {...register("email")}
                                                type="email"
                                                className={`w-full bg-white/5 dark:bg-black/20 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-white/10'} rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent-start transition-all`}
                                                placeholder="rahul@example.com"
                                            />
                                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground/80">Phone Number</label>
                                            <input
                                                {...register("phone")}
                                                className="w-full bg-white/5 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent-start transition-all"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground/80">Interested Service *</label>
                                            <select
                                                {...register("service")}
                                                className={`w-full bg-white/5 dark:bg-black/20 border ${errors.service ? 'border-red-500' : 'border-gray-300 dark:border-white/10'} rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent-start transition-all appearance-none`}
                                            >
                                                <option value="">Select a service...</option>
                                                <option value="trading">Proprietary Trading</option>
                                                <option value="software">Software Development</option>
                                                <option value="strategy">Strategy Consultation</option>
                                                <option value="marketing">Digital Marketing</option>
                                                <option value="edtech">EdTech Solutions</option>
                                            </select>
                                            {errors.service && <p className="text-red-500 text-sm">{errors.service.message}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground/80">Your Message *</label>
                                        <textarea
                                            {...register("message")}
                                            rows={5}
                                            className={`w-full bg-white/5 dark:bg-black/20 border ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-white/10'} rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent-start transition-all resize-none`}
                                            placeholder="Tell us about your project..."
                                        />
                                        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                                    </div>

                                    <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                    </Button>
                                </form>
                            )}
                        </GlassCard>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

function InfoRow({ icon: Icon, title, detail }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>, title: string, detail: string }) {
    return (
        <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-accent-start/10 text-accent-start flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <h4 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-1">{title}</h4>
                <p className="text-foreground font-medium text-lg">{detail}</p>
            </div>
        </div>
    );
}
