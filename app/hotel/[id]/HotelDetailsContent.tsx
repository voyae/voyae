"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  MapPin, 
  Star, 
  Users, 
  Utensils, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Calendar,
  ChevronRight,
  BedDouble,
  Info,
  Check,
  Clock
} from "lucide-react";

interface Props {
  hotelData: any;
  rooms: any[];
  hotelId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  childrenParam: string;
  currency: string;
}

const formatBoardBasis = (code: string) => {
  if (!code) return "Kahvaltı Dahil";
  const upperCode = code.toUpperCase().trim();
  const boardMap: Record<string, string> = {
    "RO": "Yalnızca Oda (Room Only)",
    "BB": "Kahvaltı Dahil (Bed & Breakfast)",
    "BI": "Kahvaltı Dahil",
    "HB": "Yarım Pansiyon (Half Board)",
    "FB": "Tam Pansiyon (Full Board)",
    "AI": "Her Şey Dahil (All Inclusive)",
    "UAI": "Ultra Her Şey Dahil (Ultra All Inclusive)",
  };
  return boardMap[upperCode] || code;
};

const getCurrencySymbol = (curr: string) => {
  const upper = (curr || "").toUpperCase().trim();
  if (upper === "TRY" || upper === "TL") return "₺";
  if (upper === "USD") return "$";
  if (upper === "EUR") return "€";
  if (upper === "GBP") return "£";
  return curr;
};

