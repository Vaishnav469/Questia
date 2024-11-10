"use server";

import { cookies } from "next/headers";

type Action = {
  success: boolean;
  error?: string;
};

export async function loginAction(
  email: string,
  password: string
): Promise<Action> {
  try {
    const cookieStore = await cookies();

    const backendResponse = await fetch(`http://192.168.70.47:8000/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const response = await backendResponse.json();

    if (!backendResponse.ok) {
      throw new Error(response.msg ?? "Something went wrong");
    }

    const { access_token } = response;

    cookieStore.set("auth-token", access_token, {
      httpOnly: true,
      maxAge: 3600,
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Invalid credentials" };
  }
}

export async function registerAction(
  email: string,
  password: string,
  role: "Teacher" | "Student"
): Promise<Action> {
  try {
    const backendResponse = await fetch(
      `http://192.168.70.47:8000/api/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: role.toLowerCase() }),
      }
    );
    const response = await backendResponse.json();

    if (!backendResponse.ok) {
      throw new Error(response.msg ?? "Something went wrong");
    }
    return { success: true };

  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Registration failed" };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
  return { success: true };
}
