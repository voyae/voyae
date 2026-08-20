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
    viewAll: "Tümünü Gör",
    list: "Liste",
    table: "Tablo",
    map: "Haritada Göster",

    // Hero Bölümü
    bespokeTag: "ÖZEL SEYAHATLER • YAPAY ZEKA DESTEKLİ",
    heroBadge: "ÖZEL SEYAHATLER • YAPAY ZEKA DESTEKLİ",
heroTitleLine1: "Aramayı bırak,",
heroTitleLine2: "seyahate başla.",
heroSubtitle: "Voyae seyahati planlar, sen deneyimi yaşarsın.",
watchStory: "Hikayeyi İzle",
featuredEscapeText: "Öne Çıkan Kaçamak",
boraBoraCardTitle: "Bora Bora",
heroBoraBoraDesc: "Su üstü villaları, rengarenk mercan resifleri ve eşsiz Polinezya lüksü ile gizliliği.",
swissAlpsCardTitle: "İsviçre Alpleri",
heroSwissAlpsDesc: "Seçkin kayak dağ evleri, helikopter turları, termal spa kaçamakları ve dünya standartlarında alp lüksü.",
heroMaldivesDesc: "Berrak lagünler, özel villalar, yat turları ve cennetle çevrili Michelin yemek deneyimi.",
heroSantoriniDesc: "Uçurum kenarındaki beyaz villalar, nefes kesen Caldera gün batımları ve özel şarap tadım deneyimleri.",
viewButton: "İncele",
    heroTitle1: "Aramayı bırakın,",
    heroTitle2: "seyahat etmeye başlayın.",
    heroSubtitle: "Voyae seyahati planlar, siz deneyimi yaşarsınız.",
    exploreDestinations: "Destinasyonları Keşfet",
    watchStory: "Hikayeyi İzle",
    featuredEscape: "Özel Kaçamak",
    startingFrom: "Başlangıç Fiyatı",
    viewBtn: "İncele →",

    // Hero Kartları (Maldives, Santorini, vb.)
    maldivesTitle: "Maldivler",
    maldivesDesc: "Kristal berraklığında lagünler, özel villalar, yat turları ve cennetin ortasında Michelin yıldızlı yemekler.",
    santoriniTitle: "Santorini",
    santoriniDesc: "Uçurum kenarında beyaz badanalı villalar, nefes kesen gün batımları ve özel şarap tadım deneyimleri.",
    boraBoraTitle: "Bora Bora",
    boraBoraDesc: "Su üstü bungalovları, canlı mercan resifleri ve kusursuz Polinezya lüksü ve mahremiyeti.",
    swissAlpsTitle: "İsviçre Alpleri",
    swissAlpsDesc: "Seçkin kayak dağ evleri, helikopter turları, termal spa kaçamakları ve dünya standartlarında alpin lüksü.",

    // Destinations (Destinasyonlar) Bölümü
    featuredDestinationsBadge: "ÖNEMLİ DESTİNASYONLAR",
    yachtTitle: "Özel Yat Kaçamağı",
yachtDesc: "Tamamen kişiselleştirilmiş lüks bir rota ile masmavi sularda yelken açın.",
yachtDuration: "5 Gün",
desertTitle: "Lüks Çöl Kampı",
desertDesc: "Üstün konfor eşliğinde yıldızların altında unutulmaz geceler geçirin.",
desertDuration: "3 Gün",
mountainTitle: "Dağ Sağlık Kampı",
mountainDesc: "Özel spa ve wellness deneyimleriyle doğayla yeniden bağ kurun.",
mountainDuration: "7 Gün",
viewAll: "Tümünü Gör",
discover: "Keşfet",
premium: "Özel",
    handpickedEscapesTitle: "Özenle Seçilmiş Kaçamaklar.",
    handpickedEscapesSub: "Unutulmaz yolculuklar için küratörlüğünü yaptığımız dünyanın en seçkin destinasyonlarından bazılarını keşfedin.",
    indianOcean: "Hint Okyanusu",
    greece: "Yunanistan",
    japan: "Japonya",
    maldivesCardTitle: "Maldivler",
    santoriniCardTitle: "Santorini",
    kyotoCardTitle: "Kyoto",

    aiConciergeBadge: "Yapay Zeka Asistanı",
