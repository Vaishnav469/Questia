"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Form } from "@/lib/types";
import { ThreeDots } from "react-loader-spinner";

const QuizAnswerPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const formUid = searchParams.get("formUid");
    const studentUid = searchParams.get("studentUid");

    const [form, setForm] = useState<Form | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchForm = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://192.168.70.47:8000/api/student_form?form_uid=${formUid}`);
                const data = await response.json();

                const updatedQuestions = data.Questions.map((q) => ({
                    ...q,
                    student_answer: null, // Initialize with null
                }));
                setForm({ ...data, Questions: updatedQuestions });
            } catch (error) {
                console.error("Error fetching form:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchForm();
    }, [formUid]);

    const handleOptionSelect = (option: string) => {
        setForm((prevForm) => {
            if (!prevForm) return prevForm;

            const updatedQuestions = [...prevForm.Questions];
            updatedQuestions[currentQuestionIndex].student_answer = option;

            return { ...prevForm, Questions: updatedQuestions };
        });
    };

    const handleTextAnswer = (answer: string) => {
        setForm((prevForm) => {
            if (!prevForm) return prevForm;

            const updatedQuestions = [...prevForm.Questions];
            updatedQuestions[currentQuestionIndex].student_answer = answer;

            return { ...prevForm, Questions: updatedQuestions };
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < form.Questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://192.168.70.47:8000/api/submit_form_answers?student_uid=${studentUid}&form_uid=${formUid}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form
                }),
            });

            if (response.ok) {
                router.push(`/dashboard/student/`);
            } else {
                console.error("Error submitting form");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!form) {
        return <h1>Form not found</h1>;
    }

    const currentQuestion = form.Questions[currentQuestionIndex];

    return (
        loading ? (
        <div className="flex items-center justify-center">
            <ThreeDots width="50" height="50" radius = "9" color="blue" />
        </div>) : (
             <div className="quiz-container text-black mx-auto max-w-[600px] p-4">
                  <h1 className="text-2xl text-black font-bold">{form.title}</h1>
                  <div className="question-container text-black mt-6">
                    <h2 className="text-xl text-black font-medium">Question {currentQuestionIndex + 1}</h2>
                    <p className=" text-black mt-2">{currentQuestion.question}</p>
                    {currentQuestion.type === "mcq" && (
                        <div className="options-container mt-4">
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`option-button rounded p-2 m-1 ${
                                        currentQuestion.student_answer === option
                                            ? "bg-green-500 text-white"
                                            : "bg-blue-500 text-white hover:bg-blue-600"
                                    }`}
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                    {currentQuestion.type === "subjective" && (
                        <div className="subjective-container mt-4">
                            <textarea
                                className="w-full p-2 border rounded"
                                rows={4}
                                placeholder="Type your answer here..."
                                value={currentQuestion.student_answer || ""}
                                onChange={(e) => handleTextAnswer(e.target.value)}
                            />
                        </div>
                    )}
                  </div>
                  <div className="mt-6">
                        <button
                            className={`next-button rounded bg-purple-500 text-white px-4 py-2 hover:bg-purple-600`}
                            onClick={handleNext}
                        >
                            {currentQuestionIndex === form.Questions.length - 1 ? "Submit" : "Next"}
                        </button>
                  </div>
             </div>
        )
    )
}


export default QuizAnswerPage;