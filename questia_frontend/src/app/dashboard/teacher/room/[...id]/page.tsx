import RoomInterface from "@/components/dashboard/room-interface";
import { QuizRoom } from "@/lib/types";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const roomData: QuizRoom = {
    id: 1,
    name: "Physics Fundamentals Quiz 1",
    description:
      "Test students on basic concepts in physics, including motion and energy",
    code: id,
    quizzes: [
      {
        id: 1,
        status: "Live",
        name: "Newtons Laws of Motion",
        description:
          "Test students on basic concepts in physics, including motion and energy",
      },
      {
        id: 2,
        status: "Ended",
        name: "Force and Free Body diagrams",
        description:
          "Test students on basic concepts in physics, including motion and energy",
      },
    ],
  };
  return (
    <div className="mx-auto h-screen w-full max-w-[1000px]">
      <h1 className="pt-5 text-center text-3xl font-bold">Room Code: {id}</h1>
      <p className="text-center">
        View, edit, or delete your created quiz rooms.
      </p>

      <div className="pt-10">
        <RoomInterface roomData={roomData} />
      </div>
    </div>
  );
};

export default page;
