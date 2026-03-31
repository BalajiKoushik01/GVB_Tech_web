import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ChatWidget } from "@/components/ui/ChatWidget";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AnimatedMeshBackground } from "@/components/animations/AnimatedMeshBackground";
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
  title: "GVB Tech Solutions | Engineering Tomorrow's Solutions",
  description: "Elite proprietary trading systems, enterprise software development, algorithmic solutions, and strategic growth consulting.",
  keywords: "proprietary trading software, algorithmic trading, enterprise software development, digital transformation, next js, react, tech consultancy",
  openGraph: {
    title: "GVB Tech Solutions",
    description: "Engineering tomorrow's solutions. Elite proprietary trading and enterprise software development.",
    url: "https://gvbtech.example.com",
    siteName: "GVB Tech Solutions",
    locale: "en_IN",
    type: "website",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${jetbrainsMono.variable} antialiased min-h-[100dvh] flex flex-col text-slate-800 selection:bg-gvb-blue/20 selection:text-gvb-deep`}>
          <AnimatedMeshBackground />
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <ChatWidget />
          <CustomCursor />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
