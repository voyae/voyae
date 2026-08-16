import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { searchPlace } from "@/lib/googlePlaces";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: "Missing GEMINI_API_KEY",
        },
        {
          status: 500,
        }
      );
    }

    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        {
          error: "Prompt is required.",
        },
        {
          status: 400,
        }
      );
    }

    const completion = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: `