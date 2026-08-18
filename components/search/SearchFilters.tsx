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
  onChange?: (filters: SearchFiltersState) => void;
}

export default function SearchFilters({ filters, onChange }: Props) {
  const safeFilters: SearchFiltersState = {
    minPrice: filters?.minPrice ?? 0,
    maxPrice: filters?.maxPrice ?? 10000,
    stars: filters?.stars ?? [],
    breakfast: filters?.breakfast ?? false,
    freeCancellation: filters?.freeCancellation ?? false,
    refundable: filters?.refundable ?? false,
  };

  const triggerChange = (newFilters: SearchFiltersState) => {
    if (typeof onChange === "function") {
      onChange(newFilters);
    }
  };

  const resetFilters = () => {
    triggerChange({
      minPrice: 0,
      maxPrice: 10000,
      stars: [],
      breakfast: false,
      freeCancellation: false,
      refundable: false,
    });
  };

  function toggleStar(star: number) {
    const exists = safeFilters.stars.includes(star);
    triggerChange({
      ...safeFilters,
      stars: exists
        ? safeFilters.stars.filter((s) => s !== star)
        : [...safeFilters.stars, star],
    });
  }

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden text-sm w-full">
      
      {/* Üst Başlık */}
      <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
        <h2 className="font-bold text-neutral-900 text-xs uppercase tracking-wider">
          Filter by:
        </h2>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          Reset all
        </button>
      </div>

      {/* Dikey Sırada Alt Alta Akış */}
      <div className="p-4 space-y-5">
        
        {/* Bütçe Bölümü (Alt alta dikey inputlar) */}
        <div className="pb-4 border-b border-neutral-100">
          <h3 className="mb-2.5 font-bold text-neutral-900 text-xs">
            Your budget (per night)
          </h3>
          <div className="space-y-2.5">
            <div>
              <span className="block text-[11px] text-neutral-500 mb-1">Min (₺)</span>
              <input
                type="number"
                value={safeFilters.minPrice}
                onChange={(e) =>
                  triggerChange({ ...safeFilters, minPrice: Number(e.target.value) })
                }
                className="w-full rounded-lg border border-neutral-300 px-3 py-1.5 text-xs text-neutral-800 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <span className="block text-[11px] text-neutral-500 mb-1">Max (₺)</span>
              <input
                type="number"
                value={safeFilters.maxPrice}
                onChange={(e) =>
                  triggerChange({ ...safeFilters, maxPrice: Number(e.target.value) })
                }
                className="w-full rounded-lg border border-neutral-300 px-3 py-1.5 text-xs text-neutral-800 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Popüler Filtreler (Dikey Liste) */}
        <div className="pb-4 border-b border-neutral-100">
          <h3 className="mb-2.5 font-bold text-neutral-900 text-xs">
            Popular filters
          </h3>
          <div className="space-y-2.5">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-neutral-700 hover:text-neutral-900">
              <input
                type="checkbox"
                checked={safeFilters.breakfast}
                onChange={(e) =>
                  triggerChange({ ...safeFilters, breakfast: e.target.checked })
                }
                className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="font-medium">Breakfast included</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-neutral-700 hover:text-neutral-900">
              <input
                type="checkbox"
                checked={safeFilters.freeCancellation}
                onChange={(e) =>
                  triggerChange({ ...safeFilters, freeCancellation: e.target.checked })
                }
                className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="font-medium">Free Cancellation</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-neutral-700 hover:text-neutral-900">
              <input
                type="checkbox"
                checked={safeFilters.refundable}
                onChange={(e) =>
                  triggerChange({ ...safeFilters, refundable: e.target.checked })
                }
                className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="font-medium">Fully Refundable</span>
            </label>
          </div>
        </div>

        {/* Yıldız Puanı (Dikey Liste) */}
        <div>
          <h3 className="mb-2.5 font-bold text-neutral-900 text-xs">
            Star Rating
          </h3>
          <div className="space-y-2.5">
            {[5, 4, 3, 2, 1].map((star) => (
              <label
                key={star}
                className="flex items-center gap-2.5 cursor-pointer text-xs text-neutral-700 hover:text-neutral-900"
              >
                <input
                  type="checkbox"
                  checked={safeFilters.stars.includes(star)}
                  onChange={() => toggleStar(star)}
                  className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium flex items-center gap-1">
                  {"★".repeat(star)} <span className="text-neutral-400 font-normal">({star})</span>
                </span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}