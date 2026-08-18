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
  hotelId?: string;
  hotelName?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  childrenCount?: string;
}

export default function RoomCard({ 
  room, 
  hotelId, 
  hotelName, 
  checkIn, 
  checkOut, 
  adults, 
  childrenCount 
}: Props) {
  // 1. Farklı API yapıları için esnek rate (fiyat/koşul) yakalama
  const rate = room.rates?.[0] ?? room.rate ?? room.options?.[0] ?? room;

  // 2. Oda görselini güvenli bir şekilde çekme
  const image =
    room.images?.[0]?.url ??
    room.images?.[0] ??
    room.photo ??
    "/hotel-placeholder.jpg";

  // 3. Oda adını farklı olası alanlardan yakalama (Standart isim çakışmasını önler)
  const roomName = 
    room.name || 
    room.roomTypeName || 
    room.roomName || 
    room.title || 
    "Standart Oda";

  // 4. Gerçek fiyatı farklı olası anahtarlardan güvenle çekme
  const rawPrice =
    rate.retailRate?.total?.[0]?.amount ??
    rate.retailRate?.amount ??
    rate.price ??
    rate.amount ??
    room.offerRetailRate?.amount ??
    room.price ??
    0;

  const price = Number(rawPrice);

  // 5. Para birimini dinamik çekme
  const currency =
    rate.retailRate?.total?.[0]?.currency ??
    rate.currency ??
    room.offerRetailRate?.currency ??
    "USD";

  const oldPrice = Math.round(price * 1.18);

  const breakfast = 
    rate.boardName ?? 
    rate.mealPlan ?? 
    room.boardBasis ?? 
    (rate.isBreakfastIncluded ? "Kahvaltı Dahil" : "");

  const refundable =
    rate.cancellationPolicies?.refundableTag === "RFN" ||
    rate.refundable === true ||
    room.refundable === true;

  // Rezervasyon sayfası için query parametrelerini dinamik oluşturuyoruz
  const bookingParams = new URLSearchParams();
  if (room.offerId) bookingParams.set("offerId", room.offerId);
  if (room.id) bookingParams.set("roomId", room.id);
  if (hotelId) bookingParams.set("hotelId", hotelId);
  if (checkIn) bookingParams.set("checkIn", checkIn);
  if (checkOut) bookingParams.set("checkOut", checkOut);
  if (adults) bookingParams.set("adults", adults.toString());
  if (childrenCount) bookingParams.set("children", childrenCount);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-800 bg-[#101C3E] text-slate-100 shadow-xl transition hover:border-slate-700">
      <div className="grid grid-cols-[260px_1fr_240px]">
        {/* IMAGE */}
        <div className="relative h-[220px] bg-slate-900">
          <Image
            src={image}
            alt={roomName}
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white">
              {roomName}
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Users size={16} className="text-amber-400" />
                Sleeps {rate.maxOccupancy ?? room.maxOccupancy ?? adults ?? 2} Guests
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
            {price > 0 && (
              <p className="text-right text-sm text-slate-400 line-through">
                {currency} {oldPrice}
              </p>
            )}

            <h3 className="text-right text-4xl font-extrabold text-white">
              {currency} {price > 0 ? price.toFixed(0) : "Sorgulanıyor"}
            </h3>

            <p className="text-right text-xs text-slate-400 mt-1">
              Includes taxes & fees
            </p>
          </div>

          <Link
            href={`/booking?${bookingParams.toString()}`}
            className="rounded-xl bg-amber-500 py-3 text-center font-semibold text-slate-950 transition hover:bg-amber-400 shadow-lg"
          >
            Reserve
          </Link>
        </div>
      </div>
    </article>
  );
}