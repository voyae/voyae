"use client";

import { useState } from "react";

export interface SearchFiltersState {
  minPrice: number;
  maxPrice: number;
  stars: number[];
  breakfast: boolean;
  freeCancellation: boolean;
  refundable: boolean;
}

interface Props {
  filters: SearchFiltersState;
  onChange: (filters: SearchFiltersState) => void;
}

export default function SearchFilters({
  filters,
  onChange,
}: Props) {
  function toggleStar(star: number) {
    const exists = filters.stars.includes(star);

    onChange({
      ...filters,
      stars: exists
        ? filters.stars.filter((s) => s !== star)
        : [...filters.stars, star],
    });
  }

  return (
    <aside
      className="
      sticky
      top-24

      rounded-3xl
      border
      border-neutral-200

      bg-white

      p-6

      shadow-sm
      "
    >
      <h2 className="text-xl font-bold">
        Filters
      </h2>

      {/* Price */}

      <div className="mt-8">
        <h3 className="font-semibold">
          Price
        </h3>

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm text-neutral-500">
              Min Price
            </label>

            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) =>
                onChange({
                  ...filters,
                  minPrice: Number(e.target.value),
                })
              }
              className="
              mt-1
              w-full

              rounded-xl
              border

              px-3
              py-2

              outline-none

              focus:border-emerald-600
              "
            />
          </div>

          <div>
            <label className="text-sm text-neutral-500">
              Max Price
            </label>

            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) =>
                onChange({
                  ...filters,
                  maxPrice: Number(e.target.value),
                })
              }
              className="
              mt-1
              w-full

              rounded-xl
              border

              px-3
              py-2

              outline-none

              focus:border-emerald-600
              "
            />
          </div>
        </div>
      </div>

      {/* Stars */}

      <div className="mt-8">
        <h3 className="font-semibold">
          Star Rating
        </h3>

        <div className="mt-4 space-y-3">
          {[5, 4, 3, 2, 1].map((star) => (
            <label
              key={star}
              className="flex items-center gap-3"
            >
              <input
                type="checkbox"
                checked={filters.stars.includes(star)}
                onChange={() =>
                  toggleStar(star)
                }
              />

              <span>
                {star} Star
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Popular */}

      <div className="mt-8">
        <h3 className="font-semibold">
          Popular Filters
        </h3>

        <div className="mt-4 space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={filters.breakfast}
              onChange={(e) =>
                onChange({
                  ...filters,
                  breakfast:
                    e.target.checked,
                })
              }
            />

            Breakfast Included
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={
                filters.freeCancellation
              }
              onChange={(e) =>
                onChange({
                  ...filters,
                  freeCancellation:
                    e.target.checked,
                })
              }
            />

            Free Cancellation
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={
                filters.refundable
              }
              onChange={(e) =>
                onChange({
                  ...filters,
                  refundable:
                    e.target.checked,
                })
              }
            />

            Refundable
          </label>
        </div>
      </div>

      <button
        onClick={() =>
          onChange({
            minPrice: 0,
            maxPrice: 5000,
            stars: [],
            breakfast: false,
            freeCancellation: false,
            refundable: false,
          })
        }
        className="
        mt-10

        w-full

        rounded-2xl

        bg-emerald-700

        py-3

        font-semibold
        text-white

        transition

        hover:bg-emerald-800
        "
      >
        Reset Filters
      </button>
    </aside>
  );
}