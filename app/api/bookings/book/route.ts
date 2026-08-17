import { NextRequest, NextResponse } from "next/server";

import { bookHotel } from "@/lib/liteapi";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      prebookId,
      firstName,
      lastName,
      email,
      transactionId,
    } = body;

    if (!prebookId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "prebookId is required.",
        },
        {
          status: 400,
        }
      );
    }

    const booking =
      await bookHotel({
        prebookId,
        firstName,
        lastName,
        email,
        transactionId,
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
          "Booking failed.",
      },
      {
        status: 500,
      }
    );
  }
}