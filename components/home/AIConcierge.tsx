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

  const [plan, setPlan] =
    useState<TravelPlanType | null>(null);

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

      const data = await res.json();

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
    
      const overview = doc.splitTextToSize(
        plan.overview,
        180
      );
    
      doc.text(overview, 15, y);
    
      y += overview.length * 6 + 10;
    
      autoTable(doc, {
        startY: y,
        head: [["Hotels", "Price"]],
    
        body: plan.hotels.map((hotel) => [
          hotel.name,
          hotel.price,
        ]),
      });
    
      y = (doc as any).lastAutoTable.finalY + 10;
    
      autoTable(doc, {
        startY: y,
        head: [["Restaurants", "Cuisine"]],
    
        body: plan.restaurants.map((r) => [
          r.name,
          r.cuisine,
        ]),
      });
    
      y = (doc as any).lastAutoTable.finalY + 10;
    
      autoTable(doc, {
        startY: y,
        head: [["Activities", "Duration", "Price"]],
    
        body: plan.activities.map((a) => [
          a.title,
          a.duration,
          a.price,
        ]),
      });
    
      doc.save(
        `${plan.destination.replace(/\s/g, "-")}-Voyae.pdf`
      );
    }
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

  return (
    <section
      id="ai"
      className="bg-white py-32"
    >
      <div className="mx-auto w-[92%] max-w-[1280px]">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="rounded-[42px] border border-neutral-200 bg-neutral-50 p-10 shadow-xl"
        >

          <div className="mb-10 flex items-center gap-5">

            <div className="rounded-3xl bg-[var(--primary)] p-4 text-white">
              <Sparkles size={28} />
            </div>

            <div>

              <p className="text-sm uppercase tracking-[0.35em] text-[var(--primary)]">
                AI Concierge
              </p>

              <h2 className="mt-2 font-display text-5xl">
                Plan your perfect journey.
              </h2>

              <p className="mt-4 max-w-2xl leading-8 text-neutral-500">
                Tell Voyae where you'd like to go,
                your budget, travel style and
                preferences. Our AI will create
                a premium personalized itinerary.
              </p>

            </div>

          </div>
          <div className="space-y-6">

{/* SUGGESTIONS */}

<div className="flex flex-wrap gap-3">

  {suggestions.map((item) => (

    <button
      key={item}
      onClick={() => setPrompt(item)}
      className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm transition hover:border-[var(--primary)] hover:bg-emerald-50"
    >
      {item}
    </button>

  ))}

</div>

{/* PROMPT */}

<textarea
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generateJourney();
    }
  }}
  placeholder={`Example:

• 7 days in Italy
• Budget: €2,000
• Luxury hotels
• Romantic honeymoon
• Michelin restaurants
• Private airport transfer`}
  rows={8}
  className="w-full resize-none rounded-3xl border border-neutral-200 bg-white p-7 text-lg leading-8 outline-none transition-all focus:border-[var(--primary)] focus:ring-4 focus:ring-emerald-100"
/>

{/* BUTTONS */}

<div className="flex flex-wrap gap-4">

<button
  onClick={generateJourney}
  disabled={loading}
  className="
    flex
    flex-1
    items-center
    justify-center
    gap-3
    rounded-full
    bg-emerald-700
    px-8
    py-5
    text-lg
    font-semibold
    text-white
    shadow-lg
    transition-all
    duration-300
    hover:bg-emerald-800
    hover:shadow-xl
    hover:scale-[1.02]
    disabled:cursor-not-allowed
    disabled:bg-emerald-600
    disabled:opacity-80
  "
>
  {loading ? (
    <>
      <Loader2
        size={22}
        className="animate-spin"
      />
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
        className="flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-4 font-medium transition hover:bg-neutral-100"
      >
        <RefreshCw size={18} />
        Regenerate
      </button>

      <button
        onClick={copyPlan}
        className="flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-4 font-medium transition hover:bg-neutral-100"
      >
        <Copy size={18} />
        Copy
      </button>
    </>

  )}

</div>

{/* LOADING */}

{loading && (

  <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-10">

    <Loader2
      className="mx-auto mb-6 animate-spin text-[var(--primary)]"
      size={44}
    />

    <h3 className="text-center text-2xl font-semibold">
      Creating your luxury itinerary...
    </h3>

    <ul className="mx-auto mt-8 max-w-md space-y-3 text-neutral-600">

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

  <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-600">
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