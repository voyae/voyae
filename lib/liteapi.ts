const API_URL = "https://api.liteapi.travel/v3.0";

const API_KEY = process.env.NUITEE_API_KEY!;

async function request(
  endpoint: string,
  options?: RequestInit
) {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY,
        ...(options?.headers ?? {}),
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("LiteAPI Error:");
    console.error(JSON.stringify(data, null, 2));

    throw new Error(
      data.message ??
      data.error ??
      "LiteAPI request failed."
    );
  }

  return data;
}

/* =======================================================
   HOTEL DISCOVERY
======================================================= */

export async function searchHotelsByCity(
  countryCode: string,
  cityName: string
) {
  const data = await request(
    `/data/hotels?countryCode=${countryCode}&cityName=${encodeURIComponent(
      cityName
    )}`
  );

  console.log("========== DISCOVER ==========");
  console.log(JSON.stringify(data, null, 2));
  console.log("==============================");

  return data;
}

/* =======================================================
   HOTEL DETAILS
======================================================= */

export async function getHotelDetails(
  hotelId: string
) {
  const data = await request(
    `/data/hotel?hotelId=${hotelId}`
  );

  return data;
}

/* =======================================================
   HOTEL RATES
======================================================= */

export interface RateRequest {
  hotelIds: string[];

  checkin: string;

  checkout: string;

  occupancies: {
    adults: number;
    children?: number[];
  }[];

  guestNationality: string;

  currency: string;

  roomMapping?: boolean;

  maxRatesPerHotel?: number;
}

export async function getHotelRates(
  body: RateRequest
) {
  const data = await request(
    "/hotels/rates",
    {
      method: "POST",
      body: JSON.stringify({
        ...body,
        roomMapping:
          body.roomMapping ?? true,
        maxRatesPerHotel:
          body.maxRatesPerHotel ?? 5,
      }),
    }
  );

  console.log("========== RATES ==========");
  console.log(JSON.stringify(data, null, 2));
  console.log("===========================");

  return data;
}

/* =======================================================
   PREBOOK
======================================================= */

export interface PrebookRequest {
  offerId: string;
}

export async function prebookHotel(
  body: PrebookRequest
) {
  return request("/rates/prebook", {
    method: "POST",
    body: JSON.stringify({
      offerId: body.offerId,
      usePaymentSdk: true,
    }),
  });
}

/* =======================================================
   BOOK
======================================================= */

export interface BookHotelRequest {
  prebookId: string;

  firstName: string;

  lastName: string;

  email: string;

  transactionId: string;
}

export async function bookHotel(
  body: BookHotelRequest
) {
  return request("/book", {
    method: "POST",
    body: JSON.stringify({
      holder: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
      },
      payment: {
        method: "TRANSACTION_ID",
        transactionId: body.transactionId,
      },
      prebookId: body.prebookId,
      guests: [
        {
          occupancyNumber: 1,
          remarks: "",
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
        },
      ],
    }),
  });
}