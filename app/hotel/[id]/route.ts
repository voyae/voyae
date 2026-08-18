import { NextRequest, NextResponse } from "next/server";
import { getHotelDetails } from "@/lib/liteapi";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    const hotel = await getHotelDetails(params.id);

    return NextResponse.json({
      success: true,
      hotel: hotel,
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        message: e.message,
      },
      {
        status: 500,
      }
    );
  }
}