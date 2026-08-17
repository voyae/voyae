"use client";

import Link from "next/link";

import { useParams } from "next/navigation";

import {
  CheckCircle2,
  Home,
} from "lucide-react";

export default function BookingSuccessPage() {
  const { reference } = useParams();

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center p-10">

      <div className="w-full rounded-3xl border bg-white p-10 shadow-sm">

        <div className="flex justify-center">
          <CheckCircle2
            size={90}
            className="text-emerald-600"
          />
        </div>

        <h1 className="mt-8 text-center text-4xl font-bold">
          Booking Confirmed
        </h1>

        <p className="mt-5 text-center text-neutral-500">
          Your reservation has been successfully created.
        </p>

        <div className="mt-10 rounded-2xl bg-neutral-100 p-6">

          <p className="text-sm text-neutral-500">
            Booking Reference
          </p>

          <p className="mt-2 break-all text-3xl font-bold">
            {reference}
          </p>

        </div>

        <div className="mt-10 grid gap-4">

          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 py-4 font-semibold text-white transition hover:bg-emerald-800"
          >
            <Home size={20} />

            Back to Home
          </Link>

        </div>

      </div>

    </main>
  );
}