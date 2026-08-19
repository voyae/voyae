"use client";

import { useEffect, useRef, useState } from "react";
import { Users } from "lucide-react";

import { useSearch } from "@/hooks/useSearch";
import GuestsPopup from "./GuestsPopup";

export default function GuestsField() {
  const { search } = useSearch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const adults = search.guests.adults;
  const children = search.guests.children.length;
  const rooms = search.guests.rooms;

  const guestCount = adults + children;

  /* ---------------- Click / Touch Outside (Mobilde popup'ın dışına basınca kapanması için) ---------------- */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex
          min-h-[76px]
          lg:h-[88px]
          w-full
          items-center
          gap-3
          sm:gap-4
          rounded-2xl
          px-4
          sm:px-6
          text-left
          transition
          bg-transparent
          hover:bg-slate-800/60
          cursor-pointer
        "
      >
        <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
          <Users
            size={22}
            className="text-amber-400"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.3em] text-amber-400/90">
            Guests
          </p>

          <p className="mt-0.5 text-sm sm:text-base font-medium text-slate-100 truncate">
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