"use client";

import { Minus, Plus, X } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";

interface Props {
  onClose: () => void;
}

export default function GuestsPopup({ onClose }: Props) {
  const { search, setSearch } = useSearch();

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
      className="
      absolute
      right-0
      top-full
      z-50
      mt-4
      w-[420px]
      rounded-3xl
      border
      border-neutral-200
      bg-white
      p-7
      shadow-[0_30px_80px_rgba(0,0,0,.15)]
      "
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          Guests & Rooms
        </h3>

        <button onClick={onClose}>
          <X size={20} />
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
        <div className="mt-5 space-y-3 rounded-2xl bg-neutral-50 p-4">
          <p className="text-sm font-medium">
            Children's ages
          </p>

          {guests.children.map((age, index) => (
            <div
              key={index}
              className="flex items-center justify-between"
            >
              <span>
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
                px-3
                py-2
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
      )}

      {/* Rooms */}

      <div className="mt-6">
        <Row
          title="Rooms"
          subtitle="Number of rooms"
          value={guests.rooms}
          onMinus={() => updateRooms(guests.rooms - 1)}
          onPlus={() => updateRooms(guests.rooms + 1)}
        />
      </div>

      {/* Pets */}

      <label className="mt-6 flex cursor-pointer items-center justify-between rounded-2xl border p-4">
        <div>
          <p className="font-semibold">
            Travelling with pets
          </p>

          <p className="text-sm text-neutral-500">
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
          className="h-5 w-5"
        />
      </label>

      <button
        onClick={onClose}
        className="
        mt-7
        h-12
        w-full
        rounded-2xl
        bg-emerald-600
        font-semibold
        text-white
        transition
        hover:bg-emerald-700
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
    <div className="flex items-center justify-between py-3">

      <div>
        <p className="font-semibold">
          {title}
        </p>

        <p className="text-sm text-neutral-500">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={onMinus}
          className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border
          "
        >
          <Minus size={16} />
        </button>

        <span className="w-6 text-center font-semibold">
          {value}
        </span>

        <button
          onClick={onPlus}
          className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border
          "
        >
          <Plus size={16} />
        </button>

      </div>
    </div>
  );
}