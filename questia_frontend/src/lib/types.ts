import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export const registerFormSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
  role: z.enum(["Teacher", "Student"]),
});

export type Room = {
  id: number;
  name: string;
  description: string;
  code: string;
};

export type QuizRoom = {
  id: number;
  name: string;
  description: string;
  code: string;
  quizzes: Quiz[];
};

export type Quiz = {
  id: number;
  status: "Live" | "Ended";
  name: string;
  description: string;
};
