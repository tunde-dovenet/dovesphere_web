"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { FileText, Inbox, LogOut } from "lucide-react";

export default function AdminNav() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      pathname.startsWith(href)
        ? "bg-obsidian text-white"
        : "text-gunmetal hover:bg-gunmetal/10"
    }`;

  return (
    <nav className="border-b border-gunmetal/10 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-1">
          <Link href="/admin/forms" className={linkClass("/admin/forms")}>
            <FileText size={16} />
            Forms
          </Link>
          <Link href="/admin/submissions" className={linkClass("/admin/submissions")}>
            <Inbox size={16} />
            Submissions
          </Link>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin" })}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gunmetal hover:bg-gunmetal/10"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </nav>
  );
}
