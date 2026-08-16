"use client";

import { motion } from "framer-motion";
import { Heart, Star, MapPin, ArrowRight } from "lucide-react";

const destinations = [
  {
    title: "Maldives",
    location: "Indian Ocean",
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80",
    price: "$4,900",
    rating: "4.9",
  },
  {
    title: "Santorini",
    location: "Greece",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    price: "$3,600",
    rating: "4.8",
  },
  {
    title: "Kyoto",
    location: "Japan",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    price: "$2,800",
    rating: "4.9",
  },
];

export default function Destinations() {
  return (
    <section
      id="destinations"
      className="bg-[#f8f6f2] pt-80 pb-32"
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
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-emerald-700">
            Featured Destinations
          </p>

          <h2 className="mt-5 font-display text-6xl leading-tight text-gray-900">
            Handpicked Escapes.
          </h2>

          <p className="mt-6 text-xl leading-9 text-gray-600">
            Explore some of the world's most exclusive destinations curated
            for unforgettable journeys.
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
              className="group relative h-[500px] overflow-hidden rounded-[34px] shadow-[0_30px_80px_rgba(0,0,0,0.18)]"
            >

              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

              {/* Top */}
              <div className="absolute left-7 right-7 top-7 flex items-center justify-between">

                <span className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm text-white backdrop-blur-xl">
                  {item.location}
                </span>

                <button className="rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-xl transition hover:bg-white/20">
                  <Heart size={18} className="text-white" />
                </button>

              </div>

              {/* Bottom */}
              <div className="absolute bottom-0 w-full p-8 text-white">

                <h3 className="font-display text-[42px]">
                  {item.title}
                </h3>

                <div className="mt-4 flex items-center gap-6 text-white/80">

                  <span className="flex items-center gap-2">
                    <Star
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
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

                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                      From
                    </p>

                    <h4 className="mt-2 text-[34px] font-bold">
                      {item.price}
                    </h4>

                  </div>

                  <button className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:scale-105">
                    Explore
                    <ArrowRight size={18} />
                  </button>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}