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

  /* ---------------- Click / Touch Outside (Mobilde ve Webde Kusursuz Çalışır) ---------------- */

  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    // Hem fare hem de mobil dokunma olayları dinleniyor
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
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
              item.placePrediction?.structuredFormat?.mainText?.text ??
              item.placePrediction?.text?.text ??
              "",

            subtitle:
              item.placePrediction?.structuredFormat?.secondaryText?.text ??
              "",

            placeId:
              item.placePrediction?.placeId ??
              item.placePrediction?.place ??
              "",

            types:
              item.placePrediction?.types ?? [],
          })) ?? [];

        setResults(places);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  /* ---------------- Select ---------------- */

  async function handleSelect(value: string) {
    const place = results.find(
      (item) => item.title === value
    );

    if (!place) return;

    try {
      setLoading(true);

      const res = await fetch(
        `/api/places/details?placeId=${place.placeId}`
      );

      const details = await res.json();

      if (!details.success) return;

      const destination: SelectedDestination = {
        name: details.name,
        fullName: details.address,

        placeId: details.placeId,

        city: details.city,

        country: details.country,

        countryCode: details.countryCode,

        latitude: details.latitude,

        longitude: details.longitude,
      };

      setSelected(destination);

      setSearch((prev) => ({
        ...prev,
        destination,
      }));

      setQuery(details.name);

      setOpen(false);

      setResults([]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      ref={wrapperRef}
      className="relative flex min-h-[76px] lg:h-[88px] items-center gap-3 sm:gap-4 rounded-2xl px-4 sm:px-6 transition bg-transparent hover:bg-slate-800/60"
    >
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
        <MapPin
          size={22}
          className="text-amber-400"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.3em] text-amber-400/90">
          Destination
        </p>

        <input
          value={query}
          placeholder="City, hotel or destination"
          className="mt-1 w-full bg-transparent text-base sm:text-lg font-semibold text-slate-100 outline-none placeholder:text-slate-400 truncate"
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
        />

        {selected && (
          <p className="mt-0.5 sm:mt-1 truncate text-xs text-slate-400">
            {selected.fullName}
          </p>
        )}
      </div>

      {loading && (
        <div className="absolute right-4 sm:right-6 h-5 w-5 animate-spin rounded-full border-2 border-slate-600 border-t-amber-400 shrink-0" />
      )}

      {open && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50">
          <DestinationDropdown
            results={results}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
}