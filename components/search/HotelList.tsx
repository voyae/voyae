"use client";

import HotelCard from "./HotelCard";

import { HotelCard as Hotel } from "@/lib/hotelMapper";

interface Props {
  hotels: Hotel[];

  loading: boolean;
}

export default function HotelList({
  hotels,
  loading,
}: Props) {
  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 8 }).map(
          (_, index) => (
            <div
              key={index}
              className="
              h-64
              animate-pulse

              rounded-3xl

              bg-neutral-200
              "
            />
          )
        )}
      </div>
    );
  }

  if (!hotels.length) {
    return (
      <div
        className="
        flex

        h-72

        items-center
        justify-center

        rounded-3xl

        border
        border-dashed

        text-lg
        text-neutral-500
        "
      >
        No hotels found.
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