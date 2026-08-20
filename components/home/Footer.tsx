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
    <footer className="bg-[#070D1F] text-white">

      <div className="mx-auto w-[92%] max-w-[1550px] py-32">

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[42px] bg-gradient-to-r from-[#101935] via-[#1a2b5c] to-[#070D1F] border border-white/10 px-14 py-16 text-center shadow-[0_35px_90px_rgba(0,0,0,0.4)]"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-amber-400">
            Ready for your next journey?
          </p>

          <h2 className="mt-5 font-display text-6xl leading-tight text-white">
            Let's build your dream vacation.
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-slate-300">
            Luxury destinations, AI-powered planning and unforgettable
            experiences—all crafted exclusively for you.
          </p>

          <button className="mt-10 inline-flex items-center gap-3 rounded-full bg-amber-500 px-9 py-4 text-lg font-semibold text-slate-950 transition duration-300 hover:bg-amber-400 hover:scale-105 shadow-lg shadow-amber-500/20">
            Plan My Trip
            <ArrowRight size={20} />
          </button>
        </motion.div>

        {/* Footer Grid */}
        <div className="mt-24 grid gap-16 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>

            <h3 className="font-display text-5xl text-white">
              Voyae
            </h3>

            <p className="mt-6 text-lg leading-9 text-slate-400">
              Luxury travel experiences powered by AI and crafted for modern
              explorers around the world.
            </p>

          </div>

          {/* Explore */}
          <div>

            <h4 className="mb-7 text-xl font-semibold text-white">
              Explore
            </h4>

            <ul className="space-y-5 text-lg text-slate-400">

              <li className="cursor-pointer transition hover:text-amber-400">
                Destinations
              </li>

              <li className="cursor-pointer transition hover:text-amber-400">
                Experiences
              </li>

              <li className="cursor-pointer transition hover:text-amber-400">
                AI Planner
              </li>

              <li className="cursor-pointer transition hover:text-amber-400">
                Testimonials
              </li>

            </ul>

          </div>

          {/* Company */}
          <div>

            <h4 className="mb-7 text-xl font-semibold text-white">
              Company
            </h4>

            <ul className="space-y-5 text-lg text-slate-400">

              <li className="cursor-pointer transition hover:text-amber-400">
                About
              </li>

              <li className="cursor-pointer transition hover:text-amber-400">
                Contact
              </li>

              <li className="cursor-pointer transition hover:text-amber-400">
                Careers
              </li>

              <li className="cursor-pointer transition hover:text-amber-400">
                Privacy Policy
              </li>

            </ul>

          </div>

          {/* Social */}
          <div>

            <h4 className="mb-7 text-xl font-semibold text-white">
              Follow Us
            </h4>

            <div className="flex gap-4">

              <button className="rounded-full border border-white/10 bg-[#101935] p-4 text-slate-300 transition duration-300 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500">
                <FaInstagram size={20} />
              </button>

              <button className="rounded-full border border-white/10 bg-[#101935] p-4 text-slate-300 transition duration-300 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500">
                <FaTwitter size={20} />
              </button>

              <button className="rounded-full border border-white/10 bg-[#101935] p-4 text-slate-300 transition duration-300 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500">
                <FaLinkedinIn size={20} />
              </button>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-base text-slate-500 md:flex-row">

          <p>© 2026 Voyae. All rights reserved.</p>

          <p>Designed by Roleda Media Agency</p>

        </div>

      </div>

    </footer>
  );
}