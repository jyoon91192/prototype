import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Personalized Learning OS",
  description:
    "Plan, learn, and showcase your AI-driven learning journey with personalized roadmaps, notebooks, and portfolios.",
  metadataBase: new URL("https://ai-learning-os.prototype"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100`}
      >
        <div className="relative min-h-screen overflow-hidden">
          <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,224,184,0.18),_transparent_60%)]" />
          <div className="pointer-events-none fixed inset-y-0 right-[-20%] w-1/2 bg-[radial-gradient(circle,_rgba(56,189,248,0.18),_transparent_60%)] blur-3xl" />
          <main className="relative z-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
