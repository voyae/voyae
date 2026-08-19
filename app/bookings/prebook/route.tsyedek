import { NextRequest, NextResponse } from "next/server";

import { prebookHotel } from "@/lib/liteapi";

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

    const result = await prebookHotel({
      offerId,
    });

    return NextResponse.json({
      success: true,
      prebook: result,
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