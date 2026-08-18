import React from 'react';
import NextImage from 'next/image';
import { Heart, Check, Info } from 'lucide-react';

interface HotelCardProps {
  id?: string;
  name: string;
  hotelImages?: string[] | string;
  image?: string;
  roomType?: string;
  boardType?: string;
  amenities?: string[];
  locationText: string;
  freeCancellation?: boolean;
  rating?: number | string;
  reviewsCount?: number;
  price: number;
}

export default function HotelCard({
  name,
  hotelImages,
  image,
  roomType,
  boardType,
  amenities,
  locationText,
  freeCancellation,
  rating,
  reviewsCount,
  price,
}: HotelCardProps) {
  const imageSrc = Array.isArray(hotelImages) 
    ? hotelImages[0] 
    : (hotelImages || image);

  const numRating = Number(rating) || 8.5;
  const ratingText = numRating >= 9.0 ? "Harika" : numRating >= 8.0 ? "Müthiş" : "Çok İyi";
  
  // Booking tarzı üstü çizili orijinal fiyat simülasyonu
  const oldPrice = Math.round(price * 1.18);

  return (
    <div className="bg-white border border-neutral-200/80 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row gap-5 hover:shadow-xl transition-all duration-300 relative group">
      
      {/* HOTEL IMAGE & BADGES */}
      <div className="relative h-[240px] w-full md:w-72 bg-neutral-100 rounded-xl overflow-hidden shrink-0">
        {imageSrc ? (
          <NextImage
            src={imageSrc}
            alt={name || "Hotel"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-400">
            <span>Görsel Yok</span>
          </div>
        )}

        {/* Sol üst rozet (Örn: Her şey dahil / Board) */}
        {boardType && (
          <div className="absolute top-3 left-3 bg-emerald-700 text-white text-xs font-semibold px-2.5 py-1 rounded shadow-md">
            {boardType}
          </div>
        )}

        {/* Sol üstteki kalp ikonu ile sağdaki puanı görsel olarak dengelemek/hizalamak için */}
        <button className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-md text-neutral-700 transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      
      {/* MIDDLE CONTENT (Booking Detailed Info) */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Otel Adı ve Yıldızlar */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-2">
              {name}
              <span className="text-amber-400 text-sm tracking-tighter">★★★★</span>
              <Info className="w-4 h-4 text-neutral-400 inline" />
            </h3>
          </div>

          {/* Konum ve Mesafe Detayları */}
          <div className="text-xs text-neutral-600 mt-1 flex flex-wrap items-center gap-1.5">
            <span className="text-blue-600 hover:underline cursor-pointer font-medium">{locationText.split('•')[0]}</span>
            <span>•</span>
            <span className="text-blue-600 hover:underline cursor-pointer">Haritada göster</span>
            <span>•</span>
            <span className="text-neutral-500">Merkez: 0,7 km</span>
            <span>•</span>
            <span className="text-neutral-500">Plaj yakında</span>
          </div>

          {/* Plaj mesafesi rozeti */}
          <div className="text-xs text-neutral-500 mt-1.5 flex items-center gap-1 font-medium">
            <span>🏖️ Plaja 650 m</span>
          </div>

          <div className="inline-block bg-emerald-50 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded mt-2">
            Tatil Fırsatı
          </div>

          {/* Oda Özellikleri ve İptal Koşulları */}
          <div className="mt-3 pt-3 border-t border-neutral-100">
            <h4 className="text-sm font-bold text-neutral-900">{roomType || "Ekonomik Çift Kişilik Oda"}</h4>
            <p className="text-xs text-neutral-600 mt-0.5">Klima • 1 çift kişilik yatak</p>
            
            {freeCancellation && (
              <p className="text-xs text-emerald-700 font-medium mt-1.5 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" /> Ücretsiz iptal
              </p>
            )}

            <p className="text-xs text-red-600 font-semibold mt-1">
              Bizde bu fiyattan 5 tane kaldı
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (Rating, Pricing & CTA) */}
      <div className="w-full md:w-56 flex flex-row md:flex-col justify-between md:items-end border-t md:border-t-0 md:border-l border-neutral-100 pt-4 md:pt-0 md:pl-5 shrink-0">
        
        {/* Puan ve Değerlendirme Sayısı */}
        <div className="flex md:flex-row items-center gap-2">
          <div className="text-left md:text-right">
            <div className="text-sm font-bold text-neutral-900">{ratingText}</div>
            <div className="text-xs text-neutral-500">{reviewsCount || 901} değerlendirme</div>
          </div>
          <div className="bg-blue-900 text-white font-bold text-sm px-2.5 py-1.5 rounded-tl-lg rounded-tr-lg rounded-bl-lg shadow-sm">
            {numRating.toFixed(1)}
          </div>
        </div>

        {/* Fiyatlandırma Detayları */}
        <div className="text-left md:text-right mt-2">
          <div className="text-xs text-neutral-500">1 gece, 2 yetişkin</div>
          <div className="text-xs text-neutral-400 line-through">TL {oldPrice.toLocaleString('tr-TR')}</div>
          <div className="text-2xl font-extrabold text-neutral-900">
            TL {price.toLocaleString('tr-TR')}
          </div>
          <div className="text-[11px] text-neutral-500 flex items-center gap-1 md:justify-end">
            <span>Vergi ve ücretler dahil</span>
            <Info className="w-3 h-3 text-neutral-400" />
          </div>
        </div>

        {/* Rezervasyon / Durum Butonu */}
        <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-1 shadow-sm">
          <span>Yer durumuna bak</span>
          <span>&gt;</span>
        </button>

      </div>

    </div>
  );
}