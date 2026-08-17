"use client";

import { useEffect, useState } from "react";

import { useParams, useSearchParams } from "next/navigation";

import Image from "next/image";

import RoomList from "@/components/hotel/RoomList";

export default function HotelPage() {
  const { id } = useParams();

  const params = useSearchParams();

  const checkIn =
    params.get("checkIn") ?? "";

  const checkOut =
    params.get("checkOut") ?? "";

  const adults =
    Number(params.get("adults") ?? "2");

  const children =
    params.get("children") ?? "";

  const [hotel, setHotel] =
    useState<any>(null);

  const [rooms, setRooms] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadHotel() {
      try {
        setLoading(true);

        /*
         * HOTEL DETAILS
         */

        const detailRes =
          await fetch(
            `/api/hotels/details?hotelId=${id}`
          );

        const detail =
          await detailRes.json();

        setHotel(detail.hotel);

        /*
         * HOTEL RATES
         */

        const rateRes =
          await fetch(
            "/api/hotels/search",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                hotelIds: [id],

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

        const rates =
          await rateRes.json();

        const rooms =
          rates.hotels?.[0]?.raw
            ?.roomTypes ??
          rates.hotels?.[0]?.raw
            ?.rooms ??
          [];

        setRooms(rooms);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadHotel();
  }, [
    id,
    checkIn,
    checkOut,
    adults,
    children,
  ]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl p-10">
        Loading...
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="mx-auto max-w-7xl p-10">
        Hotel not found.
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-8">

      <div className="space-y-8">

        <Image
          src={
            hotel.hotelImages?.[0]?.url ??
            "/hotel-placeholder.jpg"
          }
          alt={hotel.name}
          width={1400}
          height={700}
          className="h-[520px] w-full rounded-3xl object-cover"
        />

        <div>

          <h1 className="text-5xl font-bold">
            {hotel.name}
          </h1>

          <p className="mt-3 text-neutral-500">
            {hotel.address},
            {" "}
            {hotel.city},
            {" "}
            {hotel.country}
          </p>

        </div>

        {hotel.hotelDescription && (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html:
                hotel.hotelDescription,
            }}
          />
        )}

        <div>

          <h2 className="mb-6 text-3xl font-bold">
            Available Rooms
          </h2>

          <RoomList
            rooms={rooms}
            loading={loading}
          />

        </div>

      </div>

    </main>
  );
}