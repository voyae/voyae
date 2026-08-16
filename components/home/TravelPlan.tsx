"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Hotel,
  Utensils,
  Camera,
  Car,
  Star,
  CloudSun,
  ExternalLink,
} from "lucide-react";

import { TravelPlan as TravelPlanType } from "@/types/travel";

interface Props {
  plan: TravelPlanType;
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        transition: {
          duration: 0.25,
        },
      }}
      className="rounded-[30px] border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-xl"
    >
      <h3 className="mb-6 text-xl font-semibold">
        {title}
      </h3>

      {children}
    </motion.div>
  );
}

export default function TravelPlan({
  plan,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="mt-12 space-y-8"
    >
      {/* HERO */}

      <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-[var(--primary)] via-emerald-700 to-emerald-900 p-10 text-white shadow-2xl">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="text-sm uppercase tracking-[0.35em] text-white/70">
              AI Generated Journey
            </p>

            <h2 className="mt-4 font-display text-5xl md:text-6xl">
              {plan.destination}
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90">
              {plan.overview}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <span className="rounded-full bg-white/15 px-5 py-2 backdrop-blur">
                {plan.duration}
              </span>

              <span className="rounded-full bg-white/15 px-5 py-2 backdrop-blur">
                {plan.budget}
              </span>

            </div>

          </div>

          {/* WEATHER */}

          <div className="min-w-[260px] rounded-[30px] border border-white/20 bg-white/10 p-8 backdrop-blur-xl">

            <div className="flex items-center gap-4">

              <CloudSun size={32} />

              <div>

                <p className="text-sm uppercase tracking-[0.3em] text-white/70">
                  Weather
                </p>

                <h4 className="mt-2 text-3xl font-bold">
                  {plan.weather.temperature}
                </h4>

              </div>

            </div>

            <p className="mt-5 text-lg text-white/80">
              {plan.weather.condition}
            </p>

          </div>

        </div>

      </div>

      {/* GRID */}

      <div className="grid gap-6 lg:grid-cols-2">
                {/* DESTINATION */}

                <Card title="📍 Destination">

<div className="flex items-start gap-4">

  <div className="rounded-2xl bg-emerald-100 p-4">

    <MapPin
      size={26}
      className="text-[var(--primary)]"
    />

  </div>

  <div>

    <h4 className="text-2xl font-semibold">
      {plan.destination}
    </h4>

    <p className="mt-4 leading-8 text-neutral-600">
      {plan.overview}
    </p>

  </div>

</div>

</Card>

{/* WEATHER */}

<Card title="🌤 Current Weather">

<div className="flex items-center justify-between">

  <div>

    <h3 className="text-5xl font-bold">
      {plan.weather.temperature}
    </h3>

    <p className="mt-3 text-lg text-neutral-500">
      {plan.weather.condition}
    </p>

  </div>

  <CloudSun
    size={64}
    className="text-yellow-500"
  />

</div>

</Card>

{/* HOTELS */}

<Card title="🏨 Luxury Hotels">

<div className="space-y-8">

  {plan.hotels.map((hotel) => (

    <div
      key={hotel.name}
      className="overflow-hidden rounded-3xl border border-neutral-200 bg-white"
    >

<div className="relative h-60 w-full bg-neutral-100">

{hotel.image ? (

  <Image
    src={hotel.image}
    alt={hotel.name}
    fill
    unoptimized
    className="object-cover"
  />

) : (

  <div className="flex h-full items-center justify-center text-neutral-400">
    No Image
  </div>

)}

</div>

      <div className="p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Hotel
              size={20}
              className="text-[var(--primary)]"
            />

            <h4 className="text-xl font-semibold">
              {hotel.name}
            </h4>

          </div>

          <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1">

            <Star
              size={16}
              className="fill-yellow-500 text-yellow-500"
            />

            <span className="font-semibold">
              {hotel.rating}
            </span>

          </div>

        </div>

        <p className="mt-5 leading-8 text-neutral-600">
          {hotel.description}
        </p>

        <div className="mt-6 flex items-center justify-between">

          <span className="rounded-full bg-neutral-100 px-5 py-2 font-semibold">
            {hotel.price}
          </span>

          <a
            href={hotel.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-2 text-white transition hover:opacity-90"
          >
            Maps

            <ExternalLink size={16} />

          </a>

        </div>

      </div>

    </div>

  ))}

</div>

</Card>

{/* RESTAURANTS */}

<Card title="🍽 Restaurants">

<div className="space-y-8">

  {plan.restaurants.map((restaurant) => (

    <div
      key={restaurant.name}
      className="overflow-hidden rounded-3xl border border-neutral-200 bg-white"
    >

<div className="relative h-60 w-full bg-neutral-100">

{restaurant.image ? (

  <Image
    src={restaurant.image}
    alt={restaurant.name}
    fill
    unoptimized
    className="object-cover"
  />

) : (

  <div className="flex h-full items-center justify-center text-neutral-400">
    No Image
  </div>

)}

</div>

      <div className="p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Utensils
              size={20}
              className="text-[var(--primary)]"
            />

            <h4 className="text-xl font-semibold">
              {restaurant.name}
            </h4>

          </div>

          <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium">
            {restaurant.cuisine}
          </span>

        </div>

        <p className="mt-5 leading-8 text-neutral-600">
          {restaurant.description}
        </p>

        <div className="mt-6 flex items-center justify-between">

          <span className="rounded-full bg-neutral-100 px-5 py-2 font-semibold">
            {restaurant.price}
          </span>

          <a
            href={restaurant.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-2 text-white transition hover:opacity-90"
          >
            Maps

            <ExternalLink size={16} />

          </a>

        </div>

      </div>

    </div>

  ))}

</div>

</Card>
        {/* ACTIVITIES */}

        <Card title="🏖 Activities">

          <div className="space-y-5">

            {plan.activities.map((activity) => (

              <div
                key={activity.title}
                className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6"
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <Camera
                      size={20}
                      className="text-[var(--primary)]"
                    />

                    <h4 className="font-semibold">
                      {activity.title}
                    </h4>

                  </div>

                  <span className="rounded-full bg-white px-4 py-2 text-sm shadow-sm">
                    {activity.duration}
                  </span>

                </div>

                <p className="mt-4 leading-8 text-neutral-600">
                  {activity.description}
                </p>

                <p className="mt-5 font-semibold text-[var(--primary)]">
                  {activity.price}
                </p>

              </div>

            ))}

          </div>

        </Card>

        {/* TRANSPORT */}

        <Card title="🚕 Transport">

          <div className="rounded-3xl bg-neutral-50 p-6">

            <div className="flex items-center gap-4">

              <Car
                size={26}
                className="text-[var(--primary)]"
              />

              <p className="leading-8 text-neutral-700">
                {plan.transport}
              </p>

            </div>

          </div>

        </Card>

        {/* BUDGET */}

        <Card title="💰 Budget Breakdown">

          <div className="space-y-5">

            <div className="flex items-center justify-between">
              <span>Hotels</span>
              <strong>{plan.budgetBreakdown.hotel}</strong>
            </div>

            <div className="flex items-center justify-between">
              <span>Food</span>
              <strong>{plan.budgetBreakdown.food}</strong>
            </div>

            <div className="flex items-center justify-between">
              <span>Activities</span>
              <strong>{plan.budgetBreakdown.activities}</strong>
            </div>

            <div className="flex items-center justify-between">
              <span>Transport</span>
              <strong>{plan.budgetBreakdown.transport}</strong>
            </div>

            <div className="border-t pt-4 flex items-center justify-between text-lg">

              <span className="font-semibold">
                Total Budget
              </span>

              <span className="font-bold text-[var(--primary)]">
                {plan.budget}
              </span>

            </div>

          </div>

        </Card>

        {/* TRAVEL TIPS */}

        <Card title="💡 Travel Tips">

          <div className="space-y-4">

            {plan.tips.map((tip, index) => (

              <div
                key={index}
                className="flex items-start gap-4 rounded-2xl bg-neutral-50 p-5"
              >

                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] font-bold text-white">
                  ✓
                </div>

                <p className="leading-7 text-neutral-700">
                  {tip}
                </p>

              </div>

            ))}

          </div>

        </Card>

      </div>

      {/* FOOTER */}

      <div className="rounded-[36px] border border-neutral-200 bg-gradient-to-r from-white via-neutral-50 to-white p-10 shadow-sm">

        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="text-sm uppercase tracking-[0.35em] text-[var(--primary)]">
              Voyae AI Concierge
            </p>

            <h3 className="mt-3 font-display text-3xl">
              Your personalized journey is ready.
            </h3>

            <p className="mt-4 max-w-3xl leading-8 text-neutral-600">
              Every recommendation has been tailored according to your destination,
              travel duration and budget. You can regenerate this itinerary
              anytime with different preferences.
            </p>

          </div>

          <div className="flex flex-wrap gap-4">

            <button className="rounded-full bg-[var(--primary)] px-7 py-3 font-semibold text-white transition hover:scale-105">
              Regenerate Plan
            </button>

            <button className="rounded-full border border-neutral-300 px-7 py-3 font-semibold transition hover:bg-neutral-100">
              Export PDF
            </button>

          </div>

        </div>

      </div>

    </motion.div>
  );
}