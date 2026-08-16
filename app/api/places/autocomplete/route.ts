import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const input = searchParams.get("input");

  if (!input) {
    return NextResponse.json({
      predictions: [],
    });
  }

  const url =
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?` +
    `input=${encodeURIComponent(input)}` +
    `&types=(cities)` +
    `&language=en` +
    `&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  const res = await fetch(url);

  const data = await res.json();

  return NextResponse.json({
    predictions: data.predictions.map((item: any) => item.description),
  });
}