"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchBar from "@/components/search/SearchBar";

const featuredEscapes = [
  {
    title: "Maldives",
    description: "Crystal-clear lagoons, private villas, yacht cruises and Michelin dining surrounded by paradise.",
    price: "$4,900",
  },
  {
    title: "Santorini",
    description: "Cliffside whitewashed villas, breathtaking Caldera sunsets, and private wine-tasting experiences.",
    price: "$3,800",
  },
  {
    title: "Bora Bora",
    description: "Overwater bungalows, vibrant coral reefs, and ultimate Polynesian luxury and privacy.",
    price: "$5,500",
  },
  {
    title: "Swiss Alps",
    description: "Exclusive ski chalets, helicopter tours, thermal spa retreats, and world-class alpine luxury.",
    price: "$4,200",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredEscapes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredEscapes.length) % featuredEscapes.length);
  };

  const currentEscape = featuredEscapes[currentIndex];

  return (
    <section
      id="discover"
      className="relative overflow-x-hidden bg-[#0A1128]"
    >
      {/* Background - Lüks Sahil ve Tatil Manzarası */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=100')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#070D1F]/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070D1F]/40 via-transparent to-[#0A1128]" />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] sm:h-[700px] sm:w-[700px] -translate-x-1/2 -translate-y-[15%] rounded-full bg-amber-500/15 blur-[120px] sm:blur-[180px] pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-20 mx-auto flex min-h-screen w-[92%] max-w-[1550px] flex-col xl:flex-row items-center justify-between pt-28 pb-48 xl:pt-36 xl:pb-72">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[760px] text-center xl:text-left"
        >
          <span className="inline-flex rounded-full border border-amber-500/30 bg-[#070D1F]/60 px-5 py-2.5 sm:px-6 sm:py-3 text-[11px] sm:text-[13px] tracking-[0.3em] sm:tracking-[0.35em] text-amber-400 backdrop-blur-xl shadow-md">
            BESPOKE VOYAGES • AI-POWERED LUXURY
          </span>

          <h1 className="mt-6 sm:mt-10 font-display text-5xl sm:text-[78px] font-medium leading-[1] sm:leading-[0.95] tracking-[-0.04em] text-white xl:text-[92px]">
            Stop searching,
            <br />
            start traveling.
          </h1>

          <p className="mt-6 sm:mt-9 mx-auto xl:mx-0 max-w-[620px] text-base sm:text-[20px] leading-[1.8] sm:leading-[1.9] text-slate-200">
            Voyae plans the trip, you live the experience.
          </p>

          <div className="mt-8 sm:mt-12 flex flex-wrap justify-center xl:justify-start gap-4 sm:gap-5">
            <button className="w-full sm:w-auto rounded-full bg-amber-500 hover:bg-amber-400 px-8 py-3.5 sm:px-9 sm:py-4 text-base font-bold text-slate-950 transition-all hover:scale-105 shadow-lg shadow-amber-500/20 cursor-pointer">
              Explore Destinations
            </button>

            <button className="w-full sm:w-auto rounded-full border border-slate-700 bg-[#070D1F]/60 px-8 py-3.5 sm:px-9 sm:py-4 text-base text-white backdrop-blur-xl transition-all hover:bg-[#1E293B]/80 hover:border-amber-500/50 cursor-pointer shadow-md">
              Watch Story
            </button>
          </div>
        </motion.div>

        {/* RIGHT - CAM EFEKTLİ SLİDER KART (Mobilde ve Masaüstünde Pürüzsüz) */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1 
          }}
          transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 xl:mt-0 w-full sm:w-[380px] rounded-[34px] border border-amber-500/40 bg-[#070D1F]/40 p-7 sm:p-9 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* Üst Kısım: Başlık ve Değiştirme Okları */}
          <div className="flex items-center justify-between">
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] text-amber-400 font-bold">
              Featured Escape ({currentIndex + 1}/{featuredEscapes.length})
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="rounded-full border border-white/20 bg-[#070D1F]/60 p-2 text-slate-200 transition hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 cursor-pointer backdrop-blur-md active:scale-95"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="rounded-full border border-white/20 bg-[#070D1F]/60 p-2 text-slate-200 transition hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 cursor-pointer backdrop-blur-md active:scale-95"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* İçerik Değişim Animasyonu */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="mt-4 sm:mt-5 font-display text-[38px] sm:text-[46px] leading-none text-white drop-shadow-md">
                {currentEscape.title}
              </h3>

              <p className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] leading-7 sm:leading-8 text-slate-200 min-h-[80px] sm:min-h-[96px] drop-shadow-sm">
                {currentEscape.description}
              </p>

              <div className="mt-8 sm:mt-10 flex items-end justify-between border-t border-white/15 pt-5 sm:pt-6">
                <div>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-slate-300 font-medium">
                    Starting From
                  </p>

                  <h4 className="mt-1.5 sm:mt-2 text-[30px] sm:text-[36px] font-extrabold text-white drop-shadow-md">
                    {currentEscape.price}
                  </h4>
                </div>

                <button className="rounded-full bg-amber-500 hover:bg-amber-400 px-6 sm:px-7 py-2.5 sm:py-3 font-bold text-slate-950 transition-all hover:scale-105 shadow-lg shadow-amber-500/30 cursor-pointer text-sm sm:text-base">
                  View →
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* SEARCH BAR (Mobilde ve Masaüstünde Taşma Yapmayan Konumlandırma) */}
      <div className="absolute left-1/2 bottom-0 z-40 w-[92%] max-w-[1550px] -translate-x-1/2 translate-y-1/2">
        <SearchBar />
      </div>
    </section>
  );
}