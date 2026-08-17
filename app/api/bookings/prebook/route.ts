import { NextRequest, NextResponse } from "next/server";

import { prebookHotel } from "@/lib/liteapi";
import { mapPrebook } from "@/lib/bookingMapper";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { offerId } = body;

    if (!offerId) {
      return NextResponse.json(
        {
          success: false,
          message: "offerId is required.",
        },
        {
          status: 400,
        }
      );
    }

    const response = await prebookHotel({
      offerId,
    });

    const rooms = mapPrebook(
      response.data ?? response
    );

    return NextResponse.json({
      success: true,

      rooms,

      raw: response,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,

        message:
          error.message ??
          "Unexpected server error.",
      },
      {
        status: 500,
      }
    );
  }
}