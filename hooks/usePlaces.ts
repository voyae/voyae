"use client";

import { useEffect, useState } from "react";

export default function usePlaces(query: string) {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/places/autocomplete?input=${encodeURIComponent(query)}`
        );

        const data = await res.json();

        setResults(data.predictions || []);
      } catch {
        setResults([]);
      }

      setLoading(false);
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  return {
    results,
    loading,
  };
}