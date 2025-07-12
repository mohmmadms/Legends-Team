import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"));
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  });
  return response;
}
