"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { CheckIcon } from "@radix-ui/react-icons";

import { loginAction, registerAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerFormSchema } from "@/lib/types";
import { loginFormSchema } from "@/lib/types";
import { cn } from "@/lib/utils";

const page = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [role, setRole] = useState<"Teacher" | "Student" | "">("");
  const [state, setState] = useState<"login" | "signup">("login");

  const router = useRouter();

  const handleRoleClick = (role: "Teacher" | "Student") => {
    setRole(role);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = loginFormSchema.safeParse({ email, password });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    try {
      const response = await loginAction(email, password);

      if (!response.success) {
        throw new Error("Something went wrong");
      }
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = registerFormSchema.safeParse({ email, password, role });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    try {
      if (!role) {
        throw new Error("Please select a role");
      }
      const response = await registerAction(email, password, role);

      if (!response.success) {
        throw new Error("Something went wrong");
      }
      setState("login");
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        className="m-5 rounded-xl border-2 border-[#8E77DB] bg-[#313030] px-5 py-10 md:px-16"
        onSubmit={state === "login" ? handleLogin : handleSignUp}
      >
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-[#F1E5FF] to-[#8E77DB] bg-clip-text text-2xl font-bold text-transparent">
            Questia
          </h1>
          {state === "login" ? (
            <h1 className="py-2 text-xl font-semibold">Yoo! Welcome Back!</h1>
          ) : (
            <></>
          )}
          <h3 className="mx-auto max-w-xs text-[#B3B3B3]">
            Smart, Automated Assessments for Educators and Learners
          </h3>
        </div>

        <div className="flex flex-col gap-y-5 pt-6 text-sm text-[#B3B3B3]">
          <label>
            <span className="pl-1">Email</span>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type email"
            />
          </label>
          <label>
            <span className="pl-1">Password</span>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type password"
            />
          </label>

          {state === "signup" ? <h3>Join as</h3> : <></>}

          {state === "signup" ? (
            <div className="flex w-fit max-w-[400px] flex-row gap-x-2">
              <div
                className={cn(
                  "group basis-1/2 cursor-pointer rounded-xl border-2 border-[#B3B3B3] p-2 text-white hover:border-[#8E77DB]",
                  role === "Teacher" && "bg-[#8E77DB]"
                )}
                onClick={() => handleRoleClick("Teacher")}
              >
                <div className="flex">
                  <CheckIcon
                    className={cn(
                      "rounded-full border border-[#B3B3B3] text-[#B3B3B3] group-hover:bg-white group-hover:text-black",
                      role === "Teacher" && "bg-white text-black"
                    )}
                  />
                  <h1 className="mx-auto flex items-center gap-x-1">
                    <Image
                      src="/teacher.svg"
                      alt="teacher"
                      width={30}
                      height={30}
                    />
                    <span className="text-xl">Teacher</span>
                  </h1>
                </div>
                <p className="px-2 text-center text-xs">
                  Create, edit, and assign forms; review AI-graded submissions
                  etc.
                </p>
              </div>

              <div
                className={cn(
                  "group basis-1/2 cursor-pointer rounded-xl border-2 border-[#B3B3B3] p-2 text-white hover:border-[#8E77DB]",
                  role === "Student" && "bg-[#8E77DB]"
                )}
                onClick={() => handleRoleClick("Student")}
              >
                <div className="flex">
                  <CheckIcon
                    className={cn(
                      "rounded-full border border-[#B3B3B3] text-[#B3B3B3] group-hover:bg-white group-hover:text-black",
                      role === "Student" && "bg-white text-black"
                    )}
                  />
                  <h1 className="mx-auto flex items-center gap-x-1">
                    <Image
                      src="/student.svg"
                      alt="student"
                      width={30}
                      height={30}
                    />
                    <span className="text-xl">Student</span>
                  </h1>
                </div>
                <p className="px-2 text-center text-xs">
                  Access assigned forms, complete and submit answers
                </p>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <h3 className="mt-10 pb-1 text-center text-xs text-red-500">{error}</h3>

        <Button variant={"project"} className="w-full">
          {state == "login" ? <h3>Back to Home</h3> : <h3>Sign Up</h3>}
        </Button>
        {state === "login" ? (
          <div className="pt-2 text-center text-xs text-[#B3B3B3]">
            Don't have an account?{" "}
            <span
              className="font-semibold text-white"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setState("signup");
              }}
            >
              Register Now
            </span>
          </div>
        ) : (
          <div className="pt-2 text-center text-xs text-[#B3B3B3]">
            Already have an account?{" "}
            <span
              className="font-semibold text-white"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setState("login");
              }}
            >
              Login Now
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default page;
