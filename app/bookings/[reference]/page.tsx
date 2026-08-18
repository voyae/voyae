"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle2, Home } from "lucide-react";

export default function BookingSuccessPage() {
  const params = useParams();
  const reference = params?.reference;

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center p-10 bg-[#0A1128] text-slate-100">
      <div className="w-full rounded-[32px] border border-slate-800 bg-[#101C3E] p-10 shadow-2xl">
        <div className="flex justify-center">
          <CheckCircle2
            size={90}
            className="text-emerald-400"
          />
        </div>

        <h1 className="mt-8 text-center text-4xl font-black text-white tracking-tight">
          Booking Confirmed
        </h1>

        <p className="mt-4 text-center text-slate-400 font-medium">
          Your reservation has been successfully created. We look forward to welcoming you!
        </p>

        <div className="mt-10 rounded-2xl bg-[#0d1633] border border-slate-800 p-6 text-center">
          <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">
            Booking Reference
          </p>
          <p className="mt-2 break-all text-3xl font-black text-amber-400">
            {reference}
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-4 font-bold text-slate-950 transition hover:bg-amber-400 shadow-lg"
          >
            <Home size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}