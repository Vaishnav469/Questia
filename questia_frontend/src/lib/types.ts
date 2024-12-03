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
  uid: number;
  title: string;
  description: string;
  unique_code: string;
};

export type Form = {
  uid: number;
  title: string;
  Questions: any;
};


export type Student = { 
  uid?: string; 
  email: string; 
}; 

export type Classroom = { 
  uid: string; 
  title: string; 
  unique_code: string; 
  description: string; 
}; 

export type ClassData = { 
  classroom: Classroom; 
  students: Student[]; 
};


export type FormData = { 
  form: Form; 
  students: Student[]; 
};

export type Quiz = {
  id: number;
  status: "Live" | "Ended";
  name: string;
  description: string;
};

export type SideNavItem= {
  title: string;
  path?: string;
  icon?: JSX.Element;
}