"use client"
import RoomInterface from "@/components/dashboard/room-interface";
import { ClassData } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchstudentinclassroom } from "@/apiService";
import { ThreeDots } from 'react-loader-spinner'

const page = () => {
  const searchParams = useSearchParams();
  const classroomUid = searchParams.get('classroomUid');
  const [classdata, setclassdata] = useState<ClassData | null>(null);
  const [loading, setloading] = useState(false)

  useEffect(() => { 
    if (classroomUid) {
        const getStudents = async () => { 
            setloading(true)
            try { 
                const classData = await fetchstudentinclassroom(classroomUid); 
                setclassdata(classData); 
            } catch (error) { 
                console.error("Failed to fetch classroom:", error); 
            } finally {
                setloading(false)
            }
        }; 
      getStudents(); 
    }
  }, [classroomUid]);
  return (
    loading ? (
    <div className="flex items-center justify-center">
      <ThreeDots width="50" height="50" radius = "9" color="blue" />
    </div>) : (
    <div className="h-screen w-full max-w-[1000px]">
      {classdata && (
        <div>
            <h1 className="pt-5 pl-[500] text-3xl font-bold text-black"> 
              Room Title: {classdata.classroom.title} 
            </h1>
            <h2 className="pt-2 pl-[540] text-2xl text-black"> 
              Description: {classdata.classroom.description}
            </h2>
            <p className="pt-2 pl-[570] text-xl text-black"> 
              Room Code: {classdata.classroom.unique_code} 
            </p>
            {classdata.students.length == 0 && <h1 className="pt-[250] pl-[500] text-3xl font-bold text-black">Nobody has joined yet</h1>}
            {classdata.students.length != 0 &&
              <div className="pt-10">
                <div className="px-4">
                  <div className=" flex w-fit flex-col gap-y-4 rounded-2xl border-2 border-[#8E77DB] bg-[#313030] p-10 px-16 text-[#F1E5FF]"> 
                    <p className="text-xl">Students</p>
                    <div className="flex flex-col gap-y-4">
                      {classdata.students && classdata.students.map((student) => (
                      <div 
                        key={student.uid} 
                        className="flex flex-wrap gap-y-2 rounded-2xl border-2 border-[#8E77DB] bg-[#F1E5FF] p-4 text-[#878787]"
                        > 
                          <h1 className="grow text-xl font-bold">{student.email}</h1> 
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            }
        </div>
      )}
    </div>
    )
  );
};

export default page;
