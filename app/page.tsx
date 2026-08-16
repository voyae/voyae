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
    <>
      <LoadingScreen loading={loading} />

      {!loading && (
        <>
          <Hero />
          <Destinations />
          <Experiences />
          <AIConcierge />
          <Testimonials />
          <Footer />
        </>
      )}
    </>
  );
}