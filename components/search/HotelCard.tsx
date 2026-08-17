"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  Heart,
  Coffee,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";

import { HotelCard as Hotel } from "@/lib/hotelMapper";

interface Props {
  hotel: Hotel;
}

export default function HotelCard({
  hotel,
}: Props) {
  return (
    <article className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="grid md:grid-cols-[320px_1fr_220px]">
        {/* Image */}
        <div className="relative h-[260px] md:h-full">
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            className="object-cover"
          />

          <button
            className="
            absolute
            right-4
            top-4

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

        {/* Center */}
        <div className="flex flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                {hotel.name}
              </h2>

              <div className="mt-2 flex items-center gap-1">
                {Array.from({
                  length: hotel.stars,
                }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-emerald-600 px-3 py-2 text-white">
              <p className="text-lg font-bold">
                {hotel.reviewScore.toFixed(1)}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-neutral-500">
            <MapPin size={18} />

            <span>
              {hotel.address}, {hotel.city}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {hotel.breakfastIncluded && (
              <span className="flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                <Coffee size={16} />
                Breakfast Included
              </span>
            )}

            {hotel.freeCancellation && (
              <span className="flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                <BadgeCheck size={16} />
                Free Cancellation
              </span>
            )}

            {hotel.refundable && (
              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                Refundable
              </span>
            )}
          </div>

          <div className="mt-auto pt-6">
            <p className="text-sm text-neutral-500">
              {hotel.reviewCount.toLocaleString()} verified reviews
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col justify-between border-l border-neutral-200 bg-neutral-50 p-6">
          <div className="text-right">
            <p className="text-sm text-neutral-500">
              Starting from
            </p>

            <p className="mt-2 text-4xl font-black text-neutral-900">
              {hotel.currency} {hotel.price}
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              per stay
            </p>
          </div>

          <Link
            href={`/hotel/${hotel.id}`}
            className="
            mt-8

            flex
            items-center
            justify-center
            gap-2

            rounded-2xl

            bg-emerald-700

            py-4

            text-lg
            font-semibold
            text-white

            transition

            hover:bg-emerald-800
            "
          >
            See availability

            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </article>
  );
}