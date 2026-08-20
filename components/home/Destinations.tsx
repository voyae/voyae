"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Star, MapPin, ArrowRight } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import { useLanguageCurrency } from "@/hooks/useLanguageCurrency";

export default function Destinations() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { t, formatPrice } = useLanguageCurrency();

  const destinations = [
    {
      title: t("maldivesCardTitle"),
      location: t("indianOcean"),
      image:
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80",
      priceNum: 4900,
      rating: "4.9",
    },
    {
      title: t("santoriniCardTitle"),
      location: t("greece"),
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
      priceNum: 3600,
      rating: "4.8",
    },
    {
      title: t("kyotoCardTitle"),
      location: t("japan"),
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      priceNum: 2800,
      rating: "4.9",
    },
  ];

  return (
    <section
      id="destinations"
      className="bg-[#070D1F] pt-32 pb-32 relative"
    >
      <div className="mx-auto w-[92%] max-w-[1550px]">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-amber-500">
            {t("featuredDestinationsBadge")}
          </p>

          <h2 className="mt-5 font-display text-6xl leading-tight text-white">
            {t("handpickedEscapesTitle")}
          </h2>

          <p className="mt-6 text-xl leading-9 text-slate-400">
            {t("handpickedEscapesSub")}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-20 grid gap-10 lg:grid-cols-3">

          {destinations.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: .7,
                delay: index * .15,
              }}
              viewport={{ once: true }}
              className="group relative h-[500px] overflow-hidden rounded-[34px] shadow-[0_30px_80px_rgba(0,0,0,0.4)] border border-white/5"
            >

              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#070D1F]/90 via-[#070D1F]/20 to-transparent" />

              {/* Top */}
              <div className="absolute left-7 right-7 top-7 flex items-center justify-between">

                <span className="rounded-full border border-white/10 bg-black/30 px-5 py-2 text-sm text-white backdrop-blur-xl">
                  {item.location}
                </span>

                {/* Kalp İkonu - Tıklandığında Modal Açılır */}
                <button 
                  onClick={() => setIsAuthOpen(true)}
                  className="rounded-full border border-white/10 bg-black/30 p-3 backdrop-blur-xl transition hover:bg-amber-500/20 hover:scale-110 active:scale-95"
                  aria-label="Favorilere ekle"
                >
                  <Heart size={18} className="text-white transition group-hover/btn:text-amber-400" />
                </button>

              </div>

              {/* Bottom */}
              <div className="absolute bottom-0 w-full p-8 text-white">

                <h3 className="font-display text-[42px]">
                  {item.title}
                </h3>

                <div className="mt-4 flex items-center gap-6 text-slate-300">

                  <span className="flex items-center gap-2">
                    <Star
                      size={16}
                      className="fill-amber-400 text-amber-400"
                    />
                    {item.rating}
                  </span>

                  <span className="flex items-center gap-2">
                    <MapPin size={16} />
                    {item.location}
                  </span>

                </div>

                <div className="mt-8 flex items-end justify-between">

                  <div>

                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      {t("startingFrom")}
                    </p>

                    <h4 className="mt-2 text-[34px] font-bold text-amber-400">
                      {formatPrice(item.priceNum)}
                    </h4>

                  </div>

                  <button className="flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-400 hover:scale-105">
  {t("explore")}
  <ArrowRight size={18} />
</button>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

      {/* Auth Modalı */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </section>
  );
}