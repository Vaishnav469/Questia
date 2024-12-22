import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const decodedToken = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    const role = decodedToken.payload.role;
    const id = decodedToken.payload.id;

    if (request.nextUrl.pathname === '/dashboard') {
      if (role === 'student') {
        return NextResponse.rewrite(new URL('/dashboard/student', request.url));
      } else if (role === 'teacher') {
        return NextResponse.rewrite(new URL('/dashboard/teacher', request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
