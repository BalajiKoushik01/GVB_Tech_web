import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { FloatingWidgets } from "@/components/ui/FloatingWidgets";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GVB Tech Solutions | Software & Automation Consultancy",
  description: "Custom automated tools, interactive analytics dashboards, high-performance web systems, and data-driven strategy consulting.",
  keywords: "software consultancy, automated tools, AI workflows, analytics dashboards, web development, app development, technology strategy, ISRO, Mu Sigma, GVB Tech",
  openGraph: {
    title: "GVB Tech Solutions | Software & Automation Consultancy",
    description: "Engineering precision systems — custom automation, web platforms, dashboards, and technology consultation.",
    url: "https://gvbtech.in",
    siteName: "GVB Tech Solutions",
    locale: "en_IN",
    type: "website",
  },
  robots: "index, follow",
};

import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { NebulaBackground } from "@/components/animations/NebulaBackground";

import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { MarketDashboard } from "@/components/ui/MarketDashboard";
import { RocketMotion } from "@/components/animations/RocketMotion";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${jetbrainsMono.variable} antialiased min-h-[100dvh] flex flex-col text-white bg-[#020617] selection:bg-white selection:text-black overflow-x-hidden`}>
        {/* Progress Bar */}
        <ScrollProgressBar />
        <SmoothScrollProvider>
          <NebulaBackground />
          <Header />
          <div className="pt-[72px] md:pt-[80px]">
            <MarketDashboard />
          </div>
          <main className="flex-1 relative z-10">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <FloatingWidgets />
          <CustomCursor />
          <Analytics />
          <SpeedInsights />
          <RocketMotion />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
