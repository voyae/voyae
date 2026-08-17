"use client";

export interface SearchFiltersState {
  minPrice: number;
  maxPrice: number;
  stars: number[];
  breakfast: boolean;
  freeCancellation: boolean;
  refundable: boolean;
}

interface Props {
  filters?: SearchFiltersState;
  onChange: (filters: SearchFiltersState) => void;
}

const DEFAULT_FILTERS: SearchFiltersState = {
  minPrice: 0,
  maxPrice: 5000,
  stars: [],
  breakfast: false,
  freeCancellation: false,
  refundable: false,
};

export default function SearchFilters({
  filters = DEFAULT_FILTERS,
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
    <aside className="sticky top-24 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold">
        Filters
      </h2>

      <div className="mt-8">
        <h3 className="font-semibold">
          Price
        </h3>

        <div className="mt-4 space-y-4">

          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) =>
              onChange({
                ...filters,
                minPrice: Number(e.target.value),
              })
            }
            placeholder="Min Price"
            className="w-full rounded-xl border px-3 py-2"
          />

          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) =>
              onChange({
                ...filters,
                maxPrice: Number(e.target.value),
              })
            }
            placeholder="Max Price"
            className="w-full rounded-xl border px-3 py-2"
          />

        </div>
      </div>

      <div className="mt-8">

        <h3 className="font-semibold">
          Star Rating
        </h3>

        <div className="mt-4 space-y-2">

          {[5,4,3,2,1].map((star)=>(
            <label
              key={star}
              className="flex items-center gap-3"
            >
              <input
                type="checkbox"
                checked={filters.stars.includes(star)}
                onChange={()=>toggleStar(star)}
              />

              {star} Star
            </label>
          ))}

        </div>

      </div>

      <div className="mt-8 space-y-3">

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={filters.breakfast}
            onChange={(e)=>
              onChange({
                ...filters,
                breakfast:e.target.checked,
              })
            }
          />

          Breakfast Included

        </label>

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={filters.freeCancellation}
            onChange={(e)=>
              onChange({
                ...filters,
                freeCancellation:e.target.checked,
              })
            }
          />

          Free Cancellation

        </label>

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={filters.refundable}
            onChange={(e)=>
              onChange({
                ...filters,
                refundable:e.target.checked,
              })
            }
          />

          Refundable

        </label>

      </div>

      <button
        onClick={() => onChange(DEFAULT_FILTERS)}
        className="mt-8 w-full rounded-xl bg-emerald-700 py-3 font-semibold text-white"
      >
        Reset Filters
      </button>

    </aside>
  );
}