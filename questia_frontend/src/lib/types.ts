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