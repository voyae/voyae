"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { DateRange } from "react-day-picker";
import {
  differenceInCalendarDays,
  format,
} from "date-fns";

import { useSearch } from "@/hooks/useSearch";
import CalendarPopup from "./CalendarPopup";

export default function DateRangeField() {
  const { setSearch } = useSearch();

  const [open, setOpen] = useState(false);

  const [range, setRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  function handleRange(value: DateRange | undefined) {
    if (!value) return;

    // Booking davranışı:
    // Yeni tarih seçmeye başlanırsa eski seçim temizlenir.
    if (range.from && range.to && value.from) {
      const newRange = {
        from: value.from,
        to: undefined,
      };

      setRange(newRange);

      setSearch((prev) => ({
        ...prev,
        checkIn: newRange.from,
        checkOut: undefined,
      }));

      return;
    }

    setRange(value);

    setSearch((prev) => ({
      ...prev,
      checkIn: value.from,
      checkOut: value.to,
    }));
  }

  const nights =
    range.from && range.to
      ? differenceInCalendarDays(
          range.to,
          range.from
        )
      : 0;

  return (
    <div className="relative">

      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`
          flex
          h-[88px]
          w-full
          items-center
          gap-4
          rounded-2xl
          px-6
          text-left
          transition-all
          duration-300
          bg-transparent
          hover:bg-slate-800/80
          border
          ${open ? "border-amber-500/60 bg-slate-800/80 shadow-inner" : "border-transparent"}
        `}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 shadow-sm">
          <Calendar
            size={22}
            className="text-amber-400"
          />
        </div>

        <div className="flex-1">

          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-amber-400/90">
            Stay
          </p>

          {!range.from && (
            <p className="mt-1 text-lg font-semibold text-slate-400">
              Check-in — Check-out
            </p>
          )}

          {range.from && !range.to && (
            <>
              <p className="mt-1 text-lg font-semibold text-slate-100">
                {format(range.from, "MMM d")}
              </p>

              <p className="text-sm text-amber-400/80 font-medium">
                Select checkout
              </p>
            </>
          )}

          {range.from && range.to && (
            <>
              <p className="mt-1 text-lg font-semibold text-slate-100">
                {format(range.from, "MMM d")} —{" "}
                {format(range.to, "MMM d")}
              </p>

              <p className="text-sm text-slate-400">
                {nights}{" "}
                {nights === 1
                  ? "night"
                  : "nights"}
              </p>
            </>
          )}

        </div>

      </button>

      {open && (
        <CalendarPopup
          range={range}
          setRange={handleRange}
          onClose={() => setOpen(false)}
        />
      )}

    </div>
  );
}