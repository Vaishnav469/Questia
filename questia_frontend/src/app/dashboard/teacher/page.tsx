import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { jwtVerify } from "jose";

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "teacher") {
      redirect("/login");
    }

    return (
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold">
          Welcome to the Teacher Dashboard
        </h1>
        <p>I am a teacher</p>
      </div>
    );
  } catch (error) {
    redirect("/login");
  }
};

export default page;
