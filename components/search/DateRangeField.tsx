"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { DateRange } from "react-day-picker";
import { differenceInCalendarDays, format } from "date-fns";

import CalendarPopup from "./CalendarPopup";

export default function DateRangeField() {
  const [open, setOpen] = useState(false);

  const [range, setRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const nights =
    range.from && range.to
      ? differenceInCalendarDays(range.to, range.from)
      : 0;

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="flex h-[88px] w-full items-center gap-4 rounded-2xl px-6 text-left transition hover:bg-neutral-50"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
          <Calendar
            size={22}
            className="text-emerald-700"
          />
        </div>

        <div>

          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-400">
            Dates
          </p>

          {!range.from && (
            <p className="mt-1 text-lg font-semibold">
              Add dates
            </p>
          )}

          {range.from && !range.to && (
            <p className="mt-1 text-lg font-semibold">
              {format(range.from, "MMM d")} · Select checkout
            </p>
          )}

          {range.from && range.to && (
            <div>

              <p className="text-lg font-semibold">
                {format(range.from, "MMM d")} — {format(range.to, "MMM d")}
              </p>

              <p className="text-sm text-neutral-500">
                {nights} {nights === 1 ? "night" : "nights"}
              </p>

            </div>
          )}

        </div>

      </button>

      {open && (
        <CalendarPopup
          range={range}
          setRange={setRange}
          onClose={() => setOpen(false)}
        />
      )}

    </div>
  );
}