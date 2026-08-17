"use client";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const params = useSearchParams();

  const offerId = params.get("offerId") ?? "";

  const [loading, setLoading] = useState(false);

  const [guest, setGuest] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  async function continueBooking() {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/bookings/prebook",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            offerId,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      sessionStorage.setItem(
        "prebook",
        JSON.stringify(data)
      );

      sessionStorage.setItem(
        "guest",
        JSON.stringify(guest)
      );

      router.push("/checkout/payment");
    } catch (err) {
      console.error(err);

      alert("Prebook failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-10">

      <h1 className="mb-8 text-4xl font-bold">
        Guest Information
      </h1>

      <div className="space-y-5">

        <input
          placeholder="First Name"
          value={guest.firstName}
          onChange={(e) =>
            setGuest({
              ...guest,
              firstName: e.target.value,
            })
          }
          className="w-full rounded-xl border p-4"
        />

        <input
          placeholder="Last Name"
          value={guest.lastName}
          onChange={(e) =>
            setGuest({
              ...guest,
              lastName: e.target.value,
            })
          }
          className="w-full rounded-xl border p-4"
        />

        <input
          placeholder="Email"
          value={guest.email}
          onChange={(e) =>
            setGuest({
              ...guest,
              email: e.target.value,
            })
          }
          className="w-full rounded-xl border p-4"
        />

        <input
          placeholder="Phone"
          value={guest.phone}
          onChange={(e) =>
            setGuest({
              ...guest,
              phone: e.target.value,
            })
          }
          className="w-full rounded-xl border p-4"
        />

      </div>

      <button
        onClick={continueBooking}
        disabled={loading}
        className="
        mt-10
        w-full
        rounded-2xl
        bg-emerald-700
        py-4
        text-lg
        font-semibold
        text-white
        "
      >
        {loading
          ? "Checking availability..."
          : "Continue to Payment"}
      </button>

    </main>
  );
}