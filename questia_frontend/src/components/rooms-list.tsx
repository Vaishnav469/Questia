"use client";

import Link from "next/link";

import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

import { Room } from "@/lib/types";

const RoomsList = ({
  rooms,
  role,
}: {
  rooms: Room[];
  role: "Teacher" | "Student";
}) => {
  return (
    <div className="mx-auto w-full max-w-[1000px] px-2">
      <div className="flex w-full flex-col gap-y-4">
        <div className="flex flex-col gap-y-4">
          {rooms.map((room) => (
            <RoomItem key={room.uid} room={room} role={role} />
          ))}
        </div>
      </div>
    </div>
  );
};

const RoomItem = ({
  room,
  role,
}: {
  room: Room;
  role: "Teacher" | "Student";
}) => {
  return (
    <div>
      <Link href={`/dashboard/${role}/room/${room.uid}`}>
        <div className="flex w-full rounded-2xl border-2 border-[#8E77DB] bg-[#F1E5FF] p-2">
          <div className="flex w-full flex-col gap-y-4 p-4 text-[#878787] sm:flex-row sm:items-center sm:gap-x-10">
            <div className="grow">
              <div className="flex flex-wrap items-center gap-2 sm:gap-x-5">
                <h1 className="truncate text-xl font-bold text-[#8638E5] sm:text-2xl">
                  {room.title}
                </h1>
                <div className="rounded-3xl bg-white px-3 py-1 text-xs font-bold text-black">
                  Access Code: {room.unique_code}
                </div>
              </div>
              <p className="mt-1 line-clamp-2 text-sm">{room.description}</p>
            </div>
            {role === "Teacher" && (
              <div className="flex gap-x-5">
                <TrashIcon className="h-5 w-5 cursor-pointer sm:h-6 sm:w-6" />
                <Pencil1Icon className="h-5 w-5 cursor-pointer sm:h-6 sm:w-6" />
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RoomsList;
