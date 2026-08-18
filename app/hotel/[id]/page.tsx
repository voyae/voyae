import { Suspense } from "react";
import { notFound } from "next/navigation";
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
import { getHotelDetails, getHotelRates } from "@/lib/liteapi";

interface HotelPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
    currency?: string;
  }>;
}

// Pansiyon kısaltmalarını anlaşılır hale getiren yardımcı fonksiyon
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

// Para birimi sembolünü güvenli şekilde veren yardımcı fonksiyon
const getCurrencySymbol = (curr: string) => {
  const upper = (curr || "").toUpperCase().trim();
  if (upper === "TRY" || upper === "TL") return "₺";
  if (upper === "USD") return "$";
  if (upper === "EUR") return "€";
  if (upper === "GBP") return "£";
  return curr;
};

async function HotelDetailsContent({ params, searchParams }: HotelPageProps) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;

  const hotelId = resolvedParams.id;
  const checkIn = resolvedSearch.checkIn || "";
  const checkOut = resolvedSearch.checkOut || "";
  const adults = Number(resolvedSearch.adults || "2");
  const childrenParam = resolvedSearch.children || "";
  const currency = resolvedSearch.currency || "TRY";
  const currencySymbol = getCurrencySymbol(currency);

  let hotelData = null;
  let rooms = [];
  let hotelRatesData = null;

  try {
    const detailRes = await getHotelDetails(hotelId);
    hotelData = detailRes?.data || detailRes?.hotel || detailRes;

    if (!hotelData) {
      notFound();
    }

    if (checkIn && checkOut) {
      const occupancies = [
        {
          adults,
          children: childrenParam
            ? childrenParam.split(",").filter(Boolean).map(Number)
            : [],
        },
      ];

      const ratesRes = await getHotelRates({
        hotelIds: [hotelId],
        checkin: checkIn,
        checkout: checkOut,
        occupancies,
        guestNationality: "TR",
        currency: currency,
        roomMapping: true,
      });

      const rateHotels = ratesRes?.data || ratesRes?.hotels || [];
      hotelRatesData =
        rateHotels.find(
          (h: any) => String(h.id || h.hotelId) === String(hotelId)
        ) || rateHotels[0];

      if (hotelRatesData) {
        rooms =
          hotelRatesData.roomTypes ||
          hotelRatesData.rooms ||
          hotelRatesData.rates ||
          [];
      }
    }

    if (rooms.length === 0) {
      rooms = hotelData.roomTypes || hotelData.rooms || hotelData.rates || [];
    }

  } catch (error) {
    console.error("Hotel detail fetch error:", error);
  }

  const rawImages =
    hotelData?.hotelImages ||
    hotelData?.images ||
    hotelData?.photos ||
    hotelData?.pictures ||
    [];
  
  const images = Array.isArray(rawImages) 
    ? rawImages.map((img: any) => (typeof img === 'string' ? img : img?.url || img?.highResUrl)).filter(Boolean)
    : [];

  const mainImage = images[0] || "/hotel-placeholder.jpg";
  const secondaryImages = images.slice(1, 5);

  const starRating = Number(
    hotelData?.starRating || hotelData?.stars || hotelData?.category || 5
  );
  const hotelName = hotelData?.name || hotelData?.hotelName || "Luxury Hotel & Resort";
  
  const apiAddress = hotelData?.address || hotelData?.location?.address || hotelData?.locationText;
  const hotelAddress = apiAddress || "Alanya Sahil Şeridi, Antalya, Türkiye";

  const descriptionText = 
    hotelData?.hotelDescription || 
    hotelData?.description || 
    "Bu tesis misafirlerine Akdeniz'in masmavi sularında unutulmaz bir tatil deneyimi sunuyor. Lüks tasarımı, zengin mutfağı ve kusursuz hizmet kalitesiyle konforunuz için her şey düşünüldü.";

  const amenitiesList = 
    hotelData?.amenities || 
    hotelData?.roomAmenities || 
    ["Free WiFi", "Açık Yüzme Havuzu", "Spa & Wellness", "Oda Servisi", "Fitness Merkezi", "Denize Sıfır", "Otopark", "Restoran"];

  const calculateNights = (inDate: string, outDate: string) => {
    if (!inDate || !outDate) return 1;
    const start = new Date(inDate);
    const end = new Date(outDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const totalNights = calculateNights(checkIn, checkOut);

  // Doğru toplam fiyatı almak için odalar içerisindeki en düşük hesaplanmış toplam tutarı buluyoruz
  const getLowestTotalPrice = () => {
    if (!rooms.length) return 3200;
    
    let lowest = Infinity;
    for (const room of rooms) {
      const rate = room.rates?.[0] || room.rate || room;
      const rawPrice = 
        rate.retailRate?.total?.[0]?.amount ||
        rate.retailRate?.amount ||
        rate.sellingRate ||
        rate.price ||
        room.price;
      
      const priceNum = Number(rawPrice);
      if (!isNaN(priceNum) && priceNum > 0) {
        const total = Math.round(priceNum * totalNights);
        if (total < lowest) {
          lowest = total;
        }
      }
    }
    
    return lowest === Infinity ? 3200 : lowest;
  };

  const lowestTotalPrice = getLowestTotalPrice();

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

      {/* 2. GELİŞMİŞ GÖRSEL GALERİSİ (GRID) */}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-lg border border-white/10 font-medium">
              Ana Görsel
            </span>
          </div>

          <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-3 h-full">
            {secondaryImages.length > 0 ? (
              secondaryImages.map((imgUrl, idx) => (
                <div key={idx} className="relative h-full group overflow-hidden rounded-xl border border-white/5">
                  <Image 
                    src={imgUrl}
                    alt={`${hotelName} ${idx + 2}`}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))
            ) : (
              Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="relative h-full group overflow-hidden rounded-xl bg-[#101935] flex items-center justify-center border border-white/5">
                  <Image 
                    src={mainImage}
                    alt={hotelName}
                    fill
                    unoptimized
                    className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 3. ANA İÇERİK */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div id="rooms" className="lg:col-span-2 space-y-6">
            
            <div className="bg-[#101935] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              
              <div className="bg-[#0D132D] px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <BedDouble className="text-amber-400" size={20} />
                    Müsaitlik Durumu & Fiyatlar
                  </h2>
                  <p className="text-xs text-slate-400">Seçilen tarihler için en uygun planlar</p>
                </div>
                <span className="text-xs font-semibold bg-amber-400/10 text-amber-400 px-3 py-1 rounded-lg border border-amber-400/20">
                  {rooms.length} Seçenek
                </span>
              </div>

              {rooms.length === 0 ? (
                <div className="p-10 text-center space-y-2">
                  <Info size={30} className="text-amber-400 mx-auto" />
                  <p className="text-sm font-bold text-white">Bu tarihler için oda bulunamadı.</p>
                  <p className="text-xs text-slate-400">Lütfen sağdaki panelden tarihleri güncelleyin.</p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {rooms.map((room: any, index: number) => {
                    const roomName = 
                      room.name || 
                      room.roomName || 
                      room.roomTypeName || 
                      room.description || 
                      `Standart Oda ${index + 1}`;

                    const rate = room.rates?.[0] || room.rate || room;

                    const rawPrice = 
                      rate.retailRate?.total?.[0]?.amount ||
                      rate.retailRate?.amount ||
                      rate.sellingRate ||
                      rate.price ||
                      room.price ||
                      3200;

                    const price = Number(rawPrice) || 3200;
                    const roomTotalPrice = Math.round(price * totalNights);

                    const boardCode = 
                      rate.boardType || 
                      rate.mealPlan || 
                      rate.boardName || 
                      room.boardBasis || 
                      "BI";

                    const boardBasis = formatBoardBasis(boardCode);

                    const freeCancel = 
                      rate.cancellationPolicies?.refundableTag === "RFN" || 
                      rate.freeCancellation === true ||
                      room.freeCancellation === true;

                    return (
                      <div key={index} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                        
                        <div className="space-y-1.5 md:w-2/5">
                          <h3 className="font-bold text-white text-sm sm:text-base hover:text-amber-400 transition-colors cursor-pointer">
                            {roomName}
                          </h3>
                          <div className="space-y-1 text-xs text-slate-300">
                            <div className="flex items-center gap-1.5 text-slate-300">
                              <Users size={13} className="text-amber-400 shrink-0" />
                              <span>{adults} Kişilik Konaklama</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-300">
                              <Utensils size={13} className="text-amber-400 shrink-0" />
                              <span>{boardBasis}</span>
                            </div>
                          </div>
                        </div>

                        <div className="md:w-1/4 space-y-1 text-xs">
                          {freeCancel ? (
                            <div className="text-emerald-400 flex items-center gap-1 font-medium bg-emerald-500/10 px-2 py-0.5 rounded w-fit border border-emerald-500/20">
                              <Check size={13} />
                              <span>Ücretsiz İptal</span>
                            </div>
                          ) : (
                            <div className="text-slate-400">İade yapılmaz</div>
                          )}
                          <div className="text-slate-400 text-[11px] pt-0.5">Ön ödeme gerektirmez</div>
                        </div>

                        <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-white/5 gap-2">
                          <div className="text-left md:text-right">
                            <span className="text-[10px] text-slate-400 block">{totalNights} Gece Toplamı</span>
                            <span className="text-xl sm:text-2xl font-black text-amber-400">
                              {currencySymbol} {roomTotalPrice.toLocaleString("tr-TR")}
                            </span>
                          </div>

                          <a 
                            href={`/checkout?hotelId=${hotelId}&room=${encodeURIComponent(roomName)}&price=${roomTotalPrice}&checkIn=${checkIn}&checkOut=${checkOut}&currency=${currency}`}
                            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-all shadow-md text-xs active:scale-95"
                          >
                            Seç
                          </a>
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

            <div className="bg-[#101935] border border-white/10 p-6 rounded-2xl shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles size={16} className="text-amber-400" />
                Popüler Tesis Olanakları
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                {amenitiesList.map((amenity: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-2.5 bg-[#070D1F] p-3 rounded-xl border border-white/5">
                    <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                    <span className="truncate">{typeof amenity === 'string' ? amenity : "Hizmet"}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="lg:col-span-1 sticky top-24 space-y-4">
            <div className="bg-gradient-to-b from-[#121C3F] to-[#0C132E] border border-amber-500/20 p-5 rounded-2xl shadow-xl space-y-4">
              
              <div className="flex items-baseline justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">TOPLAM KONAKLAMA ÜCRETI ({totalNights} GECE)</span>
                  <div className="text-xl font-black text-amber-400 flex items-center gap-1 mt-0.5">
                    <span>{currencySymbol}</span>
                    <span>{lowestTotalPrice.toLocaleString("tr-TR")}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-400/10 text-amber-400 text-xs px-2.5 py-0.5 rounded-full font-bold border border-amber-400/20">
                  <Star size={11} className="fill-amber-400" />
                  <span>9.4</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="bg-[#070D1F] p-3 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-400 block">Konaklama Tarihi ({totalNights} Gece)</span>
                  <div className="font-semibold text-white flex items-center gap-2">
                    <Calendar size={13} className="text-amber-400 shrink-0" />
                    <span>{checkIn || "Seçilmedi"} → {checkOut || "Seçilmedi"}</span>
                  </div>
                </div>

                <div className="bg-[#070D1F] p-3 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-400 block">Misafir Tercihi</span>
                  <div className="font-semibold text-white flex items-center gap-2">
                    <Users size={13} className="text-amber-400 shrink-0" />
                    <span>{adults} Yetişkin {childrenParam ? `• ${childrenParam} Çocuk` : ''}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <a
                  href="#rooms"
                  className="w-full block bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl transition-all text-center text-xs shadow-md active:scale-95"
                >
                  Oda Seçimine Git
                </a>

                <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 pt-1">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>Güvenli Rezervasyon • Anında Onay</span>
                </div>
              </div>

            </div>

            <div className="bg-[#101935] border border-white/10 p-4 rounded-2xl text-xs space-y-2 text-slate-300 shadow-xl">
              <div className="flex items-center gap-2 font-bold text-white mb-1">
                <Clock size={14} className="text-amber-400" />
                <span>Giriş / Çıkış Saatleri</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-slate-400">Otele Giriş:</span>
                <span className="font-medium text-white">14:00 - 00:00</span>
              </div>
              <div className="flex justify-between pt-0.5">
                <span className="text-slate-400">Otelden Çıkış:</span>
                <span className="font-medium text-white">07:00 - 12:00</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}

export default function HotelPage(props: HotelPageProps) {
  return (
    <div className="min-h-screen bg-[#070D1F] text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      <Suspense
        fallback={
          <main className="mx-auto max-w-7xl p-8 pt-32">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-slate-800 rounded-xl w-1/4"></div>
              <div className="h-64 bg-[#101935] border border-white/10 rounded-2xl"></div>
            </div>
          </main>
        }
      >
        <HotelDetailsContent {...props} />
      </Suspense>
    </div>
  );
}