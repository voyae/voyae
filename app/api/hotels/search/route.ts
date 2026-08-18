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

    // LITEAPI'DEN GELEN HAM YANITI TERMINALDE GÖRMEK İÇİN:
    console.log("--- LITEAPI RATES RESPONSE ---", JSON.stringify(ratesResponse, null, 2));

    const rateHotels =
      ratesResponse.data ??
      ratesResponse.hotels ??
      (Array.isArray(ratesResponse) ? ratesResponse : []);

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
          String(detail.id ?? detail.hotelId ?? "");

        const rate =
          rateHotels.find(
            (item: any) =>
              String(item.id ?? item.hotelId ?? "") === hotelId
          ) ?? {};

        return {
          ...detail,
          raw: rate,
          rates:
            rate.rates ??
            rate.roomTypes ??
            rate.rooms ??
            [],
          roomTypes:
            rate.roomTypes ??
            rate.rooms ??
            rate.rates ??
            [],
          rooms:
            rate.rooms ??
            rate.roomTypes ??
            rate.rates ??
            [],
        };
      });

    /* -------------------------------
        MAP
    -------------------------------- */

    const mappedHotels = mapHotels(merged);

    const finalHotels = mappedHotels.map((mappedHotel: any, index: number) => {
      const original = merged[index];
      return {
        ...mappedHotel,
        rooms: mappedHotel.rooms?.length > 0 ? mappedHotel.rooms : (original?.rooms ?? original?.roomTypes ?? original?.rates ?? []),
        roomTypes: mappedHotel.roomTypes?.length > 0 ? mappedHotel.roomTypes : (original?.roomTypes ?? original?.rooms ?? original?.rates ?? []),
        raw: original?.raw ?? original,
      };
    });

    return NextResponse.json({
      success: true,
      total: finalHotels.length,
      hotels: finalHotels,
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