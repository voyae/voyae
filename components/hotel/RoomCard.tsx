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

export default function RoomCard({ room }: Props) {
  const rate = room.rates?.[0] ?? {};

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

  const oldPrice = Math.round(Number(price) * 1.18);

  const breakfast = rate.boardName ?? rate.mealPlan ?? "";

  const refundable =
    rate.cancellationPolicies?.refundableTag === "RFN";

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-800 bg-[#101C3E] text-slate-100 shadow-xl transition hover:border-slate-700">
      <div className="grid grid-cols-[260px_1fr_240px]">
        {/* IMAGE */}
        <div className="relative h-[220px] bg-slate-900">
          <Image
            src={image}
            alt={room.name ?? "Room image"}
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white">
              {room.name}
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Users size={16} className="text-amber-400" />
                Sleeps {rate.maxOccupancy ?? 2} Guests
              </div>

              {breakfast && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm">
                  <Coffee size={16} />
                  {breakfast}
                </div>
              )}

              {refundable && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm">
                  <RotateCcw size={16} />
                  Refundable
                </div>
              )}

              <div className="flex items-center gap-2 text-blue-400 text-sm">
                <ShieldCheck size={16} />
                Free Cancellation
              </div>
            </div>
          </div>
        </div>

        {/* PRICE */}
        <div className="flex flex-col justify-between border-l border-slate-800 bg-[#0d1633] p-6">
          <div>
            <p className="text-right text-sm text-slate-400 line-through">
              {currency} {oldPrice}
            </p>

            <h3 className="text-right text-4xl font-extrabold text-white">
              {currency} {Number(price).toFixed(0)}
            </h3>

            <p className="text-right text-xs text-slate-400 mt-1">
              Includes taxes & fees
            </p>
          </div>

          <Link
            href={`/booking?offerId=${room.offerId}`}
            className="rounded-xl bg-amber-500 py-3 text-center font-semibold text-slate-950 transition hover:bg-amber-400 shadow-lg"
          >
            Reserve
          </Link>
        </div>
      </div>
    </article>
  );
}