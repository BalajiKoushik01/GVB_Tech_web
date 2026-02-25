import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ChatWidget } from "@/components/ui/ChatWidget";
import { AnimatedMeshBackground } from "@/components/animations/AnimatedMeshBackground";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AnimatedMeshBackground />
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
