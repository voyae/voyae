"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "tr" | "de";
type Currency = "USD" | "EUR" | "TRY";

interface ContextType {
  lang: Language;
  currency: Currency;
  setLang: (l: Language) => void;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInTryOrBase: number) => string;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  tr: {
    // Navigasyon & Genel
    discover: "Keşfet",
    destinations: "Destinasyonlar",
    experiences: "Deneyimler",
    aiPlanner: "Yapay Zeka Planlayıcı",
    testimonials: "Yorumlar",
    signIn: "Giriş Yap",
    search: "Ara",
    list: "Liste",
    table: "Tablo",
    map: "Haritada Göster",
    
    // Arama & Filtreler (Arama sayfası ve filtreler için)
    destinationPlaceholder: "Şehir, otel veya destinasyon",
    checkInCheckOut: "Giriş — Çıkış",
    guestsAndRooms: "Misafir & Oda",
    filterBy: "Filtrele:",
    resetAll: "Sıfırla",
    distanceToCenter: "Merkeze Uzaklık",
    anyDistance: "Tüm mesafeler",
    curatedStays: "Özel Seçim Konaklama Koleksiyonu",
    handpickedSubtitle: "Rafine zevkinize, takviminize ve yaşam tarzınıza uygun, özenle seçilmiş istisnai tesisler.",
    night: "gece",
    adult: "yetişkin",
    realReviews: "gerçek değerlendirme",

    // Ödeme & Rezervasyon
    securePayment: "Güvenli Ödeme Ekranı",
    paymentSubtitle: "256-bit SSL şifrelemeli altyapımız ile ödemenizi güvenle tamamlayabilirsiniz.",
    selectedHotel: "Seçilen Otel",
    guestInfo: "Ana Misafir Bilgileri",
    edit: "Düzenle",
    creditCard: "Kredi / Banka Kartı",
    cardHolder: "Kart Üzerindeki İsim",
    cardNumber: "Kart Numarası",
    expireDate: "Son Kullanma (Ay/Yıl)",
    cvv: "CVV / CVC",
    priceDetails: "Fiyat Detayları",
    accommodationFee: "Konaklama Tutar",
    taxes: "Vergiler & Hizmet Bedeli",
    included: "Dahil",
    bookingFee: "Rezervasyon Ücreti",
    free: "Ücretsiz",
    totalAmount: "Toplam Tutar",
    completePayment: "Ödemeyi Tamamla",
    processing: "İşleniyor...",
    instantConfirmation: "Anında Onay",
    freeCancellation: "Ücretsiz İptal Seçeneği",

    // Footer
    footerRights: "Voyae Luxury Travel - Tüm Hakları Saklıdır.",
  },
  en: {
    // Navigation & General
    discover: "Discover",
    destinations: "Destinations",
    experiences: "Experiences",
    aiPlanner: "AI Planner",
    testimonials: "Testimonials",
    signIn: "Sign In",
    search: "Search",
    list: "List",
    table: "Table",
    map: "Show on interactive map",

    // Search & Filters
    destinationPlaceholder: "City, hotel or destination",
    checkInCheckOut: "Check-in — Check-out",
    guestsAndRooms: "Guests & Rooms",
    filterBy: "FILTER BY:",
    resetAll: "Reset all",
    distanceToCenter: "Distance to center",
    anyDistance: "Any distance",
    curatedStays: "Curated Stays Collection",
    handpickedSubtitle: "Handpicked exceptional properties matching your refined taste, schedule, and lifestyle.",
    night: "night",
    adult: "adult",
    realReviews: "real reviews",

    // Payment & Booking
    securePayment: "Secure Payment Screen",
    paymentSubtitle: "Complete your payment safely with our 256-bit SSL encrypted infrastructure.",
    selectedHotel: "Selected Hotel",
    guestInfo: "Main Guest Information",
    edit: "Edit",
    creditCard: "Credit / Debit Card",
    cardHolder: "Cardholder Name",
    cardNumber: "Card Number",
    expireDate: "Expiration Date (MM/YY)",
    cvv: "CVV / CVC",
    priceDetails: "Price Details",
    accommodationFee: "Accommodation Fee",
    taxes: "Taxes & Service Fee",
    included: "Included",
    bookingFee: "Booking Fee",
    free: "Free",
    totalAmount: "Total Amount",
    completePayment: "Complete Payment",
    processing: "Processing...",
    instantConfirmation: "Instant Confirmation",
    freeCancellation: "Free Cancellation Option",

    // Footer
    footerRights: "Voyae Luxury Travel - All Rights Reserved.",
  },
  de: {
    // Navigation & General
    discover: "Entdecken",
    destinations: "Reiseziele",
    experiences: "Erlebnisse",
    aiPlanner: "KI-Planer",
    testimonials: "Erfahrungsberichte",
    signIn: "Anmelden",
    search: "Suchen",
    list: "Liste",
    table: "Tabelle",
    map: "Auf interaktiver Karte anzeigen",

    // Search & Filters
    destinationPlaceholder: "Stadt, Hotel oder Reiseziel",
    checkInCheckOut: "Anreise — Abreise",
    guestsAndRooms: "Gäste & Zimmer",
    filterBy: "FILTER NACH:",
    resetAll: "Alle zurücksetzen",
    distanceToCenter: "Entfernung zum Zentrum",
    anyDistance: "Jede Entfernung",
    curatedStays: "Handverlesene Unterkünfte",
    handpickedSubtitle: "Handverlesene außergewöhnliche Unterkünfte, die Ihrem raffinierten Geschmack und Lebensstil entsprechen.",
    night: "Nacht",
    adult: "Erwachsener",
    realReviews: "echte Bewertungen",

    // Payment & Booking
    securePayment: "Sicherer Zahlungsbildschirm",
    paymentSubtitle: "Schließen Sie Ihre Zahlung sicher mit unserer 256-Bit-SSL-verschlüsselten Infrastruktur ab.",
    selectedHotel: "Ausgewähltes Hotel",
    guestInfo: "Hauptgastinformationen",
    edit: "Bearbeiten",
    creditCard: "Kredit- / Debitkarte",
    cardHolder: "Name des Karteninhabers",
    cardNumber: "Kartennummer",
    expireDate: "Gültig bis (MM/JJ)",
    cvv: "CVV / CVC",
    priceDetails: "Preisdetails",
    accommodationFee: "Unterbringungsgebühr",
    taxes: "Steuern & Servicegebühr",
    included: "Inbegriffen",
    bookingFee: "Buchungsgebühr",
    free: "Kostenlos",
    totalAmount: "Gesamtbetrag",
    completePayment: "Zahlung abschließen",
    processing: "Wird bearbeitet...",
    instantConfirmation: "Sofortige Bestätigung",
    freeCancellation: "Kostenlose Stornierungsoption",

    // Footer
    footerRights: "Voyae Luxury Travel - Alle Rechte vorbehalten.",
  }
};

