"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { Pencil1Icon, TrashIcon, DotsVerticalIcon } from "@radix-ui/react-icons";

import { Form } from "@/lib/types";

const FormsList = ({
  forms,
  role,
  teacherUid,
}: {
  forms: Form[];
  role: "teacher" | "student";
  teacherUid: string;
}) => {
  return (
    <div className="mx-auto w-full max-w-[1000px] px-2">
      <div className="flex w-full flex-col gap-y-4">
        <div className="flex flex-col gap-y-4">
          {forms.map((form) => (
            <FormItem key={form.uid} form={form} role={role} teacherUid={teacherUid} />
          ))}
        </div>
      </div>
    </div>
  );
};

const FormItem = ({
  form,
  role,
  teacherUid,
}: {
  form: Form;
  role: "teacher" | "student";
  teacherUid: string;
}) => {
  const [classrooms, setClassrooms] = useState<{ uid: string; title: string }[]>([]); 
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => { 
    const fetchClassrooms = async () => { 
      try { 
        const res = await fetch(`http://192.168.70.47:8000/api/teacher-classrooms?teacher_uid=${teacherUid}`); 
        if (!res.ok) { 
          throw new Error("Failed to fetch classrooms"); 
        } const data = await res.json(); setClassrooms(data); 
      } catch (error) { 
        console.error("Error fetching classrooms:", error); 
      } 
    }; fetchClassrooms(); 
  }, [teacherUid]);

  const handleGrantAccess = async (classroomUid: string) => { 
    setShowDropdown(false);
    try { 
      const res = await fetch("http://192.168.70.47:8000/api/give_access_to_form", { 
        method: "POST", headers: { 
          "Content-Type": "application/json", 
        }, body: JSON.stringify({ form_uid: form.uid, classroom_uid: classroomUid }), 
      }); 
      if (!res.ok) { 
        throw new Error("Failed to grant access to form"); 
      } 
      const data = await res.json(); 
      console.log("Access granted:", data); 
    } catch (error) { 
      console.error("Error granting access to form:", error); 
    } 
  };

  return (
    <div>
        <div className="flex w-full rounded-2xl border-2 border-[#8E77DB] bg-[#F1E5FF] p-2">
          <div className="flex w-full flex-col gap-y-4 p-4 text-[#878787] sm:flex-row sm:items-center sm:gap-x-10">
            <div className="grow">
              <Link href={`/dashboard/${role}/form?formUid=${form.uid}`}>
              <div className="flex flex-wrap items-center gap-2 sm:gap-x-5">
                <h1 className="truncate text-xl font-bold text-[#8638E5] sm:text-2xl">
                  {form.title}
                </h1>
              </div>
              </Link>
            </div>
            {role === "teacher" && (
              <div className="flex gap-x-5">
                <TrashIcon className="h-5 w-5 cursor-pointer sm:h-6 sm:w-6" />
                <Pencil1Icon className="h-5 w-5 cursor-pointer sm:h-6 sm:w-6" />
                <DotsVerticalIcon className="h-5 w-5 cursor-pointer sm:h-6 sm:w-6" onClick={() => setShowDropdown(!showDropdown)} />
                 {showDropdown && (
                  <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg"> 
                    <ul> {classrooms.map((classroom) => ( 
                      <li key={classroom.uid} className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => handleGrantAccess(classroom.uid)}> 
                      {classroom.title} 
                      </li> 
                      ))} 
                    </ul> 
                  </div>
                 )}
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default FormsList;
