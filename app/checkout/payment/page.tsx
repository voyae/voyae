"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const router = useRouter();

  const [guest, setGuest] = useState<any>(null);

  const [prebook, setPrebook] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const guestData = sessionStorage.getItem("guest");

    const prebookData =
      sessionStorage.getItem("prebook");

    if (guestData) {
      setGuest(JSON.parse(guestData));
    }

    if (prebookData) {
      setPrebook(JSON.parse(prebookData));
    }
  }, []);

  async function bookNow() {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/bookings/book",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            guest,

            prebook,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      router.push(
        `/booking/${data.reference}`
      );
    } catch (err) {
      console.error(err);

      alert("Booking failed.");
    } finally {
      setLoading(false);
    }
  }

  if (!prebook) {
    return (
      <main className="mx-auto max-w-5xl p-10">
        Loading...
      </main>
    );
  }

  const room = prebook.rooms?.[0];

  return (
    <main className="mx-auto max-w-5xl p-10">

      <h1 className="mb-10 text-4xl font-bold">
        Review Booking
      </h1>

      <div className="rounded-3xl border p-8">

        <h2 className="text-2xl font-semibold">
          {room?.roomName}
        </h2>

        <p className="mt-2 text-neutral-500">
          {room?.boardName}
        </p>

        <div className="mt-8">

          <p className="font-semibold">
            Guest
          </p>

          <p className="mt-2">
            {guest?.firstName}{" "}
            {guest?.lastName}
          </p>

          <p>{guest?.email}</p>

          <p>{guest?.phone}</p>

        </div>

        <div className="mt-8">

          <p className="font-semibold">
            Total Price
          </p>

          <p className="mt-2 text-4xl font-bold">

            {room?.currency} {room?.price}

          </p>

        </div>

        <button
          onClick={bookNow}
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
            ? "Booking..."
            : "Book Now"}
        </button>

      </div>

    </main>
  );
}