aiConciergeTitle: "Kusursuz seyahatini planla.",
aiConciergeDesc: "Voyae'ye nereye gitmek istediğini, bütçeni, seyahat tarzını ve tercihlerini söyle. Yapay zekamız sana özel premium bir rota oluştursun.",
sug1: "2500 € altı İtalya'da 7 gün",
sug2: "Maldivler'de lüks balayı",
sug3: "10 günlük Japonya kiraz çiçeği turu",
sug4: "Bali'de aile tatili",
sug5: "Tayland'da sırt çantalı seyahat",
aiPlaceholder: "örn., İtalya'da 7 gün, Bütçe: 2.000 €, Lüks oteller, Romantik balayı...",
generatingJourney: "Rota Oluşturuluyor...",
generateJourney: "Seyahat Oluştur",
regenerate: "Yeniden Üret",
copy: "Kopyala",
loadingItineraryTitle: "Lüks rotanız hazırlanıyor...",
loadingStep1: "✓ Lüks oteller bulunuyor...",
loadingStep2: "✓ En iyi restoranlar seçiliyor...",
loadingStep3: "✓ Deneyimler planlanıyor...",
loadingStep4: "✓ Seyahat bütçesi hesaplanıyor...",
loadingStep5: "✓ Rota sonlandırılıyor...",
serverErrorMsg: "Sunucudan geçersiz yanıt alındı. Lütfen tekrar deneyin.",
failedPlanMsg: "Seyahat planı oluşturulamadı.",
generalErrorMsg: "Seyahatiniz oluşturulurken bir şeyler yanlış gitti.",

    // Experiences (Deneyimler) Bölümü
    luxuryExperiencesBadge: "LÜKS DENEYİMLER",
    beyondDestinationsTitle: "Destinasyonların Ötesinde.",
    beyondDestinationsSub: "Zarafet, macera ve unutulmaz anlar arayan gezginler için tasarlanmış olağanüstü deneyimler.",

    // Arama & Filtreler
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
    explore: "Keşfet",
    creditCard: "Kredi / Banka Kartı",
    cardHolder: "Kart Üzerindeki İsim",
    cardNumber: "Kart Numarası",
    expireDate: "Son Kullanma (Ay/Yıl)",
    cvv: "CVV / CVC",
    priceDetails: "Fiyat Detayları",
    accommodationFee: "Konaklama Tutarı",
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
    explore: "Explore",
    yachtTitle: "Private Yacht Escape",
yachtDesc: "Sail across crystal-clear waters with a fully customized luxury itinerary.",
yachtDuration: "5 Days",
desertTitle: "Luxury Desert Camp",
desertDesc: "Spend unforgettable nights beneath the stars with premium comfort.",
desertDuration: "3 Days",
mountainTitle: "Mountain Wellness Retreat",
mountainDesc: "Reconnect with nature through exclusive spa and wellness experiences.",
mountainDuration: "7 Days",
viewAll: "View All",
discover: "Discover",
premium: "Premium",
    destinations: "Destinations",
    experiences: "Experiences",
    aiPlanner: "AI Planner",
    testimonials: "Testimonials",
    signIn: "Sign In",
    search: "Search",
    viewAll: "View All",
    list: "List",
    table: "Table",
    map: "Show on interactive map",

    // Hero Section
    bespokeTag: "BESPOKE VOYAGES • AI-POWERED LUXURY",
    heroBadge: "BESPOKE VOYAGES • AI-POWERED LUXURY",
