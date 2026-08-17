"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import HotelList from "@/components/search/HotelList";
import SearchFilters, {
  SearchFiltersState,
} from "@/components/search/SearchFilters";

import { HotelCard } from "@/lib/hotelMapper";

export default function SearchPage() {
  const params = useSearchParams();

  const destination =
    params.get("destination") ?? "";

  const checkIn =
    params.get("checkIn") ?? "";

  const checkOut =
    params.get("checkOut") ?? "";

  const adults = Number(
    params.get("adults") ?? "2"
  );

  const children =
    params.get("children") ?? "";

  const rooms = Number(
    params.get("rooms") ?? "1"
  );

  const countryCode =
    params.get("countryCode") ?? "TR";

  const [loading, setLoading] =
    useState(true);

  const [hotels, setHotels] =
    useState<HotelCard[]>([]);

  const [filters, setFilters] =
    useState<SearchFiltersState>({
      minPrice: 0,
      maxPrice: 5000,
      stars: [],
      breakfast: false,
      freeCancellation: false,
      refundable: false,
    });

  useEffect(() => {
    async function loadHotels() {
      try {
        setLoading(true);

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

              guestNationality:
                countryCode,

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

        setHotels(data.hotels ?? []);
      } catch (error) {
        console.error(error);

        setHotels([]);
      } finally {
        setLoading(false);
      }
    }

    if (
      destination &&
      checkIn &&
      checkOut
    ) {
      loadHotels();
    }
  }, [
    destination,
    checkIn,
    checkOut,
    adults,
    children,
    countryCode,
  ]);

  const filteredHotels =
    hotels.filter((hotel) => {
      if (
        hotel.price < filters.minPrice
      )
        return false;

      if (
        hotel.price > filters.maxPrice
      )
        return false;

      if (
        filters.stars.length &&
        !filters.stars.includes(
          hotel.stars
        )
      )
        return false;

      if (
        filters.breakfast &&
        !hotel.breakfastIncluded
      )
        return false;

      if (
        filters.freeCancellation &&
        !hotel.freeCancellation
      )
        return false;

      if (
        filters.refundable &&
        !hotel.refundable
      )
        return false;

      return true;
    });

  return (
    <main className="mx-auto max-w-7xl p-8">

      <div className="grid grid-cols-[280px_1fr] gap-8">

        <SearchFilters
          filters={filters}
          onChange={setFilters}
        />

        <HotelList
          hotels={filteredHotels}
          loading={loading}
        />

      </div>

    </main>
  );
}