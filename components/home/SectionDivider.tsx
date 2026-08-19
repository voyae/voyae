export default function SectionDivider() {
    return (
      <div className="relative w-full py-4 sm:py-6 flex items-center justify-center pointer-events-none">
        {/* Arkada hafif lüks atmosferik parıltı */}
        <div className="absolute w-64 h-6 bg-amber-500/15 blur-2xl rounded-full" />
        
        {/* Zarif altın/amber gradyan çizgi */}
        <div className="absolute inset-x-8 sm:inset-x-20 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        
        {/* Ortadaki lüks parlayan nokta detayı */}
        <div className="relative z-10 h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
      </div>
    );
  }