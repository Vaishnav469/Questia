import Link from "next/link";

import RoomsList from "@/components/rooms-list";
import { Button } from "@/components/ui/button";
import { Room } from "@/lib/types";

const rooms: Room[] = [
  {
    id: 1,
    name: "Physics Fundamentals Quiz 1",
    description:
      "Test students on basic concepts in physics, including motion and energy",
    code: "PHYSICS1",
  },
  {
    id: 2,
    name: "Chemistry Fundamentals Quiz 1",
    description:
      "Test students on basic concepts in chemistry, including atoms and molecules",
    code: "CHEMISTRY1",
  },
  {
    id: 3,
    name: "Chemistry Fundamentals Quiz 1",
    description:
      "Test students on basic concepts in chemistry, including atoms and molecules",
    code: "CHEMISTRY1",
  },
  {
    id: 4,
    name: "Chemistry Fundamentals Quiz 1",
    description:
      "Test students on basic concepts in chemistry, including atoms and molecules",
    code: "CHEMISTRY1",
  },
  {
    id: 5,
    name: "Chemistry Fundamentals Quiz 1",
    description:
      "Test students on basic concepts in chemistry, including atoms and molecules",
    code: "CHEMISTRY1",
  },
  {
    id: 6,
    name: "Chemistry Fundamentals Quiz 1",
    description:
      "Test students on basic concepts in chemistry, including atoms and molecules",
    code: "CHEMISTRY1",
  },
  {
    id: 7,
    name: "Chemistry Fundamentals Quiz 1",
    description:
      "Test students on basic concepts in chemistry, including atoms and molecules",
    code: "CHEMISTRY1",
  },
  {
    id: 8,
    name: "Chemistry Fundamentals Quiz 1",
    description:
      "Test students on basic concepts in chemistry, including atoms and molecules",
    code: "CHEMISTRY1",
  },
];

const TeacherDashboard = () => {
  return (
    <div className="mx-auto flex h-screen w-full max-w-[1440px] flex-col pt-10">
      <div className="w-full pb-12 text-center text-[#FFFFFF]">
        <h1 className="text-3xl font-bold">Your Quiz Rooms</h1>
        <h3 className="text-xl font-semibold">
          View, edit, or delete your created quiz rooms.
        </h3>
        <Link href="/dashboard/teacher/create-a-room">
          <Button
            variant={"project"}
            size={"lg"}
            className="mt-5 border-2 border-[#D9D9D9] font-semibold"
          >
            Create Room
          </Button>
        </Link>
      </div>
      <RoomsList rooms={rooms} role="Teacher" />
    </div>
  );
};

export default TeacherDashboard;
