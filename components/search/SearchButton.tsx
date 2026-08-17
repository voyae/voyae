"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { format } from "date-fns";

import { useSearch } from "@/hooks/useSearch";

interface Props {
  destination: {
    name: string;
    fullName: string;
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

  const { search } = useSearch();

  const [loading, setLoading] = useState(false);

  async function handleSearch() {
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

    params.set(
      "checkIn",
      format(checkIn, "yyyy-MM-dd")
    );

    params.set(
      "checkOut",
      format(checkOut, "yyyy-MM-dd")
    );

    params.set(
      "adults",
      guests.adults.toString()
    );

    params.set(
      "children",
      guests.children.join(",")
    );

    params.set(
      "rooms",
      guests.rooms.toString()
    );

    params.set(
      "pets",
      guests.pets ? "1" : "0"
    );

    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="flex items-center p-2">

      <button
        type="button"
        onClick={handleSearch}
        disabled={loading}
        className="
        flex
        h-[72px]
        w-full
        items-center
        justify-center
        gap-3

        rounded-2xl

        bg-emerald-700

        text-lg
        font-semibold
        text-white

        transition-all
        duration-300

        hover:scale-[1.02]
        hover:bg-emerald-800

        disabled:cursor-not-allowed
        disabled:opacity-70
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
            border-white/40
            border-t-white
            "
          />
        ) : (
          <>
            <Search size={22} />
            Search
          </>
        )}
      </button>

    </div>
  );
}