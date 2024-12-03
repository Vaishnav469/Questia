"use client"
import { FormData, Question } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchformdata } from "@/apiService";
import { ThreeDots } from 'react-loader-spinner'

const page = () => {
  const searchParams = useSearchParams();
  const formUid = searchParams.get('formUid');
  const [formdata, setformdata] = useState<FormData | null>(null);
  const [loading, setloading] = useState(false)

  useEffect(() => { 
    if (formUid) {
        const getData = async () => { 
            setloading(true)
            try { 
                const data = await fetchformdata(formUid); 
                console.log("Fetched Data: ", data.form.Questions);
                setformdata(data); 
            } catch (error) { 
                console.error("Failed to fetch form:", error); 
            } finally {
                setloading(false)
            }
        }; 
      getData(); 
    }
  }, [formUid]);
  return ( 
  <div className="flex flex-col items-center justify-center min-h-screen">
    {loading ? (
    <div className="flex items-center justify-center">
      <ThreeDots width="50" height="50" radius = "9" color="blue" />
    </div>) : (
      formdata && (
        <div className="w-full max-w-3xl">
            <h1 className="pt-5 text-3xl font-bold text-black"> 
              Form Title: {formdata.form.title} 
            </h1>
            
                <div className="mx-auto flex box-content flex-col gap-y-4 rounded-2xl border-2 border-[#8E77DB] bg-[#313030] px-16 text-[#F1E5FF]"
                style={{ maxHeight: '82vh', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className="pt-5"> 
                    <h3>Questions:</h3> 
                    <ul> {formdata.form.Questions.map((q, index) => ( 
                        <li key={index} className="py-3"> 
                        <p>Q:</p>
                            <div  className="w-full p-8 border rounded-md resize-none overflow-hidden" 
                                style={{minHeight: '2rem', maxHeight: 'auto', width: '100%', whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}>
                                {q.question}
                            </div>
                        
                        {q.options && 
                            (<ul className="pl-4">
                            {q.options.map((option, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <div className="border p-6 w-fit" >
                                        {option}
                                    </div>
                                </li>
                            ))}
                            </ul>
                        )} 
                        {q.type === "mcq" && ( 
                            <div>
                                <p>Answer:</p>
                                <div  className="mb-2 p-6 w-fit" >
                                    {q.answer}
                                </div>
                            </div>
                        )}
                        </li> 
                        ))} 
                    </ul> 
                </div>
            </div>
            

            {formdata.students.length == 0 && <h1 className="pt-[100] text-3xl font-bold text-black">Nobody has Attempted yet</h1>}
            {formdata.students.length != 0 &&
              <div className="pt-10">
                <div className="px-4">
                  <div className=" flex w-fit flex-col gap-y-4 rounded-2xl border-2 border-[#8E77DB] bg-[#313030] p-10 px-16 text-[#F1E5FF]"> 
                    <p className="text-xl">Students</p>
                    <div className="flex flex-col gap-y-4">
                      {formdata.students && formdata.students.map((student) => (
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
      )
    
    )}
  </div>
  );
};

export default page;
 