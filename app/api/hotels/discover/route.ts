import { NextRequest, NextResponse } from "next/server";

import {
  discoverHotels,
} from "@/lib/hotelDiscovery";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      countryCode,
      city,
    } = body;

    if (!countryCode || !city) {
      return NextResponse.json(
        {
          success: false,
          message:
            "countryCode and city are required.",
        },
        {
          status: 400,
        }
      );
    }

    const hotels =
      await discoverHotels(
        countryCode,
        city
      );

    return NextResponse.json({
      success: true,

      total: hotels.length,

      hotels,
    });
  } catch (error: any) {
    console.error(
      "Hotel Discover Error",
      error
    );

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