import { searchHotelsByCoordinates } from "./liteapi";

export interface DiscoveredHotel {
  id: string;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export async function discoverHotels(
  latitude: number,
  longitude: number,
  radius = 10000
): Promise<DiscoveredHotel[]> {
  const response: any = await searchHotelsByCoordinates(
    latitude,
    longitude,
    radius
  );

  const hotels = response.data ?? [];

  return hotels.map((hotel: any) => ({
    id: hotel.id,

    name: hotel.name,

    city: hotel.city,

    country: hotel.country,

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
  latitude: number,
  longitude: number,
  radius = 10000
): Promise<string[]> {
  const hotels = await discoverHotels(
    latitude,
    longitude,
    radius
  );

  return hotels.map((hotel) => hotel.id);
}