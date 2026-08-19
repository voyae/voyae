"use client";

import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useState, useRef } from "react";

import {
  Sparkles,
  Loader2,
  RefreshCw,
  Copy,
} from "lucide-react";

import TravelPlan from "./TravelPlan";
import { TravelPlan as TravelPlanType } from "@/types/travel";

const suggestions = [
  "7 days in Italy under €2500",
  "Luxury honeymoon in Maldives",
  "10 days Japan cherry blossom trip",
  "Family vacation in Bali",
  "Backpacking through Thailand",
];

export default function AIConcierge() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<TravelPlanType | null>(null);
  const [error, setError] = useState("");
  const planRef = useRef<HTMLDivElement>(null);

  async function generateJourney() {
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      setError("");
      setPlan(null);

      const res = await fetch("/api/travel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      // --- GÜVENLİ OKUMA VE JSON AYRIŞTIRMA KATMANI ---
      const responseText = await res.text();
      let data;
      
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        throw new Error("Sunucudan geçersiz yanıt alındı. Lütfen tekrar deneyin.");
      }

      if (!res.ok) {
        throw new Error(
          data.error || "Failed to generate travel plan."
        );
      }

      setPlan(data);

      setTimeout(() => {
        planRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);

    } catch (err: any) {
      console.error(err);
      setError(
        err.message ||
          "Something went wrong while generating your journey."
      );
    } finally {
      setLoading(false);
    }
  }

  function regeneratePlan() {
    setPlan(null);
    generateJourney();
  }

  function copyPlan() {
    if (!plan) return;

    navigator.clipboard.writeText(`
Destination: ${plan.destination}

Duration: ${plan.duration}

Budget: ${plan.budget}

Overview:
${plan.overview}

Transport:
${plan.transport}

Travel Tips:

${plan.tips.map((t) => `• ${t}`).join("\n")}
`);
  }

  function exportPDF() {
    if (!plan) return;
  
    const doc = new jsPDF();
    let y = 20;
  
    doc.setFontSize(22);
    doc.text("Voyae AI Travel Plan", 15, y);
    y += 15;
  
    doc.setFontSize(12);
    doc.text(`Destination: ${plan.destination}`, 15, y);
    y += 8;
    doc.text(`Duration: ${plan.duration}`, 15, y);
    y += 8;
    doc.text(`Budget: ${plan.budget}`, 15, y);
    y += 15;
  
    doc.setFontSize(16);
    doc.text("Overview", 15, y);
    y += 8;
  
    doc.setFontSize(11);
    const overview = doc.splitTextToSize(plan.overview, 180);
    doc.text(overview, 15, y);
    y += overview.length * 6 + 10;
  
    autoTable(doc, {
      startY: y,
      head: [["Hotels", "Price"]],
      body: plan.hotels.map((hotel) => [hotel.name, hotel.price]),
    });
  
    y = (doc as any).lastAutoTable.finalY + 10;
  
    autoTable(doc, {
      startY: y,
      head: [["Restaurants", "Cuisine"]],
      body: plan.restaurants.map((r) => [r.name, r.cuisine]),
    });
  
    y = (doc as any).lastAutoTable.finalY + 10;
  
    autoTable(doc, {
      startY: y,
      head: [["Activities", "Duration", "Price"]],
      body: plan.activities.map((a) => [a.title, a.duration, a.price]),
    });
  
    doc.save(`${plan.destination.replace(/\s/g, "-")}-Voyae.pdf`);
  }

  return (
    <section id="ai" className="bg-[#070D1F] py-24 sm:py-32">
      <div className="mx-auto w-[92%] max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[36px] sm:rounded-[42px] border border-amber-500/20 bg-[#101935] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden"
        >
          {/* Atmosferik Işık Efekti */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="rounded-3xl bg-amber-500 p-4 text-slate-950 shadow-lg shadow-amber-500/20">
              <Sparkles size={28} />
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-400 font-medium">
                AI Concierge
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-5xl text-white font-bold">
                Plan your perfect journey.
              </h2>
              <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-400">
                Tell Voyae where you'd like to go, your budget, travel style and preferences. Our AI will create a premium personalized itinerary.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* SUGGESTIONS */}
            <div className="flex flex-wrap gap-2.5">
              {suggestions.map((item) => (
                <button
                  key={item}
                  onClick={() => setPrompt(item)}
                  className="rounded-full border border-amber-500/20 bg-[#0d1633] px-4 py-2 text-xs sm:text-sm text-slate-300 transition-all duration-300 hover:border-amber-400/60 hover:bg-amber-500/15 hover:text-amber-300"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* PROMPT */}
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    generateJourney();
                  }
                }}
                placeholder="e.g., 7 days in Italy, Budget: €2,000, Luxury hotels, Romantic honeymoon..."
                rows={4}
                className="w-full resize-none rounded-2xl sm:rounded-3xl border border-amber-500/30 bg-[#070D1F] p-5 sm:p-6 text-base sm:text-lg leading-relaxed text-white outline-none transition-all focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 placeholder:text-slate-500 shadow-inner"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={generateJourney}
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 sm:py-5 text-base sm:text-lg font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:from-amber-400 hover:to-amber-500 hover:shadow-xl hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-80"
              >
                {loading ? (
                  <>
                    <Loader2 size={22} className="animate-spin text-slate-950" />
                    Creating Journey...
                  </>
                ) : (
                  <>
                    <Sparkles size={22} />
                    Generate Journey
                  </>
                )}
              </button>

              {plan && (
                <>
                  <button
                    onClick={regeneratePlan}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-6 py-4 font-medium text-white transition hover:bg-white/10"
                  >
                    <RefreshCw size={18} className="text-amber-400" />
                    Regenerate
                  </button>

                  <button
                    onClick={copyPlan}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-6 py-4 font-medium text-white transition hover:bg-white/10"
                  >
                    <Copy size={18} className="text-amber-400" />
                    Copy
                  </button>
                </>
              )}
            </div>

            {/* LOADING */}
            {loading && (
              <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-8 sm:p-10 text-center">
                <Loader2 className="mx-auto mb-6 animate-spin text-amber-400" size={44} />
                <h3 className="text-2xl font-semibold text-white">
                  Creating your luxury itinerary...
                </h3>
                <ul className="mx-auto mt-6 max-w-md space-y-2 text-sm sm:text-base text-slate-400 text-left sm:text-center">
                  <li>✓ Finding luxury hotels...</li>
                  <li>✓ Selecting top restaurants...</li>
                  <li>✓ Planning experiences...</li>
                  <li>✓ Calculating travel budget...</li>
                  <li>✓ Finalizing your itinerary...</li>
                </ul>
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-red-400">
                {error}
              </div>
            )}

            {/* TRAVEL PLAN */}
            {plan && (
              <motion.div
                ref={planRef}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-10"
              >
                <TravelPlan plan={plan} />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}