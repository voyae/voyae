"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import HotelList from "@/components/search/HotelList";
import SearchFilters, {
  SearchFiltersState,
} from "@/components/search/SearchFilters";

import { HotelCard as Hotel } from "@/lib/hotelMapper";

export default function SearchPage() {
  const params = useSearchParams();

  const [loading, setLoading] = useState(true);

  const [hotels, setHotels] = useState<Hotel[]>([]);

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

        const response = await fetch(
          "/api/hotels/search",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              latitude: Number(
                params.get("lat")
              ),

              longitude: Number(
                params.get("lng")
              ),

              checkin:
                params.get("checkIn"),

              checkout:
                params.get("checkOut"),

              adults: Number(
                params.get("adults") ??
                  2
              ),

              children:
                params
                  .get("children")
                  ?.split(",")

                  .filter(Boolean)

                  .map(Number) ?? [],

              currency: "USD",

              guestNationality:
                "TR",
            }),
          }
        );

        const data =
          await response.json();

        setHotels(data.hotels ?? []);
      } catch (err) {
        console.error(err);

        setHotels([]);
      } finally {
        setLoading(false);
      }
    }

    loadHotels();
  }, [params]);

  const filteredHotels =
    useMemo(() => {
      return hotels.filter(
        (hotel) => {
          if (
            hotel.price <
            filters.minPrice
          )
            return false;

          if (
            hotel.price >
            filters.maxPrice
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
        }
      );
    }, [hotels, filters]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          {filteredHotels.length} Hotels
          Found
        </h1>

        <p className="mt-2 text-neutral-500">
          {params.get(
            "destination"
          ) || "Destination"}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
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