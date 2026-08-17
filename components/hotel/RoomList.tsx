"use client";

import RoomCard from "./RoomCard";

interface Props {
  rooms: any[];

  loading?: boolean;
}

export default function RoomList({
  rooms,
  loading = false,
}: Props) {
  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="
            h-56
            animate-pulse
            rounded-3xl
            bg-neutral-200
            "
          />
        ))}
      </div>
    );
  }

  if (!rooms.length) {
    return (
      <div
        className="
        flex
        h-60
        items-center
        justify-center
        rounded-3xl
        border
        border-dashed
        border-neutral-300
        bg-white
        text-lg
        text-neutral-500
        "
      >
        No rooms available.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {rooms.map((room: any, index: number) => (
        <RoomCard
          key={
            room.roomId ??
            room.id ??
            room.name ??
            index
          }
          room={room}
        />
      ))}
    </div>
  );
}