import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateFormSchema } from "@/lib/zod-schemas";
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
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const form = await prisma.form.findUnique({
      where: { id },
      include: { fields: { orderBy: { order: "asc" } } },
    });

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    return NextResponse.json(serializeForm(form));
  } catch (error) {
    console.error("GET /api/forms/manage/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = updateFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const { name, slug, description, fields } = parsed.data;

    if (slug) {
      const existing = await prisma.form.findFirst({
        where: { slug, NOT: { id } },
      });
      if (existing) {
        return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
      }
    }

    const updateData: Parameters<typeof prisma.form.update>[0]["data"] = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (description !== undefined) updateData.description = description;

    if (fields) {
      await prisma.formField.deleteMany({ where: { formId: id } });
      updateData.fields = {
        create: fields.map((f) => ({
          label: f.label,
          fieldKey: f.fieldKey,
          type: f.type,
          required: f.required,
          order: f.order,
          options: f.options ? JSON.stringify(f.options) : null,
          placeholder: f.placeholder ?? null,
        })),
      };
    }

    const form = await prisma.form.update({
      where: { id },
      data: updateData,
      include: { fields: { orderBy: { order: "asc" } } },
    });

    return NextResponse.json(serializeForm(form));
  } catch (error) {
    console.error("PATCH /api/forms/manage/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.form.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/forms/manage/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
