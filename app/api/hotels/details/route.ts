import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const hotelId =
      req.nextUrl.searchParams.get("hotelId");

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

    const response = await fetch(
      `https://api.liteapi.travel/v3.0/data/hotel?hotelId=${hotelId}`,
      {
        headers: {
          accept: "application/json",

          "X-API-Key":
            process.env.NUITEE_API_KEY!,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    return NextResponse.json({
      success: true,

      hotel: data.data,
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