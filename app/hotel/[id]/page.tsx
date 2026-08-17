"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Hotel {
  id: string;
  name: string;
  hotelDescription: string;
  address: string;
  city: string;
  country: string;
  starRating: number;
  rating: number;
  reviewCount: number;
  hotelImages: {
    url: string;
  }[];
  hotelFacilities: string[];
}

export default function HotelPage() {
  const { id } = useParams();

  const [hotel, setHotel] = useState<Hotel | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/hotels/${id}`);

        const data = await res.json();

        setHotel(data.hotel);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

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

      <h1 className="text-4xl font-bold">
        {hotel.name}
      </h1>

      <p className="mt-2 text-neutral-500">
        {hotel.address}, {hotel.city}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4">
        {hotel.hotelImages?.slice(0,6).map((img,index)=>(
          <div
            key={index}
            className="relative h-72 overflow-hidden rounded-3xl"
          >
            <Image
              src={img.url}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-10">

        <h2 className="text-2xl font-bold">
          About
        </h2>

        <div
          className="prose mt-4 max-w-none"
          dangerouslySetInnerHTML={{
            __html: hotel.hotelDescription,
          }}
        />

      </div>

      <div className="mt-12">

        <h2 className="text-2xl font-bold">
          Facilities
        </h2>

        <div className="mt-6 flex flex-wrap gap-3">

          {hotel.hotelFacilities?.map((facility)=>(
            <div
              key={facility}
              className="rounded-xl bg-neutral-100 px-4 py-2"
            >
              {facility}
            </div>
          ))}

        </div>

      </div>

    </main>
  );
}