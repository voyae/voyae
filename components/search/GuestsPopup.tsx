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
        w-[380px]
        rounded-[24px]
        border
        border-amber-500/30
        bg-[#101C3E]
        p-5
        shadow-[0_20px_50px_rgba(0,0,0,.4)]
        backdrop-blur-xl
        animate-in
        fade-in
        zoom-in-95
        duration-200
        text-slate-100
      "
    >
      <div className="mb-4 flex items-center justify-between border-b border-amber-500/20 pb-3">
        <h3 className="text-lg font-semibold text-slate-100">
          Guests & Rooms
        </h3>

        <button 
          onClick={onClose}
          className="rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors cursor-pointer"
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
        <div className="my-3 space-y-2 rounded-2xl bg-slate-900/40 p-3.5 border border-amber-500/20">
          <p className="text-xs font-semibold text-slate-200">
            Children's ages
          </p>

          <div className="max-h-32 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {guests.children.map((age, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-slate-300">
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
                    border-amber-500/30
                    bg-slate-900
                    text-slate-200
                    px-2.5
                    py-1.5
                    text-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-amber-500/30
                    cursor-pointer
                  "
                >
                  {Array.from(
                    { length: 18 },
                    (_, i) => (
                      <option
                        key={i}
                        value={i}
                        className="bg-slate-900 text-slate-200"
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
      <div className="border-t border-amber-500/20 pt-1">
        <Row
          title="Rooms"
          subtitle="Number of rooms"
          value={guests.rooms}
          onMinus={() => updateRooms(guests.rooms - 1)}
          onPlus={() => updateRooms(guests.rooms + 1)}
        />
      </div>

      {/* Pets */}
      <label className="mt-3 flex cursor-pointer items-center justify-between rounded-2xl border border-amber-500/20 bg-slate-900/40 p-3.5 hover:bg-slate-900/70 transition-colors">
        <div>
          <p className="text-sm font-semibold text-slate-100">
            Travelling with pets
          </p>

          <p className="text-xs text-slate-400">
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
          className="h-4 w-4 rounded border-amber-500/40 bg-slate-800 text-amber-500 focus:ring-0 cursor-pointer accent-amber-500"
        />
      </label>

      <button
        onClick={onClose}
        className="
          mt-5
          h-11
          w-full
          rounded-full
          bg-amber-500
          text-xs
          font-semibold
          text-slate-950
          transition
          hover:bg-amber-400
          shadow-md
          cursor-pointer
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
        <p className="text-sm font-semibold text-slate-100">
          {title}
        </p>

        <p className="text-xs text-slate-400">
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
            border-amber-500/30
            text-slate-200
            hover:bg-amber-500/20
            transition-colors
            cursor-pointer
          "
        >
          <Minus size={14} />
        </button>

        <span className="w-5 text-center text-sm font-semibold text-slate-100">
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
            border-amber-500/30
            text-slate-200
            hover:bg-amber-500/20
            transition-colors
            cursor-pointer
          "
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}