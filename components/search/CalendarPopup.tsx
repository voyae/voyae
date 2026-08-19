"use client";

import { useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  DayPicker,
  DateRange,
} from "react-day-picker";
import "react-day-picker/dist/style.css";

interface Props {
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void;
  onClose: () => void;
}

export default function CalendarPopup({
  range,
  setRange,
  onClose,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="
      absolute
      left-1/2
      top-full
      z-50
      mt-3
      -translate-x-1/2

      w-[610px]

      rounded-[24px]
      border
      border-amber-500/30
      bg-[#101C3E]

      p-5

      shadow-[0_20px_50px_rgba(0,0,0,.4)]
      backdrop-blur-xl
      animate-in
      fade-in
      zoom-in-95
      duration-200
      "
    >
      <DayPicker
        mode="range"
        numberOfMonths={2}
        pagedNavigation
        fixedWeeks
        showOutsideDays={false}
        defaultMonth={new Date()}
        disabled={{
          before: new Date(),
        }}
        min={1}
        selected={range}
        onSelect={(value) => {
          setRange(value);

          if (value?.from && value?.to) {
            setTimeout(() => {
              onClose();
            }, 180);
          }
        }}
        className="voyae-calendar text-slate-100 relative"
        classNames={{
          months: "flex justify-between gap-10",
          month: "w-[260px]",
          caption:
            "flex items-center justify-between mb-3 px-2 text-slate-100 relative",
          caption_label:
            "text-base font-semibold text-slate-100 mx-auto",
          nav: "flex items-center justify-between absolute inset-x-0 top-0 px-1 pointer-events-none z-10",
          button_previous:
            "flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-800 text-slate-300 transition-colors pointer-events-auto",
          button_next:
            "flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-800 text-slate-300 transition-colors pointer-events-auto",
          weekdays:
            "grid grid-cols-7 mb-1.5",
          weekday:
            "text-center text-[10px] uppercase tracking-wider text-amber-400/80 font-medium",
          week: "grid grid-cols-7",
          day: "h-8 w-8 mx-auto rounded-full text-xs font-medium hover:bg-amber-500/20 text-slate-200 transition-colors flex items-center justify-center",
          selected:
            "bg-amber-500 text-slate-950 font-semibold hover:bg-amber-500",
          range_start:
            "bg-amber-500 text-slate-950 font-semibold rounded-l-full rounded-r-none",
          range_end:
            "bg-amber-500 text-slate-950 font-semibold rounded-r-full rounded-l-none",
          range_middle:
            "bg-amber-500/20 text-amber-200 rounded-none",
          today:
            "border border-amber-400 text-amber-300",
        }}
        components={{
          Chevron: ({ orientation }) =>
            orientation === "left" ? (
              <ChevronLeft size={16} />
            ) : (
              <ChevronRight size={16} />
            ),
        }}
      />

      <div className="mt-4 flex items-center justify-between border-t border-amber-500/20 pt-3 px-1">
        <div>
          {range?.from && range?.to ? (
            <>
              <p className="text-xs font-semibold text-slate-100">
                Dates selected
              </p>
              <p className="text-[11px] text-slate-400">
                You can change your stay anytime.
              </p>
            </>
          ) : (
            <>
              <p className="text-xs font-semibold text-slate-100">
                Select your stay
              </p>
              <p className="text-[11px] text-slate-400">
                Choose check-in and check-out dates.
              </p>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="
          rounded-full
          bg-amber-500
          px-4
          py-2
          text-xs
          font-semibold
          text-slate-950
          transition
          hover:bg-amber-400
          shadow-md
          "
        >
          Done
        </button>
      </div>
    </div>
  );
}