import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { FormDefinition, FormFieldDefinition } from "@/types";

function serializeForm(form: {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  fields: Array<{
    id: string;
    label: string;
    fieldKey: string;
    type: string;
    required: boolean;
    order: number;
    options: string | null;
    placeholder: string | null;
  }>;
}): FormDefinition {
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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const form = await prisma.form.findUnique({
      where: { slug },
      include: { fields: { orderBy: { order: "asc" } } },
    });

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    return NextResponse.json(serializeForm(form));
  } catch (error) {
    console.error("GET /api/forms/[slug] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
