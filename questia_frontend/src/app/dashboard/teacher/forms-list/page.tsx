"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/lib/types";
import React, { useEffect, useState } from "react";
import FormsList from "@/components/forms-list";
import { Input } from "@/components/ui/input";
import { fetchTeacherForms } from "@/apiService"
import  Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ThreeDots } from 'react-loader-spinner'

const FormsListPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const teacherUid = searchParams.get('teacherUid');
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setloading] = useState(false)
  
  useEffect(() => { 
    
    if (teacherUid) {
   
        const getForms = async () => { 
            setloading(true)
            try { 
                const formsData = await fetchTeacherForms(teacherUid); 
                setForms(formsData); 
            } catch (error) { 
                console.error("Failed to fetch forms:", error); 
            }  finally {
                setloading(false)
            }
        }; 
    getForms();
    }

}, [teacherUid]);

    return (
        loading ? ( 
            <div className="flex items-center justify-center">
                <ThreeDots width="50" height="50" radius = "9" color="blue" />
            </div>) : (
      <div className="mx-auto flex w-full max-w-[1440px] flex-col pt-10">
        <div className="w-full pb-12 text-center text-black">
          <h1 className="text-3xl font-bold">Your Forms</h1>
          <h3 className="text-xl font-semibold">
          Create, View, edit, or delete your Forms.
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
        <FormsList forms={forms} role="teacher" teacherUid={teacherUid} />
      </div>)
    );
};

export default FormsListPage;
