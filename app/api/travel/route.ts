import { searchPlace } from "@/lib/googlePlaces";
import { getSystemPrompt } from "@/lib/systemPrompt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GROQ_API_KEY environment variable." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const prompt = body?.prompt;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "system",
            content: "You are an elite travel planner. You MUST provide at least 3 to 4 real, existing hotels, restaurants and landmarks matching the user's budget. IMPORTANT: Provide realistic, market-accurate nightly rates for hotels (e.g. price field like '85' or '120') and meal prices for restaurants instead of generic placeholders. Return ONLY valid JSON matching the exact requested schema. Never use markdown."
          },
          {
            role: "user",
            content: getSystemPrompt(prompt),
          }
        ],
        temperature: 0.4, // Fiyatların sallama olmasını engellemek için biraz daha kararlı çıktı
        response_format: { type: "json_object" },
        reasoning_format: "hidden"
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data?.error?.message || "Groq API communication failed.";
      console.error("GROQ API ERROR:", data);
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    const rawContent = data.choices?.[0]?.message?.content;

    if (!rawContent) {
      return NextResponse.json({ error: "Empty AI response received." }, { status: 500 });
    }

    let content = rawContent.trim();
    if (content.startsWith("```json")) {
      content = content.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (content.startsWith("```")) {
      content = content.replace(/^```/, "").replace(/```$/, "").trim();
    }

    function ensureArray<T>(value: T[] | undefined | null): T[] {
      return Array.isArray(value) ? value : [];
    }

    function ensureObject<T>(value: T | undefined | null, fallback: T): T {
      return value ?? fallback;
    }

    let plan;

    try {
      plan = JSON.parse(content);

      // Otelleri Google Places ile zenginleştir ve rezervasyon linki ekle
      for (const hotel of plan.hotels ?? []) {
        try {
          const place = await searchPlace(`${hotel.name} ${plan.destination}`);
          if (place) {
            hotel.name = place.name ?? hotel.name;
            hotel.rating = place.rating ?? hotel.rating;
            hotel.maps = place.googleMapsUri ?? hotel.maps;
            hotel.address = place.formattedAddress ?? "";
            hotel.image = place.photoUrl ?? "";
          }
          // Doğrudan rezervasyon / inceleme yönlendirmesi
          hotel.bookingUrl = `https://www.google.com/travel/hotels/s?q=${encodeURIComponent(hotel.name + " " + plan.destination)}`;
          // Boş gelen fiyatlar için güvenlik önlemi
          if (!hotel.price) hotel.price = "75"; 
        } catch (err) {
          console.error("Google Places Hotel Error:", err);
        }
      }

      // Restoranları Google Places ile zenginleştir
      for (const restaurant of plan.restaurants ?? []) {
        try {
          const place = await searchPlace(`${restaurant.name} ${plan.destination}`);
          if (place) {
            restaurant.name = place.name ?? restaurant.name;
            restaurant.rating = place.rating ?? restaurant.rating;
            restaurant.maps = place.googleMapsUri ?? restaurant.maps;
            restaurant.address = place.formattedAddress ?? "";
            restaurant.image = place.photoUrl ?? "";
          }
          if (!restaurant.price) restaurant.price = "20";
        } catch (err) {
          console.error("Google Places Restaurant Error:", err);
        }
      }

      plan.hotels = ensureArray(plan.hotels).slice(0, 4);
      plan.restaurants = ensureArray(plan.restaurants).slice(0, 4);
      plan.activities = ensureArray(plan.activities).slice(0, 6);
      plan.flightSuggestions = ensureArray(plan.flightSuggestions).slice(0, 3);
      plan.dailyItinerary = ensureArray(plan.dailyItinerary);
      plan.hiddenGems = ensureArray(plan.hiddenGems).slice(0, 4);

      plan.weather = ensureObject(plan.weather, { temperature: "N/A", condition: "Unknown" });
      plan.budgetBreakdown = ensureObject(plan.budgetBreakdown, { hotel: "-", food: "-", transport: "-", activities: "-" });
      plan.emergencyNumbers = ensureObject(plan.emergencyNumbers, { police: "-", ambulance: "-", touristHotline: "-" });

      plan.travelScore = typeof plan.travelScore === "number" ? plan.travelScore : 9.2;
      plan.currency ??= "€";

      if (!plan.destination || !plan.overview) {
        throw new Error("Essential itinerary details are missing.");
      }

    } catch (parseErr) {
      console.error("JSON Parse Error. Raw content was:", content);
      return NextResponse.json(
        { error: "AI generated an invalid data format. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(plan);

  } catch (error: any) {
    console.error("SERVER ROUTE ERROR:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error." },
      { status: 500 }
    );
  }
}