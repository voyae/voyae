import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/layout/navbar";
import MobileFooterBar from "@/components/layout/MobileFooterBar";
import PageTransition from "@/components/layout/PageTransition"; // Animasyon için ayrı bileşen

import { SearchProvider } from "@/hooks/useSearch";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Voyae",
  description:
    "Luxury travel experiences crafted for modern explorers.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Voyae",
  },
};

export const viewport: Viewport = {
  themeColor: "#101C3E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontDisplay.variable}`}
    >
      <head>
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className="font-sans antialiased pb-20 sm:pb-0">
        <SearchProvider>
          <Navbar />

          {/* Sayfalar arası geçiş animasyonunu uygulayan sarmalayıcı */}
          <PageTransition>
            <main>{children}</main>
          </PageTransition>

          <MobileFooterBar />
        </SearchProvider>
      </body>
    </html>
  );
}