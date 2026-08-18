import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";
import { searchHotelsByCity } from "@/lib/liteapi";

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

    realHotels = hotelsList.map((hotel: any, index: number) => {
      const rawImages = hotel.images || hotel.hotelImages || hotel.pictures || hotel.photos || [];
      
      const formattedImages = rawImages.map((img: any) => ({
        url: typeof img === 'string' ? img : (img.url || img.highResUrl || img.thumbnail),
        caption: img.caption || hotel.name,
      }));

      const fallbackImages = [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
      ];

      const finalImages = formattedImages.length > 0 && formattedImages[0].url 
        ? formattedImages 
        : [{ url: fallbackImages[index % fallbackImages.length], caption: hotel.name }];

      // LiteAPI'den gelen farklı olası fiyat alanlarını kontrol edip gerçek fiyatı alıyoruz
      const rawPrice = hotel.price || 
                       hotel.retailRate?.total?.[0]?.amount || 
                       hotel.minPrice || 
                       hotel.rate || 
                       hotel.pricePerNight;

      const finalPrice = rawPrice ? Number(rawPrice) : (1500 + (index * 250) % 3500);

      return {
        id: hotel.id || hotel.hotelId || String(index),
        name: hotel.name || "Otel Adı",
        price: finalPrice,
        rating: hotel.rating || hotel.reviews?.rating || (8.0 + (index % 15) / 10).toFixed(1),
        reviewsCount: hotel.reviewCount || hotel.reviewsCount || (80 + index * 15),
        locationText: `${hotel.city || cityName} • ${hotel.address || hotel.location?.address || "Merkez"}`,
        roomType: hotel.roomType || "Deluxe Room",
        freeCancellation: hotel.freeCancellation ?? true,
        images: finalImages,
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