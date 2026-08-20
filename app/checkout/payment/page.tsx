"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  CheckCircle2, 
  Sparkles,
  ChevronRight
} from "lucide-react";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [guest, setGuest] = useState<any>(null);
  const [prebookData, setPrebookData] = useState<any>(null);
  const [hotelName, setHotelName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Kart formu state'leri
  const [cardInfo, setCardInfo] = useState({
    cardHolder: "",
    cardNumber: "",
    expireDate: "",
    cvv: ""
  });

  const roomParam = searchParams.get("room") || "Standart Oda";
  const priceParam = searchParams.get("price") || "54714";
  const hotelIdParam = searchParams.get("hotelId") || "";
  const urlHotelName = searchParams.get("hotelName");

  useEffect(() => {
    try {
      const guestItem = sessionStorage.getItem("guest");
      const prebookItem = sessionStorage.getItem("prebook");
      const storedHotel = sessionStorage.getItem("hotelName") || localStorage.getItem("hotelName") || sessionStorage.getItem("selectedHotelName");

      if (guestItem) setGuest(JSON.parse(guestItem));

      if (urlHotelName) {
        setHotelName(decodeURIComponent(urlHotelName));
      } else if (storedHotel) {
        setHotelName(storedHotel);
      } else if (prebookItem) {
        const parsed = JSON.parse(prebookItem);
        setPrebookData(parsed);
        const found = parsed?.hotelName || parsed?.prebook?.hotelName || parsed?.name;
        setHotelName(found || "Lüks Otel Konaklaması");
      } else {
        setHotelName("Seçilen Otel (ID: " + (hotelIdParam || "Özel") + ")");
      }
    } catch (e) {
      console.error("Veri okuma hatası:", e);
      setHotelName("Voyae Premium Otel");
    }
  }, [urlHotelName, hotelIdParam]);

  // Kart Numarası Otomatik Formatlama (4'lü bloklar)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.replace(/(.{4})/g, "$1 ").trim();
    setCardInfo((prev) => ({ ...prev, cardNumber: formatted }));
  };

  // Son Kullanma Tarihi Otomatik Formatlama (MM/YY)
  const handleExpireDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setCardInfo((prev) => ({ ...prev, expireDate: value }));
  };

  async function bookNow() {
    if (!cardInfo.cardNumber || !cardInfo.expireDate || !cardInfo.cvv) {
      alert("Lütfen eksiksiz kart bilgilerinizi giriniz.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        prebookId: prebookData?.prebookId || prebookData?.id || "mock-prebook-id",
        holder: {
          firstName: guest?.firstName || guest?.ad || "Örnek",
          lastName: guest?.lastName || guest?.soyad || "Kişi",
          email: guest?.email || "roledaagency@gmail.com",
          phone: guest?.phone || "4917622554611",
        },
        guests: [
          {
            firstName: guest?.firstName || guest?.ad || "Örnek",
            lastName: guest?.lastName || guest?.soyad || "Kişi",
            type: "ADULT",
          }
        ],
        payment: {
          amount: finalPrice,
          currency: "TRY"
        }
      };

      const res = await fetch("/api/bookings/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Rezervasyon oluşturulamadı.");
        return;
      }

      const last4 = cardInfo.cardNumber.replace(/\s+/g, "").slice(-4) || "4242";
      router.push(`/booking/${data.booking?.reference || data.reference || "success"}?last4=${last4}`);
    } catch (err) {
      console.error("Rezervasyon hatası:", err);
      alert("Rezervasyon sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  const roomItem = prebookData?.rooms?.[0] || prebookData?.prebook?.rooms?.[0];
  const finalPrice = roomItem?.price || roomItem?.roomTotalPrice || prebookData?.price || priceParam;
  const finalRoomName = roomItem?.roomName || roomItem?.name || roomParam;

  return (
    <motion.main 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="min-h-screen bg-[#070a12] text-white px-4 py-8 pb-36 md:pb-16 pt-24 md:pt-28"
    >
      <div className="mx-auto max-w-5xl">

        {/* Adım Çubuğu (Stepper) */}
        <div className="flex items-center justify-between max-w-xs md:max-w-md mx-auto mb-8 text-xs md:text-sm text-neutral-400">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <CheckCircle2 size={16} />
            <span>Müsaitlik</span>
          </div>
          <ChevronRight size={14} className="text-neutral-600" />
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <CheckCircle2 size={16} />
            <span>Bilgiler</span>
          </div>
          <ChevronRight size={14} className="text-neutral-600" />
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <span className="w-4 h-4 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-[10px]">3</span>
            <span>Ödeme</span>
          </div>
        </div>

        <div className="text-center md:text-left mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center justify-center md:justify-start gap-2">
            Güvenli Ödeme Ekranı <Sparkles className="text-amber-400" size={20} />
          </h1>
          <p className="text-neutral-400 text-xs md:text-sm mt-1">
            256-bit SSL şifrelemeli altyapımız ile ödemenizi güvenle tamamlayabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sol Kolon: Otel, Misafir Bilgisi ve Kredi Kartı Formu */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Seçilen Otel & Oda Kartı */}
            <div className="rounded-3xl bg-[#0f172a]/80 backdrop-blur-md p-5 md:p-6 border border-neutral-800/80 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full mb-2">
                    <Building2 size={12} /> Seçilen Otel
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">{hotelName}</h2>
                  <p className="text-neutral-300 text-sm font-medium mt-1">{finalRoomName}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Anında Onay
                </span>
                <span>Ücretsiz İptal Seçeneği</span>
              </div>
            </div>

            {/* Misafir Özet Kartı */}
            <div className="rounded-3xl bg-[#0f172a]/80 backdrop-blur-md p-5 md:p-6 border border-neutral-800/80 shadow-xl">
              <div className="flex items-center justify-between mb-3 border-b border-neutral-800/60 pb-3">
                <h3 className="text-sm font-semibold text-neutral-200 flex items-center gap-2">
                  <User size={16} className="text-amber-400" /> Ana Misafir Bilgileri
                </h3>
                <button 
                  onClick={() => router.back()} 
                  className="text-xs text-amber-400 hover:underline cursor-pointer"
                >
                  Düzenle
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
                <div className="flex items-center gap-2 bg-[#070a12]/50 p-2.5 rounded-xl border border-neutral-800/40">
                  <User size={14} className="text-neutral-500" />
                  <span className="font-medium truncate">{guest?.firstName || guest?.ad} {guest?.lastName || guest?.soyad || "Kişi"}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#070a12]/50 p-2.5 rounded-xl border border-neutral-800/40">
                  <Mail size={14} className="text-neutral-500" />
                  <span className="font-medium truncate">{guest?.email || "roledaagency@gmail.com"}</span>
                </div>
              </div>
            </div>

            {/* Kart Formu */}
            <div className="rounded-3xl bg-[#0f172a]/80 backdrop-blur-md p-5 md:p-6 border border-neutral-800/80 shadow-xl">
              <div className="flex items-center justify-between mb-5 border-b border-neutral-800/60 pb-3">
                <h3 className="text-base font-semibold flex items-center gap-2">
                  <CreditCard className="text-amber-400" size={18} /> Kredi / Banka Kartı
                </h3>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 bg-emerald-400/10 px-2 py-0.5 rounded-full font-medium">
                  <ShieldCheck size={13} /> 256-Bit SSL
                </span>
              </div>

              <div className="space-y-4 text-xs md:text-sm">
                <div>
                  <label className="text-neutral-400 text-xs block mb-1 font-medium">Kart Üzerindeki İsim</label>
                  <input 
                    type="text" 
                    placeholder="AHMET YILMAZ" 
                    value={cardInfo.cardHolder}
                    onChange={(e) => setCardInfo({...cardInfo, cardHolder: e.target.value.toUpperCase()})}
                    className="w-full bg-[#070a12] border border-neutral-800 rounded-2xl px-4 py-3.5 text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-400/80 transition-all font-medium" 
                  />
                </div>

                <div>
                  <label className="text-neutral-400 text-xs block mb-1 font-medium">Kart Numarası</label>
                  <div className="relative">
                    <input 
                      type="tel"
                      inputMode="numeric"
                      placeholder="4532 •••• •••• 8821" 
                      maxLength={19}
                      value={cardInfo.cardNumber}
                      onChange={handleCardNumberChange}
                      className="w-full bg-[#070a12] border border-neutral-800 rounded-2xl px-4 py-3.5 text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-400/80 font-mono text-sm transition-all tracking-wider" 
                    />
                    <CreditCard size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-medium">Son Kullanma (Ay/Yıl)</label>
                    <input 
                      type="tel"
                      inputMode="numeric"
                      placeholder="MM/YY" 
                      maxLength={5}
                      value={cardInfo.expireDate}
                      onChange={handleExpireDateChange}
                      className="w-full bg-[#070a12] border border-neutral-800 rounded-2xl px-4 py-3.5 text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-400/80 font-mono text-sm transition-all text-center tracking-widest" 
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-medium">CVV / CVC</label>
                    <input 
                      type="password" 
                      inputMode="numeric"
                      placeholder="•••" 
                      maxLength={4}
                      value={cardInfo.cvv}
                      onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value.replace(/\D/g, "")})}
                      className="w-full bg-[#070a12] border border-neutral-800 rounded-2xl px-4 py-3.5 text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-400/80 font-mono text-sm transition-all text-center tracking-widest" 
                    />
                  </div>
                </div>
              </div>

              {/* Kart Logoları Görsel Süsleme */}
              <div className="mt-5 pt-4 border-t border-neutral-800/40 flex items-center justify-between text-[11px] text-neutral-500">
                <span>Desteklenen Kartlar:</span>
                <div className="flex gap-2 font-semibold text-neutral-400">
                  <span className="bg-[#070a12] px-2 py-1 rounded border border-neutral-800">Visa</span>
                  <span className="bg-[#070a12] px-2 py-1 rounded border border-neutral-800">Mastercard</span>
                  <span className="bg-[#070a12] px-2 py-1 rounded border border-neutral-800">Troy</span>
                </div>
              </div>
            </div>

          </div>

          {/* Sağ Kolon: Ödeme Özeti ve Masaüstü Onay Butonu */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0f172a]/80 backdrop-blur-md p-6 rounded-3xl border border-neutral-800/80 shadow-xl sticky top-28">
              <h3 className="text-base font-semibold mb-4 border-b border-neutral-800/60 pb-3">Fiyat Detayları</h3>
              
              <div className="space-y-3 text-xs md:text-sm border-b border-neutral-800/60 pb-4 text-neutral-400">
                <div className="flex justify-between">
                  <span>Konaklama Tutar</span>
                  <span className="text-white font-medium">₺{finalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vergiler & Hizmet Bedeli</span>
                  <span className="text-emerald-400 font-medium">Dahil</span>
                </div>
                <div className="flex justify-between">
                  <span>Rezervasyon Ücreti</span>
                  <span className="text-emerald-400 font-medium">Ücretsiz</span>
                </div>
              </div>

              <div className="flex justify-between items-center my-6">
                <div>
                  <span className="font-semibold text-neutral-200 block text-sm">Toplam Tutar</span>
                  <span className="text-[10px] text-neutral-400">KDV ve tüm vergiler dahil</span>
                </div>
                <span className="text-2xl md:text-3xl font-extrabold text-amber-400 tracking-tight">₺{finalPrice}</span>
              </div>

              {/* Masaüstü Ekranında Görünür Buton */}
              <button
                onClick={bookNow}
                disabled={loading}
                className="hidden md:flex w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-neutral-950 py-4 rounded-2xl font-bold active:scale-[0.98] transition-all shadow-lg shadow-amber-500/15 cursor-pointer disabled:opacity-50 items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    <span>İşleniyor...</span>
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    <span>Ödemeyi Tamamla (₺{finalPrice})</span>
                  </>
                )}
              </button>

              <div className="mt-4 text-center">
                <p className="text-[11px] text-neutral-500 flex items-center justify-center gap-1">
                  <ShieldCheck size={12} className="text-emerald-400" /> İptal garantisi & 7/24 Müşteri Desteği
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobil Sticky Bottom Bar (Mobil Cihazlar İçin Sabit Buton) */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0f172a]/95 backdrop-blur-lg border-t border-neutral-800 p-4 md:hidden z-50 shadow-2xl">
        <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
          <div>
            <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">Toplam Tutar</span>
            <span className="text-xl font-black text-amber-400">₺{finalPrice}</span>
          </div>
          <button
            onClick={bookNow}
            disabled={loading}
            className="flex-1 bg-amber-500 hover:bg-amber-400 text-neutral-950 py-3.5 px-4 rounded-xl font-bold active:scale-95 transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Lock size={15} />
                <span>Ödemeyi Yap</span>
              </>
            )}
          </button>
        </div>
      </div>

    </motion.main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#070a12] text-white flex items-center justify-center text-sm font-medium">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span>Güvenli ödeme ortamı hazırlanıyor...</span>
        </div>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}