import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL ? "https://pqt-website.vercel.app" : "http://localhost:3003");

export const metadata: Metadata = {
  title: {
    default: "Property Quest Turkey — Citizenship by Investment in Istanbul",
    template: "%s · Property Quest Turkey",
  },
  description:
    "Property Quest Turkey helps international investors buy property in Istanbul and secure Turkish citizenship by investment — from first viewing to title deed and beyond.",
  metadataBase: new URL(siteUrl),
  robots: { index: false, follow: false },
  openGraph: {
    title: "Property Quest Turkey",
    description:
      "Citizenship-by-investment real estate in Istanbul. Curated projects, end-to-end legal support, and a private client portal.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="flex min-h-screen flex-col bg-white text-ink dark:bg-dark-bg dark:text-dark-text">
        
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}