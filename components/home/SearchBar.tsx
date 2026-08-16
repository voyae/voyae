"use client";

import { Calendar, MapPin, Sparkles, Users } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="rounded-[34px] border border-black/5 bg-white p-3 shadow-[0_30px_90px_rgba(0,0,0,0.14)]">
      <div className="grid items-center lg:grid-cols-[1fr_1fr_1fr_320px]">

        {/* Destination */}
        <div className="flex items-center gap-5 px-8 py-6">
          <div className="rounded-2xl bg-emerald-50 p-4">
            <MapPin size={22} className="text-emerald-700" />
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-gray-400">
              Destination
            </p>

            <h4 className="mt-2 text-lg font-semibold text-gray-900">
              Featured Destinations
            </h4>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden h-14 w-px bg-gray-200 lg:block absolute" />

        {/* Date */}
        <div className="flex items-center gap-5 border-t border-gray-100 px-8 py-6 lg:border-l lg:border-t-0">
          <div className="rounded-2xl bg-emerald-50 p-4">
            <Calendar size={22} className="text-emerald-700" />
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-gray-400">
              Dates
            </p>

            <h4 className="mt-2 text-lg font-semibold text-gray-900">
              Flexible
            </h4>
          </div>
        </div>

        {/* Travelers */}
        <div className="flex items-center gap-5 border-t border-gray-100 px-8 py-6 lg:border-l lg:border-t-0">
          <div className="rounded-2xl bg-emerald-50 p-4">
            <Users size={22} className="text-emerald-700" />
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-gray-400">
              Travelers
            </p>

            <h4 className="mt-2 text-lg font-semibold text-gray-900">
              2 Guests
            </h4>
          </div>
        </div>

        {/* Button */}
        <div className="px-3 py-3">
          <button className="flex h-full w-full items-center justify-center gap-3 rounded-[24px] bg-emerald-700 py-6 text-lg font-semibold text-white transition duration-300 hover:scale-[1.02] hover:bg-emerald-800">
            <Sparkles size={20} />
            Plan with AI
          </button>
        </div>

      </div>
    </div>
  );
}