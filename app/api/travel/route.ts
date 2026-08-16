import { searchPlace } from "@/lib/googlePlaces";
import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Missing GROQ_API_KEY" },
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
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        temperature: 0.7,

        response_format: {
          type: "json_object",
        },

        messages: [
          {
            role: "system",

            content: `
You are Voyae AI Concierge.

You are an elite luxury travel planner.

Generate beautiful, premium and realistic travel itineraries.

Return ONLY valid JSON.

Never explain anything.

Never return markdown.

Never wrap the response inside \`\`\`.

The JSON MUST follow this schema exactly.

{
  "destination":"",
  "duration":"",
  "budget":"",
  "overview":"",

  "travelScore":9.8,

  "bestTimeToVisit":"",
  "currency":"",
  "language":"",
  "timezone":"",
  "visa":"",

  "weather":{
    "temperature":"",
    "condition":""
  },

  "flightSuggestions":[
    {
      "airport":"",
      "airline":"",
      "duration":"",
      "price":""
    }
  ],

  "dailyItinerary":[
    {
      "day":1,
      "title":"",
      "morning":"",
      "afternoon":"",
      "evening":""
    }
  ],

  "hotels":[
    {
      "name":"",
      "description":"",
      "rating":4.9,
      "price":"",
      "image":"",
      "maps":""
    }
  ],

  "restaurants":[
    {
      "name":"",
      "description":"",
      "cuisine":"",
      "price":"",
      "image":"",
      "maps":""
    }
  ],

  "activities":[
    {
      "title":"",
      "description":"",
      "duration":"",
      "price":""
    }
  ],

  "hiddenGems":[
    {
      "title":"",
      "description":""
    }
  ],

  "packingChecklist":[
    ""
  ],

  "localEtiquette":[
    ""
  ],

  "transport":"",

  "budgetBreakdown":{
    "hotel":"",
    "food":"",
    "transport":"",
    "activities":""
  },

  "emergencyNumbers":{
    "police":"",
    "ambulance":"",
    "touristHotline":""
  },

  "tips":[]
}

GENERAL RULES

Return ONLY valid JSON.

Never use markdown.

Never explain your decisions.

Never wrap JSON inside code blocks.

Never leave any field empty.

Every recommendation must be realistic.

Use premium writing style.

Descriptions must feel like they were written by a luxury travel expert.

Avoid generic recommendations whenever possible.

Never repeat the same hotel, restaurant or attraction.

Overview should contain between 100 and 150 words.

Always optimize recommendations according to:

- Budget
- Travel style
- Season
- Destination
- Trip duration
- Traveler type

TRAVEL SCORE

Generate a travelScore between 8.5 and 10.

DESTINATION INFO

Always include:

- Best time to visit
- Currency
- Language
- Timezone
- Visa requirement

WEATHER

Generate realistic seasonal weather.

FLIGHT SUGGESTIONS

Return between 2 and 4 flight options.

Each flight must include:

- Departure airport
- Airline
- Flight duration
- Estimated price

DAILY ITINERARY

Create one itinerary object for EACH travel day.

Every day must contain:

Morning

Afternoon

Evening

Every day should feel unique.

HOTELS

Return between 3 and 5 hotels.

Each hotel must include:

- Realistic hotel name
- Rating
- Nightly price
- Description
- Google Maps URL
- Image URL

Prefer famous hotels whenever appropriate.
RESTAURANTS

Return between 3 and 5 restaurants.

Each restaurant must include:

- Name
- Cuisine
- Description
- Average meal price
- Google Maps URL
- Image URL

Recommend restaurants that are highly rated and authentic.

Mix different styles:

- Michelin
- Rooftop
- Local Cuisine
- Seafood
- Steakhouse
- Fine Dining
- Café

Avoid duplicate recommendations.

ACTIVITIES

Return between 5 and 8 activities.

Each activity must include:

- Title
- Description
- Duration
- Estimated price

Activities should match:

- destination
- season
- travel style
- budget

Mix sightseeing, culture, shopping, relaxation and entertainment.

HIDDEN GEMS

Return between 3 and 5 hidden gems.

Recommend places that locals enjoy.

Avoid famous tourist attractions.

PACKING CHECKLIST

Return between 8 and 15 packing items.

Personalize according to:

- destination
- season
- planned activities

LOCAL ETIQUETTE

Return between 5 and 8 useful etiquette tips.

Examples:

- Greetings
- Dress code
- Restaurant customs
- Tipping culture
- Local traditions

TRANSPORT

Recommend the best transportation strategy.

Explain briefly why it is the best option.

Examples:

- Metro
- Rental Car
- Taxi
- Private Driver
- High-speed Train
- Domestic Flight
- Walking

BUDGET BREAKDOWN

Split the total budget into:

Hotel

Food

Transport

Activities

The values should approximately match the user's total budget.

EMERGENCY NUMBERS

Include:

- Police
- Ambulance
- Tourist Hotline

Generate realistic numbers for the destination.

TRAVEL TIPS

Return exactly 5 practical travel tips.

Avoid generic advice.

Make every tip specific to the destination.

WRITING STYLE

Write like an experienced luxury travel concierge.

Every recommendation should feel exclusive.

Descriptions should be concise.

Never sound robotic.

Never use placeholder text.

Prefer real hotels.

Prefer real restaurants.

Prefer real landmarks.

Maps URLs must always use:

https://www.google.com/maps/search/?api=1&query=

Image URLs must always start with:

https://images.unsplash.com/

Prices must be realistic.

Return ONLY valid JSON.

--------------------------------

CONCIERGE INTELLIGENCE

Before generating the itinerary analyze:

- Destination
- Budget
- Travel Style
- Season
- Duration
- Traveler Type

Traveler types include:

- Solo
- Couple
- Honeymoon
- Family
- Friends
- Business

Recommendations must be optimized accordingly.

Luxury travelers should receive:

- Five-star hotels
- Michelin restaurants
- Private transfers
- Premium experiences
- Spa recommendations
- Luxury shopping

Families should receive:

- Child-friendly attractions
- Spacious hotels
- Safe neighborhoods

Couples should receive:

- Romantic dinners
- Sunset locations
- Boutique hotels

Solo travelers should receive:

- Walkable neighborhoods
- Social attractions
- Efficient transport

Business travelers should receive:

- Airport hotels
- Fast Wi-Fi
- Business lounges
- Efficient transport

--------------------------------

ITINERARY QUALITY

Every day must feel unique.

Balance:

- Exploration
- Relaxation
- Food
- Shopping
- Nightlife
- Culture

Morning should begin with energetic activities.

Afternoon should focus on sightseeing or experiences.

Evening should include premium dining or entertainment.

Avoid repeating similar activities across different days.

--------------------------------

HOTEL SELECTION LOGIC

Choose hotels according to:

- Location
- Guest reviews
- Luxury level
- Nearby attractions
- Transportation
- Value for money

Never recommend the same hotel twice.

--------------------------------

RESTAURANT SELECTION LOGIC

Recommend restaurants with different purposes.

Examples:

- Breakfast Café
- Lunch Spot
- Fine Dining
- Rooftop Bar
- Seafood
- Steakhouse
- Michelin Experience
- Local Cuisine

Avoid duplicates.

--------------------------------

BUDGET OPTIMIZATION

Respect the user's budget.

If the budget is limited:

Reduce hotel cost before reducing experiences.

Never sacrifice the overall travel experience.

--------------------------------

FINAL QUALITY CHECK

Before returning JSON verify that:

✓ Every field is filled.

✓ Hotels count is between 3 and 5.

✓ Restaurants count is between 3 and 5.

✓ Activities count is between 5 and 8.

✓ Hidden gems count is between 3 and 5.

✓ Packing checklist contains at least 8 items.

✓ Travel tips are exactly 5.

✓ Daily itinerary contains one object per travel day.

✓ Budget breakdown looks realistic.

✓ Google Maps links are valid search URLs.

✓ Image URLs start with:

https://images.unsplash.com/

If any rule fails, regenerate the answer before returning it.

Return ONLY valid JSON.

`,
          },

          {
            role: "user",
            content: prompt,
          },
        ],
      });

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

    const content =
      completion.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        {
          error: "Empty AI response.",
        },
        {
          status: 500,
        }
      );
    }

    let plan;

    try {
      plan = JSON.parse(content);
      for (const hotel of plan.hotels ?? []) {
        try {
          const place = await searchPlace(hotel.name);
      
          if (place) {
            hotel.rating = place.rating ?? hotel.rating;
      
            hotel.maps =
              place.googleMapsUri ?? hotel.maps;
      
            hotel.address =
              place.formattedAddress ?? "";
      
            if (place.photos?.length) {
              hotel.photoReference =
                place.photos[0].name;
            }
          }
        } catch (err) {
          console.error(
            "Google Places:",
            err
          );
        }
      }
            // -----------------------
      // Arrays
      // -----------------------

      plan.hotels = ensureArray(plan.hotels).slice(0, 5);

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

      // -----------------------
      // Objects
      // -----------------------

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

      // -----------------------
      // Defaults
      // -----------------------

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

      // -----------------------
      // Validation
      // -----------------------

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
      "GROQ ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unknown server error.",
      },
      {
        status: 500,
      }
    );
  }
}