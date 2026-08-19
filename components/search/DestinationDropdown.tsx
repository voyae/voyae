"use client";

import {
  Building2,
  Hotel,
  Landmark,
  MapPin,
  Plane,
  Trees,
} from "lucide-react";

import { Destination } from "./types";

interface Props {
  results: Destination[];
  onSelect: (value: string) => void;
}

function getIcon(types: string[]) {
  if (types.includes("lodging")) {
    return <Hotel size={18} />;
  }

  if (types.includes("airport")) {
    return <Plane size={18} />;
  }

  if (types.includes("tourist_attraction")) {
    return <Trees size={18} />;
  }

  if (types.includes("administrative_area_level_1")) {
    return <Landmark size={18} />;
  }

  if (types.includes("locality")) {
    return <Building2 size={18} />;
  }

  return <MapPin size={18} />;
}

export default function DestinationDropdown({
  results,
  onSelect,
}: Props) {
  if (!results.length) return null;

  return (
    <div
      className="
      absolute
      left-0
      top-full
      z-50
      mt-4
      w-full

      overflow-hidden

      rounded-[28px]
      border
      border-amber-500/30

      bg-[#101C3E]

      shadow-[0_20px_60px_rgba(0,0,0,.35)]
      backdrop-blur-xl
      "
    >
      <div className="max-h-[420px] overflow-y-auto">

        {results.map((item, index) => (
          <button
            key={`${item.title}-${index}`}
            type="button"
            onClick={() => onSelect(item.title)}
            className="
            flex
            w-full
            items-start
            gap-4

            px-6
            py-4

            text-left

            transition

            hover:bg-slate-800/80
            "
          >
            <div
              className="
              mt-0.5

              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-xl

              bg-amber-500/10
              border
              border-amber-500/20

              text-amber-400
              "
            >
              {getIcon(item.types)}
            </div>

            <div className="min-w-0 flex-1">

              <p
                className="
                truncate

                text-[15px]
                font-semibold

                text-slate-100
                "
              >
                {item.title}
              </p>

              {item.subtitle && (
                <p
                  className="
                  mt-1

                  truncate

                  text-sm

                  text-slate-400
                  "
                >
                  {item.subtitle}
                </p>
              )}

            </div>
          </button>
        ))}

      </div>
    </div>
  );
}