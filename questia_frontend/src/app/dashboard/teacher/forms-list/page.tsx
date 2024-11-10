"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/lib/types";
import React, { useEffect, useState } from "react";
import FormsList from "@/components/forms-list";
import { Input } from "@/components/ui/input";
import { fetchTeacherForms } from "@/apiService"
import  Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const FormsListPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const teacherUid = searchParams.get('teacherUid');
  const [forms, setForms] = useState<Form[]>([]);
  useEffect(() => { 
    if (teacherUid) {
        const getForms = async () => { 
            try { 
                const formsData = await fetchTeacherForms(teacherUid); 
                setForms(formsData); 
            } catch (error) { 
                console.error("Failed to fetch forms:", error); 
            } 
        }; 
    getForms(); 
    }
}, [teacherUid]);

    return (
      <div className="mx-auto flex h-screen w-full max-w-[1440px] flex-col pt-10">
      <div className="w-full pb-12 text-center text-[#FFFFFF]">
          <h1 className="text-3xl font-bold">Your Forms</h1>
          <h3 className="text-xl font-semibold">
          View, edit, or delete your creat Forms.
          </h3>
          <Link href={`/dashboard/teacher/create-quiz?teacherUid=${teacherUid}`}>
          <Button
              variant={"project"}
              size={"lg"}
              className="mt-5 border-2 border-[#D9D9D9] font-semibold"
          >
              Create Form
          </Button>
          </Link>
        </div>
        <FormsList forms={forms} role="Teacher" teacherUid={teacherUid} />
      </div>
    );
};

export default FormsListPage;
