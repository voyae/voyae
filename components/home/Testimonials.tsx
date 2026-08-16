"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Emma Wilson",
    country: "United Kingdom",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    review:
      "Voyae planned every detail of our honeymoon in the Maldives. The villas, transfers and private dining experiences exceeded every expectation.",
  },
  {
    name: "Daniel Carter",
    country: "United States",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    review:
      "From Tokyo to Kyoto, everything was seamless. Having an AI concierge available throughout the trip made traveling completely stress-free.",
  },
  {
    name: "Sophia Martin",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80",
    review:
      "The most luxurious travel experience we've ever had. Every hotel, restaurant and activity felt perfectly selected for us.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-[#f8f6f2] py-32"
    >
      <div className="mx-auto w-[92%] max-w-[1550px]">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-emerald-700">
            Testimonials
          </p>

          <h2 className="mt-5 font-display text-6xl leading-tight text-gray-900">
            Loved by travelers.
          </h2>

          <p className="mt-6 text-xl leading-9 text-gray-600">
            Discover why luxury travelers trust Voyae to create unforgettable
            journeys around the world.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-10 lg:grid-cols-3">

          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
              }}
              whileHover={{ y: -10 }}
              className="rounded-[34px] border border-gray-200 bg-white p-10 shadow-[0_30px_80px_rgba(0,0,0,0.08)] transition duration-300"
            >

              <Quote
                size={44}
                className="mb-8 text-emerald-700/70"
              />

              <div className="mb-6 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-lg leading-9 text-gray-600">
                "{item.review}"
              </p>

              <div className="mt-10 flex items-center gap-5">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-full object-cover"
                />

                <div>

                  <h4 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.country}
                  </p>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}