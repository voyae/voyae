"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Clock3 } from "lucide-react";

const experiences = [
  {
    title: "Private Yacht Escape",
    description:
      "Sail across crystal-clear waters with a fully customized luxury itinerary.",
    image:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80",
    duration: "5 Days",
    rating: "4.9",
  },
  {
    title: "Luxury Desert Camp",
    description:
      "Spend unforgettable nights beneath the stars with premium comfort.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    duration: "3 Days",
    rating: "4.8",
  },
  {
    title: "Mountain Wellness Retreat",
    description:
      "Reconnect with nature through exclusive spa and wellness experiences.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    duration: "7 Days",
    rating: "5.0",
  },
];

export default function Experiences() {
  return (
    <section
      id="experiences"
      className="bg-[#070D1F] py-32"
    >
      <div className="mx-auto w-[92%] max-w-[1550px]">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-amber-500">
              Luxury Experiences
            </p>

            <h2 className="mt-5 font-display text-6xl leading-tight text-white">
              Beyond destinations.
            </h2>

            <p className="mt-6 text-xl leading-9 text-slate-400">
              Extraordinary experiences designed for travelers seeking elegance,
              adventure and unforgettable memories.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-full border border-white/10 bg-[#101935] px-7 py-4 font-medium text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-amber-500 hover:text-slate-950">
            View All
            <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-10 lg:grid-cols-3">

          {experiences.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
              }}
              className="group overflow-hidden rounded-[34px] bg-[#101935] border border-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.4)] transition duration-500 hover:-translate-y-3 hover:shadow-[0_35px_90px_rgba(0,0,0,0.6)]"
            >
              {/* Image */}
              <div className="relative overflow-hidden">

                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[390px] w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#101935] via-transparent to-transparent" />

                <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white backdrop-blur-xl">
                  Premium
                </div>

                <div className="absolute right-6 top-6 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white backdrop-blur-xl">
                  {item.duration}
                </div>

              </div>

              {/* Content */}
              <div className="p-8">

                <div className="mb-5 flex items-center gap-6 text-sm text-slate-400">

                  <span className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {item.rating}
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-amber-400" />
                    {item.duration}
                  </span>

                </div>

                <h3 className="font-display text-[38px] leading-tight text-white">
                  {item.title}
                </h3>

                <p className="mt-5 text-lg leading-8 text-slate-400">
                  {item.description}
                </p>

                <button className="mt-8 flex items-center gap-2 rounded-full bg-amber-500 px-7 py-4 font-semibold text-slate-950 transition duration-300 hover:bg-amber-400 hover:scale-105">
                  Discover
                  <ArrowRight size={18} />
                </button>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}