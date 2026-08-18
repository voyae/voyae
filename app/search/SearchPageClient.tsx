"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchFilters, { SearchFiltersState } from "@/components/search/SearchFilters";

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") || "Destinasyon";

  // Filtre State Yönetimi
  const [filters, setFilters] = useState<SearchFiltersState>({
    minPrice: 0,
    maxPrice: 10000,
    stars: [],
    breakfast: false,
    freeCancellation: false,
    refundable: false,
  });

  return (
    <div className="min-h-screen bg-neutral-50 pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Üst Bilgi Başlığı (Arama Özeti) */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-neutral-900">
            {destination}: Search Results
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Showing properties matching your selected filters
          </p>
        </div>

        {/* Ana İçerik Alanı: Yan Yana (Flex) Düzen */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sol Kolon: Profesyonel Filtre Paneli */}
          <SearchFilters filters={filters} onChange={setFilters} />

          {/* Sağ Kolon: Otel Listesi ve Sıralama Alanı */}
          <main className="flex-1 w-full">
            
            {/* Sıralama ve Sonuç Sayısı Çubuğu */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-4 mb-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm font-semibold text-neutral-700">
                12 properties found in {destination}
              </span>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-medium text-neutral-500 whitespace-nowrap">Sort by:</span>
                <select className="w-full sm:w-auto rounded-xl border border-neutral-300 bg-white p-2 text-sm font-medium text-neutral-700 focus:border-emerald-600 focus:outline-none">
                  <option>Our top picks</option>
                  <option>Price (low to high)</option>
                  <option>Price (high to low)</option>
                  <option>Star rating (highest)</option>
                </select>
              </div>
            </div>

            {/* Otel Kartlarının Listeleneceği Alan */}
            <div className="space-y-4">
              {/* Buraya daha önce hazırladığın <HotelCard /> bileşenlerini basabilirsin */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-64 h-48 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-400 font-medium">
                  Hotel Image Placeholder
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-neutral-900">Grand Luxury Hotel & Spa</h3>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-lg">9.2 / 10</span>
                  </div>
                  <p className="text-sm text-neutral-500">{destination} Center • 500m from beach</p>
                  <div className="pt-4 flex items-end justify-between">
                    <div>
                      <span className="text-xs text-neutral-400 block">1 night, 2 adults</span>
                      <span className="text-xl font-extrabold text-neutral-900">1,450 ₺</span>
                    </div>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                      See availability
                    </button>
                  </div>
                </div>
              </div>

              {/* Örnek 2. Kart */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-64 h-48 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-400 font-medium">
                  Hotel Image Placeholder
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-neutral-900">Sunset Beach Resort</h3>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-lg">8.8 / 10</span>
                  </div>
                  <p className="text-sm text-neutral-500">{destination} Beachfront</p>
                  <div className="pt-4 flex items-end justify-between">
                    <div>
                      <span className="text-xs text-neutral-400 block">1 night, 2 adults</span>
                      <span className="text-xl font-extrabold text-neutral-900">2,100 ₺</span>
                    </div>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                      See availability
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </main>

        </div>

      </div>
    </div>
  );
}