import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");

  if (!query) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const res = await fetch(
      "https://places.googleapis.com/v1/places:autocomplete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
          "X-Goog-FieldMask":
"suggestions.placePrediction.placeId,suggestions.placePrediction.text,suggestions.placePrediction.structuredFormat,suggestions.placePrediction.types",
        },
        body: JSON.stringify({
          input: query,
          includedPrimaryTypes: [
            "locality",
            "administrative_area_level_1",
            "country",
            "lodging",
            "tourist_attraction",
          ],
          languageCode: "en",
          regionCode: "TR",
        }),
      }
    );

    if (!res.ok) {
      const error = await res.text();
      console.error(error);

      return NextResponse.json(
        { suggestions: [] },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { suggestions: [] },
      { status: 500 }
    );
  }
}