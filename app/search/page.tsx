"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import HotelList from "@/components/search/HotelList";
import SearchFilters, {
  SearchFiltersState,
} from "@/components/search/SearchFilters";

import { HotelCard } from "@/lib/hotelMapper";

export default function SearchPage() {
  const params = useSearchParams();

  const [loading, setLoading] = useState(true);

  const [hotels, setHotels] = useState<HotelCard[]>([]);

  const [filters, setFilters] =
    useState<SearchFiltersState>({
      minPrice: 0,
      maxPrice: 10000,
      stars: [],
      breakfast: false,
      freeCancellation: false,
      refundable: false,
    });

  useEffect(() => {
    async function searchHotels() {
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
              city: params.get("destination"),

              countryCode:
                params.get("countryCode"),

              checkin:
                params.get("checkIn"),

              checkout:
                params.get("checkOut"),

              adults: Number(
                params.get("adults") ?? 2
              ),
            }),
          }
        );

        const data =
          await response.json();

        if (data.success) {
          setHotels(data.hotels);
        } else {
          console.error(data.message);

          setHotels([]);
        }
      } catch (error) {
        console.error(error);

        setHotels([]);
      } finally {
        setLoading(false);
      }
    }

    searchHotels();
  }, [params]);

  const filteredHotels =
    useMemo(() => {
      return hotels.filter(
        (hotel: any) => {
          const price =
            hotel.price ?? 0;

          const stars =
            hotel.stars ??
            hotel.starRating ??
            0;

          if (
            price <
            filters.minPrice
          )
            return false;

          if (
            price >
            filters.maxPrice
          )
            return false;

          if (
            filters.stars.length > 0 &&
            !filters.stars.includes(
              stars
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
          {loading
            ? "Searching hotels..."
            : `${filteredHotels.length} Hotels Found`}
        </h1>

        <p className="mt-2 text-neutral-500">
          {params.get("destination")}
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