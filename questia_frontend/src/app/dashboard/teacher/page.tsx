import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { jwtVerify } from "jose";

import TeacherDashboard from "@/components/dashboard/teacher/teacher-dashboard";

const page = async () => {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("auth-token")?.value;

  // if (!token) {
  //   redirect("/login");
  // }

  try {
    // const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    // const { payload } = await jwtVerify(token, secret);

    // if (payload.role !== "teacher") {
    //   redirect("/login");
    // }

    return (
      <div className="p-4">
        <TeacherDashboard />
      </div>
    );
  } catch (error) {
    redirect("/login");
  }
};

export default page;
