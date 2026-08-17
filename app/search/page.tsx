"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import HotelList from "@/components/search/HotelList";
import SearchFilters from "@/components/search/SearchFilters";

import { HotelCard } from "@/lib/hotelMapper";

export default function SearchPage() {
  const params = useSearchParams();

  const destination =
    params.get("destination") ?? "";

  const checkIn =
    params.get("checkIn") ?? "";

  const checkOut =
    params.get("checkOut") ?? "";

  const adults =
    Number(params.get("adults") ?? "2");

  const children =
    params.get("children") ?? "";

  const rooms =
    Number(params.get("rooms") ?? "1");

  const [loading, setLoading] =
    useState(true);

  const [hotels, setHotels] =
    useState<HotelCard[]>([]);

  const [priceRange, setPriceRange] =
    useState(1000);

  const [stars, setStars] =
    useState<number[]>([]);

  const [freeCancellation, setFreeCancellation] =
    useState(false);

  useEffect(() => {
    async function loadHotels() {
      try {
        setLoading(true);

        // Şimdilik sabit.
        // Bir sonraki pakette Google Place Details
        // endpointinden gelecek.
        const countryCode = "TR";

        const discover = await fetch(
          "/api/hotels/discover",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              city: destination,
              countryCode,
            }),
          }
        );

        const discovered =
          await discover.json();

        const hotelIds =
          discovered.hotelIds ?? [];

        if (!hotelIds.length) {
          setHotels([]);
          return;
        }

        const response = await fetch(
          "/api/hotels/search",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              hotelIds,

              checkin: checkIn,

              checkout: checkOut,

              currency: "USD",

              guestNationality: "TR",

              occupancies: [
                {
                  adults,
                  children: children
                    ? children
                        .split(",")
                        .filter(Boolean)
                        .map(Number)
                    : [],
                },
              ],
            }),
          }
        );

        const data =
          await response.json();

        setHotels(
          data.hotels ?? []
        );
      } catch (err) {
        console.error(err);

        setHotels([]);
      } finally {
        setLoading(false);
      }
    }

    loadHotels();
  }, [
    destination,
    checkIn,
    checkOut,
    adults,
    children,
  ]);

  const filteredHotels =
    hotels.filter((hotel) => {
      if (
        hotel.price > priceRange
      )
        return false;

      if (
        stars.length &&
        !stars.includes(
          hotel.stars
        )
      )
        return false;

      if (
        freeCancellation &&
        !hotel.freeCancellation
      )
        return false;

      return true;
    });

  return (
    <main className="mx-auto max-w-7xl p-8">

      <div className="grid grid-cols-[280px_1fr] gap-8">

        <SearchFilters
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          stars={stars}
          setStars={setStars}
          freeCancellation={
            freeCancellation
          }
          setFreeCancellation={
            setFreeCancellation
          }
        />

        <HotelList
          hotels={filteredHotels}
          loading={loading}
          checkIn={checkIn}
          checkOut={checkOut}
          adults={adults}
          children={children}
          rooms={rooms}
        />

      </div>

    </main>
  );
}