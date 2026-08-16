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
      className="bg-[#f8f6f2] py-32"
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
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-emerald-700">
              Luxury Experiences
            </p>

            <h2 className="mt-5 font-display text-6xl leading-tight text-gray-900">
              Beyond destinations.
            </h2>

            <p className="mt-6 text-xl leading-9 text-gray-600">
              Extraordinary experiences designed for travelers seeking elegance,
              adventure and unforgettable memories.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-7 py-4 font-medium shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
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
              className="group overflow-hidden rounded-[34px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.10)] transition duration-500 hover:-translate-y-3 hover:shadow-[0_35px_90px_rgba(0,0,0,0.18)]"
            >
              {/* Image */}
              <div className="relative overflow-hidden">

                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[390px] w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                <div className="absolute left-6 top-6 rounded-full bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-xl">
                  Premium
                </div>

                <div className="absolute right-6 top-6 rounded-full bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-xl">
                  {item.duration}
                </div>

              </div>

              {/* Content */}
              <div className="p-8">

                <div className="mb-5 flex items-center gap-6 text-sm text-gray-500">

                  <span className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {item.rating}
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4" />
                    {item.duration}
                  </span>

                </div>

                <h3 className="font-display text-[38px] leading-tight text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-5 text-lg leading-8 text-gray-600">
                  {item.description}
                </p>

                <button className="mt-8 flex items-center gap-2 rounded-full bg-emerald-700 px-7 py-4 font-medium text-white transition duration-300 hover:scale-105">
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