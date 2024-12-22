import React from "react";

import Navbar from "@/components/home/navbar";
import TeacherSideNav from "@/components/dashboard/teacher/side-nav";
import PageWrapper from "@/components/page-wrapper";
import MarginWidthWrapper from "@/components/margin-width-wrapper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

require('dotenv').config();

const layout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  


  if (!token) {
    redirect("/login");
  }
  
  try {
    const decodedToken = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    const role = decodedToken.payload.role
    return (
      <div className="flex">
        {role === "teacher" &&  
        <TeacherSideNav uid={decodedToken.payload.uid as string}/>}
        <main className="flex-1">
          {role === "teacher" ? <MarginWidthWrapper> 
            <Navbar role={role} />
            <PageWrapper>{children}</PageWrapper>
          </MarginWidthWrapper>
          :
          <> <Navbar role={role as string} /> 
          <PageWrapper>{children}</PageWrapper> 
          </>}
          
         
        </main>
      </div>
    );
  } catch (error) {
    redirect("/login");
  }
};

export default layout;
