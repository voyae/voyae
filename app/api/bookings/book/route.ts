import { NextRequest, NextResponse } from "next/server";

import { bookHotel } from "@/lib/liteapi";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { guest, prebook, transactionId } = body;

    if (!guest) {
      return NextResponse.json(
        {
          success: false,
          message: "Guest information is required.",
        },
        {
          status: 400,
        }
      );
    }

    const prebookId =
      prebook?.raw?.data?.prebookId ??
      prebook?.raw?.prebookId;

    if (!prebookId) {
      return NextResponse.json(
        {
          success: false,
          message: "prebookId not found.",
        },
        {
          status: 400,
        }
      );
    }

    const booking = await bookHotel({
      prebookId,

      firstName: guest.firstName,

      lastName: guest.lastName,

      email: guest.email,

      transactionId:
        transactionId ??
        "TEST_TRANSACTION",
    });

    return NextResponse.json({
      success: true,

      reference:
        booking.data?.bookingReference ??
        booking.bookingReference ??
        booking.data?.reference ??
        "",

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