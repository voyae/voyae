import { NextRequest, NextResponse } from "next/server";

import { getHotelRates } from "@/lib/liteapi";
import { mapHotels } from "@/lib/hotelMapper";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      hotelIds,
      checkin,
      checkout,
      occupancies,
      guestNationality,
      currency,
    } = body;

    if (!hotelIds?.length) {
      return NextResponse.json(
        {
          success: false,
          message: "hotelIds is required.",
        },
        {
          status: 400,
        }
      );
    }

    const response = await getHotelRates({
      hotelIds,
      checkin,
      checkout,
      occupancies,
      guestNationality,
      currency,
      roomMapping: true,
      maxRatesPerHotel: 5,
    });

    const hotels = mapHotels(
      response.data ??
        response.hotels ??
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
          error.message ??
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}