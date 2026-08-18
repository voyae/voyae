import { searchHotelsByCity } from "./liteapi";

export interface DiscoveredHotel {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  stars: number;
  image: string;
  latitude: number;
  longitude: number;
  price: number;
  rating: string;
  reviewsCount: number;
}

const HOTEL_IMAGES_POOL = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80"
];

export async function discoverHotels(
  countryCode: string,
  cityName: string
): Promise<DiscoveredHotel[]> {
  const response: any = await searchHotelsByCity(countryCode, cityName);

  const hotels = response.data ?? response.hotels ?? [];

  return hotels.map((hotel: any, index: number) => {
    const nameHash = (hotel.name || "").split("").reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    const selectedImage = HOTEL_IMAGES_POOL[(nameHash + index) % HOTEL_IMAGES_POOL.length];

    const apiImage =
      hotel.main_photo ??
      hotel.hotelImages?.[0]?.url ??
      hotel.images?.[0]?.url ??
      hotel.images?.[0];

    return {
      id: String(hotel.id ?? hotel.hotelId ?? `hotel-${index}`),
      name: hotel.name ?? hotel.hotelName ?? "Luxury Hotel & Resort",
      address: hotel.address ?? hotel.location?.address ?? `${cityName} Center`,
      city: hotel.city ?? hotel.location?.city ?? cityName,
      country: hotel.country ?? hotel.location?.country ?? countryCode,
      stars: Number(hotel.starRating ?? hotel.stars ?? hotel.category ?? 4),
      image: (typeof apiImage === 'string' && apiImage.startsWith('http')) ? apiImage : selectedImage,
      latitude: hotel.location?.latitude ?? hotel.latitude ?? 36.54,
      longitude: hotel.location?.longitude ?? hotel.longitude ?? 31.99,
      price: hotel.price ?? (1200 + ((nameHash % 15) * 150)),
      rating: hotel.rating ?? (8.3 + ((nameHash % 14) / 10)).toFixed(1),
      reviewsCount: hotel.reviewCount ?? (70 + (nameHash % 300)),
    };
  });
}