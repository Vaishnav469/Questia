"use client";

import Link from "next/link";
import { Room } from "@/lib/types";

const StudentRoomsList = ({
  rooms,
  student_uid
}: {
  rooms: Room[];
  student_uid: string;
}) => {
  return (
    <div className="mx-auto w-full max-w-[1000px] px-2">
      <div className="flex w-full flex-col gap-y-4">
        <div className="flex flex-col gap-y-4">
          {rooms.map((room) => (
            <StudentRoomItem key={room.uid} room={room} student_uid={student_uid}/>
          ))}
        </div>
      </div>
    </div>
  );
};

const StudentRoomItem = ({
  room,
  student_uid
}: {
  room: Room;
  student_uid: string;
}) => {
  return (
    <div>
      <Link href={`/dashboard/student/room?classroomUid=${room.uid}&studentUid=${student_uid}`}>
        <div className="flex w-full rounded-2xl border-2 border-[#8E77DB] bg-[#F1E5FF] p-2">
          <div className="flex w-full flex-col gap-y-4 p-4 text-[#878787] sm:flex-row sm:items-center sm:gap-x-10">
            <div className="grow">
              <div className="flex flex-wrap items-center gap-2 sm:gap-x-5">
                <h1 className="truncate text-xl font-bold text-[#8638E5] sm:text-2xl">
                  {room.description}
                </h1>
              </div>
              <p className="mt-1 line-clamp-2 text-sm">{room.title}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StudentRoomsList;
