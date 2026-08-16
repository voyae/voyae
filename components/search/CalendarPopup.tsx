"use client";

import { DayPicker, DateRange } from "react-day-picker";
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
  return (
    <div
      className="
      absolute
      left-1/2
      top-full
      z-50
      mt-5
      -translate-x-1/2

      w-[760px]

      rounded-[22px]
      border
      border-neutral-200
      bg-white
      p-8
      shadow-[0_30px_90px_rgba(0,0,0,.12)]
      "
    >
      <DayPicker
        mode="range"
        numberOfMonths={2}
        pagedNavigation
        fixedWeeks
        showOutsideDays={false}
        disabled={{
            before: new Date(),
          }}
        selected={range}
        onSelect={(value) => {
          setRange(value);

          if (value?.from && value?.to) {
            setTimeout(onClose, 200);
          }
        }}
        className="voyae-calendar"
      />
    </div>
  );
}