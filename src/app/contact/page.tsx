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
    website: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [submissionError, setSubmissionError] = useState("");

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setSubmissionError("");

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setSuccessMessage("Your enquiry was received. Thank you for outlining the work; we will review what you shared.");
                reset();
            } else {
                throw new Error("Failed to submit");
            }
        } catch (error) {
            console.error("Submission error:", error);
            // Fallback to WhatsApp if DB fails
            const text = `Hello GVB Tech Solutions,\n\nI am ${data.name}.\nEmail: ${data.email}\n${data.phone ? `Phone: ${data.phone}` : ''}\nInterested Service: ${data.service}\n\nMessage:\n${data.message}`;
            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/919381958045?text=${encodedText}`;
            setSubmissionError("The form did not send. Your draft is still here; retry or contact us directly using the details alongside.");
            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-20 md:pt-24 pb-16 min-h-screen bg-transparent relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gvb-blue/5 rounded-full blur-[150px] pointer-events-none" />

            <section className="px-6 py-12 md:py-16 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-black mb-4 md:mb-6 tracking-tighter text-white uppercase leading-none"
                >
                    Tell us about <span className="text-gradient">the work</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-10 md:mb-16 font-bold"
                >
                    Tell us what your team is trying to achieve, what is getting in the way and any systems already involved. A short, specific description is more useful than a polished brief.
                </motion.p>

                <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12 text-left relative z-10">

                    {/* Contact details and practical enquiry guidance */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <GlassCard hoverEffect={false} className="p-6 md:p-8 h-full !bg-white/5 backdrop-blur-3xl border-white/10">
                            <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">How to reach us</h3>

                            <div className="space-y-6">
                                <InfoRow icon={MapPin} title="Headquarters" detail="Madanapalle, Andhra Pradesh" />
                                <InfoRow icon={Mail} title="Email Address" detail="info@gvbtech.in" />
                                <InfoRow icon={Phone} title="Phone" detail="+91 9381958045" />
                                <div className="gvb-contact-context"><Clock size={18}/><p>Email is the best way to share project context. Include what is happening today and what needs to change.</p></div>
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Project enquiry form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-3"
                    >
                        <GlassCard hoverEffect={false} className="p-6 md:p-10 !bg-white/5 backdrop-blur-3xl border-white/10">
                            <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Describe your project</h3>

                            {submissionError && <p role="alert" className="mb-5 text-amber-300">{submissionError}</p>}
                            {successMessage ? (
                                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-600 dark:text-green-400 font-medium text-lg text-center">
                                    {successMessage}
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="absolute -left-[10000px]" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" tabIndex={-1} autoComplete="off" {...register("website")} /></div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Full Name *</label>
                                            <input
                                                id="name"
                                                {...register("name")}
                                                className={`w-full bg-white/5 backdrop-blur-md border ${errors.name ? 'border-red-500' : 'border-white/10'} shadow-inner rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-gvb-cyan/50 focus:bg-white/8 transition-all`}
                                                placeholder="Enter full name"
                                            />
                                            {errors.name && <p className="text-red-400 text-xs mt-1 font-bold">{errors.name.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Email Address *</label>
                                            <input
                                                id="email"
                                                {...register("email")}
                                                type="email"
                                                className={`w-full bg-white/5 backdrop-blur-md border ${errors.email ? 'border-red-500' : 'border-white/10'} shadow-inner rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-gvb-cyan/50 focus:bg-white/8 transition-all`}
                                                placeholder="Enter email address"
                                            />
                                            {errors.email && <p className="text-red-400 text-xs mt-1 font-bold">{errors.email.message}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Phone Number</label>
                                            <input
                                                id="phone"
                                                {...register("phone")}
                                                className="w-full bg-white/5 backdrop-blur-md border border-white/10 shadow-inner rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-gvb-cyan/50 focus:bg-white/8 transition-all"
                                                placeholder="Enter phone number"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="service" className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Area of work *</label>
                                            <select
                                                id="service"
                                                {...register("service")}
                                                className={`w-full bg-[#020617] backdrop-blur-md border ${errors.service ? 'border-red-500' : 'border-white/10'} shadow-inner rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gvb-cyan/50 transition-all appearance-none cursor-pointer`}
                                            >
                                                <option value="" className="bg-[#020617] text-white/40">Choose the closest area...</option>
                                                <option value="automated-tools" className="bg-[#020617] text-white">Automation and integrations</option>
                                                <option value="dashboards" className="bg-[#020617] text-white">Data and dashboards</option>
                                                <option value="web-app" className="bg-[#020617] text-white">Custom software and web products</option>
                                                <option value="strategy" className="bg-[#020617] text-white">Technology advisory</option>
                                            </select>
                                            {errors.service && <p className="text-red-400 text-xs mt-1 font-bold">{errors.service.message}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Your Message *</label>
                                        <textarea
                                            id="message"
                                            {...register("message")}
                                            rows={5}
                                            className={`w-full bg-white/5 backdrop-blur-md border ${errors.message ? 'border-red-500' : 'border-white/10'} shadow-inner rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-gvb-cyan/50 focus:bg-white/8 transition-all resize-none`}
                                            placeholder="What are people doing today? Where does it slow down? What would a useful improvement look like?"
                                        />
                                        {errors.message && <p className="text-red-400 text-xs mt-1 font-bold">{errors.message.message}</p>}
                                    </div>

                                    <p className="text-sm text-white/55 leading-relaxed">Please avoid sharing passwords, confidential records or personal medical information in an initial enquiry. We can discuss secure document sharing if it becomes necessary.</p>
                                    <Button type="submit" size="lg" className="h-16 px-12 bg-white text-black hover:bg-white/90 border-none font-black uppercase tracking-widest shadow-2xl" disabled={isSubmitting}>
                                        {isSubmitting ? "Sending..." : "Send enquiry"}
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
            <div className="w-10 h-10 rounded-full bg-gvb-cyan/10 text-gvb-cyan flex items-center justify-center flex-shrink-0 border border-gvb-cyan/20">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">{title}</h4>
                <p className="text-white font-bold text-base md:text-lg break-words">{detail}</p>
            </div>
        </div>
    );
}
