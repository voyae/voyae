import { searchPlace } from "@/lib/googlePlaces";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const completion =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",

        contents: SYSTEM_PROMPT.replace(
          "${prompt}",
          prompt
        ),

        config: {
          temperature: 0.7,
          responseMimeType: "application/json",
        },
      });

    const content = completion.text;

    if (!content) {
      return NextResponse.json(
        { error: "Empty AI response." },
        { status: 500 }
      );
    }
    function ensureArray<T>(
      value: T[] | undefined | null
    ): T[] {
      return Array.isArray(value)
        ? value
        : [];
    }

    function ensureObject<T>(
      value: T | undefined | null,
      fallback: T
    ): T {
      return value ?? fallback;
    }

    let plan;

    try {
      plan = JSON.parse(content);

      for (const hotel of plan.hotels ?? []) {
        try {
          const place = await searchPlace(
            `${hotel.name} ${plan.destination}`
          );

          if (!place) continue;

          hotel.rating =
            place.rating ?? hotel.rating;

          hotel.maps =
            place.googleMapsUri ??
            hotel.maps;

          hotel.address =
            place.formattedAddress ?? "";

          hotel.image =
            place.photoUrl ?? "";

        } catch (err) {
          console.error(
            "Google Places:",
            err
          );
        }
      }

      for (const restaurant of plan.restaurants ?? []) {
        try {
          const place = await searchPlace(
            `${restaurant.name} ${plan.destination}`
          );

          if (!place) continue;

          restaurant.rating =
            place.rating ??
            restaurant.rating;

          restaurant.maps =
            place.googleMapsUri ??
            restaurant.maps;

          restaurant.address =
            place.formattedAddress ?? "";

          restaurant.image =
            place.photoUrl ?? "";

        } catch (err) {
          console.error(
            "Google Places:",
            err
          );
        }
      }
      plan.hotels = ensureArray(
        plan.hotels
      ).slice(0, 5);

      plan.restaurants = ensureArray(
        plan.restaurants
      ).slice(0, 5);

      plan.activities = ensureArray(
        plan.activities
      ).slice(0, 8);

      plan.flightSuggestions = ensureArray(
        plan.flightSuggestions
      ).slice(0, 4);

      plan.dailyItinerary = ensureArray(
        plan.dailyItinerary
      );

      plan.hiddenGems = ensureArray(
        plan.hiddenGems
      ).slice(0, 5);

      plan.packingChecklist = ensureArray(
        plan.packingChecklist
      );

      plan.localEtiquette = ensureArray(
        plan.localEtiquette
      );

      plan.tips = ensureArray(
        plan.tips
      ).slice(0, 5);

      plan.weather = ensureObject(
        plan.weather,
        {
          temperature: "N/A",
          condition: "Unknown",
        }
      );

      plan.budgetBreakdown = ensureObject(
        plan.budgetBreakdown,
        {
          hotel: "-",
          food: "-",
          transport: "-",
          activities: "-",
        }
      );

      plan.emergencyNumbers = ensureObject(
        plan.emergencyNumbers,
        {
          police: "-",
          ambulance: "-",
          touristHotline: "-",
        }
      );

      plan.travelScore =
        typeof plan.travelScore === "number"
          ? plan.travelScore
          : 9.5;

      plan.bestTimeToVisit ??=
        "All year";

      plan.currency ??=
        "Unknown";

      plan.language ??=
        "Unknown";

      plan.timezone ??=
        "Unknown";

      plan.visa ??=
        "Check official requirements";

      if (!plan.destination) {
        throw new Error(
          "Destination missing."
        );
      }

      if (!plan.overview) {
        throw new Error(
          "Overview missing."
        );
      }
    } catch (err) {
      console.error(
        "Invalid JSON:"
      );

      console.error(content);

      return NextResponse.json(
        {
          error:
            "AI returned invalid JSON.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(plan);

  } catch (error: any) {
    console.error(
      "GEMINI ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ??
          "Unknown server error.",
      },
      {
        status: 500,
      }
    );
  }
}