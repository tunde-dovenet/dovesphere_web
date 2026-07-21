import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createFormSchema } from "@/lib/zod-schemas";
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

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = createFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const { name, slug, description, fields } = parsed.data;

    const existing = await prisma.form.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    const form = await prisma.form.create({
      data: {
        name,
        slug,
        description,
        fields: {
          create: fields.map((f) => ({
            label: f.label,
            fieldKey: f.fieldKey,
            type: f.type,
            required: f.required,
            order: f.order,
            options: f.options ? JSON.stringify(f.options) : null,
            placeholder: f.placeholder ?? null,
          })),
        },
      },
      include: { fields: true },
    });

    return NextResponse.json(serializeForm(form), { status: 201 });
  } catch (error) {
    console.error("POST /api/forms error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const forms = await prisma.form.findMany({
      include: { fields: { orderBy: { order: "asc" } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(forms.map(serializeForm));
  } catch (error) {
    console.error("GET /api/forms error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
