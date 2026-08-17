import { NextRequest, NextResponse } from "next/server";

import { discoverHotelIds } from "@/lib/hotelDiscovery";

export async function POST(req: NextRequest) {
  try {
    const { countryCode, city } = await req.json();

    if (!countryCode || !city) {
      return NextResponse.json(
        {
          success: false,
          message: "countryCode and city are required.",
        },
        { status: 400 }
      );
    }

    const hotelIds = await discoverHotelIds(
      countryCode,
      city
    );

    return NextResponse.json({
      success: true,
      total: hotelIds.length,
      hotelIds,
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