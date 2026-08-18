"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Coffee,
  ShieldCheck,
  RotateCcw,
  Users,
} from "lucide-react";

interface Props {
  room: any;
}

export default function RoomCard({
  room,
}: Props) {
  const rate =
    room.rates?.[0] ?? {};

  const image =
    room.images?.[0]?.url ??
    room.images?.[0] ??
    "/hotel-placeholder.jpg";

  const price =
    rate.retailRate?.total?.[0]?.amount ??
    rate.retailRate?.amount ??
    room.offerRetailRate?.amount ??
    0;

  const currency =
    rate.retailRate?.total?.[0]?.currency ??
    room.offerRetailRate?.currency ??
    "USD";

  const oldPrice =
    Math.round(Number(price) * 1.18);

  const breakfast =
    rate.boardName ??
    rate.mealPlan ??
    "";

  const refundable =
    rate.cancellationPolicies
      ?.refundableTag === "RFN";

  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">

      <div className="grid grid-cols-[260px_1fr_240px]">

        {/* IMAGE */}

        <div className="relative h-[220px]">

          <Image
            src={image}
            alt={room.name}
            fill
            unoptimized
            className="object-cover"
          />

        </div>

        {/* CONTENT */}

        <div className="p-6">

          <h3 className="text-2xl font-bold">
            {room.name}
          </h3>

          <div className="mt-4 flex flex-col gap-3">

            <div className="flex items-center gap-2 text-sm">
              <Users size={16} />
              Sleeps {rate.maxOccupancy ?? 2} Guests
            </div>

            {breakfast && (
              <div className="flex items-center gap-2 text-green-700">
                <Coffee size={16} />
                {breakfast}
              </div>
            )}

            {refundable && (
              <div className="flex items-center gap-2 text-emerald-700">
                <RotateCcw size={16} />
                Refundable
              </div>
            )}

            <div className="flex items-center gap-2 text-blue-700">
              <ShieldCheck size={16} />
              Free Cancellation
            </div>

          </div>

        </div>

        {/* PRICE */}

        <div className="flex flex-col justify-between border-l p-6">

          <div>

            <p className="text-right text-sm text-neutral-400 line-through">
              {currency} {oldPrice}
            </p>

            <h3 className="text-right text-4xl font-bold">
              {currency} {Number(price).toFixed(0)}
            </h3>

            <p className="text-right text-sm text-neutral-500">
              Includes taxes & fees
            </p>

          </div>

          <Link
            href={`/booking?offerId=${room.offerId}`}
            className="rounded-xl bg-emerald-700 py-3 text-center font-semibold text-white transition hover:bg-emerald-800"
          >
            Reserve
          </Link>

        </div>

      </div>

    </article>
  );
}