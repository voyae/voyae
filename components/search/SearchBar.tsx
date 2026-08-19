"use client";

import { useSearch } from "@/hooks/useSearch";
import DestinationField from "./DestinationField";
import DateRangeField from "./DateRangeField";
import GuestsField from "./GuestsField";
import SearchButton from "./SearchButton";

export default function SearchBar() {
  const { search } = useSearch();

  return (
    <div className="relative group w-full max-w-6xl mx-auto z-40 px-2 sm:px-0">
      {/* 1. Arka Plan Işıltı Efekti */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-amber-400 rounded-[34px] blur-md opacity-30 group-hover:opacity-60 transition duration-1000 pointer-events-none"></div>
      
      {/* 2. Ana Konteyner - Mobilde dikey akış ve dokunma optimizasyonu */}
      <div className="relative flex flex-col lg:flex-row items-center gap-2.5 bg-[#101C3E]/95 p-3 sm:p-2.5 rounded-[32px] border border-amber-500/40 shadow-2xl backdrop-blur-xl
        /* Genel Metin ve Input Renkleri */
        [&_input]:!bg-transparent [&_input]:text-slate-100 [&_input]:placeholder-slate-400
        [&_p]:text-slate-100
        [&_span]:text-slate-100
        [&_label]:text-amber-400
        [&_svg]:text-amber-400
        [&_button[class*='bg-emerald']]:!bg-amber-500
        [&_button[class*='bg-emerald']:hover]:!bg-amber-400
        [&_button[class*='text-white']]:!text-slate-950
        [&_div[class*='bg-emerald']]:!bg-amber-500/20
        [&_span[class*='bg-emerald']]:!bg-amber-500">
        
        {/* Destination Kartı */}
        <div className="w-full lg:flex-1 min-w-0 p-2 sm:p-1.5 rounded-2xl bg-slate-900/60 lg:bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/60 transition-all duration-300 shadow-lg">
            <DestinationField />
        </div>
        
        {/* Dikey Çizgi 1 */}
        <div className="hidden lg:block w-[1px] h-10 bg-amber-500/30 shrink-0 mx-1" />
        
        {/* Stay Kartı */}
        <div className="w-full lg:flex-1 min-w-0 p-2 sm:p-1.5 rounded-2xl bg-slate-900/60 lg:bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/60 transition-all duration-300 shadow-lg">
            <DateRangeField />
        </div>

        {/* Dikey Çizgi 2 */}
        <div className="hidden lg:block w-[1px] h-10 bg-amber-500/30 shrink-0 mx-1" />
        
        {/* Guests Kartı */}
        <div className="w-full lg:flex-1 min-w-0 p-2 sm:p-1.5 rounded-2xl bg-slate-900/60 lg:bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/60 transition-all duration-300 shadow-lg">
            <GuestsField />
        </div>

        {/* 3. Arama Butonu - Mobilde tam genişlik ve aktif dokunma alanı */}
        <div className="w-full lg:w-auto p-1 shrink-0 mt-1 lg:mt-0">
          <div className="w-full [&>button]:w-full lg:[&>button]:w-auto [&>button]:py-3.5 lg:[&>button]:py-2.5 [&>button]:justify-center">
            <SearchButton
              destination={search.destination}
              checkIn={search.checkIn}
              checkOut={search.checkOut}
              guests={search.guests}
            />
          </div>
        </div>

      </div>
    </div>
  );
}