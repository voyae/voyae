"use client";

import HotelCard from "@/components/search/HotelCard";
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
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="h-[260px] animate-pulse rounded-2xl border border-neutral-200 bg-neutral-100"
          />
        ))}
      </div>
    );
  }

  if (!hotels.length) {
    return (
      <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white text-lg text-neutral-500">
        No hotels found.
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
        />
      ))}
    </section>
  );
}