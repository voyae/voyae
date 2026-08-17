import { NextRequest, NextResponse } from "next/server";

import { getHotelDetails } from "@/lib/liteapi";

export async function GET(req: NextRequest) {
  try {
    const hotelId =
      req.nextUrl.searchParams.get(
        "hotelId"
      );

    if (!hotelId) {
      return NextResponse.json(
        {
          success: false,
          message: "hotelId is required.",
        },
        {
          status: 400,
        }
      );
    }

    const hotel =
      await getHotelDetails(hotelId);

    return NextResponse.json({
      success: true,
      hotel,
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