import { Student } from "@/lib/types";
import { cn } from "@/lib/utils";

const RoomInterface = ({ studentData }: { studentData: Student }) => {
  return (
    <div className="px-4">
      <div className="mx-auto flex w-fit flex-col gap-y-4 rounded-2xl border-2 border-[#8E77DB] bg-[#313030] p-10 px-16 text-[#F1E5FF]">
        <p className="text-xl">{roomData.description}</p>
        <div className="flex flex-col gap-y-4">
          {studentData.map((quest) => (
            <div
              key={quest.uid}
              className="flex flex-wrap items-center gap-y-2 rounded-2xl border-2 border-[#8E77DB] bg-[#F1E5FF] p-4 text-[#878787]"
            >
              <h1 className="grow text-xl font-bold">{quest.email}</h1>
              {/* <p
                className={cn(
                  "rounded-md border p-1 px-4 text-xs",
                  quest.status === "Live"
                    ? "border-green-500 font-bold text-green-500"
                    : "border-red-500 font-bold text-red-500"
                )}
              >
                {quest.status}
              </p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomInterface;
