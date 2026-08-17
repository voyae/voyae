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
      mt-4
      -translate-x-1/2

      w-[640px]

      rounded-[26px]
      border
      border-neutral-200
      bg-white

      p-5

      shadow-[0_25px_70px_rgba(0,0,0,.14)]
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
        className="voyae-calendar"
        classNames={{
          months: "flex gap-8",
          month: "w-[250px]",
          caption:
            "flex items-center justify-between mb-4 px-1",
          caption_label:
            "text-lg font-semibold",
          nav: "flex gap-2",
          button_previous:
            "flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-100",
          button_next:
            "flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-100",
          weekdays:
            "grid grid-cols-7 mb-2",
          weekday:
            "text-center text-[11px] uppercase tracking-wide text-neutral-400 font-medium",
          week: "grid grid-cols-7",
          day: "h-9 w-9 rounded-full text-sm font-medium hover:bg-emerald-50",
          selected:
            "bg-emerald-600 text-white hover:bg-emerald-600",
          range_start:
            "bg-emerald-600 text-white",
          range_end:
            "bg-emerald-600 text-white",
          today:
            "border border-emerald-500",
        }}
        components={{
          Chevron: ({ orientation }) =>
            orientation === "left" ? (
              <ChevronLeft size={18} />
            ) : (
              <ChevronRight size={18} />
            ),
        }}
      />

      <div className="mt-5 flex items-center justify-between border-t pt-4">
        <div>
          {range?.from && range?.to ? (
            <>
              <p className="text-sm font-semibold text-neutral-900">
                Dates selected
              </p>
              <p className="text-xs text-neutral-500">
                You can change your stay anytime.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-neutral-900">
                Select your stay
              </p>
              <p className="text-xs text-neutral-500">
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
          bg-emerald-600
          px-5
          py-2.5
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-emerald-700
          "
        >
          Done
        </button>
      </div>
    </div>
  );
}