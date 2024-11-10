"use client";

import { useState } from "react";

import Backdrop from "@/components/backdrop";
import { useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const page = () => {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const router = useRouter(); 
  const searchParams = useSearchParams();
  const [topic, setTopic] = useState<string>("");
  const [numQuestions, setNumQuestions] = useState<number>(5);
  const [response, setResponse] = useState<{ questions: { question: string; options: string[]; answer: string; type: string; }[] } | null>(null);
  const [teacherUid, setTeacherUid] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("Quiz Title");

  useEffect(() => {
    const uid = searchParams.get('teacherUid'); 
    setTeacherUid(uid);
  }, []);

  const handleGenerate = async () => { 
    try { 
      const res = await fetch("http://192.168.70.47:8000/quiz/generate_quiz", { 
        method: "POST", headers: { 
          "Content-Type": "application/json", 
        }, body: JSON.stringify({ message: `Generate ${numQuestions} ${difficulty} questions on ${topic}` }), 
      }); 
      
      if (!res.ok) { 
        throw new Error("Failed to generate quiz"); 
      } 
      
      const data = await res.json(); 
      const parsedResponse = JSON.parse(data.response);
      
      setResponse(parsedResponse); 
    } catch (error) { 
      console.error("Error generating quiz:", error); 
    } 
  };

  const handleSubmit = async () => { 
    if (!response) return; 


    try { 
      const res = await fetch("http://192.168.70.47:8000/api/create_form", { 
        method: "POST", headers: { 
          "Content-Type": "application/json", 
        }, body: JSON.stringify({ teacher_uid: teacherUid, title: title, questions: response.questions, }), 
      }); 
      
      if (!res.ok) { 
        throw new Error("Failed to create form"); 
      } 
      
      const data = await res.json(); 
      console.log("Form created:", data.form_id); 
      router.push(`/dashboard/teacher/forms-list?teacherUid=${teacherUid}`); 
    } catch (error) { 
      console.error("Error creating form:", error); 
    } 
  };

  return (
    <div>
      <Backdrop>
        <div>
          <p className="py-5">AI - Generated Questions</p>
          <div className="relative">
            <Input placeholder="Enter Topic or Keywords" value={topic} onChange={(e) => setTopic(e.target.value)}/>
            <div className="absolute right-0 top-1/2 mr-2 flex -translate-y-1/2 gap-x-2 bg-[#313030]">
              <button
                className={cn(
                  "rounded-md border border-green-500 px-1 font-semibold text-green-500",
                  difficulty === "easy" && "bg-green-500 text-white"
                )}
                onClick={() => setDifficulty("easy")}
              >
                Easy
              </button>
              <button
                className={cn(
                  "rounded-md border border-yellow-500 px-1 font-semibold text-yellow-500",
                  difficulty === "medium" && "bg-yellow-500 text-white"
                )}
                onClick={() => setDifficulty("medium")}
              >
                Medium
              </button>
              <button
                className={cn(
                  "rounded-md border border-red-500 px-1 font-semibold text-red-500",
                  difficulty === "hard" && "bg-red-500 text-white"
                )}
                onClick={() => setDifficulty("hard")}
              >
                Hard
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 pt-5">
            <div className="flex flex-wrap items-center gap-x-2">
              <h3>Number of Questions</h3>
              <Input className="w-20" 
              type="number" 
              value={numQuestions} 
              onChange={(e) => setNumQuestions(Number(e.target.value))} 
              />
            </div>
            <Button variant={"project"} size={"lg"} onClick={handleGenerate}>
              Generate{" "}
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.2429 9.17198L18.7779 5.63598L18.0709 4.92898L14.5359 8.46398L15.2429 9.17198ZM13.8279 10.586L13.1209 9.87898L3.92994 19.07L4.63694 19.777L13.8289 10.585L13.8279 10.586ZM18.7779 2.80798L20.8989 4.92798C20.9919 5.02085 21.0657 5.13114 21.116 5.25254C21.1663 5.37393 21.1922 5.50406 21.1922 5.63548C21.1922 5.76689 21.1663 5.89702 21.116 6.01842C21.0657 6.13981 20.9919 6.2501 20.8989 6.34298L5.34294 21.9C5.15541 22.0874 4.9011 22.1928 4.63594 22.1928C4.37077 22.1928 4.11646 22.0874 3.92894 21.9L1.80794 19.78C1.71496 19.6871 1.6412 19.5768 1.59088 19.4554C1.54055 19.334 1.51465 19.2039 1.51465 19.0725C1.51465 18.9411 1.54055 18.8109 1.59088 18.6895C1.6412 18.5681 1.71496 18.4578 1.80794 18.365L17.3639 2.80798C17.5515 2.6205 17.8058 2.51519 18.0709 2.51519C18.3361 2.51519 18.5904 2.6205 18.7779 2.80798ZM9.58594 2.09998L10.9789 2.80398L12.4139 2.09998L11.7339 3.55998L12.4139 4.92798L11.0299 4.26398L9.58594 4.92798L10.2749 3.50798L9.58594 2.09998ZM19.4859 9.16998L20.8789 9.87498L22.3139 9.17098L21.6339 10.631L22.3139 11.999L20.9299 11.335L19.4849 11.999L20.1749 10.579L19.4849 9.17098L19.4859 9.16998Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
            {response && ( <div className="pt-5"> <h3>Questions:</h3> 
            <ul> {response.questions.map((q, index) => ( 
              <li key={index}> 
                <p>Q: {q.question}</p> 
                <ul> 
                  {q.options && q.options.map((option, idx) => ( <li key={idx}>{option}</li> ))} 
                </ul> 
              </li> 
              ))} 
            </ul> 
            <Button variant={"project"} size={"lg"} onClick={handleSubmit}> Submit to Create Form </Button>
          </div> )}
        </div>
      </Backdrop>
    </div>
  );
};

export default page;
