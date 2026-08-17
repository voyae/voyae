import { NextRequest, NextResponse } from "next/server";

import { discoverHotelIds } from "@/lib/hotelDiscovery";
import { getHotelRates } from "@/lib/liteapi";
import { mapHotels } from "@/lib/hotelMapper";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      latitude,
      longitude,

      checkin,
      checkout,

      adults = 2,
      children = [],

      currency = "USD",
      guestNationality = "TR",
    } = body;

    if (
      latitude === undefined ||
      longitude === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "latitude and longitude are required.",
        },
        {
          status: 400,
        }
      );
    }

    const hotelIds = await discoverHotelIds(
      Number(latitude),
      Number(longitude),
      15000
    );

    if (!hotelIds.length) {
      return NextResponse.json({
        success: true,
        total: 0,
        hotels: [],
      });
    }

    const response: any = await getHotelRates({
      hotelIds: hotelIds.slice(0, 200),

      occupancies: [
        {
          adults,
          children,
        },
      ],

      guestNationality,

      currency,

      checkin,

      checkout,

      roomMapping: true,

      maxRatesPerHotel: 3,
    });

    const hotels = mapHotels(
      response.data ??
        response.hotels ??
        response
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