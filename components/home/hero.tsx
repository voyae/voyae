"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchBar from "@/components/search/SearchBar";
import { useLanguageCurrency } from "@/hooks/useLanguageCurrency";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, formatPrice } = useLanguageCurrency();

  const featuredEscapes = [
    {
      title: t("maldivesCardTitle"),
      description: t("heroMaldivesDesc"),
      priceNum: 4900,
    },
    {
      title: t("santoriniCardTitle"),
      description: t("heroSantoriniDesc"),
      priceNum: 3800,
    },
    {
      title: t("boraBoraCardTitle"),
      description: t("heroBoraBoraDesc"),
      priceNum: 5500,
    },
    {
      title: t("swissAlpsCardTitle"),
      description: t("heroSwissAlpsDesc"),
      priceNum: 4200,
    },
  ];

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
      className="relative flex flex-col justify-between min-h-[92vh] bg-[#0A1128] pt-20 sm:pt-24 pb-16 overflow-visible"
    >
      {/* Background - Lüks Sahil ve Tatil Manzarası */}
      <div
        className="absolute inset-0 bg-cover bg-center bottom-12"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=100')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bottom-12 bg-[#070D1F]/60 sm:bg-[#070D1F]/50" />
      <div className="absolute inset-0 bottom-12 bg-gradient-to-b from-[#070D1F]/60 via-transparent to-[#0A1128]" />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] sm:h-[600px] sm:w-[600px] -translate-x-1/2 -translate-y-[20%] rounded-full bg-amber-500/15 blur-[100px] sm:blur-[160px] pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-20 mx-auto flex w-[92%] max-w-[1550px] flex-col xl:flex-row items-center justify-between my-auto gap-8 xl:gap-0">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[760px] text-center xl:text-left"
        >
          <span className="inline-flex rounded-full border border-amber-500/30 bg-[#070D1F]/60 px-4 py-1.5 sm:px-6 sm:py-2.5 text-[10px] sm:text-[12px] tracking-[0.25em] sm:tracking-[0.35em] text-amber-400 backdrop-blur-xl shadow-md">
            {t("heroBadge")}
          </span>

          <h1 className="mt-4 sm:mt-8 font-display text-3xl xs:text-4xl sm:text-[72px] font-medium leading-[1.1] sm:leading-[0.95] tracking-[-0.04em] text-white xl:text-[84px]">
            {t("heroTitleLine1")}
            <br />
            {t("heroTitleLine2")}
          </h1>

          <p className="mt-3 sm:mt-7 mx-auto xl:mx-0 max-w-[620px] text-xs sm:text-[18px] leading-[1.6] sm:leading-[1.8] text-slate-200 px-2 sm:px-0">
            {t("heroSubtitle")}
          </p>

          <div className="mt-5 sm:mt-10 flex flex-col sm:flex-row justify-center xl:justify-start gap-3 sm:gap-4">
            <button className="w-full sm:w-auto rounded-full bg-amber-500 hover:bg-amber-400 px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-bold text-slate-950 transition-all hover:scale-105 shadow-lg shadow-amber-500/20 cursor-pointer">
              {t("exploreDestinations")}
            </button>

            <button className="w-full sm:w-auto rounded-full border border-slate-700 bg-[#070D1F]/60 px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base text-white backdrop-blur-xl transition-all hover:bg-[#1E293B]/80 hover:border-amber-500/50 cursor-pointer shadow-md">
              {t("watchStory")}
            </button>
          </div>
        </motion.div>

        {/* RIGHT - MOBİLDE KÜÇÜLTÜLMÜŞ VE DÜZGÜN HİZALANMIŞ SLİDER KART */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1 
          }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full sm:w-[380px] rounded-[24px] sm:rounded-[30px] border border-amber-500/40 bg-[#070D1F]/60 sm:bg-[#070D1F]/40 p-5 sm:p-8 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative overflow-hidden"
        >
          {/* Üst Kısım: Başlık ve Değiştirme Okları */}
          <div className="flex items-center justify-between">
            <p className="text-[9px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-amber-400 font-bold">
              {t("featuredEscapeText")} ({currentIndex + 1}/{featuredEscapes.length})
            </p>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={handlePrev}
                className="rounded-full border border-white/20 bg-[#070D1F]/80 p-2 text-slate-200 transition hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 cursor-pointer backdrop-blur-md active:scale-95"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={handleNext}
                className="rounded-full border border-white/20 bg-[#070D1F]/80 p-2 text-slate-200 transition hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 cursor-pointer backdrop-blur-md active:scale-95"
              >
                <ChevronRight size={14} />
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
              transition={{ duration: 0.25 }}
            >
              <h3 className="mt-2.5 sm:mt-4 font-display text-2xl sm:text-[42px] leading-tight sm:leading-none text-white drop-shadow-md">
                {currentEscape.title}
              </h3>

              <p className="mt-2 sm:mt-4 text-xs sm:text-[15px] leading-relaxed sm:leading-7 text-slate-200 min-h-[50px] sm:min-h-[85px] drop-shadow-sm">
                {currentEscape.description}
              </p>

              <div className="mt-4 sm:mt-8 flex items-end justify-between border-t border-white/15 pt-3 sm:pt-5">
                <div>
                  <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-slate-300 font-medium">
                    {t("startingFrom")}
                  </p>

                  <h4 className="mt-0.5 text-2xl sm:text-[32px] font-extrabold text-white drop-shadow-md">
                    {formatPrice(currentEscape.priceNum)}
                  </h4>
                </div>

                <button className="rounded-full bg-amber-500 hover:bg-amber-400 px-4 sm:px-6 py-2 sm:py-2.5 font-bold text-slate-950 transition-all hover:scale-105 shadow-lg shadow-amber-500/30 cursor-pointer text-xs sm:text-sm">
                  {t("viewButton")}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* SEARCH BAR - Fotoğrafın tam bittiği sınıra oturtuldu */}
      {/* SEARCH BAR - Mobilde düzgün akacak, masaüstünde eski konumunda kalacak */}
      <div className="relative z-30 mx-auto w-[92%] max-w-[1550px] mt-10 sm:-mb-60 sm:mt-0 overflow-visible">
        <SearchBar />
      </div>
    </section>
  );
}