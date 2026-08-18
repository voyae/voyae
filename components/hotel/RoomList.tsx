"use client";

import RoomCard from "./RoomCard";

interface Props {
  rooms: any[];
  loading?: boolean;
}

export default function RoomList({ rooms, loading = false }: Props) {
  if (loading) {
    return (
      <div className="space-y-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-[220px] animate-pulse rounded-2xl border border-slate-800 bg-[#101C3E]"
          />
        ))}
      </div>
    );
  }

  if (!rooms.length) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-[#101C3E] text-lg text-slate-400">
        No rooms available.
      </div>
    );
  }

  return (
    <section className="space-y-5">
      {rooms.map((room: any, index: number) => (
        <RoomCard
          key={
            room.roomTypeId ??
            room.roomId ??
            room.id ??
            room.name ??
            index
          }
          room={room}
        />
      ))}
    </section>
  );
}