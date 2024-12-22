
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

import StudentDashboard from "@/components/dashboard/student/student-dashboard";

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    redirect("/login");
  }
  try {
    const decodedToken = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

    if (decodedToken.payload.role !== "student") {
      redirect("/login");
    }

    return (
      <div className="p-4">
        <StudentDashboard studentUid={decodedToken.payload.uid as string}/>
      </div>
     
    );
  } catch (error) {
    redirect("/login");
  }
};

export default page;
