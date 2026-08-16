"use client";

import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section
      id="discover"
      className="relative overflow-visible"
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
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[180px]" />

      {/* CONTENT */}
      <div className="relative z-20 mx-auto flex min-h-screen w-[92%] max-w-[1550px] items-center justify-between pt-36 pb-72">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .9 }}
          className="max-w-[760px]"
        >
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-6 py-3 text-[13px] tracking-[0.35em] text-white backdrop-blur-xl">
            LUXURY TRAVEL • AI CONCIERGE
          </span>

          <h1 className="mt-10 font-display text-[82px] font-medium leading-[0.9] tracking-[-0.04em] text-white xl:text-[98px]">
            Travel,
            <br />
            Reimagined.
          </h1>

          <p className="mt-9 max-w-[620px] text-[20px] leading-[1.9] text-white/82">
            Discover extraordinary destinations, private experiences and
            intelligent travel planning crafted for modern explorers.
          </p>

          <div className="mt-12 flex flex-wrap gap-5">
            <button className="rounded-full bg-white px-9 py-4 text-base font-semibold text-black transition hover:scale-105">
              Explore Destinations
            </button>

            <button className="rounded-full border border-white/20 bg-white/10 px-9 py-4 text-base text-white backdrop-blur-xl transition hover:bg-white/20">
              Watch Story
            </button>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: .35, duration: .8 }}
          className="hidden w-[360px] rounded-[34px] border border-white/20 bg-white/10 p-9 backdrop-blur-2xl xl:block"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">
            Featured Escape
          </p>

          <h3 className="mt-5 font-display text-[50px] leading-none text-white">
            Maldives
          </h3>

          <p className="mt-5 text-[17px] leading-8 text-white/75">
            Crystal-clear lagoons, private villas, yacht cruises and Michelin
            dining surrounded by paradise.
          </p>

          <div className="mt-10 flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">
                Starting From
              </p>

              <h4 className="mt-2 text-[40px] font-bold text-white">
                $4,900
              </h4>
            </div>

            <button className="rounded-full bg-white px-7 py-3 font-semibold text-black transition hover:scale-105">
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