export default function HotelDetailsContent({
  hotelData,
  rooms,
  hotelId,
  checkIn,
  checkOut,
  adults,
  childrenParam,
  currency,
}: Props) {
  const router = useRouter();
  const currencySymbol = getCurrencySymbol(currency);

  const calculateNights = (inDate: string, outDate: string) => {
    if (!inDate || !outDate) return 1;
    const start = new Date(inDate);
    const end = new Date(outDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const totalNights = calculateNights(checkIn, checkOut);

  // Odaları ve fiyatlarını hesaplayıp hazırlayalım
  // Odaları ve fiyatlarını hesaplayıp hazırlayalım
  const processedRooms = rooms.map((room: any, index: number) => {
    const roomName = 
      room.name || 
      room.roomName || 
      room.roomTypeName || 
      room.description || 
      `Standart Oda ${index + 1}`;

    const rate = room.rates?.[0] || room.rate || room;
    
    // rateKey değerini tanımladık (Eğer API'den gelmiyorsa room.id kullanacağız)
    const rateKey = rate.rateKey || room.rateKey || room.id || `room_${index}`;

    const rawPrice = 
      rate.retailRate?.total?.[0]?.amount ||
      rate.retailRate?.amount ||
      rate.sellingRate ||
      rate.price ||
      room.price ||
      3200;

    const price = Number(rawPrice) || 3200;
    const roomTotalPrice = Math.round(price * totalNights);
    const boardCode = rate.boardType || rate.mealPlan || rate.boardName || room.boardBasis || "BI";
    const boardBasis = formatBoardBasis(boardCode);
    const freeCancel = rate.cancellationPolicies?.refundableTag === "RFN" || rate.freeCancellation === true || room.freeCancellation === true;

    return {
      id: room.id || index,
      rateKey, // rateKey artık burada tanımlı ve yönlendirmede kullanılacak
      roomName,
      price,
      roomTotalPrice,
      boardBasis,
      freeCancel
    };
  });

  // Seçilen odayı tutmak için state (Varsayılan olarak ilk odayı seçili getirebiliriz)
  const [selectedRoom, setSelectedRoom] = useState(processedRooms[0] || null);

  const rawImages = hotelData?.hotelImages || hotelData?.images || hotelData?.photos || hotelData?.pictures || [];
  const images = Array.isArray(rawImages) 
    ? rawImages.map((img: any) => (typeof img === 'string' ? img : img?.url || img?.highResUrl)).filter(Boolean)
    : [];

  const mainImage = images[0] || "/hotel-placeholder.jpg";
  const secondaryImages = images.slice(1, 5);
  const starRating = Number(hotelData?.starRating || hotelData?.stars || hotelData?.category || 5);
  const hotelName = hotelData?.name || hotelData?.hotelName || "Luxury Hotel & Resort";
  const hotelAddress = hotelData?.address || hotelData?.location?.address || hotelData?.locationText || "Alanya Sahil Şeridi, Antalya, Türkiye";
  const descriptionText = hotelData?.hotelDescription || hotelData?.description || "Bu tesis misafirlerine konforlu bir deneyim sunuyor.";
  const amenitiesList = hotelData?.amenities || hotelData?.roomAmenities || ["Free WiFi", "Açık Yüzme Havuzu", "Spa & Wellness", "Restoran"];

  const handleProceedToCheckout = () => {
    if (!selectedRoom) {
      alert("Lütfen bir oda seçin.");
      return;
    }
    
    // rateKey'i doğrudan seçilen odadan güvenli bir şekilde alalım, yoksa geçici bir ID üretelim
    const currentRateKey = selectedRoom.rateKey || selectedRoom.id || "temp_offer_id";

    router.push(`/checkout?hotelId=${hotelId}&offerId=${currentRateKey}&room=${encodeURIComponent(selectedRoom.roomName)}&price=${selectedRoom.roomTotalPrice}&checkIn=${checkIn}&checkOut=${checkOut}&currency=${currency}`);
  };

  return (
    <main className="min-h-screen bg-[#070D1F] text-slate-100 pt-24 pb-28 selection:bg-amber-500 selection:text-slate-950">
      
      {/* 1. ÜST BREADCRUMB & BAŞLIK ALANI */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6">
        <div className="flex items-center gap-2 text-xs text-slate-300 mb-4 bg-[#101935]/80 backdrop-blur-md w-fit px-3.5 py-1.5 rounded-full border border-white/10">
          <a href="/" className="hover:text-amber-400 transition-colors">Ana Sayfa</a>
          <ChevronRight size={13} className="text-slate-400" />
          <a href="/search" className="hover:text-amber-400 transition-colors">Arama</a>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-amber-400 font-medium truncate max-w-[180px]">{hotelName}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 bg-amber-500/20 px-3 py-0.5 rounded-full border border-amber-500/30">
                {Array.from({ length: starRating }).map((_, i) => (
                  <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 px-3 py-0.5 rounded-full border border-amber-400/20">
                Seçkin Tesis
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {hotelName}
            </h1>

            <div className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm font-medium">
              <MapPin size={15} className="text-amber-400 shrink-0" />
              <span>{hotelAddress}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-slate-400 block">Misafir Puanı</span>
              <span className="text-xs font-bold text-emerald-400">Harika / 9.4</span>
            </div>
            <div className="bg-amber-400 text-slate-950 px-3.5 py-2 rounded-xl font-black text-base shadow-lg">
              9.4
            </div>
          </div>
        </div>
      </div>

      {/* 2. GÖRSEL GALERİSİ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="md:col-span-2 relative h-full group overflow-hidden">
            <Image 
              src={mainImage}
              alt={hotelName}
              fill
              priority
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-3 h-full">
            {secondaryImages.map((imgUrl, idx) => (
              <div key={idx} className="relative h-full group overflow-hidden rounded-xl border border-white/5">
                <Image 
                  src={imgUrl}
                  alt={`${hotelName} ${idx + 2}`}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. ANA İÇERİK & ODALAR */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div id="rooms" className="lg:col-span-2 space-y-6">
            <div className="bg-[#101935] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="bg-[#0D132D] px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <BedDouble className="text-amber-400" size={20} />
                    Müsaitlik Durumu & Fiyatlar
                  </h2>
                  <p className="text-xs text-slate-400">Konaklamak istediğiniz odayı seçin</p>
                </div>
                <span className="text-xs font-semibold bg-amber-400/10 text-amber-400 px-3 py-1 rounded-lg border border-amber-400/20">
                  {processedRooms.length} Seçenek
                </span>
              </div>

              {processedRooms.length === 0 ? (
                <div className="p-10 text-center space-y-2">
                  <Info size={30} className="text-amber-400 mx-auto" />
                  <p className="text-sm font-bold text-white">Bu tarihler için oda bulunamadı.</p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {processedRooms.map((room) => {
                    const isSelected = selectedRoom?.id === room.id;
                    return (
                      <div key={room.id} className={`p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors ${isSelected ? "bg-amber-500/10 border-l-4 border-amber-400" : "hover:bg-white/[0.02]"}`}>
                        
                        <div className="space-y-1.5 md:w-2/5">
                          <h3 className="font-bold text-white text-sm sm:text-base">
                            {room.roomName}
                          </h3>
                          <div className="space-y-1 text-xs text-slate-300">
                            <div className="flex items-center gap-1.5">
                              <Users size={13} className="text-amber-400 shrink-0" />
                              <span>{adults} Kişilik Konaklama</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Utensils size={13} className="text-amber-400 shrink-0" />
                              <span>{room.boardBasis}</span>
                            </div>
                          </div>
                        </div>

                        <div className="md:w-1/4 space-y-1 text-xs">
                          {room.freeCancel ? (
                            <div className="text-emerald-400 flex items-center gap-1 font-medium bg-emerald-500/10 px-2 py-0.5 rounded w-fit border border-emerald-500/20">
                              <Check size={13} />
                              <span>Ücretsiz İptal</span>
                            </div>
                          ) : (
                            <div className="text-slate-400">İade yapılmaz</div>
                          )}
                        </div>

                        <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-white/5 gap-2">
                          <div className="text-left md:text-right">
                            <span className="text-[10px] text-slate-400 block">{totalNights} Gece Toplamı</span>
                            <span className="text-xl sm:text-2xl font-black text-amber-400">
                              {currencySymbol} {room.roomTotalPrice.toLocaleString("tr-TR")}
                            </span>
                          </div>

                          <button 
                            type="button"
                            onClick={() => setSelectedRoom(room)}
                            className={`font-bold px-6 py-2.5 rounded-xl transition-all shadow-md text-xs active:scale-95 ${
                              isSelected 
                                ? "bg-emerald-500 text-slate-950" 
                                : "bg-amber-500 hover:bg-amber-400 text-slate-950"
                            }`}
                          >
                            {isSelected ? "Seçildi ✓" : "Seç"}
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="bg-[#101935] border border-white/10 p-6 rounded-2xl shadow-xl space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Info size={16} className="text-amber-400" />
                Tesis Hakkında
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {descriptionText}
              </p>
            </div>
          </div>

          {/* SAĞ TARAF: DİNAMİK ÖZET VE REZERVASYON PANELİ */}
          <div className="lg:col-span-1 sticky top-24 space-y-4">
            <div className="bg-gradient-to-b from-[#121C3F] to-[#0C132E] border border-amber-500/20 p-5 rounded-2xl shadow-xl space-y-4">
              
              <div className="flex items-baseline justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">SEÇİLEN ODA ÜCRETİ</span>
                  <div className="text-xl font-black text-amber-400 flex items-center gap-1 mt-0.5">
                    <span>{currencySymbol}</span>
                    <span>{selectedRoom ? selectedRoom.roomTotalPrice.toLocaleString("tr-TR") : "0"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-400/10 text-amber-400 text-xs px-2.5 py-0.5 rounded-full font-bold border border-amber-400/20">
                  <Star size={11} className="fill-amber-400" />
                  <span>9.4</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="bg-[#070D1F] p-3 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-400 block">Seçilen Oda</span>
                  <div className="font-semibold text-white truncate">
                    {selectedRoom ? selectedRoom.roomName : "Oda seçilmedi"}
                  </div>
                </div>

                <div className="bg-[#070D1F] p-3 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-400 block">Konaklama Tarihi ({totalNights} Gece)</span>
                  <div className="font-semibold text-white flex items-center gap-2">
                    <Calendar size={13} className="text-amber-400 shrink-0" />
                    <span>
                      {checkIn ? new Date(checkIn).toLocaleDateString("tr-TR") : "Seçilmedi"} → {checkOut ? new Date(checkOut).toLocaleDateString("tr-TR") : "Seçilmedi"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl transition-all text-center text-xs shadow-md active:scale-95 cursor-pointer"
                >
                  Rezervasyon Adımına Geç
                </button>

                <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 pt-1">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>Güvenli Rezervasyon • Anında Onay</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}