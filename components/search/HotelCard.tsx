"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Star,
  MapPin,
  Coffee,
  ShieldCheck,
  Heart,
} from "lucide-react";

import { HotelCard as Hotel } from "@/lib/hotelMapper";

interface Props {
  hotel: Hotel;
  checkIn: string;
  checkOut: string;
  adults?: number;
  children: string;
  rooms?: number;
}

export default function HotelCard({
  hotel,
  checkIn,
  checkOut,
  adults = 1,
  children,
  rooms = 1,
}: Props) {
  const params = new URLSearchParams({
    checkIn: checkIn ?? "",
    checkOut: checkOut ?? "",
    adults: String(adults ?? 1),
    children: children ?? "",
    rooms: String(rooms ?? 1),
  });

  return (
    <article
      className="
      overflow-hidden
      rounded-3xl
      border
      border-neutral-200
      bg-white
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      "
    >
      <div className="grid md:grid-cols-[360px_1fr]">

        {/* IMAGE */}

        <div className="relative h-[280px]">

          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            className="object-cover"
          />

          <button
            className="
            absolute
            right-5
            top-5
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-white/90
            backdrop-blur
            transition
            hover:scale-110
            "
          >
            <Heart size={20} />
          </button>

        </div>

        {/* CONTENT */}

        <div className="flex flex-col justify-between p-8">

          <div>

            <div className="flex gap-1">

              {Array.from({
                length: hotel.stars,
              }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}

            </div>

            <h2 className="mt-3 text-3xl font-bold">
              {hotel.name}
            </h2>

            <div className="mt-3 flex items-center gap-2 text-neutral-500">

              <MapPin size={16} />

              <span>
                {hotel.address}
                {hotel.city && (
                  <>
                    , {hotel.city}
                  </>
                )}
              </span>

            </div>

            <div className="mt-6 flex items-center gap-5">

              <div
                className="
                rounded-xl
                bg-emerald-700
                px-3
                py-2
                font-bold
                text-white
                "
              >
                {hotel.rating.toFixed(1)}
              </div>

              <div>

                <p className="font-semibold">
                  Guest Rating
                </p>

                <p className="text-sm text-neutral-500">
                  {hotel.reviewCount.toLocaleString()} reviews
                </p>

              </div>

            </div>

            <div className="mt-8 flex flex-wrap gap-3">

              {hotel.breakfastIncluded && (
                <div
                  className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-green-50
                  px-4
                  py-2
                  text-sm
                  text-green-700
                  "
                >
                  <Coffee size={16} />
                  Breakfast Included
                </div>
              )}

              {hotel.freeCancellation && (
                <div
                  className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-blue-50
                  px-4
                  py-2
                  text-sm
                  text-blue-700
                  "
                >
                  <ShieldCheck size={16} />
                  Free Cancellation
                </div>
              )}

              {hotel.refundable && (
                <div
                  className="
                  rounded-xl
                  bg-emerald-50
                  px-4
                  py-2
                  text-sm
                  text-emerald-700
                  "
                >
                  Refundable
                </div>
              )}

            </div>

          </div>

          <div
            className="
            mt-10
            flex
            items-end
            justify-between
            border-t
            pt-6
            "
          >

            <div>

              <p className="text-sm text-neutral-500">
                Starting from
              </p>

              <div className="mt-2 flex items-end gap-2">

                <span className="text-4xl font-bold">
                  {hotel.currency} {hotel.price.toFixed(0)}
                </span>

                <span className="pb-1 text-neutral-500">
                  / night
                </span>

              </div>

            </div>

            <Link
              href={`/hotel/${hotel.id}?${params.toString()}`}
              className="
              rounded-2xl
              bg-emerald-700
              px-8
              py-4
              font-semibold
              text-white
              transition
              hover:bg-emerald-800
              "
            >
              View Hotel
            </Link>

          </div>

        </div>

      </div>

    </article>
  );
}