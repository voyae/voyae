import { NextRequest, NextResponse } from "next/server";
import { discoverHotels } from "@/lib/hotelDiscovery";
import { mapHotels } from "@/lib/hotelMapper";

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

    const rawResponse =
      await discoverHotels(
        countryCode,
        city
      );

    const hotelsList = Array.isArray(rawResponse)
      ? rawResponse
      : (rawResponse as any)?.hotels ?? (rawResponse as any)?.data ?? [];

    const hotels = mapHotels(hotelsList);

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