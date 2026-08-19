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
        <div className="flex flex-col gap-12 sm:gap-16 md:gap-24 w-full">
          <Hero />
          <Destinations />
          <Experiences />
          <AIConcierge />
          <Testimonials />
          <Footer />
        </div>
      )}
    </main>
  );
}