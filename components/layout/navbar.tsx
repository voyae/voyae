"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Discover", href: "#" },
  { name: "Destinations", href: "#destinations" },
  { name: "Experiences", href: "#experiences" },
  { name: "AI Planner", href: "#ai" },
  { name: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-6 z-50">
        <div className="mx-auto w-[92%] max-w-[1550px]">
          <motion.nav
            initial={{ opacity: 0, y: -35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`flex items-center justify-between rounded-full border transition-all duration-300 ${
              scrolled
                ? "border-white/15 bg-white/10 px-10 py-4 shadow-2xl backdrop-blur-3xl"
                : "border-white/20 bg-white/8 px-10 py-5 backdrop-blur-xl"
            }`}
          >
            <Link
              href="/"
              className="text-4xl font-bold tracking-tight text-white"
            >
              Voyae
            </Link>

            <div className="hidden items-center gap-14 lg:flex">
              {links.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-xl text-white/85 transition hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="hidden lg:block">
              <button className="rounded-full bg-emerald-700 px-9 py-4 text-lg font-semibold text-white transition hover:scale-105">
                Sign In
              </button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white lg:hidden"
            >
              {mobileOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </motion.nav>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            className="fixed left-4 right-4 top-28 z-40 rounded-3xl border border-white/20 bg-black/70 p-8 backdrop-blur-3xl lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {links.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xl text-white"
                >
                  {item.name}
                </Link>
              ))}

              <button className="mt-4 rounded-full bg-emerald-700 py-4 text-lg font-semibold text-white">
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}