"use client";
import { useEffect, useRef, useState } from "react";

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
  onClose?: () => void;
}

export default function SearchFilters({ filters, onChange, onClose }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [localFilters, setLocalFilters] = useState<SearchFiltersState>({
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
  });

  useEffect(() => {
    if (filters) {
      setLocalFilters({
        minPrice: filters.minPrice ?? 0,
        maxPrice: filters.maxPrice ?? 10000,
        stars: filters.stars ?? [],
        propertyTypes: filters.propertyTypes ?? [],
        minReviewScore: filters.minReviewScore ?? 0,
        meals: filters.meals ?? [],
        facilities: filters.facilities ?? [],
        distanceToCenter: filters.distanceToCenter ?? "all",
        freeCancellation: filters.freeCancellation ?? false,
        wifi: filters.wifi ?? false,
        petFriendly: filters.petFriendly ?? false,
      });
    }
  }, [filters]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [onClose]);

  const updateFilters = (newFilters: SearchFiltersState) => {
    setLocalFilters(newFilters);
    if (typeof onChange === "function") {
      onChange(newFilters);
    }
  };

  const resetFilters = () => {
    const defaultFilters: SearchFiltersState = {
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
    };
    updateFilters(defaultFilters);
  };

  function toggleStar(star: number) {
    const exists = localFilters.stars.includes(star);
    updateFilters({
      ...localFilters,
      stars: exists
        ? localFilters.stars.filter((s) => s !== star)
        : [...localFilters.stars, star],
    });
  }

  function togglePropertyType(type: string) {
    const exists = localFilters.propertyTypes.includes(type);
    updateFilters({
      ...localFilters,
      propertyTypes: exists
        ? localFilters.propertyTypes.filter((t) => t !== type)
        : [...localFilters.propertyTypes, type],
    });
  }

  function toggleMeal(meal: string) {
    const exists = localFilters.meals.includes(meal);
    updateFilters({
      ...localFilters,
      meals: exists
        ? localFilters.meals.filter((m) => m !== meal)
        : [...localFilters.meals, meal],
    });
  }

  function toggleFacility(facility: string) {
    const exists = localFilters.facilities.includes(facility);
    updateFilters({
      ...localFilters,
      facilities: exists
        ? localFilters.facilities.filter((f) => f !== facility)
        : [...localFilters.facilities, facility],
    });
  }

  return (
    <div
      ref={containerRef}
      className="bg-[#101C3E] rounded-2xl border border-slate-700/80 shadow-2xl p-5 space-y-6 text-sm w-full text-slate-100 transition-all duration-300 animate-in fade-in zoom-in-95"
    >
      {/* Başlık ve Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
        <h2 className="font-extrabold text-slate-100 text-xs uppercase tracking-wider">
          Filter by:
        </h2>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
        >
          Reset all
        </button>
      </div>

      {/* 1. Şehir Merkezine Mesafe (Distance to Center) - Buton Yapısı */}
      <div className="pb-5 border-b border-slate-700/60 space-y-3">
        <h3 className="font-bold text-slate-100 text-xs">
          Distance to center
        </h3>
        <div className="space-y-2.5">
          {[
            { id: "all", label: "Any distance" },
            { id: "1km", label: "Less than 1 km" },
            { id: "3km", label: "Less than 3 km" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => updateFilters({ ...localFilters, distanceToCenter: item.id })}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between border ${
                localFilters.distanceToCenter === item.id
                  ? "bg-amber-500/10 border-amber-500 text-amber-300"
                  : "bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-900 hover:border-slate-600"
              }`}
            >
              <span>{item.label}</span>
              {localFilters.distanceToCenter === item.id && (
                <span className="text-amber-400 font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Tesis Tipi (Property Type) */}
      <div className="pb-5 border-b border-slate-700/60 space-y-3">
        <h3 className="font-bold text-slate-100 text-xs">
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
              className="flex items-center gap-3 cursor-pointer text-xs text-slate-300 hover:text-amber-400 transition-colors group"
            >
              <input
                type="checkbox"
                checked={localFilters.propertyTypes.includes(type.id)}
                onChange={() => togglePropertyType(type.id)}
                className="h-4 w-4 appearance-none rounded border border-slate-600 bg-slate-900 checked:bg-amber-500 checked:border-amber-500 relative flex items-center justify-center shrink-0 cursor-pointer focus:outline-none checked:before:content-['✓'] checked:before:text-slate-950 checked:before:text-[10px] checked:before:font-extrabold"
              />
              <span className="font-medium group-hover:text-amber-400">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Bütçe Bölümü (Budget) */}
      <div className="pb-5 border-b border-slate-700/60 space-y-3">
        <h3 className="font-bold text-slate-100 text-xs">
          Your budget (per night)
        </h3>
        <div className="space-y-2.5">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Min (₺)</label>
            <input
              type="number"
              value={localFilters.minPrice}
              onChange={(e) =>
                updateFilters({ ...localFilters, minPrice: Number(e.target.value) })
              }
              className="w-full rounded-xl bg-slate-900/60 border border-slate-700 px-3.5 py-2 text-xs font-medium text-slate-100 focus:outline-none focus:border-amber-500 focus:bg-slate-900 transition-all"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Max (₺)</label>
            <input
              type="number"
              value={localFilters.maxPrice}
              onChange={(e) =>
                updateFilters({ ...localFilters, maxPrice: Number(e.target.value) })
              }
              className="w-full rounded-xl bg-slate-900/60 border border-slate-700 px-3.5 py-2 text-xs font-medium text-slate-100 focus:outline-none focus:border-amber-500 focus:bg-slate-900 transition-all"
            />
          </div>
        </div>
      </div>

      {/* 4. Yemek Seçenekleri (Meals) */}
      <div className="pb-5 border-b border-slate-700/60 space-y-3">
        <h3 className="font-bold text-slate-100 text-xs">
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
              className="flex items-center gap-3 cursor-pointer text-xs text-slate-300 hover:text-amber-400 transition-colors group"
            >
              <input
                type="checkbox"
                checked={localFilters.meals.includes(meal.id)}
                onChange={() => toggleMeal(meal.id)}
                className="h-4 w-4 appearance-none rounded border border-slate-600 bg-slate-900 checked:bg-amber-500 checked:border-amber-500 relative flex items-center justify-center shrink-0 cursor-pointer focus:outline-none checked:before:content-['✓'] checked:before:text-slate-950 checked:before:text-[10px] checked:before:font-extrabold"
              />
              <span className="font-medium group-hover:text-amber-400">{meal.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 5. Tesis Olanakları (Facilities) */}
      <div className="pb-5 border-b border-slate-700/60 space-y-3">
        <h3 className="font-bold text-slate-100 text-xs">
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
              className="flex items-center gap-3 cursor-pointer text-xs text-slate-300 hover:text-amber-400 transition-colors group"
            >
              <input
                type="checkbox"
                checked={localFilters.facilities.includes(facility.id)}
                onChange={() => toggleFacility(facility.id)}
                className="h-4 w-4 appearance-none rounded border border-slate-600 bg-slate-900 checked:bg-amber-500 checked:border-amber-500 relative flex items-center justify-center shrink-0 cursor-pointer focus:outline-none checked:before:content-['✓'] checked:before:text-slate-950 checked:before:text-[10px] checked:before:font-extrabold"
              />
              <span className="font-medium group-hover:text-amber-400">{facility.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 6. Rezervasyon Koşulları (Reservation Policies) */}
      <div className="pb-5 border-b border-slate-700/60 space-y-3">
        <h3 className="font-bold text-slate-100 text-xs">
          Reservation Policies
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300 hover:text-amber-400 transition-colors group">
            <input
              type="checkbox"
              checked={localFilters.freeCancellation}
              onChange={(e) =>
                updateFilters({ ...localFilters, freeCancellation: e.target.checked })
              }
              className="h-4 w-4 appearance-none rounded border border-slate-600 bg-slate-900 checked:bg-amber-500 checked:border-amber-500 relative flex items-center justify-center shrink-0 cursor-pointer focus:outline-none checked:before:content-['✓'] checked:before:text-slate-950 checked:before:text-[10px] checked:before:font-extrabold"
            />
            <span className="font-medium group-hover:text-amber-400">Free Cancellation</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300 hover:text-amber-400 transition-colors group">
            <input
              type="checkbox"
              checked={localFilters.petFriendly}
              onChange={(e) =>
                updateFilters({ ...localFilters, petFriendly: e.target.checked })
              }
              className="h-4 w-4 appearance-none rounded border border-slate-600 bg-slate-900 checked:bg-amber-500 checked:border-amber-500 relative flex items-center justify-center shrink-0 cursor-pointer focus:outline-none checked:before:content-['✓'] checked:before:text-slate-950 checked:before:text-[10px] checked:before:font-extrabold"
            />
            <span className="font-medium group-hover:text-amber-400">Pets allowed</span>
          </label>
        </div>
      </div>

      {/* 7. Yıldız Puanı (Star Rating) */}
      <div className="pb-5 border-b border-slate-700/60 space-y-3">
        <h3 className="font-bold text-slate-100 text-xs">
          Star Rating
        </h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((star) => (
            <label
              key={star}
              className="flex items-center gap-3 cursor-pointer text-xs text-slate-300 hover:text-amber-400 transition-colors group"
            >
              <input
                type="checkbox"
                checked={localFilters.stars.includes(star)}
                onChange={() => toggleStar(star)}
                className="h-4 w-4 appearance-none rounded border border-slate-600 bg-slate-900 checked:bg-amber-500 checked:border-amber-500 relative flex items-center justify-center shrink-0 cursor-pointer focus:outline-none checked:before:content-['✓'] checked:before:text-slate-950 checked:before:text-[10px] checked:before:font-extrabold"
              />
              <span className="font-medium flex items-center gap-1.5 group-hover:text-amber-400">
                <span className="text-amber-400 tracking-tighter">{"★".repeat(star)}</span>
                <span className="text-slate-500 font-normal">({star})</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 8. Yorum Puanı (Review Score) */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-100 text-xs">
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
                updateFilters({
                  ...localFilters,
                  minReviewScore: localFilters.minReviewScore === item.score ? 0 : item.score,
                })
              }
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between border ${
                localFilters.minReviewScore === item.score
                  ? "bg-amber-500/10 border-amber-500 text-amber-300"
                  : "bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-900 hover:border-slate-600"
              }`}
            >
              <span>{item.label}</span>
              {localFilters.minReviewScore === item.score && (
                <span className="text-amber-400 font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}