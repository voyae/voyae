"use client";

import { Search } from "lucide-react";

export default function SearchButton() {
  return (
    <div className="flex items-center p-2">

      <button className="flex h-[72px] w-full items-center justify-center gap-3 rounded-2xl bg-emerald-700 text-lg font-semibold text-white transition duration-300 hover:bg-emerald-800 hover:scale-[1.02]">

        <Search size={22} />

        Search

      </button>

    </div>
  );
}