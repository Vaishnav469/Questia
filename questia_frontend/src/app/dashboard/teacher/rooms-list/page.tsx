"use client";


import { Button } from "@/components/ui/button";
import { Room } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { fetchTeacherClassrooms } from "@/apiService"
import TeacherRoomsList from "@/components/rooms-list-teacher";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ThreeDots } from 'react-loader-spinner'

const RoomsListPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const teacherUid = searchParams.get('teacherUid');
    const [classrooms, setClassrooms] = useState<Room[]>([]);
    const [loading, setloading] = useState(false);

    useEffect(() => { 
        if (teacherUid) {
            const getClassrooms = async () => { 
                setloading(true)
                try { 
                    const classroomsData = await fetchTeacherClassrooms(teacherUid); 
                    setClassrooms(classroomsData); 
                } catch (error) { 
                    console.error("Failed to fetch classrooms:", error); 
                } finally {
                    setloading(false)
                }
            }; 
        getClassrooms(); 
        }
    }, [teacherUid]);

    return (
        loading ? ( 
            <div className="flex items-center justify-center">
                <ThreeDots width="50" height="50" radius = "9" color="blue" />
            </div>) : (
        <div className="mx-auto flex h-screen w-full max-w-[1440px] flex-col pt-10">
            <div className="w-full pb-12 text-center text-black">
                <h1 className="text-3xl font-bold">Your ClassRooms</h1>
                <h3 className="text-xl font-semibold">
                View, edit, or delete your created class rooms.
                </h3>
                <Link href={`/dashboard/teacher/create-a-room?teacherUid=${teacherUid}`}>
                <Button
                    variant={"project"}
                    size={"lg"}
                    className="mt-5 border-2 border-[#D9D9D9] font-semibold"
                >
                    Create Room
                </Button>
                </Link>
            </div>
            <TeacherRoomsList rooms={classrooms} />
        </div>
        )
    );
};

export default RoomsListPage;
