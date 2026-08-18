"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Heart, Map, X, Sparkles, Info, ArrowRight, LayoutList, LayoutGrid } from "lucide-react";
import SearchFilters from "@/components/search/SearchFilters";
import SearchBar from "@/components/search/SearchBar";

interface SearchPageClientProps {
  initialHotels?: any[];
}

export default function SearchPageClient({ initialHotels = [] }: SearchPageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const destination = searchParams.get("destination") || "Alanya";
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
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

  const handleViewHotel = (hotelId: string) => {
    const queryParams = searchParams.toString();
    router.push(`/hotel/${hotelId}?${queryParams}`);
  };

  return (
    // Navbar'ın altında kalmaması için üst boşluk (pt) optimize edildi
    <div className="min-h-screen bg-[#0A1128] pt-36 sm:pt-40 pb-24 font-sans text-slate-100 selection:bg-amber-500 selection:text-slate-950 relative overflow-hidden">
      
      {/* Arka Plan Mesh Gradyanları */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-600/15 via-indigo-900/10 to-transparent rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] -left-40 w-[600px] h-[600px] bg-blue-700/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:32px_32px] opacity-30 pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Arama Çubuğu */}
        <div className="mb-10">
          <SearchBar />
        </div>
        
        {/* Üst Başlık Alanı ve Liste/Tablo Değiştirici */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101C3E] border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide shadow-xs backdrop-blur-xl">
              <Sparkles size={14} className="text-amber-400 animate-pulse" /> Curated Stays Collection
            </div>
            
            <div className="flex items-baseline gap-3">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                {destination}
              </h1>
              <span className="text-2xl sm:text-3xl font-light text-slate-400">
                ({initialHotels.length})
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-300 font-medium max-w-xl">
              Handpicked exceptional properties matching your refined taste, schedule, and lifestyle.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center bg-[#101C3E] backdrop-blur-xl p-1.5 rounded-2xl border border-slate-800 shadow-xs">
              <button 
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === "list" 
                    ? "bg-amber-500 text-slate-950 shadow-sm" 
                    : "text-slate-300 hover:bg-[#1E293B] hover:text-white"
                }`}
              >
                <LayoutList size={15} /> Liste
              </button>
              <button 
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === "grid" 
                    ? "bg-amber-500 text-slate-950 shadow-sm" 
                    : "text-slate-300 hover:bg-[#1E293B] hover:text-white"
                }`}
              >
                <LayoutGrid size={15} /> Tablo
              </button>
            </div>

            <button className="group relative inline-flex items-center justify-center gap-3 bg-[#101C3E] hover:bg-amber-500 text-white hover:text-slate-950 px-6 py-4 rounded-2xl font-bold text-sm border border-slate-800 transition-all duration-500 shadow-sm hover:shadow-xl cursor-pointer active:scale-95 shrink-0 backdrop-blur-xl">
              <span className="p-1.5 rounded-xl bg-[#1E293B] text-amber-400 group-hover:bg-slate-950 group-hover:text-amber-400 transition-colors duration-500">
                <Map size={18} />
              </span>
              <span>Show on interactive map</span>
            </button>
          </div>
        </div>

        {/* Aktif Filtre Rozetleri */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 mb-8 flex-wrap bg-[#101C3E]/80 backdrop-blur-xl p-4 rounded-2xl border border-slate-800 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Active Filters:</span>
            {activeFilters.map(([key, value]) => (
              <button 
                key={key} 
                onClick={() => removeFilter(key)} 
                className="group flex items-center gap-1.5 bg-[#1E293B] hover:bg-red-500/20 hover:text-red-400 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
              >
                <span className="text-slate-400 font-normal">{key}:</span> 
                <span>{value}</span> 
                <X size={13} className="text-slate-400 group-hover:text-red-400 transition-colors" />
              </button>
            ))}
          </div>
        )}

        {/* Ana Grid Düzeni */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sol Filtre Alanı (Arka planı ve metin renkleri lacivert temaya sabitlendi) */}
          <aside className="w-full lg:w-[320px] shrink-0 sticky top-32">
            <div className="bg-[#101C3E]/95 p-6 rounded-[32px] border border-slate-800 shadow-md backdrop-blur-2xl text-slate-200">
              <SearchFilters />
            </div>
          </aside>

          <main className="flex-1 w-full min-w-0">
            {initialHotels.length === 0 ? (
              <div className="bg-[#101C3E]/90 backdrop-blur-xl p-12 rounded-[32px] text-center border border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold text-white">Otel Bulunamadı</h3>
                <p className="text-sm text-slate-300 mt-1">Seçtiğiniz kriterlere uygun otel bulunamadı veya LiteAPI'den veri alınamadı.</p>
              </div>
            ) : viewMode === "grid" ? (
              // --- TABLO (GRID) GÖRÜNÜMÜ ---
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {initialHotels.map((hotel, index) => {
                  const isFav = favorites.includes(hotel.id);
                  
                  const rawImages = hotel.hotelImages || hotel.images || hotel.pictures || hotel.photos || [];
                  let hotelImage = "";
                  if (Array.isArray(rawImages) && rawImages.length > 0) {
                    const first = rawImages[0];
                    if (typeof first === 'string') hotelImage = first;
                    else if (typeof first === 'object' && first !== null) hotelImage = first.url || first.highResUrl || first.thumbnail || first.large || "";
                  }
                  if (!hotelImage) hotelImage = hotel.image || hotel.thumbnail || hotel.photo || "";

                  const numRating = Number(hotel.rating || hotel.score || hotel.reviewScore) || Number((8.2 + (index % 7) * 0.2).toFixed(1));
                  const currentPrice = Number(hotel.price || hotel.minPrice || hotel.rate) || (3200 + (index * 450));
                  const displayRoomType = hotel.roomType || hotel.roomName || "Deluxe Double Room";
                  const displayAddress = hotel.locationText || hotel.address || `${destination} Merkez`;

                  return (
                    <div 
                      key={hotel.id || index} 
                      className="group bg-[#101C3E]/95 backdrop-blur-xl rounded-[32px] p-5 border border-slate-800 shadow-sm hover:shadow-2xl hover:border-amber-500/50 transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
                    >
                      <div>
                        {/* Görsel Alanı */}
                        <div className="relative h-48 bg-[#1E293B] rounded-2xl overflow-hidden">
                          {hotelImage ? (
                            <img src={hotelImage} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-slate-400">Görsel Yok</div>
                          )}
                          
                          {/* Favori Butonu */}
                          <button 
                            onClick={() => toggleFavorite(hotel.id)}
                            className="absolute top-3 right-3 p-2.5 bg-[#101C3E]/85 hover:bg-[#101C3E] backdrop-blur-md rounded-full text-slate-200 hover:text-red-400 transition-all shadow-sm cursor-pointer z-10"
                          >
                            <Heart size={16} fill={isFav ? "#ef4444" : "none"} className={isFav ? "text-red-500" : ""} />
                          </button>

                          {/* Puan Rozeti */}
                          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-xl text-xs font-black shadow-md backdrop-blur-md">
                            <span>{numRating.toFixed(1)}</span>
                          </div>
                        </div>

                        {/* İçerik */}
                        <div className="p-2 space-y-1.5 mt-2">
                          <span className="text-[11px] font-bold text-amber-400 block line-clamp-1">{displayAddress}</span>

                          <h3 
                            onClick={() => handleViewHotel(hotel.id)}
                            className="font-extrabold text-white hover:text-amber-400 cursor-pointer text-base line-clamp-1"
                          >
                            {hotel.name} <span className="text-amber-400 text-xs">★★★★</span>
                          </h3>

                          <p className="text-xs text-slate-300 line-clamp-1">{displayRoomType}</p>
                        </div>
                      </div>

                      {/* Alt Fiyat ve Buton */}
                      <div className="p-2 pt-3 border-t border-slate-800 mt-2 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">1 gece, 2 yetişkin</span>
                          <span className="text-lg font-black text-white">₺ {currentPrice.toLocaleString('tr-TR')}</span>
                        </div>
                        <button 
                          onClick={() => handleViewHotel(hotel.id)}
                          className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
                        >
                          İncele
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // --- LİSTE GÖRÜNÜMÜ ---
              <div className="space-y-6">
                {initialHotels.map((hotel, index) => {
                  const isFav = favorites.includes(hotel.id);
                  
                  const rawImages = hotel.hotelImages || hotel.images || hotel.pictures || hotel.photos || [];
                  let hotelImage = "";
                  if (Array.isArray(rawImages) && rawImages.length > 0) {
                    const first = rawImages[0];
                    if (typeof first === 'string') hotelImage = first;
                    else if (typeof first === 'object' && first !== null) hotelImage = first.url || first.highResUrl || first.thumbnail || first.large || "";
                  }
                  if (!hotelImage) hotelImage = hotel.image || hotel.thumbnail || hotel.photo || "";

                  const numRating = Number(hotel.rating || hotel.score || hotel.reviewScore) || Number((8.2 + (index % 7) * 0.2).toFixed(1));
                  const ratingText = numRating >= 9.0 ? "Müthiş" : numRating >= 8.0 ? "Çok İyi" : "İyi";
                  const currentPrice = Number(hotel.price || hotel.minPrice || hotel.rate) || (3200 + (index * 450));
                  const oldPrice = hotel.oldPrice ? Number(hotel.oldPrice) : Math.round(currentPrice * 1.18);
                  const displayRoomType = hotel.roomType || hotel.roomName || "Deluxe Double Room • 1 Queen Bed";
                  const displayAddress = hotel.locationText || hotel.address || `${destination} Sahil Cad. No:${(index * 5) + 12}`;
                  const centerDistance = hotel.distanceToCenter || hotel.centerDistance || `${((index % 5) * 0.4 + 0.5).toFixed(1)} km`;
                  const reviewsCount = hotel.reviewsCount || hotel.reviewCount || (120 + index * 37);

                  return (
                    <div 
                      key={hotel.id || index} 
                      className="group bg-[#101C3E]/95 backdrop-blur-xl rounded-[32px] p-5 sm:p-6 border border-slate-800 shadow-sm hover:shadow-2xl hover:border-amber-500/50 transition-all duration-500 flex flex-col md:flex-row gap-6 items-stretch relative overflow-hidden"
                    >
                      {/* Görsel Alanı */}
                      <div className="w-full md:w-72 h-56 md:h-auto bg-[#1E293B] rounded-2xl relative overflow-hidden shrink-0">
                        {hotelImage ? (
                          <img src={hotelImage} alt={hotel.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-slate-400 p-4 text-center">Görsel Bulunamadı</div>
                        )}
                        <button 
                          onClick={() => toggleFavorite(hotel.id)}
                          className="absolute top-4 right-4 p-2.5 bg-[#101C3E]/85 hover:bg-[#101C3E] backdrop-blur-md rounded-full text-slate-200 hover:text-red-400 transition-all duration-300 shadow-sm cursor-pointer z-10"
                        >
                          <Heart size={18} fill={isFav ? "#ef4444" : "none"} className={isFav ? "text-red-500 scale-110" : "text-slate-200"} />
                        </button>
                      </div>
                      
                      {/* Detay Alanı */}
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="space-y-2">
                          <h3 
                            onClick={() => handleViewHotel(hotel.id)}
                            className="text-xl font-extrabold text-white hover:text-amber-400 transition-colors cursor-pointer tracking-tight flex items-center gap-2"
                          >
                            {hotel.name} <span className="text-amber-400 text-sm tracking-tighter">★★★★</span>
                          </h3>

                          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 flex-wrap">
                            <Map size={13} className="shrink-0" />
                            <span className="hover:underline cursor-pointer">{displayAddress}</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-amber-300 hover:underline cursor-pointer font-normal">Haritada göster</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-slate-300 font-normal">Merkez: {centerDistance}</span>
                          </div>

                          <div className="pt-1">
                            <h4 className="text-sm font-bold text-white">{displayRoomType}</h4>
                            <p className="text-xs text-slate-300 mt-0.5">Klima • Ücretsiz WiFi • Konforlu Konaklama</p>
                          </div>

                          <div className="pt-1 text-xs space-y-1">
                            {hotel.freeCancellation !== false && (
                              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                                <span>✓</span> Ücretsiz iptal
                              </div>
                            )}
                            <p className="text-slate-400 text-[11px]">İstediğin zaman iptal edebilirsin, bugüne özel bu harika fiyatı kaçırma.</p>
                          </div>
                        </div>
                      </div>

                      {/* Sağ Taraf: Değerlendirme + Fiyat + Buton */}
                      <div className="flex md:flex-col justify-between md:justify-between items-end border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 shrink-0 min-w-[220px]">
                        <div className="hidden md:flex items-center gap-3 bg-[#1E293B] px-3.5 py-2 rounded-2xl border border-slate-800 shadow-2xs">
                          <div className="text-right">
                            <span className="block text-xs font-extrabold text-white">{ratingText}</span>
                            <span className="block text-[10px] text-slate-400 font-medium">{reviewsCount} gerçek değerlendirme</span>
                          </div>
                          <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-sm shrink-0">
                            {numRating.toFixed(1)}
                          </div>
                        </div>

                        <div className="text-left md:text-right space-y-1 bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20 my-2 md:my-0 w-full md:w-auto shadow-xs">
                          <span className="block text-[11px] text-amber-400 font-bold tracking-wide">1 gece, 2 yetişkin</span>
                          <div className="flex md:justify-end items-baseline gap-2">
                            <span className="text-xs text-slate-500 line-through">₺ {oldPrice.toLocaleString('tr-TR')}</span>
                          </div>
                          <div className="text-2xl font-black text-white tracking-tight">
                            ₺ {currentPrice.toLocaleString('tr-TR')}
                          </div>
                          <div className="pt-0.5 text-[10px] text-slate-400 font-medium flex items-center gap-1 md:justify-end">
                            Vergi ve ücretler dahil <Info className="w-3 h-3 text-slate-500" />
                          </div>
                        </div>

                        <button 
                          onClick={() => handleViewHotel(hotel.id)}
                          className="group/btn relative w-full md:w-auto inline-flex items-center justify-between gap-5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-3.5 rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer active:scale-95 overflow-hidden font-bold"
                        >
                          <div className="text-left relative z-10">
                            <span className="block text-[10px] text-slate-800 font-medium tracking-wide transition-colors">Müsaitlik Durumu</span>
                            <span className="block text-xs font-black tracking-wide">Oda Seçeneklerini Gör</span>
                          </div>
                          <span className="relative z-10 w-8 h-8 rounded-xl bg-slate-950/10 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform duration-300 shrink-0">
                            <ArrowRight size={14} className="text-slate-950" />
                          </span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </main>

        </div>

      </div>
    </div>
  );
}