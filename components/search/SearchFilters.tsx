"use client";

export interface SearchFiltersState {
  minPrice: number;
  maxPrice: number;
  stars: number[];
  propertyTypes: string[];
  minReviewScore: number;
  meals: string[];
  facilities: string[];
  distanceToCenter: string;
  freeCancellation: boolean;
  wifi: boolean;
  petFriendly: boolean;
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
    propertyTypes: filters?.propertyTypes ?? [],
    minReviewScore: filters?.minReviewScore ?? 0,
    meals: filters?.meals ?? [],
    facilities: filters?.facilities ?? [],
    distanceToCenter: filters?.distanceToCenter ?? "all",
    freeCancellation: filters?.freeCancellation ?? false,
    wifi: filters?.wifi ?? false,
    petFriendly: filters?.petFriendly ?? false,
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
      propertyTypes: [],
      minReviewScore: 0,
      meals: [],
      facilities: [],
      distanceToCenter: "all",
      freeCancellation: false,
      wifi: false,
      petFriendly: false,
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

  function togglePropertyType(type: string) {
    const exists = safeFilters.propertyTypes.includes(type);
    triggerChange({
      ...safeFilters,
      propertyTypes: exists
        ? safeFilters.propertyTypes.filter((t) => t !== type)
        : [...safeFilters.propertyTypes, type],
    });
  }

  function toggleMeal(meal: string) {
    const exists = safeFilters.meals.includes(meal);
    triggerChange({
      ...safeFilters,
      meals: exists
        ? safeFilters.meals.filter((m) => m !== meal)
        : [...safeFilters.meals, meal],
    });
  }

