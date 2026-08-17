"use client";

import { Bed, Coffee, ShieldCheck } from "lucide-react";

interface Props {
  room: any;
}

export default function RoomCard({
  room,
}: Props) {
  const rate =
    room.rates?.[0] ?? {};

  const total =
    rate.retailRate?.total?.[0];

  const refundable =
    rate.cancellationPolicies
      ?.refundableTag === "RFN";

  return (
    <div
      className="
      rounded-3xl
      border
      border-neutral-200
      bg-white
      p-8
      shadow-sm
      "
    >
      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-3">

            <Bed
              size={22}
              className="text-emerald-700"
            />

            <h3 className="text-2xl font-bold">
              {room.name ??
                room.roomName ??
                "Room"}
            </h3>

          </div>

          {rate.boardName && (
            <p className="mt-3 text-neutral-600">
              {rate.boardName}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">

            {rate.boardName
              ?.toLowerCase()
              ?.includes(
                "breakfast"
              ) && (
              <div
                className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-green-50
                px-4
                py-2
                text-sm
                text-green-700
                "
              >
                <Coffee size={16} />

                Breakfast Included
              </div>
            )}

            {refundable && (
              <div
                className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-blue-50
                px-4
                py-2
                text-sm
                text-blue-700
                "
              >
                <ShieldCheck size={16} />

                Free Cancellation
              </div>
            )}

          </div>

        </div>

        <div className="text-right">

          <p className="text-sm text-neutral-500">
            Total Price
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {total?.currency ??
              "USD"}{" "}
            {Number(
              total?.amount ?? 0
            ).toFixed(0)}
          </h2>

          <button
            className="
            mt-6
            rounded-2xl
            bg-emerald-700
            px-8
            py-4
            font-semibold
            text-white
            transition
            hover:bg-emerald-800
            "
          >
            Reserve
          </button>

        </div>

      </div>

      {rate.cancellationPolicies
        ?.cancelPolicyInfos
        ?.length > 0 && (
        <div
          className="
          mt-8
          rounded-2xl
          bg-neutral-50
          p-5
          "
        >
          <h4 className="font-semibold">
            Cancellation Policy
          </h4>

          {rate.cancellationPolicies.cancelPolicyInfos.map(
            (
              policy: any,
              index: number
            ) => (
              <p
                key={index}
                className="mt-2 text-sm text-neutral-600"
              >
                Cancel before{" "}
                {policy.cancelTime}
                {" • "}
                Charge{" "}
                {policy.currency}{" "}
                {policy.amount}
              </p>
            )
          )}
        </div>
      )}

    </div>
  );
}