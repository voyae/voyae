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
    
      languageCode: "en",
    
      regionCode: "TR",
    
      maxResultCount: 1,
    }),
  });

  if (!res.ok) {
    throw new Error("Google Places request failed.");
  }

  const data = await res.json();

  const place = data.places?.[0];

  if (!place) return null;
  
  const photoReference = place.photos?.[0]?.name;

const photoUrl = photoReference
  ? `https://places.googleapis.com/v1/${photoReference}/media?maxWidthPx=1200&key=${API_KEY}`
  : "";
  
  return {
    ...place,
    photoUrl,
  };
}