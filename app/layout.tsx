import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/layout/navbar";

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
      <body className="font-sans antialiased">
        <SearchProvider>
          <Navbar />

          <main>{children}</main>
        </SearchProvider>
      </body>
    </html>
  );
}