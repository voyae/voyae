import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getHotelDetails, getHotelRates } from "@/lib/liteapi";
import HotelDetailsContent from "./HotelDetailsContent";

interface HotelPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
    currency?: string;
  }>;
}

export default async function HotelPage({ params, searchParams }: HotelPageProps) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;

  const hotelId = resolvedParams.id;
  const checkIn = resolvedSearch.checkIn || "";
  const checkOut = resolvedSearch.checkOut || "";
  const adults = Number(resolvedSearch.adults || "2");
  const childrenParam = resolvedSearch.children || "";
  const currency = resolvedSearch.currency || "TRY";

  let hotelData = null;
  let rooms = [];

  try {
    // 1. Otel Detaylarını Çek
    const detailRes = await getHotelDetails(hotelId);
    hotelData = detailRes?.data || detailRes?.hotel || detailRes;

    if (!hotelData) {
      notFound();
    }

    // 2. Müsaitlik/Fiyatları Çek (Eğer tarih parametreleri varsa)
    if (checkIn && checkOut) {
      const occupancies = [
        {
          adults,
          children: childrenParam
            ? childrenParam.split(",").filter(Boolean).map(Number)
            : [],
        },
      ];

      const ratesRes = await getHotelRates({
        hotelIds: [hotelId],
        checkin: checkIn,
        checkout: checkOut,
        occupancies,
        guestNationality: "TR",
        currency: currency,
        roomMapping: true,
      });

      const rateHotels = ratesRes?.data || ratesRes?.hotels || [];
      const hotelRatesData =
        rateHotels.find(
          (h: any) => String(h.id || h.hotelId) === String(hotelId)
        ) || rateHotels[0];

      if (hotelRatesData) {
        rooms =
          hotelRatesData.roomTypes ||
          hotelRatesData.rooms ||
          hotelRatesData.rates ||
          [];
      }
    }

    // 3. Eğer rates'ten oda gelmediyse, statik verideki odaları kullan
    if (rooms.length === 0) {
      rooms = hotelData.roomTypes || hotelData.rooms || hotelData.rates || [];
    }

  } catch (error) {
    console.error("Hotel detail fetch error:", error);
  }

  // 4. Client tarafında interaktif yönetilecek bileşeni çağır
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070D1F] flex items-center justify-center text-white">
          <div className="animate-pulse">Yükleniyor...</div>
        </div>
      }
    >
      <HotelDetailsContent 
        hotelData={hotelData} 
        rooms={rooms} 
        hotelId={hotelId}
        checkIn={checkIn}
        checkOut={checkOut}
        adults={adults}
        childrenParam={childrenParam}
        currency={currency}
      />
    </Suspense>
  );
}