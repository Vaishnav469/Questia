import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { jwtVerify } from "jose";

export async function middleware(params: NextRequest) {}

// export async function middleware(request: NextRequest) {
//   const token = await request.cookies.get("auth-token")?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   try {
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//     const { payload } = await jwtVerify(token, secret);

//     if (request.nextUrl.pathname === "/dashboard") {
//       if (payload.role === "student") {
//         return NextResponse.rewrite(new URL("/dashboard/student", request.url));
//       } else if (payload.role === "teacher") {
//         return NextResponse.rewrite(new URL("/dashboard/teacher", request.url));
//       }
//     }

//     return NextResponse.next();
//   } catch (error) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
// }

export const config = {
  matcher: ["/dashboard/:path*"],
};
