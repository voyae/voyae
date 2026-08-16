"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import DestinationDropdown from "./DestinationDropdown";

type Place = {
  title: string;
  subtitle: string;
  types: string[];
};

type SelectedDestination = {
  name: string;
  fullName: string;
};

export default function DestinationField() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [open, setOpen] = useState(false);

  const [selectedDestination, setSelectedDestination] =
    useState<SelectedDestination | null>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/places?q=${encodeURIComponent(query)}`
        );

        const data = await res.json();

        const places: Place[] =
          data.suggestions?.map((item: any) => ({
            title:
              item.placePrediction?.structuredFormat?.mainText?.text ??
              item.placePrediction?.text?.text ??
              "",

            subtitle:
              item.placePrediction?.structuredFormat?.secondaryText?.text ??
              "",

            types:
              item.placePrediction?.types ?? [],
          })) ?? [];

        setResults(places);
      } catch {
        setResults([]);
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="relative flex h-[88px] items-center gap-4 rounded-2xl px-6 transition hover:bg-neutral-50">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
        <MapPin
          size={22}
          className="text-emerald-700"
        />
      </div>

      <div className="w-full">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-400">
          Destination
        </p>

        <input
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          placeholder="City, hotel or destination"
          className="mt-1 w-full bg-transparent text-lg font-semibold outline-none placeholder:text-neutral-400"
        />
      </div>

      {open && (
        <DestinationDropdown
          results={results}
          onSelect={(value) => {
            const place = results.find((p) => p.title === value);

            if (place) {
              setSelectedDestination({
                name: place.title,
                fullName: place.subtitle,
              });
            }

            setQuery(value);
            setOpen(false);
            setResults([]);
          }}
        />
      )}
    </div>
  );
}