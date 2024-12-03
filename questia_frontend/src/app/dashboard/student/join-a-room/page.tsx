"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { ThreeDots } from 'react-loader-spinner'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const page = () => {
  const router = useRouter(); 
  const searchParams = useSearchParams();
  const [loading, setloading] = useState(false)
  const [code, setCode] = useState<string>("");
  const [studentUid, setStudentUid] = useState<string | null>(null);

  useEffect(() => {
    const uid = searchParams.get('studentUid'); 
    setStudentUid(uid);
  }, []);

    const joinclassroom = async () => {
        setloading(true)
        try {
            const response = await fetch(`http://192.168.70.47:8000/api/classroom_join`, { 
                method: 'POST', headers: { 
                    'Content-Type': 'application/json', 
                }, body: JSON.stringify({ student_uid: studentUid, code: code}),
            }); 

            if (!response.ok) { 
                throw new Error("Failed to create form"); 
            } 

            const data = await response.json(); 
            console.log("Form created:", data.form_id); 
            router.push(`/dashboard/student/`); 
        } catch (error) {
            console.error("Error creating form:", error); 
        } finally {
            setloading(false)
        }
    }

  return (
    <div className="flex flex-col items-center justify-center">
        <h1  className="text-3xl py-20" >Hi!</h1>
        <h1 className="text-3xl font-bold">Join A ClassRoom</h1>
        <div className="m-5 justify-center text-center items-center rounded-xl border-2 border-[#8E77DB] bg-[#313030] px-5 pt-7 pb-16 md:px-32">
            <h1>Enter the Room code provided by your teacher to join the classroom</h1>
            <div className="rounded-xl p-px pt-7">
                <div className="gap-y-12 rounded-xl p-0.5 bg-gradient-to-r from-[#F1E5FF] to-[#8E77DB]">
                    <div className=" bg-[#313030] rounded-xl p-0">
                        <Input
                        type="email"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter the Classroom Code here"
                        className="text-sm text-[#B3B3B3] bg-transparent focus:outline-none border-none outline-none h-[60]"/>
                    </div>
                </div>
            </div>
            {/* <div className="flex px-12 gap-x-2 pb-5 pt-5">
                <a href="#" className="text-blue-500" >💡Please read the instructions clearly.</a>
                <h1> Best of Luck!</h1>
            </div> */}
            {loading ? (<div className="flex items-center justify-center">
                <ThreeDots width="50" height="50" radius = "9" color="blue" />
            </div>) : <Button
                variant={"project"}
                size={"lg"}
                className="mt-5 border-2 border-[#D9D9D9] font-semibold items-center"
                onClick={joinclassroom}
            >
                Join Room
            </Button>}
            
        </div>
    </div>
  );
};

export default page;
