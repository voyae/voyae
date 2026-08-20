"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { CheckCircle2, Home, Printer, ShieldCheck, Compass, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function BookingSuccessPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const rawRef = params?.reference;
  const [reference, setReference] = useState("");

  useEffect(() => {
    // Math.random sadece istemci taraflı (client) çalıştırılarak hydration hatası engellenir
    if (rawRef === "success") {
      setReference("VOY-" + Math.floor(100000 + Math.random() * 900000));
    } else {
      setReference(Array.isArray(rawRef) ? rawRef[0] : (rawRef || "VOY-12345"));
    }
  }, [rawRef]);

  const paymentMethod = searchParams.get("method") || "Kredi / Banka Kartı";
  const cardLast4 = searchParams.get("last4") ? `•••• ${searchParams.get("last4")}` : "Güvenli Ödeme";

  return (
    <motion.main 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#0b0f19] text-white px-4 py-8 pt-24 md:pt-32 pb-24 flex items-center justify-center"
    >
      <div className="w-full max-w-md md:max-w-lg bg-[#131b2e] border border-neutral-800 rounded-3xl p-5 md:p-8 shadow-2xl relative overflow-hidden print:bg-white print:text-black print:border-none print:shadow-none">
        
        {/* Dekoratif Işık Efekti */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-20 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full print:hidden" />

        {/* Üst Başlık & İkon */}
        <div className="text-center relative z-10">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto shadow-lg">
            <CheckCircle2 size={32} />
          </div>
          <span className="inline-block mt-3 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-3 py-0.5 rounded-full">
            Ödeme Başarılı
          </span>
          <h1 className="text-xl md:text-2xl font-extrabold text-white mt-2 tracking-tight print:text-black">
            Rezervasyonunuz Onaylandı
          </h1>
          <p className="text-neutral-400 text-xs md:text-sm mt-1 px-2 print:text-neutral-600">
            Konfirme detayları ve biletiniz kayıtlı e-posta adresinize gönderildi.
          </p>
        </div>

        {/* Referans ve Özet Kartı */}
        <div className="mt-5 md:mt-6 bg-[#0b0f19] border border-neutral-800 rounded-2xl p-4 space-y-3 relative z-10 print:bg-neutral-100 print:border-neutral-300">
          <div className="flex justify-between items-center border-b border-neutral-800 pb-2.5 text-xs md:text-sm print:border-neutral-300">
            <span className="text-neutral-400 flex items-center gap-1.5 print:text-neutral-600">
              <ShieldCheck size={14} className="text-amber-400" /> Rezervasyon Kodu
            </span>
            <span className="text-amber-400 font-mono font-bold tracking-wider text-xs md:text-sm bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20 print:text-black print:bg-transparent">
              {reference || "Yükleniyor..."}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1 text-xs md:text-sm">
            <div>
              <span className="text-[10px] md:text-xs text-neutral-400 block print:text-neutral-600">İşlem Durumu</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1 mt-0.5 print:text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse print:bg-emerald-600" /> Onaylandı
              </span>
            </div>
            <div>
              <span className="text-[10px] md:text-xs text-neutral-400 block print:text-neutral-600 flex items-center gap-1">
                <CreditCard size={12} /> Ödeme Detayı
              </span>
              <span className="text-white font-medium mt-0.5 block print:text-black font-mono text-xs">
                {paymentMethod} ({cardLast4})
              </span>
            </div>
          </div>
        </div>

        {/* Bilgilendirme Notu */}
        <div className="mt-4 flex items-start gap-2.5 bg-neutral-900/50 border border-neutral-800/60 p-3.5 rounded-2xl text-[11px] md:text-xs text-neutral-400 print:bg-neutral-50 print:border-neutral-200 print:text-neutral-700">
          <Compass className="text-amber-400 shrink-0 mt-0.5" size={16} />
          <p>
            Otele giriş yaparken bu referans numarasını ibraz etmeniz yeterlidir. 48 saat öncesine kadar ücretsiz iptal hakkınız bulunmaktadır.
          </p>
        </div>

        {/* Aksiyon Butonları */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2.5 relative z-10 print:hidden">
          <button 
            onClick={() => window.print()}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 py-3.5 font-semibold text-white text-xs md:text-sm transition-all border border-neutral-700 active:scale-95"
          >
            <Printer size={16} />
            Sayfayı Yazdır
          </button>
          <Link
            href="/"
            className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 py-3.5 font-bold text-neutral-950 text-xs md:text-sm transition-all shadow-lg shadow-amber-500/10 active:scale-95"
          >
            <Home size={16} />
            Ana Sayfaya Dön
          </Link>
        </div>

      </div>
    </motion.main>
  );
}