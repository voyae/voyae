"use client";

import { useEffect, useState } from "react";

import Hero from "@/components/home/hero";
import Destinations from "@/components/home/Destinations";
import Experiences from "@/components/home/Experiences";
import Testimonials from "@/components/home/Testimonials";
import Footer from "@/components/home/Footer";
import AIConcierge from "@/components/home/AIConcierge";
import LoadingScreen from "@/components/home/LoadingScreen";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="w-full overflow-x-hidden bg-[#0A1128]">
      <LoadingScreen loading={loading} />

      {!loading && (
        <div className="flex flex-col w-full">
          {/* Hero & Destinations Arası */}
          <Hero />
          
          <div className="relative w-full py-10 sm:py-16 flex items-center justify-center pointer-events-none">
            <div className="absolute inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="relative h-1.5 w-1.5 rounded-full bg-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
          </div>

          <Destinations />

          {/* Destinations & Experiences Arası */}
          <div className="relative w-full py-10 sm:py-16 flex items-center justify-center pointer-events-none">
            <div className="absolute inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="relative h-1.5 w-1.5 rounded-full bg-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
          </div>

          <Experiences />

          {/* Experiences & AIConcierge Arası */}
          <div className="relative w-full py-10 sm:py-16 flex items-center justify-center pointer-events-none">
            <div className="absolute inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="relative h-1.5 w-1.5 rounded-full bg-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
          </div>

          <AIConcierge />

          {/* AIConcierge & Testimonials Arası */}
          <div className="relative w-full py-10 sm:py-16 flex items-center justify-center pointer-events-none">
            <div className="absolute inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="relative h-1.5 w-1.5 rounded-full bg-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
          </div>

          <Testimonials />

          {/* Testimonials & Footer Arası */}
          <div className="relative w-full py-10 sm:py-16 flex items-center justify-center pointer-events-none">
            <div className="absolute inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="relative h-1.5 w-1.5 rounded-full bg-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
          </div>

          <Footer />
        </div>
      )}
    </main>
  );
}