import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const placeId = req.nextUrl.searchParams.get("placeId");

    if (!placeId) {
      return NextResponse.json(
        {
          success: false,
          message: "placeId is required.",
        },
        {
          status: 400,
        }
      );
    }

    const url =
      `https://places.googleapis.com/v1/places/${placeId}` +
      "?fields=id,displayName,formattedAddress,addressComponents,location";

    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key":
          process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    const components = data.addressComponents ?? [];

    const getComponent = (type: string) =>
      components.find((c: any) =>
        c.types?.includes(type)
      )?.longText ?? "";

    const getShortComponent = (type: string) =>
      components.find((c: any) =>
        c.types?.includes(type)
      )?.shortText ?? "";

    return NextResponse.json({
      success: true,

      placeId: data.id,

      name: data.displayName?.text ?? "",

      address: data.formattedAddress ?? "",

      city:
        getComponent("locality") ||
        getComponent("administrative_area_level_1"),

      country: getComponent("country"),

      countryCode: getShortComponent("country"),

      latitude: data.location?.latitude,

      longitude: data.location?.longitude,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}