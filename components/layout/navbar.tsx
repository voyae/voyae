"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Discover", href: "#discover" },
  { name: "Destinations", href: "#destinations" },
  { name: "Experiences", href: "#experiences" },
  { name: "AI Planner", href: "#ai" },
  { name: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed inset-x-0 top-4 z-[999] flex px-6 md:px-12 pointer-events-none transition-all duration-500 ${scrolled ? "justify-end" : "justify-center"}`}>
        <motion.nav
          layout
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ backgroundColor: "#0A1128" }}
          className={`pointer-events-auto flex items-center justify-between rounded-full border border-slate-700 shadow-2xl transition-all duration-500 ${
            scrolled 
              ? "w-auto gap-4 px-5 py-2.5" 
              : "w-[92vw] max-w-[1550px] px-8 py-4"
          }`}
        >
          {/* LOGO */}
          <Link
            href="/"
            style={{ color: "#FFFFFF" }}
            className={`font-black tracking-tight transition-all duration-300 ${scrolled ? "text-xl" : "text-3xl"}`}
          >
            {scrolled ? "V" : "Voyae"}
          </Link>

          {/* NORMAL LİNKLER */}
          {!scrolled && (
            <div className="hidden items-center gap-10 lg:flex">
              {links.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    color: hoveredIndex === index ? "#FBBF24" : "#E2E8F0",
                  }}
                  className="text-base font-semibold transition-colors duration-300 cursor-pointer"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          {/* SAĞ TARAF */}
          <div className="flex items-center gap-3">
            {!scrolled ? (
              <div className="hidden lg:block">
                <button 
                  style={{ backgroundColor: "#F59E0B", color: "#030712" }}
                  className="rounded-full px-7 py-3 text-sm font-bold transition-all hover:scale-105 shadow-md cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="h-4 w-[1px] bg-slate-700" />
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FBBF24")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#E2E8F0")}
                  style={{ color: "#E2E8F0" }}
                  className="flex items-center gap-2 cursor-pointer p-1 font-bold text-sm transition-colors duration-300"
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                  <span className="text-xs tracking-wider uppercase">Menu</span>
                </button>
              </div>
            )}

            {/* Mobil Menü Butonu */}
            {!scrolled && (
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FBBF24")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#E2E8F0")}
                style={{ color: "#E2E8F0" }}
                className="lg:hidden cursor-pointer p-1 transition-colors duration-300"
              >
                {mobileOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            )}
          </div>
        </motion.nav>
      </header>

      {/* AÇILIR MENÜ PENCERESİ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ backgroundColor: "#0A1128" }}
            className={`fixed ${scrolled ? "right-6 md:right-12" : "left-4 right-4 mx-auto max-w-md"} top-24 z-[1000] rounded-3xl border border-slate-700 p-6 shadow-2xl`}
          >
            <div className="flex flex-col gap-4 text-center">
              {links.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FBBF24")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#E2E8F0")}
                  style={{ color: "#E2E8F0" }}
                  className="text-lg font-semibold transition-colors duration-300 cursor-pointer py-1"
                >
                  {item.name}
                </Link>
              ))}
              <button 
                style={{ backgroundColor: "#F59E0B", color: "#030712" }}
                className="mt-2 rounded-full py-3.5 text-base font-bold transition-colors cursor-pointer shadow-md"
              >
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}