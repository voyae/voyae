"use client";

import { useState } from "react";
import { Users } from "lucide-react";

import { useSearch } from "@/hooks/useSearch";
import GuestsPopup from "./GuestsPopup";

export default function GuestsField() {
  const { search } = useSearch();

  const [open, setOpen] = useState(false);

  const adults = search.guests.adults;
  const children = search.guests.children.length;
  const rooms = search.guests.rooms;

  const guestCount = adults + children;

  return (
    <div className="relative">

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          flex
          h-[88px]
          w-full
          items-center
          gap-4
          rounded-2xl
          px-6
          text-left
          transition
          bg-transparent
          hover:bg-slate-800/60
        "
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
          <Users
            size={22}
            className="text-amber-400"
          />
        </div>

        <div className="flex-1">

          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-amber-400/90">
            Guests
          </p>

          <p className="mt-0.5 text-sm font-medium text-slate-100">
            {guestCount} Guest{guestCount !== 1 ? "s" : ""} · {rooms} Room
            {rooms !== 1 ? "s" : ""}
          </p>

        </div>

      </button>

      {open && (
        <GuestsPopup
          onClose={() => setOpen(false)}
        />
      )}

    </div>
  );
}