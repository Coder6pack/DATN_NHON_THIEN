import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/manage"];
const unAuthPaths = ["/login"];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const { pathname } = request.nextUrl;

  // Chua dang nhap thi khong cho vao private path
  if (privatePaths.some((path) => pathname.startsWith(path)) && !refreshToken) {
    const url = new URL('/login', request.url)
    url.searchParams.set('clearTokens', 'true')
    return NextResponse.redirect(url)
  }
  // Dang nhap roi thi khong cho vao login nua
  if (unAuthPaths.some((path) => pathname.startsWith(path)) && refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // Dang nhap roi nhung access token het han
  if(privatePaths.some(path => pathname.startsWith(path)) && !accessToken && refreshToken){
    const url = new URL('/refresh-token', request.url)
    url.searchParams.set("refreshToken", refreshToken)
     url.searchParams.set('redirect', pathname)
  return NextResponse.redirect(url);
}}

export const config = {
  matcher: ["/manage/:path*", "/login"],
};
