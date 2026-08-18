"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";

import RoomList from "@/components/hotel/RoomList";

export default function HotelPage() {
  const { id } = useParams();
  const params = useSearchParams();

  const checkIn = params.get("checkIn") ?? "";
  const checkOut = params.get("checkOut") ?? "";
  const adults = Number(params.get("adults") ?? "2");
  const children = params.get("children") ?? "";

  const [hotel, setHotel] = useState<any>(null);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHotel() {
      try {
        setLoading(true);

        const detailRes = await fetch(
          `/api/hotels/details?hotelId=${id}`
        );
        const detailData = await detailRes.json();

        // Route üzerinden gelen { success: true, hotel: { ... } } yapısını karşılıyoruz
        const hotelData =
          detailData.hotel?.data ??
          detailData.hotel?.hotel ??
          detailData.hotel ??
          detailData;

        setHotel(hotelData);

        const rateRes = await fetch(
          "/api/hotels/search",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
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

        const rateData = await rateRes.json();
        const mappedHotel = rateData.hotels?.[0];

        setRooms(
          mappedHotel?.raw?.roomTypes ??
            mappedHotel?.raw?.rooms ??
            mappedHotel?.roomTypes ??
            mappedHotel?.rooms ??
            []
        );
      } catch (err) {
        console.error("Hotel detail load error:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadHotel();
    }
  }, [id, checkIn, checkOut, adults, children]);

  if (loading) {
    return (
      <div className="mx-auto flex h-96 max-w-7xl items-center justify-center text-lg text-neutral-500">
        Loading hotel details...
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="mx-auto flex h-96 max-w-7xl items-center justify-center text-lg text-neutral-500">
        Hotel not found.
      </div>
    );
  }

  // API'den gelebilecek tüm olası resim alanlarını tarıyoruz
  const rawImages =
    hotel.hotelImages ??
    hotel.images ??
    hotel.photos ??
    hotel.pictures ??
    hotel.gallery ??
    [];

  const images = Array.isArray(rawImages) ? rawImages : [];

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-8">
      {/* TITLE */}
      <section>
        <div className="flex items-center gap-1">
          {Array.from({
            length: Number(
              hotel.starRating ??
                hotel.stars ??
                hotel.category ??
                0
            ),
          }).map((_, i) => (
            <Star
              key={i}
              size={15}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        <h1 className="mt-2 text-4xl font-bold">
          {hotel.name ?? hotel.hotelName}
        </h1>

        <div className="mt-2 flex items-center gap-2 text-neutral-500">
          <MapPin size={16} />
          <span>
            {hotel.address ?? hotel.location?.address}
            {(hotel.city ?? hotel.location?.city) &&
              ` • ${hotel.city ?? hotel.location?.city}`}
            {(hotel.country ?? hotel.location?.country) &&
              ` • ${hotel.country ?? hotel.location?.country}`}
          </span>
        </div>
      </section>

      {/* GALLERY */}
      {images.length > 0 ? (
        <section className="grid grid-cols-4 gap-3">
          <div className="relative col-span-2 row-span-2 h-[520px] bg-neutral-100">
            <Image
              src={
                typeof images[0] === 'string'
                  ? images[0]
                  : images[0]?.url ?? images[0]?.highResUrl ?? "/hotel-placeholder.jpg"
              }
              alt={hotel.name ?? "Hotel"}
              fill
              unoptimized
              className="rounded-2xl object-cover"
            />
          </div>

          {images.slice(1, 5).map((img: any, i: number) => {
            const imgSrc = typeof img === 'string' ? img : img?.url ?? img?.highResUrl ?? "";
            if (!imgSrc) return null;
            return (
              <div
                key={i}
                className="relative h-[255px] bg-neutral-100"
              >
                <Image
                  src={imgSrc}
                  alt=""
                  fill
                  unoptimized
                  className="rounded-2xl object-cover"
                />
              </div>
            );
          })}
        </section>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 text-neutral-400">
          No images available for this hotel.
        </div>
      )}

      {/* DESCRIPTION */}
      {(hotel.hotelDescription ?? hotel.description) && (
        <section className="rounded-2xl border bg-white p-6">
          <h2 className="mb-4 text-2xl font-bold">
            About this hotel
          </h2>
          <div
            className="prose max-w-none text-neutral-600"
            dangerouslySetInnerHTML={{
              __html:
                hotel.hotelDescription ?? hotel.description,
            }}
          />
        </section>
      )}

      {/* ROOMS */}
      <section>
        <h2 className="mb-6 text-3xl font-bold">
          Available Rooms
        </h2>
        <RoomList
          rooms={rooms}
          loading={loading}
        />
      </section>
    </main>
  );
}