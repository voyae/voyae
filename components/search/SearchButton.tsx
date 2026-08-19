"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { format } from "date-fns";

interface Props {
  destination: {
    name: string;
    fullName: string;
    latitude: number;
    longitude: number;
    countryCode: string;
  } | null;

  checkIn?: Date;
  checkOut?: Date;

  guests: {
    adults: number;
    children: number[];
    rooms: number;
    pets: boolean;
  };
}

export default function SearchButton({
  destination,
  checkIn,
  checkOut,
  guests,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleSearch() {
    if (!destination) {
      alert("Please select a destination.");
      return;
    }

    if (!checkIn || !checkOut) {
      alert("Please select your travel dates.");
      return;
    }

    setLoading(true);

    const params = new URLSearchParams();
    params.set("destination", destination.name);
    params.set("fullName", destination.fullName);
    params.set("lat", destination.latitude.toString());
    params.set("lng", destination.longitude.toString());
    params.set("countryCode", destination.countryCode);
    params.set("checkIn", format(checkIn, "yyyy-MM-dd"));
    params.set("checkOut", format(checkOut, "yyyy-MM-dd"));
    params.set("adults", guests.adults.toString());
    params.set("children", guests.children.join(","));
    params.set("rooms", guests.rooms.toString());
    params.set("pets", guests.pets ? "1" : "0");

    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="flex items-center p-1">
      <button
        type="button"
        onClick={handleSearch}
        disabled={loading}
        className="
          flex
          h-[58px]
          px-8
          w-full
          lg:w-auto
          items-center
          justify-center
          gap-2.5
          rounded-2xl
          bg-amber-500
          text-base
          font-medium
          text-black
          transition-all
          duration-300
          hover:scale-[1.02]
          hover:bg-amber-400
          disabled:cursor-not-allowed
          disabled:opacity-70
          shadow-lg
          shadow-amber-500/20
        "
      >
        {loading ? (
          <div
            className="
              h-5
              w-5
              animate-spin
              rounded-full
              border-2
              border-black/40
              border-t-black
            "
          />
        ) : (
          <>
            <Search size={20} strokeWidth={2.5} color="#000000" />
            <span>Search</span>
          </>
        )}
      </button>
    </div>
  );
}