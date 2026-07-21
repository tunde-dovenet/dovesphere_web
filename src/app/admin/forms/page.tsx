"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, Pencil, Trash2, Plus } from "lucide-react";
import type { FormDefinition } from "@/types";

export default function AdminFormsPage() {
  const router = useRouter();
  const [forms, setForms] = useState<FormDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/forms")
      .then((res) => res.json())
      .then((data) => {
        setForms(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this form and all its submissions?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/forms/manage/${id}`, { method: "DELETE" });
      if (res.ok) {
        setForms((prev) => prev.filter((f) => f.id !== id));
      } else {
        alert("Failed to delete form");
      }
    } catch {
      alert("Failed to delete form");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <p className="text-gunmetal">Loading...</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-obsidian">Forms</h1>
        <Link
          href="/admin/forms/new"
          className="flex items-center gap-2 rounded-md bg-azure px-4 py-2 text-sm font-medium text-white hover:bg-azure/90"
        >
          <Plus size={16} />
          New Form
        </Link>
      </div>

      {forms.length === 0 ? (
        <div className="rounded-lg border border-gunmetal/10 bg-white p-8 text-center text-gunmetal">
          No forms yet.{" "}
          <Link href="/admin/forms/new" className="text-azure hover:underline">
            Create one
          </Link>
          .
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gunmetal/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-chalk">
              <tr>
                <th className="px-4 py-3 font-semibold text-obsidian">Name</th>
                <th className="px-4 py-3 font-semibold text-obsidian">Slug</th>
                <th className="px-4 py-3 font-semibold text-obsidian">Fields</th>
                <th className="px-4 py-3 font-semibold text-obsidian">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gunmetal/10">
              {forms.map((form) => (
                <tr key={form.id}>
                  <td className="px-4 py-3 font-medium text-obsidian">{form.name}</td>
                  <td className="px-4 py-3 text-gunmetal">{form.slug}</td>
                  <td className="px-4 py-3 text-gunmetal">{form.fields.length}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/forms/${form.slug}`}
                        target="_blank"
                        className="flex items-center gap-1 rounded-md border border-gunmetal/20 px-2 py-1 text-xs text-gunmetal hover:bg-chalk"
                      >
                        <ExternalLink size={12} />
                        View
                      </Link>
                      <button
                        onClick={() => router.push(`/admin/forms/${form.id}`)}
                        className="flex items-center gap-1 rounded-md border border-gunmetal/20 px-2 py-1 text-xs text-gunmetal hover:bg-chalk"
                      >
                        <Pencil size={12} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(form.id)}
                        disabled={deletingId === form.id}
                        className="flex items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        <Trash2 size={12} />
                        {deletingId === form.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
