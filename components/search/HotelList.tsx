"use client";

import HotelCard from "./HotelCard";
import { HotelCard as Hotel } from "@/lib/hotelMapper";

interface Props {
  hotels: Hotel[];

  loading?: boolean;
}

export default function HotelList({
  hotels,
  loading = false,
}: Props) {
  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="
            h-[260px]
            animate-pulse
            rounded-3xl
            border
            border-neutral-200
            bg-neutral-100
            "
          />
        ))}
      </div>
    );
  }

  if (!hotels.length) {
    return (
      <div
        className="
        flex
        min-h-[400px]
        flex-col
        items-center
        justify-center

        rounded-3xl
        border
        border-dashed
        border-neutral-300

        bg-white

        text-center
        "
      >
        <h2 className="text-3xl font-bold">
          No hotels found
        </h2>

        <p className="mt-3 max-w-md text-neutral-500">
          Try changing your destination,
          travel dates or number of guests.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
        />
      ))}
    </div>
  );
}