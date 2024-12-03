"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateRandomString } from "@/lib/utils";
import { createClassroom } from "@/apiService";

const page = () => {
  const router = useRouter(); 
  const searchParams = useSearchParams();
  const [code, setCode] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>("");
  const [roomDesc, setRoomDesc] = useState<string>("");
  const [teacherUid, setTeacherUid] = useState<string | null>(null);

  useEffect(() => {
    setCode(generateRandomString(6));
    const uid = searchParams.get('teacherUid'); 
    setTeacherUid(uid);
  }, []);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!teacherUid) { 
        console.error('Teacher UID is not available'); 
      return; 
    }
    try { 
      const classroomData = { 
        title: roomName, 
        description: roomDesc, 
        unique_code: code, 
        uid: teacherUid,
      };

      const result = await createClassroom(classroomData);
      console.log('Classroom created:', result.classroom_id); 
      
      router.push(`/dashboard/teacher/rooms-list?teacherUid=${teacherUid}`); 
    } catch (error) { 
      console.error('Error creating classroom:', error); 
    } 
  };

  return (
    <form className="text-center" onSubmit={handleSubmit}>
      <h1 className="py-10 text-3xl font-bold">Create a Room</h1>

      <div className="px-4">
        <div className="mx-auto flex w-fit flex-col gap-y-4 rounded-2xl border-2 border-[#8E77DB] bg-[#313030] p-10 px-16 text-[#F1E5FF]">
          <p>
            Set up a new Classroom for your students. Share the room code for
            easy access
          </p>

          <Input
            placeholder="Enter Classroom name (e.g., 'Grade 2A')"
            className="py-1"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <Input
            placeholder="Enter what the room is about (e.g., 'Chemistry')"
            className="py-1"
            value={roomDesc}
            onChange={(e) => setRoomDesc(e.target.value)}
          />

          <p className="text-left">Access code</p>
          <div className="flex w-fit items-center gap-x-5">
            <div className="rounded-lg border-2 border-[#8E77DB] p-1 px-5">
              {code}
            </div>
            <Button variant={"project"} type="button" onClick={copyToClipboard}>
              {copied ? "✓ Copied" : "Copy"}
            </Button>
          </div>
        </div>

        <Button
          variant={"project"}
          size={"lg"}
          className="mt-5 border-2 border-[#D9D9D9] font-semibold"
          type="submit"
        >
          Create Room
        </Button>
      </div>
    </form>
  );
};

export default page;
