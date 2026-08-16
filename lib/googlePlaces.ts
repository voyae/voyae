const API_KEY = process.env.GOOGLE_PLACES_API_KEY!;

export async function searchPlace(query: string) {
  const url = `https://places.googleapis.com/v1/places:searchText`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask":
        "places.displayName,places.formattedAddress,places.rating,places.photos,places.googleMapsUri",
    },
    body: JSON.stringify({
      textQuery: query,
    }),
  });

  if (!res.ok) {
    throw new Error("Google Places request failed.");
  }

  const data = await res.json();

  return data.places?.[0] ?? null;
}