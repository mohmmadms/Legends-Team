// src/app/admin/page.jsx
import { cookies } from "next/headers";
import AdminPanel from "../components/AdminPanel";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (token !== "secure-admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Unauthorized</h2>
        <p className="mb-4">You must be logged in to access the admin panel.</p>
        <a
          href="/admin/login"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Go to Admin Login
        </a>
      </div>
    );
  }

  return <AdminPanel />;
}
