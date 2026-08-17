import { NextRequest, NextResponse } from "next/server";

import {
  getHotelDetails,
  getHotelRates,
} from "@/lib/liteapi";

import { mapHotels } from "@/lib/hotelMapper";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      hotelIds,
      checkin,
      checkout,
      occupancies,
      guestNationality,
      currency,
    } = body;

    if (
      !Array.isArray(hotelIds) ||
      hotelIds.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "hotelIds is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* -------------------------------
       HOTEL RATES
    -------------------------------- */

    const ratesResponse =
      await getHotelRates({
        hotelIds,
        checkin,
        checkout,
        occupancies,
        guestNationality,
        currency,
        roomMapping: true,
        maxRatesPerHotel: 5,
      });

    const rateHotels =
      ratesResponse.data ??
      ratesResponse.hotels ??
      [];

    /* -------------------------------
       HOTEL DETAILS
    -------------------------------- */

    const detailHotels =
      await Promise.all(
        hotelIds.map(
          async (hotelId: string) => {
            try {
              const response =
                await getHotelDetails(
                  hotelId
                );

              return (
                response.data ??
                response.hotel ??
                response
              );
            } catch (err) {
              console.error(
                "Hotel detail failed:",
                hotelId
              );

              return null;
            }
          }
        )
      );

    /* -------------------------------
       MERGE
    -------------------------------- */

    const merged = detailHotels
      .filter(Boolean)
      .map((detail: any) => {
        const hotelId =
          detail.id ??
          detail.hotelId;

        const rate =
          rateHotels.find(
            (item: any) =>
              item.id === hotelId ||
              item.hotelId ===
                hotelId
          ) ?? {};

        return {
          ...detail,

          rates:
            rate.rates ??
            [],

          roomTypes:
            rate.roomTypes ??
            [],

          rooms:
            rate.rooms ??
            [],
        };
      });

    /* -------------------------------
       MAP
    -------------------------------- */

    const hotels =
      mapHotels(merged);

    return NextResponse.json({
      success: true,
      total: hotels.length,
      hotels,
    });
  } catch (error: any) {
    console.error(
      "Hotel Search Error",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ??
          "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}