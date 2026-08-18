import { NextRequest, NextResponse } from "next/server";

import { bookHotel } from "@/lib/liteapi";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      prebookId,
      holder,
      guests,
      payment,
    } = body;

    if (!prebookId) {
      return NextResponse.json(
        {
          success: false,
          message: "prebookId is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!holder) {
      return NextResponse.json(
        {
          success: false,
          message: "holder is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !Array.isArray(guests) ||
      guests.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "guests are required.",
        },
        {
          status: 400,
        }
      );
    }

    const booking = await bookHotel({
      prebookId,
      holder,
      guests,
      payment,
    });

    return NextResponse.json({
      success: true,
      booking,
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