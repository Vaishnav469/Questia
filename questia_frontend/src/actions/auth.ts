"use server";

import { cookies } from "next/headers";

type Action = {
  success: boolean;
  error?: string;
};

export async function loginAction(
  username: string,
  password: string
): Promise<Action> {
  try {
    const cookieStore = await cookies();

    const backendResponse = await fetch("http://python-backend/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!backendResponse.ok) {
      throw new Error("Login failed");
    }

    const { token } = await backendResponse.json();

    cookieStore.set("auth-token", token, {
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

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
  return { success: true };
}
