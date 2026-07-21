import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminNav from "./admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <div className="min-h-full bg-chalk">
      {isLoggedIn && <AdminNav />}
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
