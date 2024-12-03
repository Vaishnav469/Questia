"use client";

import { Button } from "@/components/ui/button";
import { Room } from "@/lib/types";
import React, { useEffect, useState } from "react";
import StudentRoomsList from "@/components/rooms-list-student";
import Link from "next/link";
import { ThreeDots } from 'react-loader-spinner'
import { fetchStudentClassrooms } from "@/apiService"



const StudentDashboard = ({ studentUid } : {studentUid : string}) => {
    const [loading, setloading] = useState(false);
    const [classrooms, setClassrooms] = useState<Room[]>([]);

    useEffect(() => { 
        if (studentUid) {
            const getClassrooms = async () => { 
                setloading(true)
                try { 
                    const classroomsData = await fetchStudentClassrooms(studentUid); 
                    setClassrooms(classroomsData); 
                } catch (error) { 
                    console.error("Failed to fetch classrooms:", error); 
                } finally {
                    setloading(false)
                }
            }; 

        getClassrooms(); 
        }
    }, [studentUid]);

    return (
        loading ? ( <div className="flex items-center justify-center">
        <ThreeDots width="50" height="50" radius = "9" color="blue" />
    </div>) : ( <div className="mx-auto flex h-screen w-full max-w-[1440px] flex-col pt-10">
            <div className="w-full pb-12 text-center text-black">
                <h1 className="text-3xl font-bold">Your ClassRooms</h1>
                <Link href={`/dashboard/student/join-a-room?studentUid=${studentUid}`}>
                    <Button
                        variant={"project"}
                        size={"lg"}
                        className="mt-5 border-2 border-[#D9D9D9] font-semibold"
                    >
                    Join Room
                    </Button>
                </Link>
            </div>
            <StudentRoomsList rooms={classrooms} student_uid={studentUid} />
        </div>
        )
    );
};

export default StudentDashboard;
