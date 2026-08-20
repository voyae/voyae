"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Calendar, Compass, Heart, Settings, 
  ShieldCheck, LogOut, MapPin, Hotel, Sparkles, 
  Trash2, AlertCircle, CheckCircle, Download, CreditCard, 
  Plus, X, Lock, Shield
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"bookings" | "ai_trips" | "favorites" | "wallet" | "settings">("bookings");
  const [bookingFilter, setBookingFilter] = useState<"active" | "past">("active");

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Yeni Kart Modalı State'leri
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardExpiry, setNewCardExpiry] = useState("");
  const [newCardCvc, setNewCardCvc] = useState("");
  const [newCardName, setNewCardName] = useState("");

  const [profileData, setProfileData] = useState({
    fullName: "",
    phone: "+90 (555) 123 45 67",
    nationality: "Türkiye",
    currency: "EUR (€)"
  });

  const [cards, setCards] = useState([
    { id: "1", last4: "4242", brand: "Visa", expiry: "12/28" },
    { id: "2", last4: "8810", brand: "Mastercard", expiry: "09/27" }
  ]);

  const [bookings, setBookings] = useState([
    {
      id: "v-8492",
      title: "Maldives Luxury Water Villa",
      type: "Otel Rezervasyonu",
      date: "12 Eylül - 18 Eylül 2026",
      status: "Onaylandı",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800",
      location: "Maldivler",
      price: "€2,450",
      freeCancel: "10 Eylül 2026 tarihine kadar ücretsiz iptal"
    },
    {
      id: "v-9104",
      title: "Cappadocia Balloon & Cave Suite",
      type: "Deneyim & Konaklama",
      date: "04 Ekim - 07 Ekim 2026",
      status: "Onaylandı",
      image: "https://images.unsplash.com/photo-1641128324972-af32a7efc64d?auto=format&fit=crop&q=80&w=800",
      location: "Nevşehir, Türkiye",
      price: "₺18,500",
      freeCancel: "28 Eylül 2026 tarihine kadar ücretsiz iptal"
    }
  ]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/");
      } else {
        setUser(session.user);
        setProfileData(prev => ({
          ...prev,
          fullName: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || ""
        }));
      }
      setLoading(false);
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleCancelBooking = () => {
    if (selectedBooking) {
      setBookings(bookings.filter(b => b.id !== selectedBooking.id));
      setCancelModalOpen(false);
      setSelectedBooking(null);
      showToast("Rezervasyon başarıyla iptal edildi.");
    }
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardNumber || !newCardExpiry || !newCardCvc || !newCardName) {
      showToast("Lütfen tüm alanları eksiksiz doldurun.");
      return;
    }

    const cleanedNumber = newCardNumber.replace(/\s+/g, "");
    const last4 = cleanedNumber.slice(-4) || "0000";
    let brand = "Visa";
    if (cleanedNumber.startsWith("5")) brand = "Mastercard";
    else if (cleanedNumber.startsWith("9")) brand = "Troy";

    const newCardObj = {
      id: Date.now().toString(),
      last4: last4,
      brand: brand,
      expiry: newCardExpiry
    };

    setCards([...cards, newCardObj]);
    setCardModalOpen(false);
    setNewCardNumber("");
    setNewCardExpiry("");
    setNewCardCvc("");
    setNewCardName("");
    showToast("Kartınız güvenle kaydedildi.");
  };

  const showToast = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-amber-500"></div>
      </div>
    );
  }

  if (!user) return null;

  const avatarLetter = (profileData.fullName || user.email).charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 pt-32 pb-24 px-4 md:px-12 relative selection:bg-amber-500 selection:text-slate-950">
      
      {/* Bildirim Toast */}
      <AnimatePresence>
        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-28 right-6 z-50 bg-amber-500 text-slate-950 font-bold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs border border-amber-400"
          >
            <CheckCircle size={16} /> {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* PROFİLE HERO KARTI */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center text-3xl font-black shadow-lg">
              {avatarLetter}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <h1 className="text-2xl font-bold text-white">{profileData.fullName || "Voyae Gezgini"}</h1>
                <span className="bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck size={12} className="text-amber-400" /> Doğrulanmış Hesap
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center justify-center md:justify-start gap-1.5">
                <Mail size={13} className="text-slate-500" /> {user.email}
              </p>
              <p className="text-[11px] text-slate-500 flex items-center justify-center md:justify-start gap-1">
                <Calendar size={12} /> Üyelik: {new Date(user.created_at).toLocaleDateString("tr-TR", { month: "long", year: "numeric" })}
              </p>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
          >
            <LogOut size={14} /> Oturumu Kapat
          </button>
        </div>

        {/* SEKME MENÜSÜ */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-none">
          {[
            { id: "bookings", label: `Rezervasyonlarım (${bookings.length})`, icon: Hotel },
            { id: "ai_trips", label: "Yapay Zeka Rotalarım", icon: Sparkles },
            { id: "favorites", label: "Favorilerim", icon: Heart },
            { id: "wallet", label: "Ödeme Yöntemleri", icon: CreditCard },
            { id: "settings", label: "Hesap Ayarları", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive 
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md" 
                    : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
                }`}
              >
                <Icon size={14} className={isActive ? "text-slate-950" : "text-amber-500"} /> 
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* İÇERİK ALANI */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            
            {/* 1. REZERVASYONLAR */}
            {activeTab === "bookings" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
                    <button onClick={() => setBookingFilter("active")} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${bookingFilter === "active" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"}`}>Aktif Rezervasyonlar</button>
                    <button onClick={() => setBookingFilter("past")} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${bookingFilter === "past" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"}`}>Geçmiş Seyahatler</button>
                  </div>
                  <Link href="/#destinations" className="text-xs font-bold text-amber-400 hover:underline">Yeni Rezervasyon Yap &rarr;</Link>
                </div>

                {bookings.length === 0 ? (
                  <div className="rounded-3xl bg-slate-900 border border-slate-800 p-12 text-center space-y-3">
                    <Hotel size={36} className="mx-auto text-slate-600" />
                    <h3 className="text-base font-bold text-white">Rezervasyon Bulunamadı</h3>
                    <p className="text-xs text-slate-400">Voyae ile hayalinizdeki tatili hemen planlayın.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {bookings.map((item) => (
                      <div key={item.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                        <div className="flex flex-col md:flex-row items-center gap-5 w-full md:w-auto">
                          <img src={item.image} alt={item.title} className="w-full md:w-36 h-28 object-cover rounded-xl" />
                          <div className="space-y-1.5 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2">
                              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                <CheckCircle size={10} /> {item.status}
                              </span>
                              <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={12} className="text-amber-500" /> {item.location}</span>
                            </div>
                            <h4 className="text-base font-bold text-white">{item.title}</h4>
                            <p className="text-xs text-slate-400 flex items-center gap-1.5"><Calendar size={13} className="text-slate-500" /> {item.date}</p>
                            <p className="text-[11px] text-amber-400/90 font-medium">{item.freeCancel}</p>
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-800">
                          <div className="text-right hidden md:block">
                            <p className="text-[10px] text-slate-500">Toplam Tutar</p>
                            <p className="text-base font-black text-white">{item.price}</p>
                          </div>
                          <button onClick={() => showToast("E-bilet cihazınıza indiriliyor...")} className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all w-full md:w-auto cursor-pointer">
                            <Download size={14} /> E-Bilet İndir
                          </button>
                          <button onClick={() => { setSelectedBooking(item); setCancelModalOpen(true); }} className="flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all w-full md:w-auto cursor-pointer">
                            <Trash2 size={14} /> İptal Et
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 2. YAPAY ZEKA ROTALARI */}
            {activeTab === "ai_trips" && (
              <div className="rounded-3xl bg-slate-900 border border-slate-800 p-12 text-center space-y-3">
                <Sparkles size={36} className="mx-auto text-amber-500" />
                <h3 className="text-base font-bold text-white">Yapay Zeka Planın Bulunmuyor</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">Yapay zeka seyahat asistanımız ile bütçene uygun rotayı oluştur.</p>
                <Link href="/#ai" className="inline-block mt-2 bg-amber-500 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl">Rota Oluştur</Link>
              </div>
            )}

            {/* 3. FAVORİLER */}
            {activeTab === "favorites" && (
              <div className="rounded-3xl bg-slate-900 border border-slate-800 p-12 text-center space-y-3">
                <Heart size={36} className="mx-auto text-rose-500" />
                <h3 className="text-base font-bold text-white">Favori Listesi Boş</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">Beğendiğin otel ve mekanları favorilere ekle.</p>
                <Link href="/#destinations" className="inline-block mt-2 bg-slate-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl border border-slate-700">Keşfet</Link>
              </div>
            )}

            {/* 4. ÖDEME YÖNTEMLERİ (CÜZDAN) */}
            {activeTab === "wallet" && (
              <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 space-y-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">Kayıtlı Kartlarım</h3>
                    <p className="text-xs text-slate-400">Güvenli rezervasyonlar için hızlı ödeme kartlarınız.</p>
                  </div>
                  <button onClick={() => setCardModalOpen(true)} className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer">
                    <Plus size={14} /> Yeni Kart Ekle
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cards.map(card => (
                    <div key={card.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-md">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-white/5 border border-slate-800 rounded-lg flex items-center justify-center p-1">
                          {card.brand === "Visa" ? (
                            <svg viewBox="0 0 48 16" className="w-8 h-auto fill-blue-500">
                              <path d="M18.8 0.5L13 14.7H9.1L5.6 3.4C5.3 2.3 5.1 2 4.6 1.7C3.5 1.1 1.8 0.6 0.5 0.3L0.3 0.5H5.8C6.6 0.5 7.4 1.1 7.6 2L9.1 10.3L13.7 0.5H18.8ZM35.3 10.1C35.3 6.2 29.8 6 29.8 4.3C29.8 3.8 31.3 3.3 33.1 3.3C34 3.3 35.1 3.5 35.9 3.9L36.5 1.4C35.6 1.1 34.4 0.9 33.1 0.9C29.2 0.9 26.5 3 26.5 6.1C26.5 8.5 28.7 9.8 30.4 10.6C32.1 11.4 32.7 11.9 32.7 12.6C32.7 13.6 31.5 14 30.4 14C28.8 14 27.6 13.5 26.7 13L26 15.6C26.9 16 28.2 16.2 29.6 16.2C33.8 16.2 35.3 14 35.3 10.1ZM44.7 14.7H47.8L45.1 0.5H42.4C41.7 0.5 41.2 0.9 41 1.5L35.2 14.7H38.7L39.4 12.7H43.9L44.7 14.7ZM40.3 9.9L42.2 4.5L43.3 9.9H40.3ZM24.6 0.5H21.6L19 14.7H22.5L24.6 0.5Z"/>
                            </svg>
                          ) : (
                            <svg viewBox="0 0 38 24" className="w-8 h-auto">
                              <circle cx="14" cy="12" r="10" fill="#EB001B"/>
                              <circle cx="24" cy="12" r="10" fill="#F79E1B" fillOpacity="0.8"/>
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">•••• •••• •••• {card.last4}</p>
                          <p className="text-[10px] text-slate-400">Son Kullanma: {card.expiry}</p>
                        </div>
                      </div>
                      <button onClick={() => { setCards(cards.filter(c => c.id !== card.id)); showToast("Kart silindi."); }} className="text-slate-500 hover:text-red-400 cursor-pointer p-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. HESAP AYARLARI */}
            {activeTab === "settings" && (
              <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 space-y-6 shadow-xl">
                <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Profil ve Tercih Ayarları</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400">Ad Soyad</label>
                    <input 
                      type="text" 
                      value={profileData.fullName} 
                      onChange={e => setProfileData({...profileData, fullName: e.target.value})} 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400">E-posta (Değiştirilemez)</label>
                    <input type="text" disabled value={user.email} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-500 cursor-not-allowed" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400">Telefon Numarası</label>
                    <input 
                      type="text" 
                      value={profileData.phone} 
                      onChange={e => setProfileData({...profileData, phone: e.target.value})} 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400">Para Birimi Tercihi</label>
                    <select 
                      value={profileData.currency} 
                      onChange={e => setProfileData({...profileData, currency: e.target.value})} 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option>EUR (€)</option>
                      <option>USD ($)</option>
                      <option>TRY (₺)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button onClick={() => showToast("Değişiklikler kaydedildi.")} className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-xl transition-all cursor-pointer">
                    Değişiklikleri Kaydet
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* YENİ KART EKLEME MODALI (PROFESYONEL ÖDEME PANELİ) */}
      <AnimatePresence>
        {cardModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
              
              {/* Modal Başlığı ve Logolar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <CreditCard size={20} className="text-amber-400" /> Kart Bilgileri
                  </h3>
                  <p className="text-xs text-slate-400">256-Bit SSL ile güvenli ve şifreli kart ekleme</p>
                </div>
                <button onClick={() => setCardModalOpen(false)} className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-all cursor-pointer">
                  <X size={18} />
                </button>
              </div>

              {/* Desteklenen Kart Logoları Şeridi */}
              <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800/80 px-4 py-2.5 rounded-2xl">
                <span className="text-[11px] text-slate-400 font-medium"></span>
                <div className="flex items-center gap-3">
                  {/* Visa */}
                  <svg viewBox="0 0 48 16" className="w-8 h-auto fill-blue-500">
                    <path d="M18.8 0.5L13 14.7H9.1L5.6 3.4C5.3 2.3 5.1 2 4.6 1.7C3.5 1.1 1.8 0.6 0.5 0.3L0.3 0.5H5.8C6.6 0.5 7.4 1.1 7.6 2L9.1 10.3L13.7 0.5H18.8ZM35.3 10.1C35.3 6.2 29.8 6 29.8 4.3C29.8 3.8 31.3 3.3 33.1 3.3C34 3.3 35.1 3.5 35.9 3.9L36.5 1.4C35.6 1.1 34.4 0.9 33.1 0.9C29.2 0.9 26.5 3 26.5 6.1C26.5 8.5 28.7 9.8 30.4 10.6C32.1 11.4 32.7 11.9 32.7 12.6C32.7 13.6 31.5 14 30.4 14C28.8 14 27.6 13.5 26.7 13L26 15.6C26.9 16 28.2 16.2 29.6 16.2C33.8 16.2 35.3 14 35.3 10.1ZM44.7 14.7H47.8L45.1 0.5H42.4C41.7 0.5 41.2 0.9 41 1.5L35.2 14.7H38.7L39.4 12.7H43.9L44.7 14.7ZM40.3 9.9L42.2 4.5L43.3 9.9H40.3ZM24.6 0.5H21.6L19 14.7H22.5L24.6 0.5Z"/>
                  </svg>
                  {/* Mastercard */}
                  <svg viewBox="0 0 38 24" className="w-7 h-auto">
                    <circle cx="14" cy="12" r="10" fill="#EB001B"/>
                    <circle cx="24" cy="12" r="10" fill="#F79E1B" fillOpacity="0.8"/>
                  </svg>
                  {/* Troy */}
                  <span className="text-[10px] font-black tracking-wider text-red-500 bg-white/5 px-2 py-0.5 rounded border border-slate-800">TROY</span>
                </div>
              </div>

              {/* Form Alanları */}
              <form onSubmit={handleAddCard} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium">Kart Üzerindeki Ad Soyad</label>
                  <input 
                    type="text" 
                    placeholder="Örn: Ahmet Yılmaz"
                    value={newCardName}
                    onChange={e => setNewCardName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-all placeholder:text-slate-600"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium">Kart Numarası</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="4532 0000 0000 0000"
                      maxLength={19}
                      value={newCardNumber}
                      onChange={e => setNewCardNumber(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-10 py-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-all tracking-wider font-mono placeholder:text-slate-600"
                      required
                    />
                    <CreditCard size={16} className="absolute right-3.5 top-3.5 text-slate-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-medium">Son Kullanma Tarihi</label>
                    <input 
                      type="text" 
                      placeholder="AA/YY"
                      maxLength={5}
                      value={newCardExpiry}
                      onChange={e => setNewCardExpiry(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-all font-mono placeholder:text-slate-600"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-medium">CVV / CVC</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        placeholder="3 haneli güvenlik kodu"
                        maxLength={4}
                        value={newCardCvc}
                        onChange={e => setNewCardCvc(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-10 py-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-all font-mono placeholder:text-slate-600"
                        required
                      />
                      <Lock size={14} className="absolute right-3.5 top-3.5 text-slate-500" />
                    </div>
                  </div>
                </div>

                {/* Güvenlik Bilgilendirme Kutusu */}
                <div className="flex items-center gap-2.5 bg-amber-500/5 border border-amber-500/10 p-3.5 rounded-2xl text-[11px] text-amber-300/90">
                  <Shield size={16} className="text-amber-400 shrink-0" />
                  <span>Kart bilgileriniz PCI-DSS standartlarında güvenle şifrelenir ve saklanır.</span>
                </div>

                {/* Butonlar */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button type="button" onClick={() => setCardModalOpen(false)} className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer">
                    Vazgeç
                  </button>
                  <button type="submit" className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all cursor-pointer shadow-lg shadow-amber-500/20">
                    Kaydet
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* İPTAL ONAY MODALI */}
      <AnimatePresence>
        {cancelModalOpen && selectedBooking && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <AlertCircle size={18} className="text-red-400" /> Rezervasyonu İptal Et
                </h3>
                <button onClick={() => setCancelModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer"><X size={18} /></button>
              </div>
              <p className="text-xs text-slate-300">
                <strong className="text-white">{selectedBooking.title}</strong> rezervasyonunu iptal etmek istediğinize emin misiniz?
              </p>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button onClick={() => setCancelModalOpen(false)} className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 cursor-pointer">Vazgeç</button>
                <button onClick={handleCancelBooking} className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-500 text-white cursor-pointer">Evet, İptal Et</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}