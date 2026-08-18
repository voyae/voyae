"use client";

import { motion } from "framer-motion";
import SearchBar from "@/components/search/SearchBar";

export default function Hero() {
  return (
    <section
      id="discover"
      className="relative overflow-visible bg-[#0A1128]"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=100')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0A1128]/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/30 via-transparent to-[#0A1128]" />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-[15%] rounded-full bg-amber-500/15 blur-[180px] pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-20 mx-auto flex min-h-screen w-[92%] max-w-[1550px] items-center justify-between pt-36 pb-72">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[760px]"
        >
          <span className="inline-flex rounded-full border border-amber-500/30 bg-[#101C3E]/90 px-6 py-3 text-[13px] tracking-[0.35em] text-amber-400 backdrop-blur-xl shadow-md">
            LUXURY TRAVEL • AI CONCIERGE
          </span>

          <h1 className="mt-10 font-display text-[82px] font-medium leading-[0.9] tracking-[-0.04em] text-white xl:text-[98px]">
            Travel,
            <br />
            Reimagined.
          </h1>

          <p className="mt-9 max-w-[620px] text-[20px] leading-[1.9] text-slate-200">
            Discover extraordinary destinations, private experiences and
            intelligent travel planning crafted for modern explorers.
          </p>

          <div className="mt-12 flex flex-wrap gap-5">
            <button className="rounded-full bg-amber-500 hover:bg-amber-400 px-9 py-4 text-base font-bold text-slate-950 transition-all hover:scale-105 shadow-lg cursor-pointer">
              Explore Destinations
            </button>

            <button className="rounded-full border border-slate-700 bg-[#101C3E]/90 px-9 py-4 text-base text-white backdrop-blur-xl transition-all hover:bg-[#1E293B] hover:border-amber-500/50 cursor-pointer shadow-md">
              Watch Story
            </button>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hidden w-[360px] rounded-[34px] border border-slate-700 bg-[#101C3E]/95 p-9 backdrop-blur-2xl xl:block shadow-2xl"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-amber-400 font-bold">
            Featured Escape
          </p>

          <h3 className="mt-5 font-display text-[50px] leading-none text-white">
            Maldives
          </h3>

          <p className="mt-5 text-[17px] leading-8 text-slate-300">
            Crystal-clear lagoons, private villas, yacht cruises and Michelin
            dining surrounded by paradise.
          </p>

          <div className="mt-10 flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400 font-medium">
                Starting From
              </p>

              <h4 className="mt-2 text-[40px] font-extrabold text-white">
                $4,900
              </h4>
            </div>

            <button className="rounded-full bg-amber-500 hover:bg-amber-400 px-7 py-3 font-bold text-slate-950 transition-all hover:scale-105 shadow-md cursor-pointer">
              View →
            </button>
          </div>
        </motion.div>
      </div>

      {/* SEARCH BAR */}
      <div className="absolute left-1/2 bottom-0 z-40 w-[92%] max-w-[1550px] -translate-x-1/2 translate-y-1/2">
        <SearchBar />
      </div>
    </section>
  );
}