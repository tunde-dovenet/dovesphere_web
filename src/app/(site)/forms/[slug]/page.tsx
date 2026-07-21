import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DynamicForm from "@/components/forms/dynamic-form";
import type { FormDefinition, FormFieldDefinition } from "@/types";

async function getForm(slug: string): Promise<FormDefinition | null> {
  const form = await prisma.form.findUnique({
    where: { slug },
    include: { fields: { orderBy: { order: "asc" } } },
  });

  if (!form) return null;

  return {
    id: form.id,
    name: form.name,
    slug: form.slug,
    description: form.description,
    isActive: form.isActive,
    createdAt: form.createdAt.toISOString(),
    updatedAt: form.updatedAt.toISOString(),
    fields: form.fields.map((f) => ({
      id: f.id,
      label: f.label,
      fieldKey: f.fieldKey,
      type: f.type as FormFieldDefinition["type"],
      required: f.required,
      order: f.order,
      options: f.options ? JSON.parse(f.options) : undefined,
      placeholder: f.placeholder ?? undefined,
    })),
  };
}

export default async function PublicFormPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const form = await getForm(slug);

  if (!form) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-obsidian">{form.name}</h1>
        {form.description && <p className="mt-2 text-gunmetal">{form.description}</p>}
      </div>
      <DynamicForm form={form} />
    </div>
  );
}
