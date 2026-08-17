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
    console.error(data);

    throw new Error(
      data.message ??
        data.error ??
        "LiteAPI request failed."
    );
  }

  return data;
}

/* -------------------------------- */
/* Hotels Discovery */
/* -------------------------------- */

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

/* -------------------------------- */
/* Hotel Details */
/* -------------------------------- */

export async function getHotelDetails(
  hotelId: string
) {
  return request(
    `/data/hotel?hotelId=${hotelId}`
  );
}

/* -------------------------------- */
/* Search Rates */
/* -------------------------------- */

interface RateRequest {
  hotelIds: string[];

  checkin: string;

  checkout: string;

  occupancies: any[];

  currency: string;

  guestNationality: string;

  roomMapping?: boolean;

  maxRatesPerHotel?: number;
}

export async function getHotelRates(
  body: RateRequest
) {
  return request("/hotels/rates", {
    method: "POST",

    body: JSON.stringify(body),
  });
}

/* -------------------------------- */
/* Prebook */
/* -------------------------------- */

export async function prebook(
  offerId: string
) {
  return request("/hotels/prebook", {

    body: JSON.stringify({
      offerId,
    }),
  });
}

/* -------------------------------- */
/* Book */
/* -------------------------------- */

export async function bookHotel(
  body: any
) {
  return request("/hotels/book", {
    method: "POST",

    body: JSON.stringify(body),
  });
}
export interface PrebookRequest {
    offerId: string;
  }
  
  export async function prebookHotel(
    body: PrebookRequest
  ) {
    const response = await fetch(
      `${LITEAPI_BASE_URL}/rates/prebook`,
      {
        method: "POST",
  
        headers: {
          "Content-Type": "application/json",
  
          "X-API-Key": LITEAPI_API_KEY,
        },
  
        body: JSON.stringify(body),
      }
    );
  
    if (!response.ok) {
      throw new Error(
        await response.text()
      );
    }
  
    return response.json();
  }
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
    const response = await fetch(
      `${LITEAPI_BASE_URL}/book`,
      {
        method: "POST",
  
        headers: {
          "Content-Type": "application/json",
  
          "X-API-Key": LITEAPI_API_KEY,
        },
  
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
      }
    );
  
    if (!response.ok) {
      throw new Error(await response.text());
    }
  
    return response.json();
  }