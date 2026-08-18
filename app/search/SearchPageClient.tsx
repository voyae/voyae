"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Heart, Map, X, Sparkles, ShieldCheck } from "lucide-react";
import SearchFilters from "@/components/search/SearchFilters";

interface SearchPageClientProps {
  initialHotels?: any[];
}

export default function SearchPageClient({ initialHotels = [] }: SearchPageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const destination = searchParams.get("destination") || "Alanya";
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const activeFilters = useMemo(() => {
    const hiddenKeys = [
      "destination", "lat", "lng", "countryCode", "fullName", 
      "checkIn", "checkOut", "adults", "children", "rooms", "pets"
    ];
    return Array.from(searchParams.entries()).filter(([key]) => !hiddenKeys.includes(key));
  }, [searchParams]);

  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(`/search?${params.toString()}`);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-[#F2F4F3] pt-32 pb-24 font-sans text-neutral-900 selection:bg-emerald-500 selection:text-white relative overflow-hidden">
      
      {/* Arka Plan Mesh Gradyanları */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-400/15 via-teal-300/10 to-transparent rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] -left-40 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-60 pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Üst Başlık Alanı */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-neutral-300/70">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-emerald-200/80 text-emerald-800 text-xs font-bold tracking-wide shadow-xs backdrop-blur-xl">
              <Sparkles size={14} className="text-emerald-600 animate-pulse" /> Curated Stays Collection
            </div>
            
            <div className="flex items-baseline gap-3">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900">
                {destination}
              </h1>
              <span className="text-2xl sm:text-3xl font-light text-neutral-400">
                ({initialHotels.length})
              </span>
            </div>

            <p className="text-sm sm:text-base text-neutral-600 font-medium max-w-xl">
              Handpicked exceptional properties matching your refined taste, schedule, and lifestyle.
            </p>
          </div>

          <button className="group relative inline-flex items-center justify-center gap-3 bg-white/90 hover:bg-neutral-900 text-neutral-900 hover:text-white px-6 py-4 rounded-2xl font-bold text-sm border border-neutral-300/80 transition-all duration-500 shadow-sm hover:shadow-xl cursor-pointer active:scale-95 shrink-0 backdrop-blur-xl">
            <span className="p-1.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500">
              <Map size={18} />
            </span>
            <span>Show on interactive map</span>
          </button>
        </div>

        {/* Aktif Filtre Rozetleri */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 mb-8 flex-wrap bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-neutral-300/70 shadow-xs">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mr-1">Active Filters:</span>
            {activeFilters.map(([key, value]) => (
              <button 
                key={key} 
                onClick={() => removeFilter(key)} 
                className="group flex items-center gap-1.5 bg-neutral-100 hover:bg-red-50 hover:text-red-700 text-neutral-800 border border-neutral-200/80 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
              >
                <span className="text-neutral-500 font-normal">{key}:</span> 
                <span>{value}</span> 
                <X size={13} className="text-neutral-400 group-hover:text-red-500 transition-colors" />
              </button>
            ))}
          </div>
        )}

        {/* Ana Grid Düzeni */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <aside className="w-full lg:w-[320px] shrink-0 sticky top-28">
            <div className="bg-white/90 p-6 rounded-[32px] border border-neutral-300/70 shadow-md backdrop-blur-2xl">
              <SearchFilters />
            </div>
          </aside>

          <main className="flex-1 w-full space-y-6 min-w-0">
            {initialHotels.length === 0 ? (
              <div className="bg-white/90 backdrop-blur-xl p-12 rounded-[32px] text-center border border-neutral-300/70 shadow-sm">
                <h3 className="text-lg font-bold text-neutral-800">Otel Bulunamadı</h3>
                <p className="text-sm text-neutral-500 mt-1">Seçtiğiniz kriterlere uygun otel bulunamadı veya LiteAPI'den veri alınamadı.</p>
              </div>
            ) : (
              initialHotels.map((hotel) => {
                const isFav = favorites.includes(hotel.id);
                
                // --- KESİN VE GÜVENLİ LİTEAPI RESİM ÇEKME MANTIĞI ---
                const rawImages = hotel.hotelImages || hotel.images || hotel.pictures || hotel.photos || [];
                let hotelImage = "";

                if (Array.isArray(rawImages) && rawImages.length > 0) {
                  const first = rawImages[0];
                  if (typeof first === 'string') {
                    hotelImage = first;
                  } else if (typeof first === 'object' && first !== null) {
                    hotelImage = first.url || first.highResUrl || first.thumbnail || first.large || "";
                  }
                }

                if (!hotelImage) {
                  hotelImage = hotel.image || hotel.thumbnail || hotel.photo || "";
                }

                return (
                  <div 
                    key={hotel.id} 
                    className="group bg-white/95 backdrop-blur-xl rounded-[32px] p-5 sm:p-6 border border-neutral-300/70 shadow-sm hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-500 flex flex-col md:flex-row gap-6 items-stretch relative overflow-hidden"
                  >
                    
                    {/* Gerçek Otel Görseli (LiteAPI) */}
                    <div className="w-full md:w-72 h-56 md:h-auto bg-neutral-200 rounded-2xl relative overflow-hidden shrink-0">
                      {hotelImage ? (
                        <img 
                          src={hotelImage} 
                          alt={hotel.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-neutral-400 p-4 text-center">
                          Görsel Bulunamadı
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <button 
                        onClick={() => toggleFavorite(hotel.id)}
                        className="absolute top-4 right-4 p-2.5 bg-white/80 hover:bg-white backdrop-blur-md rounded-full text-neutral-700 hover:text-red-500 transition-all duration-300 shadow-sm cursor-pointer z-10"
                        aria-label="Add to favorites"
                      >
                        <Heart 
                          size={18} 
                          fill={isFav ? "#ef4444" : "none"} 
                          className={isFav ? "text-red-500 scale-110" : "text-neutral-700"} 
                        />
                      </button>
                    </div>
                    
                    {/* Detay Alanı */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="space-y-2">
                        <h3 className="text-xl font-extrabold text-neutral-900 group-hover:text-emerald-700 transition-colors cursor-pointer tracking-tight">
                          {hotel.name}
                        </h3>

                        {/* Profesyonel İkonlu Konum */}
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                          <Map size={13} className="shrink-0" />
                          <span className="hover:underline cursor-pointer truncate">{hotel.locationText}</span>
                        </div>

                        {/* Odaklanmış Oda Tipi Rozeti */}
                        <div className="flex items-center gap-2 pt-1">
                          <span className="px-2.5 py-1 bg-neutral-100 rounded-lg text-xs font-bold text-neutral-800 border border-neutral-200/60">
                            {hotel.roomType}
                          </span>
                        </div>

                        <div className="pt-2 text-xs space-y-1">
                          {hotel.freeCancellation && (
                            <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                              <ShieldCheck size={15} /> Free cancellation
                            </div>
                          )}
                          <p className="text-neutral-400 text-[11px]">You can cancel later, so lock in this great price today.</p>
                        </div>
                      </div>
                    </div>

                    {/* Sağ Taraf: Fiyat ve Rezervasyon (Booking Tarzı Düzen) */}
                    <div className="flex md:flex-col justify-between md:justify-between items-end border-t md:border-t-0 md:border-l border-neutral-200/80 pt-4 md:pt-0 md:pl-6 shrink-0">
                      
                      <div className="flex items-center gap-2.5">
                        <div className="text-left md:text-right">
                          <span className="block text-xs font-bold text-neutral-900">Wonderful</span>
                          <span className="text-[10px] text-neutral-400 font-medium">{hotel.reviewsCount} reviews</span>
                        </div>
                        <div className="bg-emerald-600 text-white text-xs font-black px-2.5 py-1.5 rounded-xl shadow-xs">
                          {hotel.rating}
                        </div>
                      </div>

                      {/* Vurgulu Fiyat Kutusu */}
                      <div className="text-left md:text-right space-y-0.5 bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100/60 my-2 md:my-0 w-full md:w-auto">
                        <span className="block text-[11px] text-emerald-800 font-semibold">1 night, 2 adults</span>
                        <div className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                          {hotel.price.toLocaleString()} ₺
                        </div>
                        <span className="block text-[10px] text-neutral-500 font-medium">+ ₺150 taxes & fees</span>
                      </div>

                      <button className="w-full md:w-auto bg-neutral-900 hover:bg-emerald-600 text-white text-xs font-bold px-6 py-3.5 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer active:scale-95 text-center">
                        Reserve
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </main>

        </div>

      </div>
    </div>
  );
}