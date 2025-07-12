import { NextResponse } from "next/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(req) {
  const { email, password } = await req.json();

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", "secure-admin", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return response;
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
