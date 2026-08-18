"use client";

import { useSearch } from "@/hooks/useSearch";
import DestinationField from "./DestinationField";
import DateRangeField from "./DateRangeField";
import GuestsField from "./GuestsField";
import SearchButton from "./SearchButton";

export default function SearchBar() {
  const { search } = useSearch();

  return (
    <div className="relative group w-full max-w-6xl mx-auto">
      {/* 1. Işıltılı Glow Efekti */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-[34px] blur opacity-20 group-hover:opacity-40 transition duration-1000 pointer-events-none"></div>
      
      {/* 2. Ana Konteyner */}
      <div className="relative flex flex-col lg:flex-row items-center gap-2 bg-white p-2.5 rounded-[32px] border border-neutral-200/50 shadow-2xl">
        
        {/* Destination */}
        <div className="flex-1 w-full min-w-0 p-1">
           <DestinationField />
        </div>
        
        <div className="hidden lg:block w-[1px] h-10 bg-neutral-200/60 shrink-0" />
        
        {/* DateRange (Stay) */}
        <div className="flex-1 w-full min-w-0 p-1">
           <DateRangeField />
        </div>

        <div className="hidden lg:block w-[1px] h-10 bg-neutral-200/60 shrink-0" />
        
        {/* Guests */}
        <div className="flex-1 w-full min-w-0 p-1">
           <GuestsField />
        </div>

        {/* 3. Buton: Sağa doğru ferahlatılmış modern dikdörtgen form */}
        <div className="w-full lg:w-auto p-1 shrink-0">
          <div className="[&>button]:w-full lg:[&>button]:w-auto [&>button]:px-10 [&>button]:py-4 [&>button]:rounded-2xl">
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