import { searchHotelsByCity } from "./liteapi";

export interface DiscoveredHotel {
  id: string;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export async function discoverHotels(
  countryCode: string,
  cityName: string
): Promise<DiscoveredHotel[]> {
  const response: any = await searchHotelsByCity(
    countryCode,
    cityName
  );

  const hotels = response.data ?? response.hotels ?? [];

  return hotels.map((hotel: any) => ({
    id: hotel.id,

    name: hotel.name ?? "",

    city: hotel.city ?? "",

    country: hotel.country ?? "",

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

export async function discoverHotelIds(
  countryCode: string,
  cityName: string
): Promise<string[]> {
  const hotels = await discoverHotels(
    countryCode,
    cityName
  );

  return hotels.map((hotel) => hotel.id);
}