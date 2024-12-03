"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';


const TeacherDashboard = ({ teacherUid }: { teacherUid: string }) => {
  const router = useRouter();
  const redirecttoroom = async () => { 
    router.push(`/dashboard/teacher/rooms-list?teacherUid=${teacherUid}`); 
  };

  const redirecttoform = async () => {
    router.push(`/dashboard/teacher/forms-list?teacherUid=${teacherUid}`);
  }


  return (
    <div className="relative w-full pt-20">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-y-5 px-4 text-center md:px-0">
        <h1 className="max-w-xl text-black pt-5 text-3xl font-bold">
             Hi Teacher!
        </h1>

        <p className="max-w-2xl text-black">
            let's Get Started!
        </p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          <Button onClick={redirecttoroom} style={{cursor:"pointer"}} className="font-semibold md:px-7" variant={"project"}>
                  Access Rooms
          </Button>

          <Button onClick={redirecttoform} style={{cursor: "pointer"}} className="font-semibold md:px-7" variant={"project"}>
              Access Forms
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
