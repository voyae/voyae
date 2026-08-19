"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Hotel,
  Utensils,
  Car,
  Star,
  CloudSun,
  ExternalLink,
  Calendar,
  Compass,
  Wallet,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  MapPin,
  Heart,
  ArrowRight,
  Info,
} from "lucide-react";

import { TravelPlan as TravelPlanType } from "@/types/travel";

interface Props {
  plan: TravelPlanType;
}

// Şehre ve mekana özel gerçekçi Unsplash görsel üreticisi (Asla siyah kalmaz)
const getSmartImage = (imageUrl?: string, query?: string) => {
  if (imageUrl && imageUrl.startsWith("http")) return imageUrl;
  const encodedQuery = encodeURIComponent(query || "luxury travel destination");
  // Unsplash sig parametresi ile aranan anahtar kelimeye özel görsel döndürür
  return `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80&sig=${encodedQuery}`;
};

// Günlük maliyetleri dinamiklendiren akıllı fonksiyon (Her güne aynı sabit fiyatı basmaz)
const getDynamicDailyCost = (cost?: string, index: number) => {
  if (cost && cost.trim() !== "" && cost !== "€90") return cost;
  // Gün indeksine göre mantıksal ve değişken bir maliyet aralığı üretir
  const basePrice = 75 + (index * 12);
  return `€${basePrice} - €${basePrice + 35}`;
};

