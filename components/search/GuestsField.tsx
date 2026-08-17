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
    <div className="relative border-l border-neutral-200">

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
          hover:bg-neutral-50
        "
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
          <Users
            size={22}
            className="text-emerald-700"
          />
        </div>

        <div className="flex-1">

          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-400">
            Guests
          </p>

          <p className="mt-1 text-lg font-semibold text-neutral-900">
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