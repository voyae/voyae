import { NextRequest, NextResponse } from "next/server";

import { discoverHotelIds } from "@/lib/hotelDiscovery";
import { getHotelRates } from "@/lib/liteapi";
import { mapHotels } from "@/lib/hotelMapper";

export async function POST(req: NextRequest) {
  try {
    const {
      city,
      countryCode,
      checkin,
      checkout,
      adults,
      currency = "USD",
      guestNationality = "TR",
    } = await req.json();

    if (!city || !countryCode) {
      return NextResponse.json(
        {
          success: false,
          message: "city and countryCode are required.",
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------
       STEP 1
       Discover Hotel IDs
    ---------------------------------------------------*/

    const hotelIds = await discoverHotelIds(
      countryCode,
      city
    );

    if (hotelIds.length === 0) {
      return NextResponse.json({
        success: true,
        total: 0,
        hotels: [],
      });
    }

    /* --------------------------------------------------
       STEP 2
       Search Rates
    ---------------------------------------------------*/

    const rates = await getHotelRates({
      hotelIds,

      occupancies: [
        {
          adults: adults ?? 2,
        },
      ],

      guestNationality,

      currency,

      checkin,

      checkout,

      roomMapping: true,

      maxRatesPerHotel: 5,
    });

    /* --------------------------------------------------
       STEP 3
       Normalize
    ---------------------------------------------------*/

    const hotels = mapHotels(
      rates.data ??
      rates.hotels ??
      []
    );

    return NextResponse.json({
      success: true,

      total: hotels.length,

      hotels,
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,

        message:
          error?.message ??
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}