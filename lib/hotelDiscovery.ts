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
}

export async function discoverHotels(
  countryCode: string,
  cityName: string
): Promise<DiscoveredHotel[]> {
  const response: any =
    await searchHotelsByCity(
      countryCode,
      cityName
    );

  const hotels =
    response.data ??
    response.hotels ??
    [];

  return hotels.map((hotel: any) => ({
    id: String(
      hotel.id ??
      hotel.hotelId
    ),

    name:
      hotel.name ??
      hotel.hotelName ??
      "",

    address:
      hotel.address ??
      hotel.location?.address ??
      "",

    city:
      hotel.city ??
      hotel.location?.city ??
      "",

    country:
      hotel.country ??
      hotel.location?.country ??
      "",

    stars: Number(
      hotel.starRating ??
      hotel.stars ??
      hotel.category ??
      0
    ),

    image:
      hotel.main_photo ??
      hotel.hotelImages?.[0]?.url ??
      hotel.images?.[0]?.url ??
      hotel.images?.[0] ??
      "/hotel-placeholder.jpg",

    latitude:
      hotel.location?.latitude ??
      hotel.latitude ??
      0,

    longitude:
      hotel.location?.longitude ??
      hotel.longitude ??
      0,
  }));
}