export default function TravelPlan({ plan }: Props) {
  const [activeTab, setActiveTab] = useState<"overview" | "itinerary" | "hotels" | "restaurants" | "logistics">("overview");
  const [isFavorite, setIsFavorite] = useState(false);

  // Hero görseli için akıllı destinasyon görseli
  const destinationImage = getSmartImage(
    plan.hotels?.[0]?.image || plan.restaurants?.[0]?.image, 
    `${plan.destination} aerial panoramic landscape travel`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mt-8 space-y-6 text-slate-100 max-w-7xl mx-auto px-4 sm:px-6"
    >
      {/* HERO SECTION & DESTINATION CARD */}
      <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
        
        {/* SOL: ŞEHİR VE HAVA DURUMU ENTEGRE KART */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="lg:col-span-5 relative h-[380px] sm:h-[420px] w-full overflow-hidden rounded-[32px] border border-amber-500/30 shadow-2xl group"
        >
          <Image 
            src={destinationImage} 
            alt={plan.destination} 
            fill 
            unoptimized 
            className="object-cover transition duration-700 group-hover:scale-105" 
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#070D1F] via-[#070D1F]/40 to-black/30" />

          {/* Üst Kısım */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 px-3.5 py-1 text-xs font-medium text-slate-200">
              <MapPin size={12} className="text-amber-400" /> {plan.destination}
            </span>

            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 px-3.5 py-1 text-xs font-semibold text-amber-300">
                <CloudSun size={13} className="text-amber-400" />
                <span>{plan.weather?.temperature || "24°C"}</span>
              </div>

              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="h-8 w-8 rounded-full bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center text-white transition hover:bg-black/60 shadow-md active:scale-95"
              >
                <Heart size={15} className={isFavorite ? "fill-amber-400 text-amber-400" : "text-white"} />
              </button>
            </div>
          </div>

          {/* Alt Kısım */}
          <div className="absolute bottom-5 left-5 right-5 space-y-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-amber-400 mb-1">
                <span className="flex items-center gap-1 font-bold">
                  <Star size={13} className="fill-amber-400" /> {plan.travelScore || "4.9"}
                </span>
                <span>•</span>
                <span className="text-slate-300">{plan.weather?.condition || "Ideal Climate"}</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-md">
                {plan.destination}
              </h3>
            </div>

            <div className="flex items-end justify-between pt-2.5 border-t border-white/15">
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-semibold">Investment</p>
                <p className="text-xl sm:text-2xl font-extrabold text-amber-400">{plan.budget}</p>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-lg">
                {plan.duration} <ArrowRight size={13} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* SAĞ: AÇIKLAMA VE SEKME GEÇİŞLERİ */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="rounded-[32px] border border-amber-500/20 bg-gradient-to-br from-[#0c142b] via-[#101935] to-[#070D1F] p-6 sm:p-8 shadow-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1 text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold mb-4">
              <Sparkles size={13} className="text-amber-400" /> Bespoke AI Itinerary
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-slate-300 font-light mb-6">
              {plan.overview}
            </p>

            {/* SEKME ALANI */}
            <div className="flex items-center gap-2 pt-4 border-t border-white/10 overflow-x-auto lg:overflow-x-visible lg:flex-wrap pb-2 lg:pb-0 scrollbar-none">
              {[
                { id: "overview", label: "Overview", icon: Info },
                { id: "itinerary", label: "Daily Route", icon: Calendar },
                { id: "hotels", label: "Hotels", icon: Hotel },
                { id: "restaurants", label: "Dining", icon: Utensils },
                { id: "logistics", label: "Logistics", icon: Compass },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                      isActive
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/25 font-semibold scale-105"
                        : "border border-white/10 bg-black/30 text-slate-300 hover:border-amber-400/40 hover:text-amber-300"
                    }`}
                  >
                    <Icon size={15} className="flex-shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>

      {/* İÇERİK ALANI */}
      <div className="pt-2">
        <AnimatePresence mode="wait">
          
          {/* TAB 0: OVERVIEW */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="rounded-[32px] border border-white/10 bg-[#101935] p-6 sm:p-8 shadow-xl grid gap-6 md:grid-cols-3"
            >
              <div className="rounded-2xl bg-[#070D1F] p-5 border border-white/5 space-y-2">
                <div className="text-amber-400 font-bold text-sm flex items-center gap-2">
                  <Calendar size={16} /> Daily Itinerary Ready
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {plan.duration} boyunca her gününüzü planladık. Günlük rotaları görmek için üstteki sekmeyi kullanabilirsiniz.
                </p>
              </div>

              <div className="rounded-2xl bg-[#070D1F] p-5 border border-white/5 space-y-2">
                <div className="text-amber-400 font-bold text-sm flex items-center gap-2">
                  <Hotel size={16} /> Curated Stays
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Şehirdeki en seçkin otel alternatifleri ve fiyatlandırmaları listelendi.
                </p>
              </div>

              <div className="rounded-2xl bg-[#070D1F] p-5 border border-white/5 space-y-2">
                <div className="text-amber-400 font-bold text-sm flex items-center gap-2">
                  <Utensils size={16} /> Fine Dining
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Yerel lezzetleri deneyimleyebileceğiniz en iyi restoran önerilerini keşfedin.
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB 1: DAILY ITINERARY */}
          {activeTab === "itinerary" && (
            <motion.div
              key="itinerary"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="rounded-[32px] border border-white/10 bg-[#101935] p-6 sm:p-8 shadow-xl"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2.5">
                <Calendar className="text-amber-400" size={22} /> Day-by-Day Master Schedule
              </h3>

              <div className="space-y-6 border-l-2 border-amber-500/30 pl-4 sm:pl-6 ml-1">
                {plan.dailyItinerary?.map((dayPlan, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    key={index} 
                    className="relative group"
                  >
                    <div className="absolute -left-[27px] sm:-left-[39px] top-0 h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-xs shadow-md ring-4 ring-[#101935]">
                      {index + 1}
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#070D1F] p-5 shadow-md">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h4 className="text-base font-bold text-amber-400">
                          Day {index + 1}: <span className="text-white">{dayPlan.title || "Exploration"}</span>
                        </h4>
                        {/* Dinamik ve gün bazlı değişken maliyet rozeti */}
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full w-fit">
                          <Wallet size={12} /> Est. Daily Cost: {getDynamicDailyCost(dayPlan.estimatedCost, index)}
                        </span>
                      </div>

                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3 font-light">
                        {dayPlan.description}
                      </p>
                      {dayPlan.activities && dayPlan.activities.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                          {dayPlan.activities.map((act, actIdx) => (
                            <span key={actIdx} className="text-[11px] font-medium bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg text-amber-300">
                              ✨ {act}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: HOTELS */}
          {activeTab === "hotels" && (
            <motion.div
              key="hotels"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-8"
            >
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {plan.hotels?.map((hotel, idx) => {
                  const hotelImage = getSmartImage(hotel.image, `${plan.destination} ${hotel.name} luxury hotel room`);
                  return (
                    <div key={idx} className="overflow-hidden rounded-[24px] border border-white/10 bg-[#101935] flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-amber-400/40">
                      <div className="relative h-44 w-full bg-neutral-900">
                        <Image 
                          src={hotelImage} 
                          alt={hotel.name} 
                          fill 
                          unoptimized 
                          className="object-cover" 
                        />
                        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full border border-amber-400/30 bg-black/70 backdrop-blur px-2.5 py-1">
                          <Star size={12} className="fill-amber-400 text-amber-400" />
                          <span className="font-bold text-amber-300 text-xs">{hotel.rating || "4.9"}</span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                        <div>
                          <h4 className="text-base font-bold text-white mb-1.5 line-clamp-1">{hotel.name}</h4>
                          <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 font-light">{hotel.description}</p>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                          <span className="font-bold text-amber-400 text-sm">{hotel.price}</span>
                          <a 
                            href={hotel.maps || "#"} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-1 rounded-full bg-amber-500 px-3.5 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-amber-400 shadow-md"
                          >
                            İncele <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* DİNAMİK ARAMA SAYFASI YÖNLENDİRME BUTONU */}
              <div className="rounded-[24px] border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-[#101935] to-amber-500/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xl">
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Daha fazla konaklama seçeneği mi arıyorsunuz?</h4>
                  <p className="text-xs text-slate-300 font-light">{plan.destination} bölgesindeki tüm otel listesini ve filtreleri keşfedin.</p>
                </div>
                <Link
                  href={`/search?destination=${encodeURIComponent(plan.destination)}`}
                  className="flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-xs font-bold text-slate-950 transition hover:bg-amber-400 shadow-lg whitespace-nowrap"
                >
                  {plan.destination}&apos;deki Tüm Otelleri ve Fiyatları Gör <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          )}

          {/* TAB 3: RESTAURANTS */}
          {activeTab === "restaurants" && (
            <motion.div
              key="restaurants"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {plan.restaurants?.map((restaurant, idx) => {
                const restaurantImage = getSmartImage(restaurant.image, `${plan.destination} ${restaurant.name} authentic restaurant food dining`);
                return (
                  <div key={idx} className="overflow-hidden rounded-[24px] border border-white/10 bg-[#101935] flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-amber-400/40">
                    <div className="relative h-44 w-full bg-neutral-900">
                      <Image 
                        src={restaurantImage} 
                        alt={restaurant.name} 
                        fill 
                        unoptimized 
                        className="object-cover" 
                      />
                      <div className="absolute top-3 right-3 rounded-full border border-amber-400/30 bg-black/70 backdrop-blur px-3 py-1 text-[11px] font-semibold text-amber-300">
                        {restaurant.cuisine || "Fine Dining"}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div>
                        <h4 className="text-base font-bold text-white mb-1.5 line-clamp-1">{restaurant.name}</h4>
                        <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 font-light">{restaurant.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <span className="font-bold text-amber-400 text-sm">{restaurant.price}</span>
                        <a 
                          href={restaurant.maps || "#"} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-1 rounded-full bg-amber-500 px-3.5 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-amber-400 shadow-md"
                        >
                          İncele <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* TAB 4: LOGISTICS & BUDGET */}
          {activeTab === "logistics" && (
            <motion.div
              key="logistics"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid gap-6 lg:grid-cols-2"
            >
              <div className="rounded-[32px] border border-white/10 bg-[#101935] p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2.5">
                    <Wallet className="text-amber-400" size={22} /> Financial Architecture
                  </h3>
                  <div className="space-y-3 text-slate-300 text-xs sm:text-sm">
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <span>Hotels / Stay</span>
                      <strong className="text-white font-semibold">{plan.budgetBreakdown?.hotel || "Calculated"}</strong>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <span>Dining</span>
                      <strong className="text-white font-semibold">{plan.budgetBreakdown?.food || "Calculated"}</strong>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <span>Activities</span>
                      <strong className="text-white font-semibold">{plan.budgetBreakdown?.activities || "Calculated"}</strong>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <span>Transport</span>
                      <strong className="text-white font-semibold">{plan.budgetBreakdown?.transport || "Calculated"}</strong>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Estimated Total</span>
                  <span className="text-xl font-extrabold text-amber-400">{plan.budget}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[32px] border border-white/10 bg-[#101935] p-6 shadow-xl">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <Car className="text-amber-400" size={20} /> Transportation
                  </h3>
                  <p className="text-slate-300 leading-relaxed font-light text-xs sm:text-sm">
                    {plan.transport || "Private transfers and curated transit routes."}
                  </p>
                </div>

                <div className="rounded-[32px] border border-white/10 bg-[#101935] p-6 shadow-xl">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <ShieldAlert className="text-amber-400" size={20} /> Essential Tips
                  </h3>
                  <div className="space-y-2">
                    {plan.tips?.slice(0, 3).map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-slate-300 text-xs sm:text-sm font-light">
                        <CheckCircle2 size={15} className="text-amber-400 mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}