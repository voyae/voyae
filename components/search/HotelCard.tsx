"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Star,
  MapPin,
  Coffee,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

import { HotelCard as Hotel } from "@/lib/hotelMapper";

interface Props {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: Props) {
  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg">
      <div className="grid grid-cols-[320px_1fr_240px]">
        
        {/* HOTEL IMAGE */}
        <div className="relative h-[260px] bg-neutral-100">
          {hotel.image ? (
            <Image
              src={hotel.image}
              alt={hotel.name}
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-400">
              No Image Available
            </div>
          )}
        </div>

        {/* CENTER */}
        <div className="p-6">
          <div className="flex items-center gap-1">
            {Array.from({
              length: hotel.stars,
            }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

          <h2 className="mt-2 text-2xl font-bold">
            {hotel.name}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
            <MapPin size={15} />
            <span>
              {hotel.address}
              {hotel.city && ` • ${hotel.city}`}
              {hotel.country && ` • ${hotel.country}`}
            </span>
          </div>

          {/* ROOM */}
          <div className="mt-6">
            <p className="font-semibold text-emerald-700">
              {hotel.roomName}
            </p>

            <div className="mt-3 flex flex-col gap-2 text-sm">
              {hotel.breakfastIncluded && (
                <div className="flex items-center gap-2 text-green-700">
                  <Coffee size={15} />
                  Breakfast Included
                </div>
              )}

              {hotel.freeCancellation && (
                <div className="flex items-center gap-2 text-blue-700">
                  <ShieldCheck size={15} />
                  Free Cancellation
                </div>
              )}

              {hotel.refundable && (
                <div className="flex items-center gap-2 text-emerald-700">
                  <RotateCcw size={15} />
                  Refundable
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-between border-l p-6">
          <div>
            <div className="flex justify-end">
              <div className="rounded-lg bg-emerald-700 px-3 py-2 font-bold text-white">
                {hotel.rating > 0 ? hotel.rating.toFixed(1) : "N/A"}
              </div>
            </div>

            <p className="mt-2 text-right text-sm text-neutral-500">
              {hotel.reviewCount > 0 ? `${hotel.reviewCount.toLocaleString()} reviews` : "No reviews yet"}
            </p>
          </div>

          <div>
            {hotel.oldPrice > hotel.price && (
              <p className="text-right text-sm text-neutral-400 line-through">
                {hotel.currency} {hotel.oldPrice}
              </p>
            )}

            <p className="text-right text-4xl font-bold">
              {hotel.currency} {hotel.price}
            </p>

            <p className="text-right text-sm text-neutral-500">
              Includes taxes & fees
            </p>

            <Link
              href={`/hotel/${hotel.id}`}
              className="mt-5 block rounded-xl bg-emerald-700 py-3 text-center font-semibold text-white transition hover:bg-emerald-800"
            >
              See availability
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
}