import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomerSurveyPopup from "../components/CustomerSurveyPopup";
import SovereignSanctuaryBadge from "../components/SovereignSanctuaryBadge";
import SOVRAHeader from "../components/SOVRAHeader";
import SOVRAFooter from "../components/SOVRAFooter";
import ComplianceBanner from "../components/legal/ComplianceBanner";
import { InstitutionalErrorBoundary } from "../components/error/InstitutionalErrorBoundary";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XORAS | Sovereign Institutional Command (v15.0_Ω)",
  description: "XORAS Autonomous Intelligence. Global asset orchestration, sovereign protocol, and 512-bit PQ institutional finality.",
  openGraph: {
    title: "SOVRA Sovereign — Institutional Architecture",
    description: "The definitive standard for autonomous operational excellence.",
    images: ["/assets/hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/hero.png"],
  },
  other: {
    "p:domain_verify": "b281f6b1f5d403c73a858ac633a30042",
    "pinterest-site-verification": "b281f6b1f5d403c73a858ac633a30042",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#020205] text-white selection:bg-[#cd9d3f]/30 selection:text-white">
        <InstitutionalErrorBoundary>
          <SOVRAHeader />
          <main className="relative">
            {children}
          </main>
          <SOVRAFooter />
          <ComplianceBanner />
          <CustomerSurveyPopup />
          <SovereignSanctuaryBadge />
        </InstitutionalErrorBoundary>
      </body>
    </html>
  );
}
