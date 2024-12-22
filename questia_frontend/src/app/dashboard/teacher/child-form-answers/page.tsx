"use client"

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Form } from "@/lib/types";
import { ThreeDots } from "react-loader-spinner";



export default function QuizFeedback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formUid = searchParams.get('formUid');
  const studentUid = searchParams.get('studentUid'); // Get formUid and studentUid from query params
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setloading] = useState(false)
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  useEffect(() => {
    const fetchformanswer = async () => {
        setloading(true);
        try {
            // Fetch data from the backend
            const response = await fetch(`${BACKEND_URL}/api/get_form_answers?student_uid=${studentUid}&form_uid=${formUid}`)
               
            const data = await response.json();

            setForm(data)
        } catch (err) {
            console.error("Error fetching form answers:", err);
        } finally {
            setloading(false);
        }
        }
    if (formUid && studentUid) {
        fetchformanswer();
    }
  }, [formUid, studentUid]);

  if (!form) {
    return ( <div className="flex items-center justify-center">
        <ThreeDots width="50" height="50" radius = "9" color="blue" />
    </div>)
   
   }   

  return (
    loading ? (
        <div className="flex items-center justify-center">
            <ThreeDots width="50" height="50" radius = "9" color="blue" />
        </div>) : (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-purple-700">{form.title}</h1>
        <p className="text-gray-600 mt-2">Review the child's Quiz performance below:</p>

        <div className="mt-6">
          {form.Questions.map((q, index) => (
            <div
              key={index}
              className="p-4 my-4 border rounded-lg bg-gray-50 shadow-sm"
            >
              <h2 className="text-lg font-medium text-gray-800">
                Question {index + 1}: {q.question}
              </h2>
              {q.type === "mcq" && q.options && (
                <ul className="mt-2 space-y-2">
                  {q.options.map((option, idx) => (
                    
                    <li
                      key={idx}
                      className={`px-3 py-2 rounded ${
                        option === q.answer
                          ? "bg-green-100 text-green-700 font-bold"
                          : option === q.student_answer
                          ? "bg-red-100 text-red-700"
                          : "text-black bg-gray-100"
                      }`}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
              {q.type !== "mcq" && (
                <div className="mt-2">
                  <p>
                    <strong className="text-black">Child's Answer:</strong>{" "}
                    <span
                      className={`${
                        q.student_answer === q.answer
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {q.student_answer || "No Answer"}
                    </span>
                  </p>
                </div>
              )}
              <div className="mt-4">
               <p className="text-gray-600">
                  <strong>Feedback Given to Student by Us:</strong> {q.feedback || "No feedback given."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    )
  );
}
