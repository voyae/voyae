"use client";

import {
    MapPin,
    Hotel,
    Globe,
    Palmtree,
    Building2,
  } from "lucide-react";

type Place = {
  title: string;
  subtitle: string;
  types: string[];
};

interface Props {
  results: Place[];
  onSelect: (value: string) => void;
}
function PlaceIcon({ types }: { types: string[] }) {
    if (types.includes("lodging"))
      return <Hotel size={18} className="text-emerald-700" />;
  
    if (types.includes("country"))
      return <Globe size={18} className="text-emerald-700" />;
  
    if (types.includes("tourist_attraction"))
      return <Palmtree size={18} className="text-emerald-700" />;
  
    if (types.includes("administrative_area_level_1"))
      return <Building2 size={18} className="text-emerald-700" />;
  
    return <MapPin size={18} className="text-emerald-700" />;
  }
export default function DestinationDropdown({
  results,
  onSelect,
}: Props) {
  if (!results.length) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl">
      {results.map((item, index) => (
        <button
          key={index}
          onClick={() => onSelect(item.title)}
          className="flex w-full items-start gap-4 px-5 py-4 text-left transition hover:bg-neutral-50"
        >
          <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50">
          <PlaceIcon types={item.types} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold text-neutral-900">
              {item.title}
            </p>

            {item.subtitle && (
              <p className="truncate text-sm text-neutral-500">
                {item.subtitle}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}