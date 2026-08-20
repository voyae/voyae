"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { useLanguageCurrency } from "@/hooks/useLanguageCurrency";
import { supabase } from "@/lib/supabase";
import AuthModal from "../AuthModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Supabase ve Auth Modal State'leri
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Profil Dropdown State'i
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Özel dropdown state'leri
  const [langOpen, setLangOpen] = useState(false);
  const [currOpen, setCurrOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const currRef = useRef<HTMLDivElement>(null);

  const { lang, setLang, currency, setCurrency, t } = useLanguageCurrency();

  // Dil değiştiğinde anında tüm siteyi güncelleyen fonksiyon
  const handleLanguageChange = (l: "en" | "tr" | "de") => {    
    setLang(l);
    localStorage.setItem("voyae_lang", l);
    window.location.href = window.location.pathname; 
  };

  const links = [
    { name: t("discover"), href: "#discover" },
    { name: t("destinations"), href: "#destinations" },
    { name: t("experiences"), href: "#experiences" },
    { name: t("aiPlanner"), href: "#ai" },
    { name: t("testimonials"), href: "#testimonials" },
  ];

  // Supabase Oturum Kontrolü ve Dinleyicisi
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProfileOpen(false);
  };

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

  // Dışarı tıklandığında menüleri kapatma
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
      if (currRef.current && !currRef.current.contains(event.target as Node)) {
        setCurrOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getCurrencySymbol = (curr: string) => {
    if (curr === "EUR") return "€";
    if (curr === "USD") return "$";
    return "₺";
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";

  return (
    <>
      <header className={`fixed inset-x-0 top-4 z-[999] flex px-4 md:px-12 pointer-events-none transition-all duration-500 ${scrolled ? "justify-end" : "justify-center"}`}>
        <motion.nav
          layout
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ backgroundColor: "#0A1128" }}
          className={`pointer-events-auto flex items-center justify-between rounded-full border border-slate-700/80 shadow-2xl transition-all duration-500 ${
            scrolled 
              ? "w-auto gap-3 px-5 py-2.5" 
              : "w-[96vw] max-w-[1550px] px-6 md:px-8 py-3.5"
          }`}
        >
          {/* LOGO */}
          <Link
            href="/"
            style={{ color: "#FFFFFF" }}
            className={`font-black tracking-tight transition-all duration-300 ${scrolled ? "text-xl" : "text-2xl md:text-3xl"}`}
          >
            {scrolled ? "V" : "Voyae"}
          </Link>

          {/* NORMAL LİNKLER */}
          {!scrolled && (
            <div className="hidden items-center gap-8 lg:flex">
              {links.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    color: hoveredIndex === index ? "#FBBF24" : "#E2E8F0",
                  }}
                  className="text-sm md:text-base font-semibold transition-colors duration-300 cursor-pointer"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          {/* SAĞ TARAF */}
          <div className="flex items-center gap-2.5 md:gap-3.5">
            {/* Dil ve Para Birimi Seçici */}
            {!scrolled && (
              <div className="flex items-center gap-1 bg-[#050a1a] border border-slate-700/70 rounded-2xl p-1 shadow-inner">
                
                {/* Dil Seçici */}
                <div className="relative" ref={langRef}>
                  <button
                    onClick={() => { setLangOpen(!langOpen); setCurrOpen(false); }}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white transition-all rounded-xl hover:bg-slate-800/50 cursor-pointer"
                  >
                    <span>{lang.toUpperCase()}</span>
                  </button>

                  <AnimatePresence>
                    {langOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 mt-2 w-20 rounded-2xl bg-[#0A1128] border border-slate-700 py-2 shadow-2xl z-50 flex flex-col gap-0.5"
                      >
                        {(["en", "tr", "de"] as const).map((l) => (
                          <button
                            key={l}
                            onClick={() => handleLanguageChange(l)}
                            className={`px-3 py-1.5 text-left text-xs font-semibold transition-colors cursor-pointer ${lang === l ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-200 hover:bg-slate-800"}`}
                          >
                            {l.toUpperCase()}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="w-[1px] h-4 bg-slate-700/60" />

                {/* Para Birimi Seçici */}
                <div className="relative" ref={currRef}>
                  <button
                    onClick={() => { setCurrOpen(!currOpen); setLangOpen(false); }}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white transition-all rounded-xl hover:bg-slate-800/50 cursor-pointer"
                  >
                    <span>{getCurrencySymbol(currency)}</span>
                  </button>

                  <AnimatePresence>
                    {currOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-24 rounded-2xl bg-[#0A1128] border border-slate-700 py-2 shadow-2xl z-50 flex flex-col gap-0.5"
                      >
                        {(["EUR", "USD", "TRY"] as const).map((c) => (
                          <button
                            key={c}
                            onClick={() => { setCurrency(c); setCurrOpen(false); }}
                            className={`px-3 py-1.5 text-left text-xs font-semibold transition-colors cursor-pointer ${currency === c ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-200 hover:bg-slate-800"}`}
                          >
                            {getCurrencySymbol(c)} ({c})
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            )}

            {/* DİNAMİK PROFİL DROPDOWN VEYA GİRİŞ BUTONU (Desktop) */}
            {!scrolled ? (
              <div className="hidden lg:flex items-center gap-3">
                {user ? (
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-2.5 bg-white/5 border border-slate-700/80 rounded-full px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-[10px]">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                      <span className="max-w-[100px] truncate">{displayName}</span>
                      <ChevronDown size={14} className={`transition-transform duration-200 text-slate-400 ${profileOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Profil Açılır Menüsü */}
                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0A1128] border border-slate-700/50 py-2 shadow-2xl z-50 flex flex-col overflow-hidden"
                        >
                          <div className="px-4 py-3 border-b border-slate-800/50 mb-1">
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Signed in as</p>
                            <p className="text-xs font-medium text-white truncate mt-0.5">{user.email}</p>
                          </div>

                          <Link
                            href="/profile"
                            onClick={() => setProfileOpen(false)}
                            className="group flex items-center gap-3 px-4 py-2.5 text-sm font-medium hover:bg-slate-800/60 transition-all"
                          >
                            <User size={16} className="text-amber-500" />
                            <span className="text-slate-200 group-hover:text-white transition-colors">
                              Profilim
                            </span>
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/5 hover:text-red-300 transition-all w-full text-left cursor-pointer border-t border-slate-800/50 mt-1"
                          >
                            <LogOut size={16} />
                            <span>Çıkış Yap</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button 
                    onClick={() => setAuthOpen(true)}
                    style={{ backgroundColor: "#F59E0B", color: "#030712" }}
                    className="rounded-full px-6 py-2.5 text-sm font-bold transition-all hover:scale-105 shadow-md cursor-pointer"
                  >
                    {t("signIn")}
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{ color: "#E2E8F0" }}
                className="flex items-center justify-center cursor-pointer p-1.5 transition-colors duration-300"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            )}

            {/* Mobil Menü Butonu */}
            {!scrolled && (
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{ color: "#E2E8F0" }}
                className="lg:hidden cursor-pointer p-1 transition-colors duration-300"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </motion.nav>
      </header>

      {/* AÇILIR MOBİL MENÜ PENCERESİ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ backgroundColor: "#0A1128" }}
            className={`fixed ${scrolled ? "right-4 md:right-12" : "left-4 right-4 mx-auto max-w-md"} top-20 z-[1000] rounded-3xl border border-slate-700 p-6 shadow-2xl`}
          >
            <div className="flex flex-col gap-4 text-center">
              {scrolled && (
                <div className="flex items-center justify-center gap-3 pb-3 border-b border-slate-700/60">
                  <div className="flex items-center gap-2">
                    {(["en", "tr", "de"] as const).map((l) => (
                      <button
                        key={l}
                        onClick={() => handleLanguageChange(l)}
                        className={`text-xs font-bold px-2 py-1 rounded-lg cursor-pointer ${lang === l ? "bg-amber-500 text-slate-950" : "text-slate-300"}`}
                      >
                        {l.toUpperCase()}
                      </button>
                    ))}
                    <span className="text-slate-600">|</span>
                    {(["EUR", "USD", "TRY"] as const).map((c) => (
                      <button
                        key={c}
                        onClick={() => setCurrency(c)}
                        className={`text-xs font-bold px-2 py-1 rounded-lg cursor-pointer ${currency === c ? "bg-amber-500 text-slate-950" : "text-slate-300"}`}
                      >
                        {getCurrencySymbol(c)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ color: "#E2E8F0" }}
                  className="text-base font-semibold transition-colors duration-300 cursor-pointer py-1 hover:text-amber-400"
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobilde Dinamik Giriş/Profil Seçeneği */}
              {user ? (
                <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-700/60">
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-[10px]">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                    <span>{displayName}</span>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full bg-white/5 py-2 text-xs font-bold text-white transition-colors border border-slate-700"
                  >
                    Profilim
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); setMobileOpen(false); }}
                    className="rounded-full bg-red-500/10 py-2 text-xs font-bold text-red-400 transition-colors cursor-pointer"
                  >
                    Çıkış Yap
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
                  style={{ backgroundColor: "#F59E0B", color: "#030712" }}
                  className="mt-2 rounded-full py-3 text-sm font-bold transition-colors cursor-pointer shadow-md"
                >
                  {t("signIn")}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Supabase Auth Modal Entegrasyonu */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}