heroTitleLine1: "Stop searching,",
heroTitleLine2: "start traveling.",
heroSubtitle: "Voyae plans the trip, you live the experience.",
watchStory: "Watch Story",
featuredEscapeText: "Featured Escape",
boraBoraCardTitle: "Bora Bora",
heroBoraBoraDesc: "Overwater bungalows, vibrant coral reefs, and ultimate Polynesian luxury and privacy.",
swissAlpsCardTitle: "Swiss Alps",
heroSwissAlpsDesc: "Exclusive ski chalets, helicopter tours, thermal spa retreats, and world-class alpine luxury.",
heroMaldivesDesc: "Crystal-clear lagoons, private villas, yacht cruises and Michelin dining surrounded by paradise.",
heroSantoriniDesc: "Cliffside whitewashed villas, breathtaking Caldera sunsets, and private wine-tasting experiences.",
viewButton: "View →",
    heroTitle1: "Stop searching,",
    heroTitle2: "start traveling.",
    heroSubtitle: "Voyae plans the trip, you live the experience.",
    exploreDestinations: "Explore Destinations",
    watchStory: "Watch Story",
    featuredEscape: "Featured Escape",
    startingFrom: "Starting From",
    viewBtn: "View →",

    // Hero Cards
    maldivesTitle: "Maldives",
    maldivesDesc: "Crystal-clear lagoons, private villas, yacht cruises and Michelin dining surrounded by paradise.",
    santoriniTitle: "Santorini",
    santoriniDesc: "Cliffside whitewashed villas, breathtaking Caldera sunsets, and private wine-tasting experiences.",
    boraBoraTitle: "Bora Bora",
    boraBoraDesc: "Overwater bungalows, vibrant coral reefs, and ultimate Polynesian luxury and privacy.",
    swissAlpsTitle: "Swiss Alps",
    swissAlpsDesc: "Exclusive ski chalets, helicopter tours, thermal spa retreats, and world-class alpine luxury.",

    // Destinations Section
    featuredDestinationsBadge: "FEATURED DESTINATIONS",
    handpickedEscapesTitle: "Handpicked Escapes.",
    handpickedEscapesSub: "Explore some of the world's most exclusive destinations curated for unforgettable journeys.",
    indianOcean: "Indian Ocean",
    greece: "Greece",
    japan: "Japan",
    maldivesCardTitle: "Maldives",
    santoriniCardTitle: "Santorini",
    kyotoCardTitle: "Kyoto",

    // Experiences Section
    luxuryExperiencesBadge: "LUXURY EXPERIENCES",
    beyondDestinationsTitle: "Beyond destinations.",
    beyondDestinationsSub: "Extraordinary experiences designed for travelers seeking elegance, adventure and unforgettable memories.",

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
    explore: "Entdecken",
    experiences: "Erlebnisse",
    aiPlanner: "KI-Planer",
    testimonials: "Erfahrungsberichte",
    signIn: "Anmelden",
    search: "Suchen",
    viewAll: "Alle ansehen",
    list: "Liste",
    table: "Tabelle",
    map: "Auf interaktiver Karte anzeigen",

    // Hero Section
    bespokeTag: "MASSGESCHNEIDERTE REISEN • KI-GESTÜTZTER LUXUS",
    heroTitle1: "Hören Sie auf zu suchen,",
    heroTitle2: "beginnen Sie zu reisen.",
    heroSubtitle: "Voyae plant die Reise, Sie erleben die Erfahrung.",
    exploreDestinations: "Reiseziele erkunden",
    watchStory: "Geschichte ansehen",
    featuredEscape: "Ausgewähltes Reiseziel",
    startingFrom: "Ab",
    viewBtn: "Ansehen →",

    // Hero Cards
    maldivesTitle: "Malediven",
    maldivesDesc: "Kristallklare Lagunen, private Villen, Yachtkreuzfahrten und Michelin-Gastronomie umgeben von einem Paradies.",
    santoriniTitle: "Santorini",
    santoriniDesc: "Weiß getünchte Villen an Klippen, atemberaubende Sonnenuntergänge und private Weinverkostungen.",
    boraBoraTitle: "Bora Bora",
    boraBoraDesc: "Bungalows über dem Wasser, lebendige Korallenriffe und ultimativer polynesischer Luxus und Privatsphäre.",
    swissAlpsTitle: "Schweizer Alpen",
    swissAlpsDesc: "Exklusive Skigebiete, Hubschraubertouren, Thermal-Spa-Retreats und alpiner Luxus.",

    // Destinations Section
    featuredDestinationsBadge: "AUSGEWÄHLTE REISEZIELE",
    yachtTitle: "Private Yacht Flucht",
yachtDesc: "Segeln Sie über kristallklares Wasser mit einer maßgeschneiderten Luxus-Reiseroute.",
yachtDuration: "5 Tage",
desertTitle: "Luxus-Wüstencamp",
desertDesc: "Verbringen Sie unvergessliche Nächte unter den Sternen mit erstklassigem Komfort.",
desertDuration: "3 Tage",
mountainTitle: "Berg-Wellness-Retreat",
mountainDesc: "Verbinden Sie sich durch exklusive Spa- und Wellness-Erlebnisse wieder mit der Natur.",
mountainDuration: "7 Tage",
viewAll: "Alle ansehen",
discover: "Entdecken",
premium: "Prämie",
    handpickedEscapesTitle: "Handverlesene Unterkünfte.",
    handpickedEscapesSub: "Entdecken Sie einige der exklusivsten Reiseziele der Welt für unvergessliche Reisen.",
    indianOcean: "Indischer Ozean",
    greece: "Griechenland",
    japan: "Japan",
    maldivesCardTitle: "Malediven",
    santoriniCardTitle: "Santorini",
    kyotoCardTitle: "Kyoto",

    // Experiences Section
    luxuryExperiencesBadge: "LUXUS-ERLEBNISSE",
    beyondDestinationsTitle: "Jenseits von Reisezielen.",
    beyondDestinationsSub: "Außergewöhnliche Erlebnisse für Reisende, die Eleganz, Abenteuer und unvergessliche Erinnerungen suchen.",

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
    aiConciergeBadge: "AI Concierge",
