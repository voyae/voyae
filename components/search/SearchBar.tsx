"use client";

import { useSearch } from "@/hooks/useSearch";

import DestinationField from "./DestinationField";
import DateRangeField from "./DateRangeField";
import GuestsField from "./GuestsField";
import SearchButton from "./SearchButton";

export default function SearchBar() {
  const { search } = useSearch();

  return (
    <div
      className="
      rounded-[30px]
      border
      border-neutral-200
      bg-white/95
      backdrop-blur-xl
      p-2
      shadow-[0_25px_70px_rgba(0,0,0,.12)]
      "
    >
      <div
        className="
        grid
        grid-cols-1
        divide-y
        divide-neutral-200

        lg:grid-cols-[2fr_1.35fr_1.15fr_220px]
        lg:divide-x
        lg:divide-y-0
        "
      >
        <DestinationField />

        <DateRangeField />

        <GuestsField />

        <SearchButton
          destination={search.destination}
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          guests={search.guests}
        />
      </div>
    </div>
  );
}