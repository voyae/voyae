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
        mt-2
        sm:mt-4
        w-full
        overflow-hidden
        rounded-[24px]
        sm:rounded-[28px]
        border
        border-amber-500/30
        bg-[#101C3E]/95
        shadow-[0_20px_60px_rgba(0,0,0,.45)]
        backdrop-blur-2xl
      "
    >
      <div className="max-h-[360px] sm:max-h-[420px] overflow-y-auto overscroll-contain">

        {results.map((item, index) => (
          <button
            key={`${item.title}-${index}`}
            type="button"
            // Mobilde gecikmesiz ve net algılanması için hem onClick hem onTouchEnd desteklendi
            onMouseDown={(e) => {
              e.preventDefault(); // Inputun focus kaybını önler
              onSelect(item.title);
            }}
            className="
              flex
              w-full
              items-start
              gap-3
              sm:gap-4
              px-4
              sm:px-6
              py-3.5
              sm:py-4
              text-left
              transition
              hover:bg-slate-800/80
              active:bg-slate-800
              cursor-pointer
            "
          >
            <div
              className="
                mt-0.5
                flex
                h-10
                w-10
                sm:h-11
                sm:w-11
                shrink-0
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
                  text-sm
                  sm:text-[15px]
                  font-semibold
                  text-slate-100
                "
              >
                {item.title}
              </p>

              {item.subtitle && (
                <p
                  className="
                    mt-0.5
                    sm:mt-1
                    truncate
                    text-xs
                    sm:text-sm
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