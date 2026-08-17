"use client";

import HotelCard from "./HotelCard";

import { HotelCard as Hotel } from "@/lib/hotelMapper";

interface Props {
  hotels: Hotel[];

  loading: boolean;

  checkIn?: string;

  checkOut?: string;

  adults?: number;

  children?: string;

  rooms?: number;
}

export default function HotelList({
  hotels,
  loading,
  checkIn,
  checkOut,
  adults,
  children,
  rooms,
}: Props) {
  if (loading) {
    return (
      <div className="space-y-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="
            h-[230px]
            animate-pulse

            rounded-2xl

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

        h-64

        items-center
        justify-center

        rounded-2xl

        border
        border-dashed
        border-neutral-300

        bg-white

        text-lg
        text-neutral-500
        "
      >
        No hotels found.
      </div>
    );
  }

  return (
    <section className="space-y-5">
      {hotels.map((hotel, index) => (
        <HotelCard
          key={`${hotel.id}-${index}`}
          hotel={hotel}
          checkIn={checkIn}
          checkOut={checkOut}
          adults={adults}
          children={children}
          rooms={rooms}
        />
      ))}
    </section>
  );
}