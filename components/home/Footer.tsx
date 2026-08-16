"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">

      <div className="mx-auto w-[92%] max-w-[1550px] py-32">

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[42px] bg-gradient-to-r from-emerald-700 to-emerald-800 px-14 py-16 text-center shadow-[0_35px_90px_rgba(0,0,0,0.28)]"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-white/70">
            Ready for your next journey?
          </p>

          <h2 className="mt-5 font-display text-6xl leading-tight">
            Let's build your dream vacation.
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-white/80">
            Luxury destinations, AI-powered planning and unforgettable
            experiences—all crafted exclusively for you.
          </p>

          <button className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-9 py-4 text-lg font-semibold text-black transition duration-300 hover:scale-105">
            Plan My Trip
            <ArrowRight size={20} />
          </button>
        </motion.div>

        {/* Footer Grid */}
        <div className="mt-24 grid gap-16 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>

            <h3 className="font-display text-5xl">
              Voyae
            </h3>

            <p className="mt-6 text-lg leading-9 text-neutral-400">
              Luxury travel experiences powered by AI and crafted for modern
              explorers around the world.
            </p>

          </div>

          {/* Explore */}
          <div>

            <h4 className="mb-7 text-xl font-semibold">
              Explore
            </h4>

            <ul className="space-y-5 text-lg text-neutral-400">

              <li className="cursor-pointer transition hover:text-white">
                Destinations
              </li>

              <li className="cursor-pointer transition hover:text-white">
                Experiences
              </li>

              <li className="cursor-pointer transition hover:text-white">
                AI Planner
              </li>

              <li className="cursor-pointer transition hover:text-white">
                Testimonials
              </li>

            </ul>

          </div>

          {/* Company */}
          <div>

            <h4 className="mb-7 text-xl font-semibold">
              Company
            </h4>

            <ul className="space-y-5 text-lg text-neutral-400">

              <li className="cursor-pointer transition hover:text-white">
                About
              </li>

              <li className="cursor-pointer transition hover:text-white">
                Contact
              </li>

              <li className="cursor-pointer transition hover:text-white">
                Careers
              </li>

              <li className="cursor-pointer transition hover:text-white">
                Privacy Policy
              </li>

            </ul>

          </div>

          {/* Social */}
          <div>

            <h4 className="mb-7 text-xl font-semibold">
              Follow Us
            </h4>

            <div className="flex gap-4">

              <button className="rounded-full border border-white/10 p-4 transition duration-300 hover:bg-white hover:text-black">
                <FaInstagram size={20} />
              </button>

              <button className="rounded-full border border-white/10 p-4 transition duration-300 hover:bg-white hover:text-black">
                <FaTwitter size={20} />
              </button>

              <button className="rounded-full border border-white/10 p-4 transition duration-300 hover:bg-white hover:text-black">
                <FaLinkedinIn size={20} />
              </button>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-base text-neutral-500 md:flex-row">

          <p>© 2026 Voyae. All rights reserved.</p>

          <p>Designed with Next.js & Tailwind CSS</p>

        </div>

      </div>

    </footer>
  );
}