const API_KEY = process.env.NUITEE_API_KEY!;
const PUBLIC_KEY = process.env.NUITEE_PUBLIC_KEY!;

const BASE_URL = "https://api.connect.nuitee.com";

export async function searchHotels(body: any) {
  const res = await fetch(`${BASE_URL}/search`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      "x-api-key": API_KEY,

      "x-public-key": PUBLIC_KEY,
    },

    body: JSON.stringify(body),

    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}