  function toggleFacility(facility: string) {
    const exists = safeFilters.facilities.includes(facility);
    triggerChange({
      ...safeFilters,
      facilities: exists
        ? safeFilters.facilities.filter((f) => f !== facility)
        : [...safeFilters.facilities, facility],
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-5 space-y-6 text-sm w-full">
      
      {/* Başlık ve Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <h2 className="font-extrabold text-neutral-900 text-xs uppercase tracking-wider">
          Filter by:
        </h2>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          Reset all
        </button>
      </div>

      {/* 1. Şehir Merkezine Mesafe (Distance to Center) */}
      <div className="pb-5 border-b border-neutral-100 space-y-3">
        <h3 className="font-bold text-neutral-900 text-xs">
          Distance to center
        </h3>
        <div className="space-y-2">
          {[
            { id: "all", label: "Any distance" },
            { id: "1km", label: "Less than 1 km" },
            { id: "3km", label: "Less than 3 km" },
          ].map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 cursor-pointer text-xs text-neutral-700 hover:text-neutral-900 group"
            >
              <input
                type="radio"
                name="distance"
                checked={safeFilters.distanceToCenter === item.id}
                onChange={() => triggerChange({ ...safeFilters, distanceToCenter: item.id })}
                className="h-4 w-4 border-neutral-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600 shrink-0 cursor-pointer"
              />
              <span className="font-medium group-hover:text-neutral-900">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. Tesis Tipi (Property Type) */}
      <div className="pb-5 border-b border-neutral-100 space-y-3">
        <h3 className="font-bold text-neutral-900 text-xs">
          Property Type
        </h3>
        <div className="space-y-3">
          {[
            { id: "hotel", label: "Hotels" },
            { id: "apartment", label: "Apartments" },
            { id: "resort", label: "Resorts" },
            { id: "villa", label: "Villas" },
          ].map((type) => (
            <label
              key={type.id}
              className="flex items-center gap-3 cursor-pointer text-xs text-neutral-700 hover:text-neutral-900 group"
            >
              <input
                type="checkbox"
                checked={safeFilters.propertyTypes.includes(type.id)}
                onChange={() => togglePropertyType(type.id)}
                className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600 shrink-0 cursor-pointer"
              />
              <span className="font-medium group-hover:text-neutral-900">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Bütçe Bölümü (Budget) */}
      <div className="pb-5 border-b border-neutral-100 space-y-3">
        <h3 className="font-bold text-neutral-900 text-xs">
          Your budget (per night)
        </h3>
        <div className="space-y-2.5">
          <div>
            <label className="block text-[11px] font-medium text-neutral-400 mb-1">Min (₺)</label>
            <input
              type="number"
              value={safeFilters.minPrice}
              onChange={(e) =>
                triggerChange({ ...safeFilters, minPrice: Number(e.target.value) })
              }
              className="w-full rounded-xl bg-neutral-50/50 border border-neutral-200 px-3.5 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-neutral-400 mb-1">Max (₺)</label>
            <input
              type="number"
              value={safeFilters.maxPrice}
              onChange={(e) =>
                triggerChange({ ...safeFilters, maxPrice: Number(e.target.value) })
              }
              className="w-full rounded-xl bg-neutral-50/50 border border-neutral-200 px-3.5 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* 4. Yemek Seçenekleri (Meals) */}
      <div className="pb-5 border-b border-neutral-100 space-y-3">
        <h3 className="font-bold text-neutral-900 text-xs">
          Meals
        </h3>
        <div className="space-y-3">
          {[
            { id: "breakfast", label: "Breakfast included" },
            { id: "half-board", label: "Half board" },
            { id: "all-inclusive", label: "All-inclusive" },
          ].map((meal) => (
            <label
              key={meal.id}
              className="flex items-center gap-3 cursor-pointer text-xs text-neutral-700 hover:text-neutral-900 group"
            >
              <input
                type="checkbox"
                checked={safeFilters.meals.includes(meal.id)}
                onChange={() => toggleMeal(meal.id)}
                className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600 shrink-0 cursor-pointer"
              />
              <span className="font-medium group-hover:text-neutral-900">{meal.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 5. Tesis Olanakları (Facilities) */}
      <div className="pb-5 border-b border-neutral-100 space-y-3">
        <h3 className="font-bold text-neutral-900 text-xs">
          Facilities
        </h3>
        <div className="space-y-3">
          {[
            { id: "pool", label: "Swimming Pool" },
            { id: "wifi", label: "Free Wi-Fi" },
            { id: "parking", label: "Free Parking" },
            { id: "spa", label: "Spa & wellness center" },
          ].map((facility) => (
            <label
              key={facility.id}
              className="flex items-center gap-3 cursor-pointer text-xs text-neutral-700 hover:text-neutral-900 group"
            >
              <input
                type="checkbox"
                checked={safeFilters.facilities.includes(facility.id)}
                onChange={() => toggleFacility(facility.id)}
                className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600 shrink-0 cursor-pointer"
              />
              <span className="font-medium group-hover:text-neutral-900">{facility.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 6. Rezervasyon Koşulları (Reservation Policies) */}
      <div className="pb-5 border-b border-neutral-100 space-y-3">
        <h3 className="font-bold text-neutral-900 text-xs">
          Reservation Policies
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer text-xs text-neutral-700 hover:text-neutral-900 group">
            <input
              type="checkbox"
              checked={safeFilters.freeCancellation}
              onChange={(e) =>
                triggerChange({ ...safeFilters, freeCancellation: e.target.checked })
              }
              className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600 shrink-0 cursor-pointer"
            />
            <span className="font-medium group-hover:text-neutral-900">Free Cancellation</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer text-xs text-neutral-700 hover:text-neutral-900 group">
            <input
              type="checkbox"
              checked={safeFilters.petFriendly}
              onChange={(e) =>
                triggerChange({ ...safeFilters, petFriendly: e.target.checked })
              }
              className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600 shrink-0 cursor-pointer"
            />
            <span className="font-medium group-hover:text-neutral-900">Pets allowed</span>
          </label>
        </div>
      </div>

      {/* 7. Yıldız Puanı (Star Rating) */}
      <div className="pb-5 border-b border-neutral-100 space-y-3">
        <h3 className="font-bold text-neutral-900 text-xs">
          Star Rating
        </h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((star) => (
            <label
              key={star}
              className="flex items-center gap-3 cursor-pointer text-xs text-neutral-700 hover:text-neutral-900 group"
            >
              <input
                type="checkbox"
                checked={safeFilters.stars.includes(star)}
                onChange={() => toggleStar(star)}
                className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600 shrink-0 cursor-pointer"
              />
              <span className="font-medium flex items-center gap-1.5 group-hover:text-neutral-900">
                <span className="text-amber-500 tracking-tighter">{"★".repeat(star)}</span>
                <span className="text-neutral-400 font-normal">({star})</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 8. Yorum Puanı (Review Score) */}
      <div className="space-y-3">
        <h3 className="font-bold text-neutral-900 text-xs">
          Guest Review Score
        </h3>
        <div className="space-y-2.5">
          {[
            { score: 9, label: "Wonderful: 9+" },
            { score: 8, label: "Very Good: 8+" },
            { score: 7, label: "Good: 7+" },
          ].map((item) => (
            <button
              key={item.score}
              onClick={() =>
                triggerChange({
                  ...safeFilters,
                  minReviewScore: safeFilters.minReviewScore === item.score ? 0 : item.score,
                })
              }
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between border ${
                safeFilters.minReviewScore === item.score
                  ? "bg-emerald-50 border-emerald-600 text-emerald-800"
                  : "bg-neutral-50/50 border-neutral-200 text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              <span>{item.label}</span>
              {safeFilters.minReviewScore === item.score && (
                <span className="text-emerald-600 font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}