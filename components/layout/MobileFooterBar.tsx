"use client";

import { usePathname } from "next/navigation";

export default function MobileFooterBar() {
  const pathname = usePathname();

  // Şimdilik sadece ana sayfada veya detay sayfasında görünmesi için bir kontrol
  // (İhtiyacına göre burayı özelleştirebilirsin)
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 block border-t border-amber-500/20 bg-[#101C3E]/90 p-4 backdrop-blur-md sm:hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-slate-400">Voyae Luxury</p>
          <p className="text-sm font-semibold text-white">Find your stay</p>
        </div>
        <button
          className="rounded-full bg-amber-500 px-6 py-2 text-xs font-bold text-slate-950 transition hover:bg-amber-400"
          onClick={() => {
            // Buraya tıklanınca ana sayfaya yönlendirebilir veya 
            // takvimi açan fonksiyonu tetikleyebilirsin
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Check Dates
        </button>
      </div>
    </div>
  );
}