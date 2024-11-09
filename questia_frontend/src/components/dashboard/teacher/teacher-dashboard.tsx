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
    <div>
    <Button onClick={redirecttoroom} style={{cursor:"pointer"}} className="font-semibold md:px-7" variant={"project"}>
            Access Rooms
    </Button>

    <Button onClick={redirecttoform} style={{cursor: "pointer"}} className="font-semibold md:px-7" variant={"project"}>
        Access Forms
    </Button>

    </div>
  );
};

export default TeacherDashboard;