aiConciergeTitle: "Plan your perfect journey.",
aiConciergeDesc: "Tell Voyae where you'd like to go, your budget, travel style and preferences. Our AI will create a premium personalized itinerary.",
sug1: "7 days in Italy under €2500",
sug2: "Luxury honeymoon in Maldives",
sug3: "10 days Japan cherry blossom trip",
sug4: "Family vacation in Bali",
sug5: "Backpacking through Thailand",
aiPlaceholder: "e.g., 7 days in Italy, Budget: €2,000, Luxury hotels, Romantic honeymoon...",
generatingJourney: "Creating Journey...",
generateJourney: "Generate Journey",
regenerate: "Regenerate",
copy: "Copy",
loadingItineraryTitle: "Creating your luxury itinerary...",
loadingStep1: "✓ Finding luxury hotels...",
loadingStep2: "✓ Selecting top restaurants...",
loadingStep3: "✓ Planning experiences...",
loadingStep4: "✓ Calculating travel budget...",
loadingStep5: "✓ Finalizing your itinerary...",
serverErrorMsg: "Sunucudan geçersiz yanıt alındı. Lütfen tekrar deneyin.",
failedPlanMsg: "Failed to generate travel plan.",
generalErrorMsg: "Something went wrong while generating your journey.",

aiConciergeBadge: "KI-Concierge",
aiConciergeTitle: "Planen Sie Ihre perfekte Reise.",
aiConciergeDesc: "Teilen Sie Voyae Ihr Reiseziel, Ihr Budget, Ihren Reisestil und Ihre Vorlieben mit. Unsere KI erstellt eine erstklassige, personalisierte Reiseroute.",
sug1: "7 Tage in Italien unter 2500 €",
sug2: "Luxus-Flitterwochen auf den Malediven",
sug3: "10 Tage Japan Kirschblütenreise",
sug4: "Familienurlaub auf Bali",
sug5: "Mit dem Rucksack durch Thailand",
aiPlaceholder: "z.B. 7 Tage in Italien, Budget: 2.000 €, Luxushotels, Romantische Flitterwochen...",
generatingJourney: "Reise wird erstellt...",
generateJourney: "Reise generieren",
regenerate: "Neu generieren",
copy: "Kopieren",
loadingItineraryTitle: "Ihre Luxus-Reiseroute wird erstellt...",
loadingStep1: "✓ Luxushotels werden gefunden...",
loadingStep2: "✓ Top-Restaurants werden ausgewählt...",
loadingStep3: "✓ Erlebnisse werden geplant...",
loadingStep4: "✓ Reisebudget wird berechnet...",
loadingStep5: "✓ Reiseroute wird finalisiert...",
serverErrorMsg: "Ungültige Antwort vom Server erhalten. Bitte versuchen Sie es erneut.",
failedPlanMsg: "Fehler beim Erstellen des Reiseplans.",
generalErrorMsg: "Beim Erstellen Ihrer Reise ist ein Fehler aufgetreten.",
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
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    const savedLang = localStorage.getItem("voyae_lang") as Language;
    const savedCurr = localStorage.getItem("voyae_curr") as Currency;

    if (savedLang) {
      setLangState(savedLang);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("tr")) setLangState("tr");
      else if (browserLang.startsWith("de")) setLangState("de");
    }

    if (savedCurr) {
      setCurrencyState(savedCurr);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("tr")) setCurrencyState("TRY");
      else if (browserLang.includes("de") || browserLang.includes("eu")) setCurrencyState("EUR");
    }

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

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [lang, currency]);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem("voyae_lang", l);
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

  const value = { lang, currency, setLang, setCurrency, formatPrice, t };

  return (
    <LanguageCurrencyContext.Provider value={value}>
      {children}
    </LanguageCurrencyContext.Provider>
  );
}

export function useLanguageCurrency() {
  const context = useContext(LanguageCurrencyContext);
  if (!context) throw new Error("useLanguageCurrency must be used within a LanguageCurrencyProvider");
  return context;
}