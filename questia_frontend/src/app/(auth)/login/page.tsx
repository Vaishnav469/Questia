"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { loginAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginFormSchema } from "@/lib/types";

const page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
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
      router.push("/");
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
        onSubmit={handleSubmit}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#8E77DB]">Questia</h1>
          <h1 className="py-2 text-xl font-semibold">Yoo! Welcome Back!</h1>
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
        </div>

        <h3 className="mt-10 pb-1 text-center text-xs text-red-500">{error}</h3>

        <Button variant={"project"} className="w-full">
          Back to Home
        </Button>

        <div className="pt-2 text-center text-xs text-[#B3B3B3]">
          New user?{" "}
          <Link className="font-semibold text-white" href={"/register"}>
            Register Now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default page;
