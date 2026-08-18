import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";
import { searchHotelsByCity, getHotelDetails, fetchInChunks } from "@/lib/liteapi";

interface SearchPageProps {
  searchParams: Promise<{
    destination?: string;
    countryCode?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: string;
  }>;
}

async function SearchContent({ searchParams }: { searchParams: SearchPageProps['searchParams'] }) {
  const resolvedParams = await searchParams;
  
  const cityName = resolvedParams.destination || "Alanya";
  const countryCode = resolvedParams.countryCode || "TR";

  let realHotels = [];

  try {
    const response = await searchHotelsByCity(countryCode, cityName);
    const hotelsList = response?.data || response?.hotels || response || [];

    // 4290 (Too Many Requests) hatasını önlemek için istekleri küçük gruplara (chunk) bölüyoruz
    realHotels = await fetchInChunks(hotelsList, 5, 100, async (hotel: any, index: number = 0) => {
      const hotelId = hotel.id || hotel.hotelId;
      
      let hotelImagesList = hotel.hotelImages || hotel.images || hotel.pictures || hotel.photos || [];
      let detailData = null;

      // Eğer ilk listede görsel yoksa ve ID varsa, detay çekmeyi güvenli deneyelim
      if ((!Array.isArray(hotelImagesList) || hotelImagesList.length === 0) && hotelId) {
        try {
          const detailRes = await getHotelDetails(hotelId);
          detailData = detailRes?.data || detailRes?.hotel || detailRes;
          hotelImagesList = detailData?.hotelImages || detailData?.images || detailData?.photos || detailData?.pictures || [];
        } catch (err) {
          // Sessizce geç
        }
      }

      const amenitiesList = hotel.amenities || hotel.roomAmenities || detailData?.amenities || [];
      const boardType = hotel.boardBasis || hotel.mealPlan || hotel.boardName || detailData?.boardBasis || detailData?.mealPlan;

      const rawPrice = hotel.price || 
                       hotel.retailRate?.total?.[0]?.amount || 
                       hotel.minPrice || 
                       hotel.rate || 
                       hotel.pricePerNight;

      const finalPrice = rawPrice ? Number(rawPrice) : (1500 + (index * 250) % 3500);

      return {
        id: String(hotelId || index),
        name: hotel.name || "Otel Adı",
        hotelImages: hotelImagesList,
        roomType: hotel.roomType || hotel.roomName || "Deluxe Room",
        boardType: boardType || null,
        amenities: Array.isArray(amenitiesList) ? amenitiesList.slice(0, 3) : [],
        locationText: `${hotel.city || cityName} • ${hotel.address || hotel.location?.address || "Merkez"}`,
        freeCancellation: hotel.freeCancellation ?? true,
        rating: hotel.rating || hotel.reviews?.rating || (8.0 + (index % 15) / 10).toFixed(1),
        reviewsCount: hotel.reviewCount || hotel.reviewsCount || (80 + index * 15),
        price: finalPrice,
      };
    });

  } catch (error) {
    console.error("LiteAPI fetch error:", error);
  }

  return <SearchPageClient initialHotels={realHotels} />;
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-7xl p-8 pt-28">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-neutral-200 rounded-xl w-1/4"></div>
            <div className="h-64 bg-neutral-200 rounded-3xl"></div>
          </div>
        </main>
      }
    >
      <div className="pt-28">
        <SearchContent searchParams={searchParams} />
      </div>
    </Suspense>
  );
}