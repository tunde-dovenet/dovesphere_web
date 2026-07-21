"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormBuilder from "@/components/forms/form-builder";
import type { FormFieldDefinition } from "@/types";

export default function NewFormPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (data: {
    name: string;
    slug: string;
    description?: string;
    fields: Omit<FormFieldDefinition, "id">[];
  }) => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Failed to create form");
        setSaving(false);
        return;
      }
      router.push("/admin/forms");
    } catch {
      setError("Network error");
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-obsidian">New Form</h1>
      {error && (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}
      <FormBuilder onSave={handleSave} onCancel={() => router.push("/admin/forms")} />
      {saving && <p className="mt-4 text-sm text-gunmetal">Saving...</p>}
    </div>
  );
}
