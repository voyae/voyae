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

  checkIn?: string;

  checkOut?: string;

  adults?: number;

  children?: string;

  rooms?: number;
}

export default function HotelCard({
  hotel,
}: Props) {
  return (
    <article
      className="
      overflow-hidden

      rounded-2xl

      border
      border-neutral-200

      bg-white

      shadow-sm

      transition

      hover:shadow-lg
      "
    >
      <div className="grid md:grid-cols-[300px_1fr]">

        {/* IMAGE */}

        <div className="relative h-[230px]">

          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            className="object-cover"
            unoptimized
          />

          <button
            className="
            absolute
            right-4
            top-4

            flex
            h-10
            w-10

            items-center
            justify-center

            rounded-full

            bg-white/90

            backdrop-blur
            "
          >
            <Heart size={18} />
          </button>

        </div>

        {/* CONTENT */}

        <div className="flex flex-col justify-between p-6">

          <div>

            {/* Stars */}

            <div className="flex gap-1">

              {Array.from({
                length: hotel.stars,
              }).map((_, index) => (
                <Star
                  key={index}
                  size={15}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}

            </div>

            {/* Hotel Name */}

            <h2 className="mt-2 text-2xl font-bold">
              {hotel.name}
            </h2>

            {/* Address */}

            <div className="mt-2 flex items-center gap-2 text-sm text-neutral-500">

              <MapPin size={15} />

              <span>
                {hotel.address}

                {hotel.city && (
                  <>
                    {" "}
                    • {hotel.city}
                  </>
                )}

                {hotel.country && (
                  <>
                    {" "}
                    • {hotel.country}
                  </>
                )}
              </span>

            </div>

            {/* Rating */}

            <div className="mt-5 flex items-center gap-4">

              <div
                className="
                rounded-lg

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

            {/* Badges */}

            <div className="mt-5 flex flex-wrap gap-2">

              {hotel.breakfastIncluded && (
                <div
                  className="
                  flex
                  items-center
                  gap-2

                  rounded-lg

                  bg-green-50

                  px-3
                  py-2

                  text-sm

                  text-green-700
                  "
                >
                  <Coffee size={15} />

                  Breakfast
                </div>
              )}

              {hotel.freeCancellation && (
                <div
                  className="
                  flex
                  items-center
                  gap-2

                  rounded-lg

                  bg-blue-50

                  px-3
                  py-2

                  text-sm

                  text-blue-700
                  "
                >
                  <ShieldCheck size={15} />

                  Free Cancellation
                </div>
              )}

              {hotel.refundable && (
                <div
                  className="
                  rounded-lg

                  bg-emerald-50

                  px-3
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

          {/* Footer */}

          <div
            className="
            mt-6

            flex

            items-end

            justify-between

            border-t

            pt-5
            "
          >

            <div>

              <p className="text-sm text-neutral-500">
                Starting from
              </p>

              <div className="mt-1 flex items-end gap-2">

                <span className="text-3xl font-bold">

                {hotel.price != null ? (
  <>
    {hotel.currency}{" "}
    {Number(hotel.price).toFixed(0)}
  </>
) : (
  "Price unavailable"
)}

                </span>

                <span className="pb-1 text-neutral-500">
                  / night
                </span>

              </div>

            </div>

            <Link
              href={`/hotel/${hotel.id}`}
              className="
              rounded-xl

              bg-emerald-700

              px-6
              py-3

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