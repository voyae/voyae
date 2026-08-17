const BASE_URL = "https://api.liteapi.travel/v3.0";

const API_KEY = process.env.NUITEE_API_KEY!;

if (!API_KEY) {
  throw new Error("NUITEE_API_KEY is missing in .env.local");
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data);

    throw new Error(
      data?.error?.message ||
        data?.message ||
        "LiteAPI request failed"
    );
  }

  return data as T;
}

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export interface Occupancy {
  adults: number;
  children?: number[];
}

export interface HotelRatesRequest {
  hotelIds: string[];

  occupancies: Occupancy[];

  guestNationality: string;

  currency: string;

  checkin: string;

  checkout: string;

  roomMapping?: boolean;

  maxRatesPerHotel?: number;
}

/* -------------------------------------------------------------------------- */
/*                              HOTEL DIRECTORY                               */
/* -------------------------------------------------------------------------- */

export async function searchHotelsByCity(
  countryCode: string,
  cityName: string
) {
  return request(
    `/data/hotels?countryCode=${countryCode}&cityName=${encodeURIComponent(
      cityName
    )}`
  );
}

export async function searchHotelsByCoordinates(
  latitude: number,
  longitude: number,
  distance = 10000
) {
  return request(
    `/data/hotels?latitude=${latitude}&longitude=${longitude}&distance=${distance}`
  );
}

export async function getHotelDetails(
  hotelId: string
) {
  return request(
    `/data/hotel?hotelId=${hotelId}`
  );
}

export async function getHotelReviews(
  hotelId: string
) {
  return request(
    `/data/reviews?hotelId=${hotelId}`
  );
}

/* -------------------------------------------------------------------------- */
/*                              LIVE HOTEL RATES                              */
/* -------------------------------------------------------------------------- */

export async function getHotelRates(
  body: HotelRatesRequest
) {
  return request("/hotels/rates", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function getMinimumRates(
  body: HotelRatesRequest
) {
  return request("/hotels/min-rates", {
    method: "POST",
    body: JSON.stringify(body),
  });
}