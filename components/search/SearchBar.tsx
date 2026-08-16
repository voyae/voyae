"use client";

import DestinationField from "./DestinationField";
import DateRangeField from "./DateRangeField";
import GuestsField from "./GuestsField";
import SearchButton from "./SearchButton";

export default function SearchBar() {
  return (
    <div className="rounded-[30px] border border-neutral-200 bg-white p-2 shadow-[0_25px_70px_rgba(0,0,0,.12)]">

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1.3fr_1.2fr_220px]">

        <DestinationField />

        <DateRangeField />

        <GuestsField />

        <SearchButton />

      </div>

    </div>
  );
}