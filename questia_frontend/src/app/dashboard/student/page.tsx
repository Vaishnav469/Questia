
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import StudentDashboard from "@/components/dashboard/student/student-dashboard";
import { jwtVerify } from "jose";

const page = async () => {
  {/*const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    redirect("/login");
  }
*/}
  try {
    {/*const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "student") {
      redirect("/login");
    }*/}

    return (
      <div>
        <StudentDashboard/>
      </div>
     
    );
  } catch (error) {
    redirect("/login");
  }
};

export default page;
