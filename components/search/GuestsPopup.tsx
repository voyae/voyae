"use client";

import { useEffect, useRef } from "react";
import { Minus, Plus, X } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";

interface Props {
  onClose: () => void;
}

export default function GuestsPopup({ onClose }: Props) {
  const { search, setSearch } = useSearch();
  const popupRef = useRef<HTMLDivElement>(null);

  // Dışarı tıklandığında kapanması için event listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const guests = search.guests;

  const updateAdults = (value: number) => {
    setSearch({
      ...search,
      guests: {
        ...guests,
        adults: Math.max(1, value),
      },
    });
  };

  const updateRooms = (value: number) => {
    setSearch({
      ...search,
      guests: {
        ...guests,
        rooms: Math.max(1, value),
      },
    });
  };

  const addChild = () => {
    setSearch({
      ...search,
      guests: {
        ...guests,
        children: [...guests.children, 5],
      },
    });
  };

  const removeChild = () => {
    if (!guests.children.length) return;

    setSearch({
      ...search,
      guests: {
        ...guests,
        children: guests.children.slice(0, -1),
      },
    });
  };

  const changeChildAge = (index: number, age: number) => {
    const children = [...guests.children];
    children[index] = age;

    setSearch({
      ...search,
      guests: {
        ...guests,
        children,
      },
    });
  };

  return (
    <div
      ref={popupRef}
      className="
        absolute
        right-0
        top-full
        z-50
        mt-3
        w-[360px]
        rounded-[28px]
        border
        border-neutral-200/80
        bg-white
        p-5
        shadow-[0_20px_50px_rgba(0,0,0,0.12)]
      "
    >
      <div className="mb-4 flex items-center justify-between border-b border-neutral-100 pb-3">
        <h3 className="text-lg font-semibold text-neutral-800">
          Guests & Rooms
        </h3>

        <button 
          onClick={onClose}
          className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Adults */}
      <Row
        title="Adults"
        subtitle="18+ years"
        value={guests.adults}
        onMinus={() => updateAdults(guests.adults - 1)}
        onPlus={() => updateAdults(guests.adults + 1)}
      />

      {/* Children */}
      <Row
        title="Children"
        subtitle="0-17 years"
        value={guests.children.length}
        onMinus={removeChild}
        onPlus={addChild}
      />

      {guests.children.length > 0 && (
        <div className="my-3 space-y-2 rounded-2xl bg-neutral-50 p-3.5 border border-neutral-100">
          <p className="text-xs font-semibold text-neutral-600">
            Children's ages
          </p>

          <div className="max-h-32 overflow-y-auto space-y-2 pr-1">
            {guests.children.map((age, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-neutral-600">
                  Child {index + 1}
                </span>

                <select
                  value={age}
                  onChange={(e) =>
                    changeChildAge(
                      index,
                      Number(e.target.value)
                    )
                  }
                  className="
                    rounded-xl
                    border
                    border-neutral-200
                    bg-white
                    px-2.5
                    py-1.5
                    text-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-emerald-500/20
                  "
                >
                  {Array.from(
                    { length: 18 },
                    (_, i) => (
                      <option
                        key={i}
                        value={i}
                      >
                        {i} years
                      </option>
                    )
                  )}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rooms */}
      <div className="border-t border-neutral-100 pt-1">
        <Row
          title="Rooms"
          subtitle="Number of rooms"
          value={guests.rooms}
          onMinus={() => updateRooms(guests.rooms - 1)}
          onPlus={() => updateRooms(guests.rooms + 1)}
        />
      </div>

      {/* Pets */}
      <label className="mt-3 flex cursor-pointer items-center justify-between rounded-2xl border border-neutral-200/80 p-3.5 hover:bg-neutral-50/50 transition-colors">
        <div>
          <p className="text-sm font-semibold text-neutral-800">
            Travelling with pets
          </p>

          <p className="text-xs text-neutral-500">
            Show pet friendly stays
          </p>
        </div>

        <input
          type="checkbox"
          checked={guests.pets}
          onChange={(e) =>
            setSearch({
              ...search,
              guests: {
                ...guests,
                pets: e.target.checked,
              },
            })
          }
          className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500"
        />
      </label>

      <button
        onClick={onClose}
        className="
          mt-5
          h-11
          w-full
          rounded-xl
          bg-emerald-600
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-emerald-700
          shadow-sm
        "
      >
        Done
      </button>
    </div>
  );
}

interface RowProps {
  title: string;
  subtitle: string;
  value: number;
  onMinus: () => void;
  onPlus: () => void;
}

function Row({
  title,
  subtitle,
  value,
  onMinus,
  onPlus,
}: RowProps) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div>
        <p className="text-sm font-semibold text-neutral-800">
          {title}
        </p>

        <p className="text-xs text-neutral-500">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          onClick={onMinus}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            border-neutral-200
            text-neutral-600
            hover:border-neutral-400
            transition-colors
          "
        >
          <Minus size={14} />
        </button>

        <span className="w-5 text-center text-sm font-semibold text-neutral-800">
          {value}
        </span>

        <button
          onClick={onPlus}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            border-neutral-200
            text-neutral-600
            hover:border-neutral-400
            transition-colors
          "
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}