const LanguageCurrencyContext = createContext<ContextType | undefined>(undefined);

export function LanguageCurrencyProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [currency, setCurrencyState] = useState<Currency>("EUR");

  useEffect(() => {
    // 1. Sayfa ilk açıldığında çalışan mevcut mantığın
    const savedLang = localStorage.getItem("voyae_lang") as Language;
    const savedCurr = localStorage.getItem("voyae_curr") as Currency;

    if (savedLang) {
      setLangState(savedLang);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("tr")) setLangState("tr");
      else if (browserLang.startsWith("de")) setLangState("de");
      else setLangState("en");
    }

    if (savedCurr) {
      setCurrencyState(savedCurr);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("tr")) setCurrencyState("TRY");
      else if (browserLang.includes("de") || browserLang.includes("eu")) setCurrencyState("EUR");
      else setCurrencyState("USD");
    }

    // 2. YENİ EKLENEN KISIM: "storage" olayını dinle ve state'i güncelle
    const handleStorageChange = () => {
      const updatedLang = localStorage.getItem("voyae_lang") as Language;
      const updatedCurr = localStorage.getItem("voyae_curr") as Currency;
      
      if (updatedLang && updatedLang !== lang) {
        setLangState(updatedLang);
      }
      if (updatedCurr && updatedCurr !== currency) {
        setCurrencyState(updatedCurr);
      }
    };

    // Dinleyiciyi pencereye ekle
    window.addEventListener("storage", handleStorageChange);

    // Temizlik (Component unmount olduğunda dinleyiciyi kaldır)
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem("voyae_lang", l);
    // Diğer sayfaların duyması için olayı tetikle:
    window.dispatchEvent(new Event("storage")); 
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("voyae_curr", c);
    window.dispatchEvent(new Event("storage"));
  };

  const formatPrice = (amount: number) => {
    let converted = amount;
    let symbol = "₺";

    if (currency === "EUR") {
      converted = amount / 38.5;
      symbol = "€";
    } else if (currency === "USD") {
      converted = amount / 35.0;
      symbol = "$";
    } else {
      symbol = "₺";
    }

    return `${Math.round(converted).toLocaleString()} ${symbol}`;
  };

  const t = (key: string) => {
    return translations[lang]?.[key] || translations["en"]?.[key] || key;
  };

  return (
    <LanguageCurrencyContext.Provider value={{ lang, currency, setLang, setCurrency, formatPrice, t }}>
      {children}
    </LanguageCurrencyContext.Provider>
  );
}

export function useLanguageCurrency() {
  const context = useContext(LanguageCurrencyContext);
  if (!context) throw new Error("useLanguageCurrency must be used within a LanguageCurrencyProvider");
  return context;
}