// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // const token = req.cookies.get('token');
  // if (!token && req.nextUrl.pathname.startsWith('/orders')) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }
  // if (!token && req.nextUrl.pathname.startsWith('/admin')) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }
  // return NextResponse.next();
}
