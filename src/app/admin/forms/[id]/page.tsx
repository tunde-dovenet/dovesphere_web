"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormBuilder from "@/components/forms/form-builder";
import type { FormDefinition, FormFieldDefinition } from "@/types";

export default function EditFormPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [form, setForm] = useState<FormDefinition | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    params.then(({ id }) => {
      setId(id);
      fetch(`/api/forms/manage/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Not found");
          return res.json();
        })
        .then((data: FormDefinition) => setForm(data))
        .catch(() => setError("Form not found"))
        .finally(() => setLoading(false));
    });
  }, [params]);

  const handleSave = async (data: {
    name: string;
    slug: string;
    description?: string;
    fields: Omit<FormFieldDefinition, "id">[];
  }) => {
    if (!id) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/forms/manage/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Failed to update form");
        setSaving(false);
        return;
      }
      router.push("/admin/forms");
    } catch {
      setError("Network error");
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-gunmetal">Loading...</p>;
  }

  if (!form) {
    return (
      <div>
        <h1 className="mb-6 text-2xl font-bold text-obsidian">Edit Form</h1>
        {error && <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-obsidian">Edit Form</h1>
      {error && (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}
      <FormBuilder initial={form} onSave={handleSave} onCancel={() => router.push("/admin/forms")} />
      {saving && <p className="mt-4 text-sm text-gunmetal">Saving...</p>}
    </div>
  );
}
