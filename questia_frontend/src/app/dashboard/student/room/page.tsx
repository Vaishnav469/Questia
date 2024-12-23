"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Form } from "@/lib/types";
import { ThreeDots } from "react-loader-spinner";


const ClassroomForms = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const classroom_uid = searchParams.get('classroomUid');
    const student_uid = searchParams.get('studentUid');
    const [loading, setloading] = useState(false)
    const [pendingforms, setPendingForms] = useState<Form[]>([]);
    const [attemptedforms, setAttemptedForms] = useState<Form[]>([]);
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

    useEffect(() => {
        const fetchforms = async () => {
            setloading(true)
            try { 
                const res = await fetch(`${BACKEND_URL}/api/get_student_forms?classroomUid=${classroom_uid}&studentUid=${student_uid}`);
                if (!res.ok) { 
                    throw new Error("Failed to fetch forms"); 
                } 
                const data = await res.json();
                setAttemptedForms(data.attempted_forms);
                setPendingForms(data.pending_forms);
              } catch (error) { 
                console.error("Error fetching classrooms:", error); 
              } finally {
                setloading(false);
              }
            }; 
        if (classroom_uid && student_uid) fetchforms();
    }, [classroom_uid, student_uid])


    return (loading ? (
    <div className="flex items-center justify-center">
        <ThreeDots width="50" height="50" radius = "9" color="blue" />
    </div>) : 
    (<div className="mx-auto w-full max-w-[1000px] px-2">
        <div className="flex w-full flex-col gap-y-4">
          <div className="flex flex-col gap-y-4">
            <h1 className="truncate text-xl font-bold text-black sm:text-2xl">
                PENDING FORMS
            </h1>
            {pendingforms && pendingforms.map((form) => (
                <div key={form.uid} className="flex w-full rounded-2xl border-2 border-[#8E77DB] bg-[#F1E5FF] p-2">
                    <div className="flex w-full flex-col gap-y-4 p-4 text-[#878787] sm:flex-row sm:items-center sm:gap-x-10">
                        <div className="grow">
                            <Link href={`/dashboard/student/quiz-answer?formUid=${form.uid}&studentUid=${student_uid}`}>
                                <div className="flex flex-wrap items-center gap-2 sm:gap-x-5">
                                    <h1 className="truncate text-xl font-bold text-[#8638E5] sm:text-2xl">
                                        {form.title}
                                    </h1>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            <h1 className="truncate text-xl pt-[300] font-bold text-black sm:text-2xl">
                ATTEMPTED FORMS
            </h1>
            {attemptedforms && attemptedforms.map((form) => (
                <div key={form.uid} className="flex w-full rounded-2xl border-2 border-[#8E77DB] bg-[#F1E5FF] p-2">
                    <div className="flex w-full flex-col gap-y-4 p-4 text-[#878787] sm:flex-row sm:items-center sm:gap-x-10">
                        <div className="grow">
                            <Link href={`/dashboard/student/quiz-feedback?formUid=${form.uid}&studentUid=${student_uid}`}>
                                <div className="flex flex-wrap items-center gap-2 sm:gap-x-5">
                                    <h1 className="truncate text-xl font-bold text-[#8638E5] sm:text-2xl">
                                        {form.title}
                                    </h1>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
          </div>
        </div>
    </div>) 
    );
}

export default ClassroomForms;