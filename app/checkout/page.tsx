"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  BedDouble, 
  ArrowRight, 
  Lock, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Sparkles,
  CheckCircle2,
  ShieldCheck
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const params = useSearchParams();

  // URL'den gelen veriler
  const offerId = params.get("offerId") ?? "";
  const hotelId = params.get("hotelId") ?? "";
  const roomName = params.get("room") ? decodeURIComponent(params.get("room")!) : "Standart Oda";
  const price = params.get("price") ?? "0";
  const checkIn = params.get("checkIn") ?? "";
  const checkOut = params.get("checkOut") ?? "";
  const currency = params.get("currency") ?? "TRY";
  const currencySymbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : "₺";

  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [guest, setGuest] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  async function continueBooking() {
    setTouched(true);
    if (!guest.firstName || !guest.lastName || !guest.email || !guest.phone) {
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/bookings/prebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offerId, hotelId, roomName, price }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Ön rezervasyon doğrulanamadı.");
      }

      sessionStorage.setItem("prebook", JSON.stringify(data));
      sessionStorage.setItem("guest", JSON.stringify(guest));
      router.push("/checkout/payment");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  return (
    <main className="min-h-screen bg-[#070D1F] text-slate-100 pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-amber-500 selection:text-slate-950">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500">
        
        {/* Üst Kısım: Başlık ve Stepper */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase mb-1">
              <Sparkles size={14} className="animate-pulse" /> Güvenli Rezervasyon Adımı
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Misafir ve İletişim Bilgileri</h1>
          </div>

          {/* Stepper Görseli */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-medium overflow-x-auto pb-2 lg:pb-0">
            <div className="flex items-center gap-2 text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-full border border-amber-400/20 shrink-0">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-[10px]">1</span>
              <span>Misafir Bilgileri</span>
            </div>
            <div className="w-6 sm:w-8 h-[1px] bg-white/20 shrink-0" />
            <div className="flex items-center gap-2 text-slate-500 px-3 py-1.5 rounded-full shrink-0">
              <span className="w-5 h-5 rounded-full bg-white/10 text-slate-400 flex items-center justify-center font-bold text-[10px]">2</span>
              <span>Ödeme</span>
            </div>
          </div>
        </div>

        {/* Ana Grid Yapısı */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* SOL TARAF: Form Alanları */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#101935]/80 backdrop-blur-xl border border-white/10 p-5 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-white/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-inner">
                  <User size={20} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">Ana Misafir (Lead Guest)</h2>
                  <p className="text-xs text-slate-400">Otele check-in yapacak kişinin kimlik bilgilerini giriniz.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                
                {/* Ad */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    Ad <span className="text-amber-400">*</span>
                  </label>
                  <input 
                    type="text"
                    className={`w-full bg-[#070D1F] border rounded-2xl px-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all shadow-inner ${
                      touched && !guest.firstName ? "border-rose-500/80 focus:ring-1 focus:ring-rose-500" : "border-white/10 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    }`}
                    value={guest.firstName} 
                    onChange={(e) => setGuest({...guest, firstName: e.target.value})} 
                    placeholder="Örn: Ahmet" 
                  />
                </div>

                {/* Soyad */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    Soyad <span className="text-amber-400">*</span>
                  </label>
                  <input 
                    type="text"
                    className={`w-full bg-[#070D1F] border rounded-2xl px-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all shadow-inner ${
                      touched && !guest.lastName ? "border-rose-500/80 focus:ring-1 focus:ring-rose-500" : "border-white/10 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    }`}
                    value={guest.lastName} 
                    onChange={(e) => setGuest({...guest, lastName: e.target.value})} 
                    placeholder="Örn: Yılmaz" 
                  />
                </div>

                {/* E-posta */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    E-posta Adresi <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-4 text-slate-500" />
                    <input 
                      type="email"
                      className={`w-full bg-[#070D1F] border rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all shadow-inner ${
                        touched && !guest.email ? "border-rose-500/80 focus:ring-1 focus:ring-rose-500" : "border-white/10 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                      }`}
                      value={guest.email} 
                      onChange={(e) => setGuest({...guest, email: e.target.value})} 
                      placeholder="rezervasyon@ornek.com" 
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">Onay belgesi ve voucher bu adrese iletilecektir.</p>
                </div>

                {/* Telefon */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    Cep Telefonu <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-4 text-slate-500" />
                    <input 
                      type="tel"
                      className={`w-full bg-[#070D1F] border rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all shadow-inner ${
                        touched && !guest.phone ? "border-rose-500/80 focus:ring-1 focus:ring-rose-500" : "border-white/10 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                      }`}
                      value={guest.phone} 
                      onChange={(e) => setGuest({...guest, phone: e.target.value})} 
                      placeholder="+90 (555) 000 00 00" 
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Bilgilendirme Kutusu */}
            <div className="bg-[#101935]/40 border border-white/5 p-4 sm:p-5 rounded-2xl flex items-start gap-3.5 text-xs text-slate-400">
              <CheckCircle2 size={18} className="text-amber-400 shrink-0 mt-0.5" />
              <p>
                Kişisel verileriniz KVKK ve uluslararası standartlar çerçevesinde güvenle saklanır, sadece otel rezervasyon süreci için işleme alınır.
              </p>
            </div>
          </div>

          {/* SAĞ TARAF: Detaylı Rezervasyon Özeti */}
          <div className="lg:col-span-4">
            <div className="bg-[#101935] border border-amber-500/30 p-5 sm:p-7 rounded-3xl shadow-2xl space-y-6 lg:sticky lg:top-28 transition-all">
              
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Özet Bilgi</span>
                <h2 className="text-lg font-black text-white mt-0.5">Seçilen Konaklama</h2>
              </div>

              {/* Oda ve Tarih */}
              <div className="space-y-3 text-xs">
                <div className="space-y-1 bg-[#070D1F] p-3.5 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Oda Tipi</span>
                  <div className="font-bold text-white flex items-start gap-2">
                    <BedDouble size={16} className="text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{roomName}</span>
                  </div>
                </div>

                {checkIn && checkOut && (
                  <div className="space-y-1 bg-[#070D1F] p-3.5 rounded-2xl border border-white/5">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Konaklama Tarihleri</span>
                    <div className="font-bold text-white flex items-center gap-2">
                      <Calendar size={16} className="text-amber-400 shrink-0" />
                      <span>{formatDate(checkIn)} - {formatDate(checkOut)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Fiyat Detayı */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Oda Fiyatı ve Vergiler</span>
                  <span className="text-emerald-400 font-medium">Dahil</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-bold text-white">Toplam Tutar</span>
                  <span className="text-2xl font-black text-amber-400 tracking-tight">
                    {currencySymbol} {Number(price).toLocaleString("tr-TR")}
                  </span>
                </div>
              </div>

              {/* Buton */}
              <button 
                type="button"
                onClick={continueBooking}
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] cursor-pointer disabled:opacity-50 group"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Müsaitlik Doğrulanıyor...</span>
                  </span>
                ) : (
                  <>
                    <span>Ödeme Adımına Geç</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              {/* Güvenlik Rozeti */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 bg-[#070D1F] py-3 rounded-2xl border border-white/5">
                <Lock size={14} className="text-emerald-400" />
                <span>256-bit SSL Güvenli Altyapı</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}