import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch(
    "https://api-sandbox.nuitee.com/v1.0/search",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.NUITEE_API_KEY!,
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}