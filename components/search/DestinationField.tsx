"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

import { useSearch } from "@/hooks/useSearch";
import {
  Destination,
  SelectedDestination,
} from "./types";

import DestinationDropdown from "./DestinationDropdown";

export default function DestinationField() {
  const { setSearch } = useSearch();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");

  const [results, setResults] = useState<Destination[]>([]);

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [selected, setSelected] =
    useState<SelectedDestination | null>(null);

  /* ---------------- Click Outside ---------------- */

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  /* ---------------- Places Search ---------------- */

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/places?q=${encodeURIComponent(query)}`
        );

        const data = await res.json();

        const places: Destination[] =
          data.suggestions?.map((item: any) => ({
            title:
              item.placePrediction?.structuredFormat?.mainText
                ?.text ??
              item.placePrediction?.text?.text ??
              "",

            subtitle:
              item.placePrediction?.structuredFormat
                ?.secondaryText?.text ?? "",

            types:
              item.placePrediction?.types ?? [],
          })) ?? [];

        setResults(places);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  /* ---------------- Select ---------------- */

  function handleSelect(value: string) {
    const place = results.find(
      (item) => item.title === value
    );

    if (!place) return;

    const destination: SelectedDestination = {
      name: place.title,
      fullName: place.subtitle,
    };

    setSelected(destination);

    setSearch((prev) => ({
      ...prev,
      destination,
    }));

    setQuery(place.title);

    setOpen(false);

    setResults([]);
  }

  return (
    <div
      ref={wrapperRef}
      className="relative flex h-[88px] items-center gap-4 rounded-2xl px-6 transition hover:bg-neutral-50"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
        <MapPin
          size={22}
          className="text-emerald-700"
        />
      </div>

      <div className="flex-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-400">
          Destination
        </p>

        <input
          value={query}
          placeholder="City, hotel or destination"
          className="mt-1 w-full bg-transparent text-lg font-semibold outline-none placeholder:text-neutral-400"
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
        />

        {selected && (
          <p className="mt-1 truncate text-xs text-neutral-500">
            {selected.fullName}
          </p>
        )}
      </div>

      {loading && (
        <div className="absolute right-6 h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-emerald-600" />
      )}

      {open && (
        <DestinationDropdown
          results={results}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}