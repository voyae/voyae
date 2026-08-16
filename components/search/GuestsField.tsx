"use client";

import { Users } from "lucide-react";

export default function GuestsField() {
  return (
    <button className="flex h-[88px] items-center gap-4 border-l border-neutral-200 px-6 text-left transition hover:bg-neutral-50">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
        <Users size={22} className="text-emerald-700" />
      </div>

      <div>

        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-400">
          Guests
        </p>

        <p className="mt-1 text-lg font-semibold text-neutral-900">
          2 Adults · 1 Room
        </p>

      </div>

    </button>
  );
}